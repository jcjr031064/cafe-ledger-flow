
import { useState } from 'react';
import { Building2, BookOpen, Receipt, Calculator, BarChart3, Users, Settings, ChevronLeft, ChevronRight, Coffee, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole?: 'head_office' | 'branch' | 'commissary';
}

const headOfficeNavigation = [
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
  { id: 'entities', name: 'Entities', icon: Building2 },
  { id: 'chart-of-accounts', name: 'Chart of Accounts', icon: BookOpen },
  { id: 'journal-entries', name: 'Journal Entries', icon: Receipt },
  { id: 'trial-balance', name: 'Trial Balance', icon: Calculator },
  { id: 'reports', name: 'Reports', icon: BarChart3 },
  { id: 'users', name: 'Users', icon: Users },
  { id: 'settings', name: 'Settings', icon: Settings },
];

const branchNavigation = [
  { id: 'dashboard', name: 'POS Dashboard', icon: Coffee },
  { id: 'chart-of-accounts', name: 'Accounts', icon: BookOpen },
];

const commissaryNavigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Package },
  { id: 'chart-of-accounts', name: 'Chart of Accounts', icon: BookOpen },
  { id: 'journal-entries', name: 'Journal Entries', icon: Receipt },
];

export const Sidebar = ({ activeSection, onSectionChange, userRole = 'head_office' }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getNavigation = () => {
    switch (userRole) {
      case 'branch':
        return branchNavigation;
      case 'commissary':
        return commissaryNavigation;
      default:
        return headOfficeNavigation;
    }
  };

  const getTitle = () => {
    switch (userRole) {
      case 'branch':
        return { title: 'Branch POS', subtitle: 'Point of Sale' };
      case 'commissary':
        return { title: 'Commissary', subtitle: 'Supply Management' };
      default:
        return { title: 'Coffee Accounting', subtitle: 'IFRS Compliant' };
    }
  };

  const navigation = getNavigation();
  const { title, subtitle } = getTitle();

  return (
    <div className={cn(
      "text-white h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )} style={{ backgroundColor: '#373a36' }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'rgba(230, 226, 221, 0.2)' }}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-sm" style={{ color: '#e6e2dd' }}>{subtitle}</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'rgba(230, 226, 221, 0.1)',
              color: '#e6e2dd'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 129, 102, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(230, 226, 221, 0.1)'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center p-3 rounded-lg transition-colors text-left",
                    isActive ? "text-white" : "hover:text-white"
                  )}
                  style={{
                    backgroundColor: isActive ? '#d48166' : 'transparent',
                    color: isActive ? 'white' : '#e6e2dd'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(212, 129, 102, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={20} />
                  {!isCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t" style={{ borderColor: 'rgba(230, 226, 221, 0.2)' }}>
          <div className="text-sm" style={{ color: '#e6e2dd' }}>
            <p>© 2024 Coffee Chain</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      )}
    </div>
  );
};
