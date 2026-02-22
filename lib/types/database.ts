export type ServiceCategory = "tretmani-lica" | "epilacija" | "depilacija";

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  last_login: string | null;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  title_rs: string;
  description_rs: string | null;
  price_range: string | null;
  duration: string | null;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title_rs: string;
  slug: string;
  content_rs: string;
  excerpt_rs: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  is_published: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  author_name: string;
  author_image: string | null;
  rating: number;
  content_rs: string;
  service_mentioned: string | null;
  is_mock: boolean;
  is_published: boolean;
  created_at: string;
}
