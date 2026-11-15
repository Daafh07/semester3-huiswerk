export type Product = {
  id: string;
  title: string;
  price: number;
  description: string | null;
  category: string | null;
  image_url: string | null;
  is_hidden: boolean;
  created_at: string;
};
