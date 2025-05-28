
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { BranchDashboard } from '@/components/pos/BranchDashboard';
import { EntityManagement } from '@/components/entities/EntityManagement';
import { ChartOfAccounts } from '@/components/accounts/ChartOfAccounts';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  // Simulate user role - in real app this would come from authentication
  const userRole = 'branch'; // 'head_office' | 'branch' | 'commissary'

  const renderContent = () => {
    // Branch users only see POS dashboard and limited features
    if (userRole === 'branch') {
      switch (activeSection) {
        case 'dashboard':
          return <BranchDashboard />;
        case 'chart-of-accounts':
          return <ChartOfAccounts />;
        default:
          return <BranchDashboard />;
      }
    }

    // Head office users see full system
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
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        userRole={userRole}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
