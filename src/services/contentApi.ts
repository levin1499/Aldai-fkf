import { supabase } from '../lib/supabase';

// News Articles API
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'matches' | 'transfers' | 'events' | 'youth' | 'announcements';
  author: string;
  image_url?: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsArticleFormData {
  title: string;
  excerpt: string;
  content: string;
  category: 'matches' | 'transfers' | 'events' | 'youth' | 'announcements';
  author: string;
  image_url?: string;
  featured?: boolean;
  published?: boolean;
}

// About Content API
export interface AboutContent {
  id: string;
  section: string;
  title: string;
  content: string;
  updated_at: string;
}

export interface AboutContentFormData {
  title: string;
  content: string;
}

// Gallery Images API
export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: 'matches' | 'training' | 'events' | 'awards' | 'youth';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImageFormData {
  title: string;
  description?: string;
  image_url: string;
  category: 'matches' | 'training' | 'events' | 'awards' | 'youth';
  order_index?: number;
}

// News Articles Functions
export const fetchNewsArticles = async (includeUnpublished = false): Promise<NewsArticle[]> => {
  let query = supabase
    .from('news_articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (!includeUnpublished) {
    query = query.eq('published', true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export const fetchNewsArticle = async (id: string): Promise<NewsArticle | null> => {
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createNewsArticle = async (articleData: NewsArticleFormData): Promise<NewsArticle> => {
  const { data, error } = await supabase
    .from('news_articles')
    .insert([articleData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateNewsArticle = async (id: string, articleData: Partial<NewsArticleFormData>): Promise<NewsArticle> => {
  const { data, error } = await supabase
    .from('news_articles')
    .update(articleData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteNewsArticle = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('news_articles')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

// About Content Functions
export const fetchAboutContent = async (): Promise<AboutContent[]> => {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .order('section');

  if (error) throw error;
  return data || [];
};

export const fetchAboutSection = async (section: string): Promise<AboutContent | null> => {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .eq('section', section)
    .single();

  if (error) throw error;
  return data;
};

export const updateAboutContent = async (section: string, contentData: AboutContentFormData): Promise<AboutContent> => {
  const { data, error } = await supabase
    .from('about_content')
    .upsert([{ section, ...contentData }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Gallery Images Functions
export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const fetchGalleryImage = async (id: string): Promise<GalleryImage | null> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createGalleryImage = async (imageData: GalleryImageFormData): Promise<GalleryImage> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .insert([imageData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateGalleryImage = async (id: string, imageData: Partial<GalleryImageFormData>): Promise<GalleryImage> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .update(imageData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteGalleryImage = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('gallery_images')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};