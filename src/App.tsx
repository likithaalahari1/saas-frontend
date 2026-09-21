import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { NotificationsDrawer } from './components/layout/NotificationsDrawer';
import { OAuthConnectModal } from './components/modals/OAuthConnectModal';
import { LandingPage } from './components/landing/LandingPage';

// Workspace Views
import { DashboardOverview } from './components/views/DashboardOverview';
import { CreatePostStudio } from './components/views/CreatePostStudio';
import { ContentCalendar } from './components/views/ContentCalendar';
import { DraftsHub } from './components/views/DraftsHub';
import { PublishedHistory } from './components/views/PublishedHistory';
import { SocialAccountsPage } from './components/views/SocialAccountsPage';
import { AnalyticsSuite } from './components/views/AnalyticsSuite';
import { UnifiedInbox } from './components/views/UnifiedInbox';
import { MediaLibrary } from './components/views/MediaLibrary';
import { TeamApprovals } from './components/views/TeamApprovals';
import { SettingsPage } from './components/views/SettingsPage';

const AppContent: React.FC = () => {
  const { mode, activeView } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (mode === 'landing') {
    return <LandingPage />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview />;
      case 'create':
        return <CreatePostStudio />;
      case 'calendar':
        return <ContentCalendar />;
      case 'drafts':
        return <DraftsHub />;
      case 'published':
        return <PublishedHistory />;
      case 'social-accounts':
        return <SocialAccountsPage />;
      case 'analytics':
        return <AnalyticsSuite />;
      case 'inbox':
        return <UnifiedInbox />;
      case 'media-library':
        return <MediaLibrary />;
      case 'team-approvals':
        return <TeamApprovals />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#FFFDFE] text-zinc-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Collapsible Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-zinc-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setMobileSidebarOpen(false)}>
          <div className="w-64 h-full" onClick={(e) => e.stopPropagation()}>
            <Sidebar setMobileOpen={setMobileSidebarOpen} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <CommandPalette />
      <NotificationsDrawer />
      <OAuthConnectModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
