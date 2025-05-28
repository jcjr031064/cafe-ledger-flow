
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { EntityManagement } from '@/components/entities/EntityManagement';
import { ChartOfAccounts } from '@/components/accounts/ChartOfAccounts';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'entities':
        return <EntityManagement />;
      case 'chart-of-accounts':
        return <ChartOfAccounts />;
      case 'journal-entries':
        return <div className="p-8 text-center text-gray-500">Journal Entries - Coming Soon</div>;
      case 'trial-balance':
        return <div className="p-8 text-center text-gray-500">Trial Balance - Coming Soon</div>;
      case 'reports':
        return <div className="p-8 text-center text-gray-500">Financial Reports - Coming Soon</div>;
      case 'users':
        return <div className="p-8 text-center text-gray-500">User Management - Coming Soon</div>;
      case 'settings':
        return <div className="p-8 text-center text-gray-500">Settings - Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
