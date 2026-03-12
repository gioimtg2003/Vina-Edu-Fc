export type BlogCategory = 
  | "Tất cả"
  | "Kiến thức UAV"
  | "Tin tức VinaUAV"
  | "Luật bay Việt Nam"
  | "Dự án sinh viên";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  author: string;
  updatedAt?: string;
  featured?: boolean;
}
