"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/supabase/auth";
import {
  deleteProductImage,
  uploadProductImage,
} from "@/lib/product-images";
import type { Product } from "@/types/product";
import type { ProductFormState } from "@/types/product-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function readProductFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const rawPrice = String(formData.get("price") ?? "").trim();
  const price = Number(rawPrice);

  if (!title) {
    return { error: "Titel is verplicht." };
  }

  if (!/^\d+(\.\d{1,2})?$/.test(rawPrice) || !Number.isFinite(price)) {
    return { error: "Vul een geldige prijs in met maximaal twee decimalen." };
  }

  const optional = (name: string) => {
    const value = String(formData.get(name) ?? "").trim();
    return value || null;
  };

  return {
    title,
    price,
    description: optional("description"),
    category: optional("category"),
    is_hidden: formData.get("is_hidden") === "on",
  };
}

function productSaveError(error: {
  code: string;
  message: string;
  details: string;
}): ProductFormState {
  if (error.code === "22003") {
    const digits = error.details?.match(/less than 10\^(\d+)/)?.[1];
    const exponent = digits === undefined ? NaN : Number(digits);
    if (Number.isInteger(exponent) && exponent >= 0 && exponent <= 15) {
      const limit = (10 ** exponent).toLocaleString("nl-NL");
      return { error: `De prijs is te hoog. Vul een bedrag lager dan € ${limit} in.` };
    }
    return { error: "De prijs is te hoog voor de database. Vul een lager bedrag in." };
  }
  return { error: error.message };
}

export async function getAllProducts(): Promise<Product[]> {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getAdminProduct(id: number): Promise<Product | null> {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function createProduct(formData: FormData) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const fields = readProductFields(formData);
  if (fields.error !== undefined) return { error: fields.error };
  const image = formData.get("image");

  let imageUrl: string | null = null;

  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadProductImage(image);
    imageUrl = uploaded.publicUrl;
  }

  const { error } = await supabase.from("products").insert({
    ...fields,
    image_url: imageUrl,
  });

  if (error) {
    if (imageUrl) {
      await deleteProductImage(imageUrl);
    }
    return productSaveError(error);
  }

  revalidatePath("/products");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(id: number, formData: FormData) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { data: currentProduct, error: currentError } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", id)
    .single();

  if (currentError) {
    throw new Error(currentError.message);
  }

  const fields = readProductFields(formData);
  if (fields.error !== undefined) return { error: fields.error };
  const image = formData.get("image");
  const removeImage = formData.get("remove_image") === "on";

  let nextImageUrl = currentProduct.image_url;
  let uploadedImageUrl: string | null = null;

  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadProductImage(image);
    uploadedImageUrl = uploaded.publicUrl;
    nextImageUrl = uploaded.publicUrl;
  } else if (removeImage) {
    nextImageUrl = null;
  }

  const { error } = await supabase
    .from("products")
    .update({
      ...fields,
      image_url: nextImageUrl,
    })
    .eq("id", id);

  if (error) {
    if (uploadedImageUrl) {
      await deleteProductImage(uploadedImageUrl);
    }
    return productSaveError(error);
  }

  if (
    currentProduct.image_url &&
    currentProduct.image_url !== nextImageUrl
  ) {
    await deleteProductImage(currentProduct.image_url);
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function toggleVisibility(id: number, hidden: boolean) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("products")
    .update({ is_hidden: !hidden })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/admin");
}

export async function deleteProduct(id: number) {
  await requireAuth();
  const supabase = await createServerSupabaseClient();

  const { data: product, error: readError } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", id)
    .single();

  if (readError) {
    throw new Error(readError.message);
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await deleteProductImage(product.image_url);

  revalidatePath("/products");
  revalidatePath("/admin");
}
