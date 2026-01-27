/*
  # Content Management System Tables

  1. New Tables
    - `news_articles`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `excerpt` (text, not null)
      - `content` (text, not null)
      - `category` (text, not null)
      - `author` (text, not null)
      - `image_url` (text)
      - `featured` (boolean, default false)
      - `published` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `about_content`
      - `id` (uuid, primary key)
      - `section` (text, unique, not null)
      - `title` (text, not null)
      - `content` (text, not null)
      - `updated_at` (timestamptz)

    - `gallery_images`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text)
      - `image_url` (text, not null)
      - `category` (text, not null)
      - `order_index` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for published content
    - Admin write access for content management
*/

-- Create news_articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('matches', 'transfers', 'events', 'youth', 'announcements')),
  author text NOT NULL,
  image_url text,
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create about_content table
CREATE TABLE IF NOT EXISTS about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL CHECK (category IN ('matches', 'training', 'events', 'awards', 'youth')),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for news_articles
CREATE POLICY "Allow public read access to published news"
  ON news_articles FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Allow authenticated users to manage news"
  ON news_articles TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for about_content
CREATE POLICY "Allow public read access to about content"
  ON about_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage about content"
  ON about_content TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for gallery_images
CREATE POLICY "Allow public read access to gallery images"
  ON gallery_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage gallery images"
  ON gallery_images TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_news_articles_updated_at
  BEFORE UPDATE ON news_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
  BEFORE UPDATE ON about_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default about content
INSERT INTO about_content (section, title, content) VALUES
('mission', 'Our Mission', 'To develop, promote, and manage football activities in Aldai constituency by providing comprehensive player registration, club management, and competitive opportunities that foster talent development, community engagement, and sporting excellence at all levels.'),
('vision', 'Our Vision', 'To be the leading football federation branch in Kenya, recognized for excellence in player development, transparent governance, and community impact, while nurturing the next generation of football talent from grassroots to professional levels.'),
('history', 'Our History', 'FKF Aldai was established in 2014 as a branch of Football Kenya Federation to serve the Aldai constituency, bringing organized football to the region. Since then, we have grown to become a cornerstone of football development in the area.')
ON CONFLICT (section) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS news_articles_category_idx ON news_articles(category);
CREATE INDEX IF NOT EXISTS news_articles_published_idx ON news_articles(published);
CREATE INDEX IF NOT EXISTS news_articles_featured_idx ON news_articles(featured);
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images(category);
CREATE INDEX IF NOT EXISTS gallery_images_order_idx ON gallery_images(order_index);