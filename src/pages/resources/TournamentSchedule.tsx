import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Trophy, MapPin, Clock, Users, Star, Award } from 'lucide-react';

const TournamentSchedule: React.FC = () => {
  const tournaments = [
    {
      id: 1,
      name: "FKF Aldai Premier League",
      type: "League",
      startDate: "2024-02-15",
      endDate: "2024-11-30",
      status: "Ongoing",
      teams: 16,
      venue: "Various Grounds",
      description: "The premier football competition in Aldai constituency featuring the top clubs."
    },
    {
      id: 2,
      name: "Aldai Youth Championship",
      type: "Youth Tournament",
      startDate: "2024-03-01",
      endDate: "2024-05-15",
      status: "Upcoming",
      teams: 12,
      venue: "Aldai Sports Complex",
      description: "Annual youth tournament for players under 18 years."
    },
    {
      id: 3,
      name: "Community Cup",
      type: "Knockout",
      startDate: "2024-06-01",
      endDate: "2024-07-15",
      status: "Upcoming",
      teams: 24,
      venue: "Multiple Venues",
      description: "Open tournament for all registered clubs in the constituency."
    },
    {
      id: 4,
      name: "Veterans League",
      type: "League",
      startDate: "2024-04-01",
      endDate: "2024-09-30",
      status: "Upcoming",
      teams: 8,
      venue: "Aldai Stadium",
      description: "Competition for players above 35 years of age."
    }
  ];

  const upcomingMatches = [
    {
      id: 1,
      homeTeam: "Aldai United FC",
      awayTeam: "Nandi Hills FC",
      date: "2024-01-28",
      time: "15:00",
      venue: "Aldai Stadium",
      competition: "FKF Aldai Premier League"
    },
    {
      id: 2,
      homeTeam: "Kaptumo FC",
      awayTeam: "Kobujoi United",
      date: "2024-01-29",
      time: "14:00",
      venue: "Kaptumo Grounds",
      competition: "FKF Aldai Premier League"
    },
    {
      id: 3,
      homeTeam: "Terik FC",
      awayTeam: "Aldai Warriors",
      date: "2024-01-30",
      time: "16:00",
      venue: "Terik Stadium",
      competition: "FKF Aldai Premier League"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Tournament Schedule</h1>
                <p className="text-qatar-burgundy mt-2">Complete schedule of all FKF Aldai competitions and matches</p>
              </div>
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              Upcoming Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map(match => (
                <div key={match.id} className="border border-qatar-cream rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <p className="text-sm text-qatar-burgundy font-medium">{match.competition}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-qatar-maroon font-semibold">{match.homeTeam}</span>
                      <span className="text-qatar-gold font-bold">VS</span>
                      <span className="text-qatar-maroon font-semibold">{match.awayTeam}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-qatar-burgundy">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-qatar-gold" />
                      {new Date(match.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-qatar-gold" />
                      {match.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-qatar-gold" />
                      {match.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tournaments */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6 flex items-center">
              <Trophy className="h-6 w-6 mr-2" />
              Active Tournaments
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tournaments.map(tournament => (
                <div key={tournament.id} className="border border-qatar-cream rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-qatar-maroon">{tournament.name}</h3>
                      <p className="text-qatar-burgundy text-sm mt-1">{tournament.type}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                      {tournament.status}
                    </span>
                  </div>
                  
                  <p className="text-qatar-burgundy mb-4">{tournament.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-qatar-gold" />
                      <div>
                        <p className="text-qatar-burgundy">Start Date</p>
                        <p className="font-medium text-qatar-maroon">{new Date(tournament.startDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-qatar-gold" />
                      <div>
                        <p className="text-qatar-burgundy">End Date</p>
                        <p className="font-medium text-qatar-maroon">{new Date(tournament.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-qatar-gold" />
                      <div>
                        <p className="text-qatar-burgundy">Teams</p>
                        <p className="font-medium text-qatar-maroon">{tournament.teams}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-qatar-gold" />
                      <div>
                        <p className="text-qatar-burgundy">Venue</p>
                        <p className="font-medium text-qatar-maroon">{tournament.venue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tournament Rules */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2" />
              Tournament Rules & Regulations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-4">General Rules</h3>
                <ul className="space-y-2 text-qatar-burgundy">
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    All players must be registered with FKF Aldai
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    Teams must arrive 30 minutes before kickoff
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    Match duration: 90 minutes (45 minutes each half)
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    Maximum 3 substitutions per team
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    Yellow and red card accumulation rules apply
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-qatar-maroon mb-4">Competition Format</h3>
                <ul className="space-y-2 text-qatar-burgundy">
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    League: Round-robin format with home and away matches
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    Knockout: Single elimination with extra time if needed
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    Points system: 3 points for win, 1 for draw, 0 for loss
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    Tiebreakers: Goal difference, then goals scored
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mr-2 mt-1 text-qatar-gold flex-shrink-0" />
                    Finals: Neutral venue for championship matches
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-qatar-gradient rounded-xl p-8 mt-8 text-white">
            <h3 className="text-xl font-bold mb-4">Tournament Information</h3>
            <p className="text-qatar-cream mb-4">
              For match schedules, results, and tournament updates, contact FKF Aldai.
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

export default TournamentSchedule;