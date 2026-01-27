import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Search, User, Calendar, MapPin, Shield, AlertCircle, Trophy } from 'lucide-react';
import { searchPlayers } from '../../services/api';
import { Player } from '../../models/types';

const PlayerVerification: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchResult(null);

    try {
      const results = await searchPlayers(searchQuery);
      if (results.length > 0) {
        // Find exact match by league ID or name
        const exactMatch = results.find(player => 
          player.leagueId.toLowerCase() === searchQuery.toLowerCase() ||
          player.name.toLowerCase() === searchQuery.toLowerCase()
        );
        setSearchResult(exactMatch || results[0]);
      } else {
        setSearchResult(null);
      }
    } catch (err) {
      console.error('Error searching player:', err);
      setError('Failed to search for player. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-qatar-cream to-qatar-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              to="/search"
              className="inline-flex items-center text-qatar-maroon hover:text-qatar-darkMaroon transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Search
            </Link>
          </div>

          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-gold">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-qatar-gradient rounded-full flex items-center justify-center mr-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Player Verification</h1>
                <p className="text-qatar-burgundy mt-2">Verify player registration and status with FKF Aldai</p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Verify Player Status</h2>
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-qatar-sand" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-qatar-cream rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold text-lg"
                    placeholder="Enter player name or league ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !searchQuery.trim()}
                  className="px-6 py-3 bg-qatar-gradient text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-qatar-gold disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
                >
                  {isLoading ? 'Searching...' : 'Verify Player'}
                </button>
              </div>
            </form>

            <div className="bg-qatar-lightGold rounded-lg p-4">
              <h3 className="text-lg font-semibold text-qatar-maroon mb-2">How to Use Player Verification</h3>
              <ul className="text-qatar-burgundy text-sm space-y-1">
                <li>• Enter the player's full name or league ID in the search box</li>
                <li>• Click "Verify Player" to check their registration status</li>
                <li>• View player details including verification status and club affiliation</li>
                <li>• Only active and verified players will show complete information</li>
              </ul>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Search Results */}
          {hasSearched && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-qatar-cream">
              <div className="px-6 py-4 border-b border-qatar-cream bg-qatar-lightGold">
                <h2 className="text-lg font-semibold text-qatar-maroon">
                  Verification Results
                </h2>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-qatar-gold"></div>
                </div>
              ) : searchResult ? (
                <div className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="h-24 w-24 flex-shrink-0">
                      <img 
                        className="h-24 w-24 rounded-full object-cover border-4 border-qatar-cream" 
                        src={searchResult.photoUrl} 
                        alt={searchResult.name}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-qatar-maroon">{searchResult.name}</h3>
                        <div className="flex items-center space-x-2">
                          {searchResult.verified ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-qatar-lightGold text-qatar-maroon border border-qatar-gold">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Pending Verification
                            </span>
                          )}
                          {searchResult.status === 'active' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-qatar-gold mr-3" />
                          <div>
                            <p className="text-sm text-qatar-burgundy">League ID</p>
                            <p className="font-medium text-qatar-maroon">{searchResult.leagueId}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 text-qatar-gold mr-3" />
                          <div>
                            <p className="text-sm text-qatar-burgundy">Position</p>
                            <p className="font-medium text-qatar-maroon">{searchResult.position}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-qatar-gold mr-3" />
                          <div>
                            <p className="text-sm text-qatar-burgundy">Date of Birth</p>
                            <p className="font-medium text-qatar-maroon">
                              {formatDate(searchResult.dateOfBirth)} ({calculateAge(searchResult.dateOfBirth)} years)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-qatar-gold mr-3" />
                          <div>
                            <p className="text-sm text-qatar-burgundy">Club</p>
                            <p className="font-medium text-qatar-maroon">Club Information Available</p>
                          </div>
                        </div>
                      </div>

                      {searchResult.verified && searchResult.status === 'active' ? (
                        <div className="bg-qatar-lightGold border border-qatar-gold rounded-lg p-4">
                          <div className="flex items-center">
                            <Shield className="h-6 w-6 text-qatar-maroon mr-3" />
                            <div>
                              <h4 className="text-lg font-semibold text-qatar-maroon">Player Verified ✓</h4>
                              <p className="text-qatar-burgundy text-sm">
                                This player is officially registered and verified with FKF Aldai.
                                They are eligible to participate in all sanctioned competitions.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <AlertCircle className="h-6 w-6 text-yellow-600 mr-3" />
                            <div>
                              <h4 className="text-lg font-semibold text-yellow-800">Verification Pending</h4>
                              <p className="text-yellow-700 text-sm">
                                This player's registration is pending verification or they may be inactive. 
                                Please contact FKF Aldai for more information.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <User className="h-16 w-16 text-qatar-sand mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-qatar-maroon mb-1">No Player Found</h3>
                  <p className="text-qatar-burgundy">
                    No player found with the name or league ID "{searchQuery}". 
                    Please check the spelling and try again.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Information Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">About Player Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-4">Why Verify Players?</h3>
                <ul className="space-y-2 text-qatar-burgundy">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-qatar-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ensure player eligibility for competitions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-qatar-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>Verify age and registration status</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-qatar-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>Confirm club affiliation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-qatar-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>Maintain fair play standards</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-4">Verification Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-qatar-lightGold text-qatar-maroon border border-qatar-gold mr-3">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </span>
                    <span className="text-qatar-burgundy text-sm">Player is fully registered and verified</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mr-3">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Pending
                    </span>
                    <span className="text-qatar-burgundy text-sm">Registration is under review</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                      Active
                    </span>
                    <span className="text-qatar-burgundy text-sm">Player is currently active</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mr-3">
                      Inactive
                    </span>
                    <span className="text-qatar-burgundy text-sm">Player is currently inactive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-qatar-gradient rounded-xl p-8 mt-8 text-white text-center">
            <h3 className="text-xl font-bold mb-4">Need Help with Verification?</h3>
            <p className="text-qatar-cream mb-6">
              If you have questions about player verification or need assistance with registration, 
              please contact FKF Aldai.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm">
                  <span className="font-medium">Email:</span><br />
                  footballkenya.aldai@gmail.com
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span><br />
                  0798079720
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerVerification;