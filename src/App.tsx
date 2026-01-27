import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { LeagueOfficialAuthProvider } from './contexts/LeagueOfficialAuthContext';
import BackToTop from './components/ui/BackToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PublicSearch from './pages/public/PublicSearch';
import PlayerDetails from './pages/public/PlayerDetails';
import Dashboard from './pages/admin/Dashboard';
import PlayerManagement from './pages/admin/PlayerManagement';
import ClubManagement from './pages/admin/ClubManagement';
import AddPlayer from './pages/admin/AddPlayer';
import EditPlayer from './pages/admin/EditPlayer';
import AddClub from './pages/admin/AddClub';
import EditClub from './pages/admin/EditClub';
import AdminLogin from './pages/admin/AdminLogin';
import NewsManagement from './pages/admin/NewsManagement';
import AddNews from './pages/admin/AddNews';
import EditNews from './pages/admin/EditNews';
import AboutManagement from './pages/admin/AboutManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
import AddGalleryImage from './pages/admin/AddGalleryImage';
import EditGalleryImage from './pages/admin/EditGalleryImage';
import OfficialLogin from './pages/officials/auth/OfficialLogin';
import OfficialSignup from './pages/officials/auth/OfficialSignup';
import OfficialDashboard from './pages/officials/OfficialDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LeagueOfficialProtectedRoute from './components/auth/LeagueOfficialProtectedRoute';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Gallery from './pages/public/Gallery';
import News from './pages/public/News';
import PlayerVerification from './pages/public/PlayerVerification';
import ResourceClubManagement from './pages/resources/ClubManagement';
import TournamentSchedule from './pages/resources/TournamentSchedule';
import TrainingPrograms from './pages/resources/TrainingPrograms';
import YouthDevelopment from './pages/resources/YouthDevelopment';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <LeagueOfficialAuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-qatar-cream to-qatar-white">
            <Header />
            <main className="flex-grow w-full">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicSearch />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/news" element={<News />} />
                <Route path="/" element={<PlayerVerification />} />
                <Route path="/search" element={<PublicSearch />} />
                <Route path="/player/:id" element={<PlayerDetails />} />
                
                {/* Resource Routes */}
                <Route path="/resources/club-management" element={<ResourceClubManagement />} />
                <Route path="/resources/tournament-schedule" element={<TournamentSchedule />} />
                <Route path="/resources/training-programs" element={<TrainingPrograms />} />
                <Route path="/resources/youth-development" element={<YouthDevelopment />} />
                
                {/* Admin Auth Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Officials Auth Routes */}
                <Route path="/officials/login" element={<OfficialLogin />} />
                <Route path="/officials/signup" element={<OfficialSignup />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/players" element={
                  <ProtectedRoute>
                    <PlayerManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/clubs" element={
                  <ProtectedRoute>
                    <ClubManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/players/add" element={
                  <ProtectedRoute>
                    <AddPlayer />
                  </ProtectedRoute>
                } />
                <Route path="/admin/players/edit/:id" element={
                  <ProtectedRoute>
                    <EditPlayer />
                  </ProtectedRoute>
                } />
                <Route path="/admin/clubs/add" element={
                  <ProtectedRoute>
                    <AddClub />
                  </ProtectedRoute>
                } />
                <Route path="/admin/clubs/edit/:id" element={
                  <ProtectedRoute>
                    <EditClub />
                  </ProtectedRoute>
                } />
                <Route path="/admin/news" element={
                  <ProtectedRoute>
                    <NewsManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/news/add" element={
                  <ProtectedRoute>
                    <AddNews />
                  </ProtectedRoute>
                } />
                <Route path="/admin/news/edit/:id" element={
                  <ProtectedRoute>
                    <EditNews />
                  </ProtectedRoute>
                } />
                <Route path="/admin/about" element={
                  <ProtectedRoute>
                    <AboutManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/gallery" element={
                  <ProtectedRoute>
                    <GalleryManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/gallery/add" element={
                  <ProtectedRoute>
                    <AddGalleryImage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/gallery/edit/:id" element={
                  <ProtectedRoute>
                    <EditGalleryImage />
                  </ProtectedRoute>
                } />
                
                {/* Officials Routes */}
                <Route path="/officials/dashboard" element={
                  <LeagueOfficialProtectedRoute>
                    <OfficialDashboard />
                  </LeagueOfficialProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: '#8B1538',
                  color: '#FFFFFF',
                  border: '1px solid #FFD700',
                },
                success: {
                  style: {
                    background: '#FFD700',
                    color: '#8B1538',
                  },
                },
              }}
            />
          </div>
        </Router>
      </LeagueOfficialAuthProvider>
    </AuthProvider>
  );
}

export default App;