import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Target, Users, Clock, Award, Star, Zap, Heart, Brain } from 'lucide-react';

const TrainingPrograms: React.FC = () => {
  const programs = [
    {
      id: 1,
      name: "Youth Development Program",
      ageGroup: "8-16 years",
      duration: "6 months",
      schedule: "3 times per week",
      focus: "Basic skills, teamwork, discipline",
      level: "Beginner to Intermediate",
      icon: Users,
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      name: "Elite Player Training",
      ageGroup: "17-25 years",
      duration: "Ongoing",
      schedule: "5 times per week",
      focus: "Advanced tactics, fitness, competition prep",
      level: "Advanced",
      icon: Target,
      color: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      name: "Goalkeeper Specialist",
      ageGroup: "12+ years",
      duration: "4 months",
      schedule: "2 times per week",
      focus: "Shot stopping, distribution, positioning",
      level: "All levels",
      icon: Award,
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 4,
      name: "Fitness & Conditioning",
      ageGroup: "16+ years",
      duration: "3 months",
      schedule: "4 times per week",
      focus: "Strength, endurance, injury prevention",
      level: "All levels",
      icon: Zap,
      color: "bg-orange-100 text-orange-800"
    }
  ];

  const trainingComponents = [
    {
      title: "Technical Skills",
      description: "Ball control, passing, shooting, dribbling",
      icon: Target,
      items: ["First touch development", "Passing accuracy", "Shooting technique", "1v1 skills"]
    },
    {
      title: "Tactical Awareness",
      description: "Game understanding, positioning, decision making",
      icon: Brain,
      items: ["Formation play", "Set piece execution", "Defensive shape", "Attacking patterns"]
    },
    {
      title: "Physical Fitness",
      description: "Strength, speed, endurance, agility",
      icon: Heart,
      items: ["Cardiovascular training", "Strength building", "Speed development", "Flexibility work"]
    },
    {
      title: "Mental Development",
      description: "Confidence, focus, teamwork, leadership",
      icon: Star,
      items: ["Goal setting", "Pressure handling", "Team communication", "Leadership skills"]
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
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Training Programs</h1>
                <p className="text-qatar-burgundy mt-2">Comprehensive football training programs for all skill levels</p>
              </div>
            </div>
          </div>

          {/* Training Programs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {programs.map(program => {
              const IconComponent = program.icon;
              return (
                <div key={program.id} className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-qatar-lightGold rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-qatar-maroon" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-qatar-maroon">{program.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${program.color}`}>
                          {program.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-qatar-burgundy mb-4">{program.focus}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-qatar-burgundy">Age Group</p>
                      <p className="font-medium text-qatar-maroon">{program.ageGroup}</p>
                    </div>
                    <div>
                      <p className="text-qatar-burgundy">Duration</p>
                      <p className="font-medium text-qatar-maroon">{program.duration}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-qatar-burgundy">Schedule</p>
                      <p className="font-medium text-qatar-maroon">{program.schedule}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Training Components */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Training Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trainingComponents.map((component, index) => {
                const IconComponent = component.icon;
                return (
                  <div key={index} className="border border-qatar-cream rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 bg-qatar-gold rounded-full flex items-center justify-center mr-3">
                        <IconComponent className="h-5 w-5 text-qatar-maroon" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-qatar-maroon">{component.title}</h3>
                        <p className="text-sm text-qatar-burgundy">{component.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {component.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-qatar-burgundy">
                          <Star className="h-4 w-4 text-qatar-gold mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Training Schedule */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              Weekly Training Schedule
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-qatar-lightGold">
                    <th className="border border-qatar-cream p-3 text-left text-qatar-maroon font-semibold">Time</th>
                    <th className="border border-qatar-cream p-3 text-left text-qatar-maroon font-semibold">Monday</th>
                    <th className="border border-qatar-cream p-3 text-left text-qatar-maroon font-semibold">Wednesday</th>
                    <th className="border border-qatar-cream p-3 text-left text-qatar-maroon font-semibold">Friday</th>
                    <th className="border border-qatar-cream p-3 text-left text-qatar-maroon font-semibold">Saturday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-qatar-cream p-3 font-medium text-qatar-maroon">6:00 AM - 8:00 AM</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Elite Training</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Fitness & Conditioning</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Elite Training</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Match Preparation</td>
                  </tr>
                  <tr className="bg-qatar-cream/30">
                    <td className="border border-qatar-cream p-3 font-medium text-qatar-maroon">4:00 PM - 6:00 PM</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Youth Development</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Goalkeeper Training</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Youth Development</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Skills Workshop</td>
                  </tr>
                  <tr>
                    <td className="border border-qatar-cream p-3 font-medium text-qatar-maroon">6:00 PM - 8:00 PM</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Adult Training</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Tactical Sessions</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Adult Training</td>
                    <td className="border border-qatar-cream p-3 text-qatar-burgundy">Friendly Matches</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Registration Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
              <h3 className="text-xl font-bold text-qatar-maroon mb-4">How to Register</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-qatar-gold rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-qatar-maroon font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-qatar-burgundy">Contact FKF Aldai to express interest in training programs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-qatar-gold rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-qatar-maroon font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-qatar-burgundy">Complete registration form and provide required documents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-qatar-gold rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-qatar-maroon font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-qatar-burgundy">Attend assessment session to determine appropriate program level</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-qatar-gold rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-qatar-maroon font-bold text-sm">4</span>
                  </div>
                  <div>
                    <p className="text-qatar-burgundy">Pay program fees and begin training sessions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-qatar-gradient rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Training Information</h3>
              <p className="text-qatar-cream mb-6">
                Join our comprehensive training programs designed to develop football skills at all levels.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Training Venue:</span><br />
                    Aldai Sports Complex
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
                    Youth Programs: KSh 1,500/month<br />
                    Adult Programs: KSh 2,000/month<br />
                    Specialist Training: KSh 2,500/month
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

export default TrainingPrograms;