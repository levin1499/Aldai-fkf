import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, UserPlus, FileText, CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react';

const PlayerRegistration: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-qatar-cream to-qatar-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Player Registration Guide</h1>
                <p className="text-qatar-burgundy mt-2">Complete guide for registering players with FKF Aldai</p>
              </div>
            </div>
          </div>

          {/* Registration Process */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
                <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Registration Process</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-qatar-maroon font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Document Preparation</h3>
                      <p className="text-qatar-burgundy mb-3">Gather all required documents before starting the registration process:</p>
                      <ul className="list-disc list-inside text-qatar-burgundy space-y-1">
                        <li>Birth certificate or national ID</li>
                        <li>Passport-size photograph</li>
                        <li>Medical certificate (not older than 6 months)</li>
                        <li>Parent/guardian consent (for players under 18)</li>
                        <li>Previous club clearance (if applicable)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-qatar-maroon font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Club Selection</h3>
                      <p className="text-qatar-burgundy mb-3">Choose a registered club within Aldai constituency:</p>
                      <ul className="list-disc list-inside text-qatar-burgundy space-y-1">
                        <li>Contact the club secretary or manager</li>
                        <li>Attend club trials if required</li>
                        <li>Obtain club recommendation letter</li>
                        <li>Pay club registration fees</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-qatar-maroon font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-qatar-maroon mb-2">FKF Registration</h3>
                      <p className="text-qatar-burgundy mb-3">Submit application to FKF Aldai branch:</p>
                      <ul className="list-disc list-inside text-qatar-burgundy space-y-1">
                        <li>Complete registration form</li>
                        <li>Submit all required documents</li>
                        <li>Pay FKF registration fees</li>
                        <li>Attend verification interview if required</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-qatar-maroon font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Verification & Approval</h3>
                      <p className="text-qatar-burgundy mb-3">Wait for document verification and approval:</p>
                      <ul className="list-disc list-inside text-qatar-burgundy space-y-1">
                        <li>Document verification (3-5 working days)</li>
                        <li>Background checks if necessary</li>
                        <li>League ID assignment</li>
                        <li>Player card issuance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-qatar-cream">
                <h3 className="text-lg font-bold text-qatar-maroon mb-4">Quick Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-qatar-gold mr-3" />
                    <div>
                      <p className="text-sm font-medium text-qatar-maroon">Processing Time</p>
                      <p className="text-sm text-qatar-burgundy">5-7 working days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-qatar-gold mr-3" />
                    <div>
                      <p className="text-sm font-medium text-qatar-maroon">Registration Fee</p>
                      <p className="text-sm text-qatar-burgundy">KSh 500</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-qatar-gold mr-3" />
                    <div>
                      <p className="text-sm font-medium text-qatar-maroon">Validity Period</p>
                      <p className="text-sm text-qatar-burgundy">1 Year</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-qatar-gradient rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                <p className="text-qatar-cream mb-4">Contact FKF Aldai for assistance with player registration.</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span><br />
                    footballkenya.aldai@gmail.com
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span><br />
                    +254 798 079 720
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream mb-8">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Eligibility Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-3">General Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Must be a Kenyan citizen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Age between 16-35 years</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Medically fit to play football</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Not banned by any football authority</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-3">Additional Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Must be affiliated with a registered club</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Cannot be registered with multiple clubs</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Must renew registration annually</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Subject to disciplinary regulations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRegistration;