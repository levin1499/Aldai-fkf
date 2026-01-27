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
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg overflow-hidden border-2 border-theme-accent shadow-glow flex-shrink-0">
                <img
                  src="https://onbcozjaiilxvmeipqjf.supabase.co/storage/v1/object/public/club-logos//-1Niwpcf1ltBk_KrB1iMQw_64x64.png"
                  alt="FKF Aldai Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-theme-accent">FKF Aldai</h3>
                <p className="text-xs sm:text-sm text-theme-accent/70">Team Management</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm">
              Empowering football development in Aldai through comprehensive player management,
              club coordination, and community engagement.
            </p>

            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-theme-accent/20 hover:bg-theme-accent hover:text-theme-primary p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-soft hover:shadow-glow flex-shrink-0"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="bg-theme-accent/20 hover:bg-theme-accent hover:text-theme-primary p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-soft hover:shadow-glow flex-shrink-0"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="bg-theme-accent/20 hover:bg-theme-accent hover:text-theme-primary p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-soft hover:shadow-glow flex-shrink-0"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="bg-theme-accent/20 hover:bg-theme-accent hover:text-theme-primary p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-soft hover:shadow-glow flex-shrink-0"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-theme-accent border-b border-theme-accent/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <Trophy className="h-4 w-4 mr-2 group-hover:text-theme-accent flex-shrink-0" />
                  <span>Player Search</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/officials/login"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <Shield className="h-4 w-4 mr-2 group-hover:text-theme-accent flex-shrink-0" />
                  <span>Officials Portal</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/officials/signup"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <Users className="h-4 w-4 mr-2 group-hover:text-theme-accent flex-shrink-0" />
                  <span>Join as Official</span>
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <Heart className="h-4 w-4 mr-2 group-hover:text-theme-accent flex-shrink-0" />
                  <span>About FKF Aldai</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-theme-accent border-b border-theme-accent/30 pb-2">
              Resources
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link
                  to="/resources/club-management"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <span className="flex-1">Club Management</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/tournament-schedule"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <span className="flex-1">Tournament Schedule</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/training-programs"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <span className="flex-1">Training Programs</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/youth-development"
                  className="text-gray-300 hover:text-theme-accent transition-colors duration-300 flex items-center group"
                >
                  <span className="flex-1">Youth Development</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-theme-accent border-b border-theme-accent/30 pb-2">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-theme-accent mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="text-gray-300">
                    Aldai Constituency<br />
                    Nandi County, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-theme-accent flex-shrink-0" />
                <a
                  href="tel:0798079720"
                  className="text-gray-300 hover:text-theme-accent transition-colors text-xs sm:text-sm"
                >
                  0798079720
                </a>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-theme-accent flex-shrink-0" />
                <a
                  href="mailto:footballkenya.aldai@gmail.com"
                  className="text-gray-300 hover:text-theme-accent transition-colors text-xs sm:text-sm break-all"
                >
                  footballkenya.aldai@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-theme-accent/20 bg-theme-dark/50">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col gap-4 text-center md:text-left md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col gap-2 text-center md:text-left md:flex-row md:items-center md:space-x-6">
              <p className="text-xs sm:text-sm text-gray-300">
                © {year} FKF Aldai. All rights reserved.
              </p>
              <p className="text-xs text-gray-400">
                Developed with <Heart className="h-3 w-3 inline text-red-500" /> by Levin
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-6 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-300 hover:text-theme-accent transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-theme-accent transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-theme-accent transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
