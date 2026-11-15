import { supabase } from "@/lib/supabase";
import type { Student } from "@/lib/studenten";

export async function haalStudentenOp(): Promise<Student[]> {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("id");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function voegStudentToe(
  naam: string,
  opleiding: string,
  email: string
): Promise<Student> {
  const { data, error } = await supabase
    .from("students")
    .insert({
      naam,
      opleiding,
      email,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function verwijderStudent(id: number): Promise<void> {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function updateStudent(
  id: number,
  naam: string,
  opleiding: string,
  email: string
): Promise<Student> {
  const { data, error } = await supabase
    .from("students")
    .update({
      naam,
      opleiding,
      email,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}