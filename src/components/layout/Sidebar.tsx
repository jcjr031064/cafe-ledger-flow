
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
      "bg-slate-900 text-white h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-sm text-slate-400">{subtitle}</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
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
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center p-3 rounded-lg transition-colors text-left",
                    activeSection === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
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
        <div className="p-4 border-t border-slate-700">
          <div className="text-sm text-slate-400">
            <p>© 2024 Coffee Chain</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      )}
    </div>
  );
};
