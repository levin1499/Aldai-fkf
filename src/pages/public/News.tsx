import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Newspaper, Calendar, User, Tag, Clock, ArrowRight } from 'lucide-react';
import { fetchNewsArticles, NewsArticle } from '../../services/contentApi';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchNewsArticles(); // Only published articles
        setArticles(data);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'matches', name: 'Match Reports' },
    { id: 'transfers', name: 'Player News' },
    { id: 'events', name: 'Events' },
    { id: 'youth', name: 'Youth Development' },
    { id: 'announcements', name: 'Announcements' }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredNews.filter(article => !article.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      matches: 'bg-green-100 text-green-800',
      transfers: 'bg-blue-100 text-blue-800',
      events: 'bg-purple-100 text-purple-800',
      youth: 'bg-yellow-100 text-yellow-800',
      announcements: 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-qatar-cream to-qatar-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-qatar-gold"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-qatar-cream to-qatar-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-qatar-maroon hover:text-qatar-darkMaroon transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-gold">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-qatar-gradient rounded-full flex items-center justify-center mr-6">
                <Newspaper className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Latest News</h1>
                <p className="text-qatar-burgundy mt-2">Stay updated with the latest from FKF Aldai</p>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-qatar-cream">
            <h2 className="text-lg font-semibold text-qatar-maroon mb-4">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-qatar-gold text-qatar-maroon shadow-md'
                      : 'bg-qatar-lightGold text-qatar-burgundy hover:bg-qatar-gold hover:text-qatar-maroon'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article */}
          {featuredArticle && selectedCategory === 'all' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-qatar-cream">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredArticle.image_url || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-qatar-gold text-qatar-maroon px-3 py-1 rounded-full text-xs font-semibold mr-3">
                      FEATURED
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredArticle.category)}`}>
                      {categories.find(cat => cat.id === featuredArticle.category)?.name}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-qatar-maroon mb-4">{featuredArticle.title}</h2>
                  <p className="text-qatar-burgundy mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-qatar-burgundy">
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredArticle.author}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{formatDate(featuredArticle.created_at)}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{calculateReadTime(featuredArticle.content)}</span>
                    </div>
                    <button className="flex items-center text-qatar-maroon hover:text-qatar-darkMaroon font-medium">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {regularArticles.map(article => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-qatar-cream hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image_url || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-qatar-maroon mb-3 group-hover:text-qatar-darkMaroon transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-qatar-burgundy text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-qatar-burgundy">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(article.created_at)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-qatar-burgundy">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{calculateReadTime(article.content)}</span>
                    </div>
                    <button className="flex items-center text-qatar-maroon hover:text-qatar-darkMaroon text-sm font-medium">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-qatar-gradient rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-qatar-cream mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news, match updates, and announcements 
              directly in your inbox.
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-lg text-qatar-maroon focus:outline-none focus:ring-2 focus:ring-qatar-gold"
              />
              <button className="px-6 py-3 bg-qatar-gold text-qatar-maroon font-semibold rounded-r-lg hover:bg-qatar-lightGold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;