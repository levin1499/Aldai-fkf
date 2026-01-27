import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trophy, Users, Target, Heart, Award, Shield, Star, MapPin, Calendar, Phone, Mail } from 'lucide-react';
import { fetchAboutContent, AboutContent } from '../../services/contentApi';

const About: React.FC = () => {
  const [aboutSections, setAboutSections] = useState<AboutContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        const data = await fetchAboutContent();
        setAboutSections(data);
      } catch (error) {
        console.error('Error loading about content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAboutContent();
  }, []);

  const getSection = (sectionName: string) => {
    return aboutSections.find(section => section.section === sectionName);
  };

  const achievements = [
    {
      icon: Trophy,
      title: "Regional Champions",
      description: "Multiple championship titles in regional competitions",
      count: "15+"
    },
    {
      icon: Users,
      title: "Registered Players",
      description: "Active players across all age categories",
      count: "500+"
    },
    {
      icon: Shield,
      title: "Certified Clubs",
      description: "Licensed and verified football clubs",
      count: "25+"
    },
    {
      icon: Star,
      title: "Years of Excellence",
      description: "Serving the Aldai community with dedication",
      count: "10+"
    }
  ];

 const leadership = [
    {
      name: "Stanely Chogo",
      position: "Chairman",
      description: "Leading FKF Aldai with vision and dedication to football development",
      image: "https://onbcozjaiilxvmeipqjf.supabase.co/storage/v1/object/public/news//chairman.jpg"
    },
    {
      name: "Stanely Chogo",
      position: "Chairman",
      description: "Leading FKF Aldai with vision and dedication to football development",
      image: "https://onbcozjaiilxvmeipqjf.supabase.co/storage/v1/object/public/news//chairman.jpg"
    },
    {
      name: "Stanely Chogo",
      position: "Chairman",
      description: "Leading FKF Aldai with vision and dedication to football development",
      image: "https://onbcozjaiilxvmeipqjf.supabase.co/storage/v1/object/public/news//chairman.jpg"
    }
  ];

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
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">About FKF Aldai</h1>
                <p className="text-qatar-burgundy mt-2">Empowering football excellence in Aldai constituency</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-qatar-gold mr-3" />
                <h2 className="text-2xl font-bold text-qatar-maroon">
                  {getSection('mission')?.title || 'Our Mission'}
                </h2>
              </div>
              <p className="text-qatar-burgundy leading-relaxed">
                {getSection('mission')?.content || 'To develop, promote, and manage football activities in Aldai constituency by providing comprehensive player registration, club management, and competitive opportunities that foster talent development, community engagement, and sporting excellence at all levels.'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
              <div className="flex items-center mb-4">
                <Star className="h-8 w-8 text-qatar-gold mr-3" />
                <h2 className="text-2xl font-bold text-qatar-maroon">
                  {getSection('vision')?.title || 'Our Vision'}
                </h2>
              </div>
              <p className="text-qatar-burgundy leading-relaxed">
                {getSection('vision')?.content || 'To be the leading football federation branch in Kenya, recognized for excellence in player development, transparent governance, and community impact, while nurturing the next generation of football talent from grassroots to professional levels.'}
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6 text-center">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="text-center p-6 bg-qatar-lightGold rounded-lg">
                    <div className="h-16 w-16 bg-qatar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-qatar-maroon mb-2">{achievement.count}</h3>
                    <h4 className="text-lg font-semibold text-qatar-maroon mb-2">{achievement.title}</h4>
                    <p className="text-qatar-burgundy text-sm">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leadership Team */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <div key={index} className="text-center">
                  <div className="h-32 w-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-qatar-gold">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-qatar-maroon mb-1">{leader.name}</h3>
                  <p className="text-qatar-gold font-medium mb-3">{leader.position}</p>
                  <p className="text-qatar-burgundy text-sm">{leader.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Values */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <Shield className="h-12 w-12 text-qatar-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Integrity</h3>
                <p className="text-qatar-burgundy text-sm">Maintaining the highest standards of honesty and transparency in all our operations</p>
              </div>
              <div className="text-center p-6">
                <Users className="h-12 w-12 text-qatar-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Unity</h3>
                <p className="text-qatar-burgundy text-sm">Bringing together communities through the beautiful game of football</p>
              </div>
              <div className="text-center p-6">
                <Trophy className="h-12 w-12 text-qatar-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Excellence</h3>
                <p className="text-qatar-burgundy text-sm">Striving for the highest quality in player development and competition</p>
              </div>
              <div className="text-center p-6">
                <Heart className="h-12 w-12 text-qatar-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Passion</h3>
                <p className="text-qatar-burgundy text-sm">Driven by love for football and commitment to community development</p>
              </div>
              <div className="text-center p-6">
                <Target className="h-12 w-12 text-qatar-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Innovation</h3>
                <p className="text-qatar-burgundy text-sm">Embracing modern technology and methods to enhance football development</p>
              </div>
              <div className="text-center p-6">
                <Award className="h-12 w-12 text-qatar-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Recognition</h3>
                <p className="text-qatar-burgundy text-sm">Celebrating achievements and acknowledging contributions to football growth</p>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">
              {getSection('history')?.title || 'Our History'}
            </h2>
            <div className="text-qatar-burgundy leading-relaxed whitespace-pre-wrap mb-6">
              {getSection('history')?.content || 'FKF Aldai was established in 2014 as a branch of Football Kenya Federation to serve the Aldai constituency, bringing organized football to the region.'}
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                  <Calendar className="h-4 w-4 text-qatar-maroon" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-qatar-maroon mb-2">2014 - Foundation</h3>
                  <p className="text-qatar-burgundy">
                    FKF Aldai was established as a branch of Football Kenya Federation to serve the 
                    Aldai constituency, bringing organized football to the region.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                  <Users className="h-4 w-4 text-qatar-maroon" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-qatar-maroon mb-2">2016 - First League</h3>
                  <p className="text-qatar-burgundy">
                    Launched the inaugural Aldai Premier League with 12 founding clubs, 
                    establishing the foundation for competitive football in the region.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                  <Trophy className="h-4 w-4 text-qatar-maroon" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-qatar-maroon mb-2">2019 - Youth Development</h3>
                  <p className="text-qatar-burgundy">
                    Introduced comprehensive youth development programs, establishing training 
                    centers and coaching clinics across the constituency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                  <Star className="h-4 w-4 text-qatar-maroon" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-qatar-maroon mb-2">2024 - Digital Transformation</h3>
                  <p className="text-qatar-burgundy">
                    Launched the comprehensive team management system, digitizing player 
                    registration and club management for enhanced transparency and efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-qatar-gradient rounded-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4 text-center">Get in Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-qatar-cream text-sm">
                  Aldai Constituency<br />
                  Nandi County, Kenya
                </p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Phone</h4>
                <p className="text-qatar-cream text-sm">0798079720</p>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-qatar-cream text-sm">footballkenya.aldai@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;