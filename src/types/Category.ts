export interface Result {
  meta: Meta;
  links: Links;
  data: Category[];
}

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: null | string;
  deleted_at: null | string;
}

export interface Links {
  first: string;
  last: string;
  prev: null | string;
  next: null | string;
}

export interface Meta {
  to: number;
  from: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
  path: string;
}
