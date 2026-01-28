import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './hooks/useChat.jsx';
import AppBootstrap from './components/AppBootstrap';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import NewCourtCase from './pages/dashboard/NewCourtCase';
import NewAuditRequest from './pages/dashboard/NewAuditRequest';
import NewCompanyRegistration from './pages/dashboard/NewCompanyRegistration';

// Client Pages
// Client Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardHome from './pages/DashboardHome';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';
import CheckoutPage from './pages/CheckoutPage';
import Blog from './pages/Blog';

// Public Content Pages
import OutsourcingPage from './pages/services/OutsourcingPage';
import CourtProtectionPage from './pages/services/CourtProtectionPage';
import AuditPage from './pages/services/AuditPage';
import RegistrationPage from './pages/services/RegistrationPage';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Journal from './pages/Journal';
import OfferPage from './pages/legal/OfferPage';
import PrivacyPage from './pages/legal/PrivacyPage';
import ConsentPage from './pages/legal/ConsentPage';
import RequisitesPage from './pages/legal/RequisitesPage';
import CareersPage from './pages/company/CareersPage';
import AboutPage from './pages/company/AboutPage';
import Contacts from './pages/Contacts';

// Backoffice Pages
import LawyerDashboard from './pages/backoffice/LawyerDashboard';
import LawyerChatList from './pages/backoffice/LawyerChatList';
import LawyerChatPage from './pages/backoffice/LawyerChatPage';
import LawyerClients from './pages/backoffice/LawyerClients';
import AdminDashboard from './pages/backoffice/AdminDashboard';
import AdminUsers from './pages/backoffice/AdminUsers';
import AdminLawyerVerification from './pages/backoffice/AdminLawyerVerification';
import CMSDashboard from './pages/backoffice/CMSDashboard';
import CMSNewsList from './pages/backoffice/CMSNewsList';
import CMSTariffs from './pages/backoffice/CMSTariffs';
import CMSServices from './pages/backoffice/CMSServices';
import DirectorDashboard from './pages/backoffice/DirectorDashboard';
import DirectorAnalytics from './pages/backoffice/DirectorAnalytics';
import DirectorFinance from './pages/backoffice/DirectorFinance';
import DirectorTeam from './pages/backoffice/DirectorTeam';
import LawyerDocuments from './pages/backoffice/LawyerDocuments';
import LawyerPlanner from './pages/backoffice/LawyerPlanner';
import BackofficeSettings from './pages/backoffice/BackofficeSettings';
import AdminReports from './pages/backoffice/AdminReports';
import AdminLogs from './pages/backoffice/AdminLogs';
import CMSNewsEditor from './pages/backoffice/CMSNewsEditor';
import CMSPages from './pages/backoffice/CMSPages';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import BackofficeLayout from './layouts/BackofficeLayout';
import CabinetLayout from './layouts/CabinetLayout';

import CabinetDashboard from './pages/cabinet/CabinetDashboard';
import CabinetServices from './pages/cabinet/CabinetServices';
import CabinetDocs from './pages/cabinet/CabinetDocs';
import CabinetChats from './pages/cabinet/CabinetChats';
import CabinetTariff from './pages/cabinet/CabinetTariff';
import CabinetBilling from './pages/cabinet/CabinetBilling';
import CabinetProfile from './pages/cabinet/CabinetProfile';
import CabinetSecurity from './pages/cabinet/CabinetSecurity';
import CabinetSupport from './pages/cabinet/CabinetSupport';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Placeholder component for pages not yet implemented
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-slate-200">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="text-slate-500 mt-2">Страница в разработке</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppBootstrap>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/news" element={<Blog />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/journal" element={<Journal />} />

              {/* Service Routes */}
              <Route path="/services/outsourcing" element={<OutsourcingPage />} />
              <Route path="/services/court-protection" element={<CourtProtectionPage />} />
              <Route path="/services/audit" element={<AuditPage />} />
              <Route path="/services/registration" element={<RegistrationPage />} />

              {/* Legal Routes */}
              <Route path="/offer" element={<OfferPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/consent" element={<ConsentPage />} />
              <Route path="/requisites" element={<RequisitesPage />} />

              {/* Company Routes */}
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<Contacts />} />

              {/* New Personal Cabinet */}
              <Route path="/cabinet" element={
                <ProtectedRoute>
                  <CabinetLayout />
                </ProtectedRoute>
              }>
                <Route index element={<CabinetDashboard />} />
                <Route path="services" element={<CabinetServices />} />
                <Route path="docs" element={<CabinetDocs />} />
                <Route path="chats" element={<CabinetChats />} />
                <Route path="tariff" element={<CabinetTariff />} />
                <Route path="billing" element={<CabinetBilling />} />
                <Route path="profile" element={<CabinetProfile />} />
                <Route path="security" element={<CabinetSecurity />} />
                <Route path="support" element={<CabinetSupport />} />
              </Route>


              {/* Protected Client Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="documents/audit" element={<NewAuditRequest />} />
                <Route path="court-cases/new" element={<NewCourtCase />} />
                <Route path="registration/new" element={<NewCompanyRegistration />} />
                <Route path="billing" element={<BillingPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
              </Route>

              {/* Lawyer Panel */}
              <Route
                path="/lawyer"
                element={<BackofficeLayout />}
              >
                <Route index element={<LawyerDashboard />} />
                <Route path="chats" element={<LawyerChatList />} />
                <Route path="chat/:id" element={<LawyerChatPage />} />
                <Route path="clients" element={<LawyerClients />} />
                <Route path="documents" element={<LawyerDocuments />} />
                <Route path="planner" element={<LawyerPlanner />} />
                <Route path="settings" element={<BackofficeSettings />} />
              </Route>

              {/* Admin Panel */}
              <Route
                path="/admin"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'director']}>
                    <BackofficeLayout />
                  </RoleProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="users/:id" element={<PlaceholderPage title="Профиль пользователя" />} />
                <Route path="lawyers" element={<AdminLawyerVerification />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="logs" element={<AdminLogs />} />
                <Route path="settings" element={<BackofficeSettings />} />
              </Route>

              {/* CMS Panel */}
              <Route
                path="/cms"
                element={
                  <RoleProtectedRoute allowedRoles={['content_manager', 'director']}>
                    <BackofficeLayout />
                  </RoleProtectedRoute>
                }
              >
                <Route index element={<CMSDashboard />} />
                <Route path="news" element={<CMSNewsList />} />
                <Route path="news/new" element={<CMSNewsEditor />} />
                <Route path="news/:id" element={<CMSNewsEditor />} />
                <Route path="tariffs" element={<CMSTariffs />} />
                <Route path="services" element={<CMSServices />} />
                <Route path="pages" element={<CMSPages />} />
                <Route path="settings" element={<BackofficeSettings />} />
              </Route>

              {/* Director Panel */}
              <Route
                path="/director"
                element={
                  <RoleProtectedRoute allowedRoles={['director']}>
                    <BackofficeLayout />
                  </RoleProtectedRoute>
                }
              >
                <Route index element={<DirectorDashboard />} />
                <Route path="analytics" element={<DirectorAnalytics />} />
                <Route path="finance" element={<DirectorFinance />} />
                <Route path="team" element={<DirectorTeam />} />
                <Route path="settings" element={<BackofficeSettings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppBootstrap>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
