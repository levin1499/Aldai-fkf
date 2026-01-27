import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-md mx-auto text-center py-12">
      <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/search"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ChevronLeft className="h-5 w-5 mr-2" />
        Back to Search
      </Link>
    </div>
    </div>
  );
};

export default NotFound;