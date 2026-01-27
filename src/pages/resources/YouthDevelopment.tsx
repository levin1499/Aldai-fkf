import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Users, Star, Trophy, Heart, Target, BookOpen, Award, Zap } from 'lucide-react';

const YouthDevelopment: React.FC = () => {
  const ageGroups = [
    {
      name: "Little Kickers",
      ageRange: "6-8 years",
      focus: "Fun, basic motor skills, introduction to football",
      sessions: "2 per week",
      duration: "45 minutes",
      icon: Heart,
      color: "bg-pink-100 text-pink-800"
    },
    {
      name: "Young Stars",
      ageRange: "9-12 years",
      focus: "Basic techniques, teamwork, fair play",
      sessions: "3 per week",
      duration: "60 minutes",
      icon: Star,
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      name: "Rising Talents",
      ageRange: "13-16 years",
      focus: "Advanced skills, tactics, competition",
      sessions: "4 per week",
      duration: "90 minutes",
      icon: Trophy,
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Elite Academy",
      ageRange: "17-19 years",
      focus: "Professional preparation, leadership",
      sessions: "5 per week",
      duration: "120 minutes",
      icon: Award,
      color: "bg-green-100 text-green-800"
    }
  ];

  const developmentPillars = [
    {
      title: "Technical Development",
      description: "Building fundamental football skills",
      icon: Target,
      skills: [
        "Ball control and first touch",
        "Passing accuracy and vision",
        "Shooting technique",
        "Dribbling and 1v1 skills",
        "Defensive positioning"
      ]
    },
    {
      title: "Physical Development",
      description: "Age-appropriate fitness and conditioning",
      icon: Zap,
      skills: [
        "Coordination and balance",
        "Speed and agility",
        "Strength building",
        "Endurance development",
        "Injury prevention"
      ]
    },
    {
      title: "Mental Development",
      description: "Building character and football intelligence",
      icon: BookOpen,
      skills: [
        "Decision making",
        "Concentration and focus",
        "Confidence building",
        "Pressure handling",
        "Game understanding"
      ]
    },
    {
      title: "Social Development",
      description: "Teamwork and life skills",
      icon: Users,
      skills: [
        "Communication skills",
        "Leadership qualities",
        "Respect and discipline",
        "Cultural awareness",
        "Community engagement"
      ]
    }
  ];

  const programs = [
    {
      name: "School Outreach Program",
      description: "Bringing football training to local schools",
      participants: "500+ students",
      schools: "15 primary schools",
      frequency: "Weekly visits"
    },
    {
      name: "Holiday Camps",
      description: "Intensive training during school holidays",
      participants: "200+ youth",
      duration: "2 weeks",
      frequency: "3 times per year"
    },
    {
      name: "Talent Identification",
      description: "Scouting and developing exceptional talent",
      participants: "50+ selected players",
      focus: "Elite pathway",
      frequency: "Ongoing assessment"
    },
    {
      name: "Girls Football Initiative",
      description: "Promoting female participation in football",
      participants: "150+ girls",
      teams: "8 girls teams",
      frequency: "Regular training"
    }
  ];

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
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Youth Development</h1>
                <p className="text-qatar-burgundy mt-2">Nurturing the next generation of football talent in Aldai</p>
              </div>
            </div>
          </div>

          {/* Age Groups */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Age Group Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ageGroups.map((group, index) => {
                const IconComponent = group.icon;
                return (
                  <div key={index} className="border border-qatar-cream rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-qatar-lightGold rounded-full flex items-center justify-center mr-4">
                          <IconComponent className="h-6 w-6 text-qatar-maroon" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-qatar-maroon">{group.name}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${group.color}`}>
                            {group.ageRange}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-qatar-burgundy mb-4">{group.focus}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-qatar-burgundy">Sessions per week</p>
                        <p className="font-medium text-qatar-maroon">{group.sessions}</p>
                      </div>
                      <div>
                        <p className="text-qatar-burgundy">Session duration</p>
                        <p className="font-medium text-qatar-maroon">{group.duration}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Development Pillars */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Four Pillars of Development</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {developmentPillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={index} className="border border-qatar-cream rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 bg-qatar-gold rounded-full flex items-center justify-center mr-3">
                        <IconComponent className="h-5 w-5 text-qatar-maroon" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-qatar-maroon">{pillar.title}</h3>
                        <p className="text-sm text-qatar-burgundy">{pillar.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {pillar.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-center text-qatar-burgundy">
                          <Star className="h-4 w-4 text-qatar-gold mr-2 flex-shrink-0" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Youth Programs */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Youth Programs & Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program, index) => (
                <div key={index} className="bg-qatar-lightGold rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-qatar-maroon mb-2">{program.name}</h3>
                  <p className="text-qatar-burgundy mb-4">{program.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-qatar-burgundy">Participants:</span>
                      <span className="font-medium text-qatar-maroon">{program.participants}</span>
                    </div>
                    {program.schools && (
                      <div className="flex justify-between">
                        <span className="text-qatar-burgundy">Schools:</span>
                        <span className="font-medium text-qatar-maroon">{program.schools}</span>
                      </div>
                    )}
                    {program.teams && (
                      <div className="flex justify-between">
                        <span className="text-qatar-burgundy">Teams:</span>
                        <span className="font-medium text-qatar-maroon">{program.teams}</span>
                      </div>
                    )}
                    {program.duration && (
                      <div className="flex justify-between">
                        <span className="text-qatar-burgundy">Duration:</span>
                        <span className="font-medium text-qatar-maroon">{program.duration}</span>
                      </div>
                    )}
                    {program.focus && (
                      <div className="flex justify-between">
                        <span className="text-qatar-burgundy">Focus:</span>
                        <span className="font-medium text-qatar-maroon">{program.focus}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-qatar-burgundy">Frequency:</span>
                      <span className="font-medium text-qatar-maroon">{program.frequency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-qatar-lightGold rounded-lg">
                <Trophy className="h-12 w-12 text-qatar-maroon mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-qatar-maroon">25+</h3>
                <p className="text-qatar-burgundy">Players promoted to senior teams</p>
              </div>
              <div className="text-center p-6 bg-qatar-lightGold rounded-lg">
                <Award className="h-12 w-12 text-qatar-maroon mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-qatar-maroon">5</h3>
                <p className="text-qatar-burgundy">County team selections</p>
              </div>
              <div className="text-center p-6 bg-qatar-lightGold rounded-lg">
                <Star className="h-12 w-12 text-qatar-maroon mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-qatar-maroon">3</h3>
                <p className="text-qatar-burgundy">National youth team call-ups</p>
              </div>
            </div>
          </div>

          {/* How to Join */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
              <h3 className="text-xl font-bold text-qatar-maroon mb-4">How to Join Youth Programs</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-qatar-gold rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-qatar-maroon font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-qatar-maroon">Registration</h4>
                    <p className="text-qatar-burgundy text-sm">Complete registration form with parent/guardian consent</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-qatar-gold rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-qatar-maroon font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-qatar-maroon">Assessment</h4>
                    <p className="text-qatar-burgundy text-sm">Attend skill assessment to determine appropriate age group</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-qatar-gold rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-qatar-maroon font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-qatar-maroon">Medical Clearance</h4>
                    <p className="text-qatar-burgundy text-sm">Provide medical certificate confirming fitness to play</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-qatar-gold rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-qatar-maroon font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-qatar-maroon">Begin Training</h4>
                    <p className="text-qatar-burgundy text-sm">Start attending regular training sessions and development programs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-qatar-gradient rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Youth Development Contact</h3>
              <p className="text-qatar-cream mb-6">
                Join our youth development programs and help your child reach their football potential.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Youth Coordinator:</span><br />
                    FKF Aldai Youth Department
                  </p>
                </div>
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
                <div className="pt-4 border-t border-qatar-gold/30">
                  <p className="text-sm text-qatar-cream">
                    <span className="font-medium">Program Fees:</span><br />
                    Little Kickers: KSh 800/month<br />
                    Young Stars: KSh 1,000/month<br />
                    Rising Talents: KSh 1,200/month<br />
                    Elite Academy: KSh 1,500/month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthDevelopment;