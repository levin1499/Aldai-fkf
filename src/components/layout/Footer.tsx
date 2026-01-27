import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Users,
  Trophy,
  Heart,
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-theme-dark text-white border-t border-theme-accent/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg overflow-hidden border-2 border-theme-accent shadow-glow">
                <img
                  src="https://onbcozjaiilxvmeipqjf.supabase.co/storage/v1/object/public/club-logos//-1Niwpcf1ltBk_KrB1iMQw_64x64.png"
                  alt="FKF Aldai Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-theme-accent">FKF Aldai</h3>
                <p className="text-sm text-theme-accent/70">Team Management</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Empowering football development in Aldai through comprehensive player management,
              club coordination, and community engagement.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-theme-accent/20 hover:bg-theme-accent hover:text-theme-primary p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-soft hover:shadow-glow"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-theme-accent/20 hover:bg-theme-accent hover:text-theme-primary p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-soft hover:shadow-glow"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-theme-accent/20 hover:bg-theme-accent hover:text-theme-primary p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-soft hover:shadow-glow"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-theme-accent/20 hover:bg-theme-accent hover:text-theme-primary p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-soft hover:shadow-glow"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-theme-accent border-b border-theme-accent/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <Trophy className="h-4 w-4 mr-2 group-hover:text-theme-accent" />
                  Player Search
                </Link>
              </li>
              <li>
                <Link
                  to="/officials/login"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <Shield className="h-4 w-4 mr-2 group-hover:text-theme-accent" />
                  Officials Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/officials/signup"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <Users className="h-4 w-4 mr-2 group-hover:text-theme-accent" />
                  Join as Official
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <Heart className="h-4 w-4 mr-2 group-hover:text-theme-accent" />
                  About FKF Aldai
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-theme-accent border-b border-theme-accent/30 pb-2">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/resources/player-registration"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  Player Registration Guide
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/club-management"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  Club Management Handbook
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/tournament-schedule"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  Tournament Schedule
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/training-programs"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  Training Programs
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/youth-development"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  Youth Development
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-theme-accent border-b border-theme-accent/30 pb-2">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-theme-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Aldai Constituency<br />
                    Nandi County, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-theme-accent flex-shrink-0" />
                <a
                  href="tel:0798079720"
                  className="text-gray-300 hover:text-theme-accent transition-colors text-sm"
                >
                  0798079720
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-theme-accent flex-shrink-0" />
                <a
                  href="mailto:footballkenya.aldai@gmail.com"
                  className="text-gray-300 hover:text-theme-accent transition-colors text-sm"
                >
                  footballkenya.aldai@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-theme-accent/10 rounded-lg p-4 border border-theme-accent/20 shadow-soft">
              <h5 className="text-theme-accent font-medium mb-2">Stay Updated</h5>
              <p className="text-gray-300 text-xs mb-3">
                Get the latest news and updates from FKF Aldai
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-theme-primary/30 border border-theme-accent/30 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-theme-accent"
                />
                <button className="px-4 py-2 bg-theme-accent text-theme-primary text-sm font-medium rounded-r-lg hover:bg-theme-accentLight transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-theme-accent/20 bg-theme-dark/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-300">
                © {year} FKF Aldai. All rights reserved.
              </p>
              <p className="text-xs text-gray-400">
                Developed with <Heart className="h-3 w-3 inline text-red-500" /> by Levin
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-300 hover:text-theme-accent transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-theme-accent transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-theme-accent transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-theme-accent transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
