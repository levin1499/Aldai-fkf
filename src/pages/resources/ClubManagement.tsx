import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home, Users, FileText, CheckCircle, AlertCircle, Clock, Shield, Trophy, Target } from 'lucide-react';

const ClubManagement: React.FC = () => {
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
                <Home className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Club Management Handbook</h1>
                <p className="text-qatar-burgundy mt-2">Complete guide for managing football clubs in FKF Aldai</p>
              </div>
            </div>
          </div>

          {/* Club Registration Process */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
                <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Club Registration Process</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-qatar-maroon font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Initial Requirements</h3>
                      <p className="text-qatar-burgundy mb-3">Prepare the following documents and requirements:</p>
                      <ul className="list-disc list-inside text-qatar-burgundy space-y-1">
                        <li>Club constitution and bylaws</li>
                        <li>List of founding members (minimum 15)</li>
                        <li>Proposed club name and logo</li>
                        <li>Training ground/facility details</li>
                        <li>Financial projections and budget</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-qatar-maroon font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Application Submission</h3>
                      <p className="text-qatar-burgundy mb-3">Submit your application to FKF Aldai:</p>
                      <ul className="list-disc list-inside text-qatar-burgundy space-y-1">
                        <li>Complete club registration form</li>
                        <li>Pay registration fees (KSh 2,000)</li>
                        <li>Submit all required documents</li>
                        <li>Attend verification meeting</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-qatar-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-qatar-maroon font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Approval & Licensing</h3>
                      <p className="text-qatar-burgundy mb-3">Upon approval, complete the licensing process:</p>
                      <ul className="list-disc list-inside text-qatar-burgundy space-y-1">
                        <li>Receive provisional club license</li>
                        <li>Register with County Sports Office</li>
                        <li>Obtain club registration certificate</li>
                        <li>Begin player recruitment</li>
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
                      <p className="text-sm text-qatar-burgundy">2-3 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-qatar-gold mr-3" />
                    <div>
                      <p className="text-sm font-medium text-qatar-maroon">Registration Fee</p>
                      <p className="text-sm text-qatar-burgundy">KSh 2,000</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-qatar-gold mr-3" />
                    <div>
                      <p className="text-sm font-medium text-qatar-maroon">License Validity</p>
                      <p className="text-sm text-qatar-burgundy">1 Year</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-qatar-gradient rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Need Assistance?</h3>
                <p className="text-qatar-cream mb-4">Contact FKF Aldai for club registration support.</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span><br />
                    footballkenya.aldai@gmail.com
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span><br />
                    0798079720
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Management Guidelines */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream mb-8">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Club Management Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Player Management
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Maintain accurate player records</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Ensure all players are properly registered</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Conduct regular medical checkups</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Provide proper training equipment</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-4 flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Competition Participation
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Register for league competitions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Follow match scheduling guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Maintain fair play standards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Submit match reports promptly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Financial Management */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream mb-8">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Financial Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-qatar-lightGold rounded-lg">
                <Target className="h-12 w-12 text-qatar-maroon mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Budget Planning</h3>
                <p className="text-qatar-burgundy text-sm">Create annual budgets covering all club expenses and revenue sources</p>
              </div>
              <div className="text-center p-6 bg-qatar-lightGold rounded-lg">
                <FileText className="h-12 w-12 text-qatar-maroon mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Record Keeping</h3>
                <p className="text-qatar-burgundy text-sm">Maintain detailed financial records and submit annual reports</p>
              </div>
              <div className="text-center p-6 bg-qatar-lightGold rounded-lg">
                <Shield className="h-12 w-12 text-qatar-maroon mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Compliance</h3>
                <p className="text-qatar-burgundy text-sm">Ensure compliance with FKF financial regulations and auditing</p>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Club Responsibilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-3">Mandatory Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Annual license renewal</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Player registration updates</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Financial audit submission</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Disciplinary compliance</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-3">Best Practices</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Community engagement programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Youth development initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Regular training sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-qatar-burgundy">Transparent governance</span>
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

export default ClubManagement;