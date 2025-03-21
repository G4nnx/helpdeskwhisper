
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Ticket,
  BookText,
  MessageSquare,
  BarChart3,
  Clock,
  LaptopIcon,
  Menu,
  X,
  LogOut,
  UserCircle,
  User,
  Home,
  HelpCircle,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  requiredRoles?: string[];
  badge?: string;
  isActive?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  to, 
  collapsed, 
  requiredRoles = [],
  badge,
  isActive: forcedActive
}) => {
  const { hasPermission } = useAuth();
  const location = useLocation();
  
  // If roles are specified and user doesn't have permission, don't render the item
  if (requiredRoles.length > 0 && !hasPermission(requiredRoles)) {
    return null;
  }
  
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center py-2 px-3 my-1 rounded-md transition-all duration-200 group',
                collapsed ? 'justify-center' : 'justify-start',
                (isActive || forcedActive)
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )
            }
          >
            <Icon className={cn("w-5 h-5", collapsed ? 'mr-0' : 'mr-2')} />
            {!collapsed && (
              <div className="flex justify-between items-center w-full animate-slide-in-right">
                <span>{label}</span>
                {badge && (
                  <Badge variant="secondary" className="ml-2 text-xs py-0 px-1.5">
                    {badge}
                  </Badge>
                )}
              </div>
            )}
          </NavLink>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right">
            <p className="flex items-center">
              {label}
              {badge && (
                <Badge variant="secondary" className="ml-2 text-xs py-0 px-1.5">
                  {badge}
                </Badge>
              )}
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Always collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div
      className={cn(
        'h-screen flex flex-col bg-sidebar fixed z-40 transition-all duration-300 ease-in-out border-r border-sidebar-border',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center animate-slide-in-right">
            <span className="text-sidebar-foreground font-bold text-xl">HelpDesk</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex-1 py-4 px-2 overflow-y-auto">
        <div className={cn("mb-2", !collapsed && "px-3")}>
          {!collapsed && <p className="text-xs uppercase font-semibold text-sidebar-foreground/50 mb-1">Main</p>}
          <NavItem icon={Home} label="Home" to="/" collapsed={collapsed} />
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" collapsed={collapsed} />
        </div>

        {!collapsed && <div className="h-px bg-sidebar-border mx-3 my-3" />}

        <div className={cn("mb-2", !collapsed && "px-3")}>
          {!collapsed && <p className="text-xs uppercase font-semibold text-sidebar-foreground/50 mb-1">Support</p>}
          <NavItem icon={Ticket} label="Tickets" to="/tickets" collapsed={collapsed} badge="12" />
          <NavItem icon={MessageSquare} label="Chat Support" to="/chat" collapsed={collapsed} />
          <NavItem icon={BookText} label="Knowledge Base" to="/knowledge-base" collapsed={collapsed} />
        </div>

        {!collapsed && <div className="h-px bg-sidebar-border mx-3 my-3" />}

        <div className={cn("mb-2", !collapsed && "px-3")}>
          {!collapsed && <p className="text-xs uppercase font-semibold text-sidebar-foreground/50 mb-1">Management</p>}
          <NavItem icon={BarChart3} label="Reports" to="/reports" collapsed={collapsed} requiredRoles={['admin', 'support']} />
          <NavItem icon={Clock} label="SLA Management" to="/sla" collapsed={collapsed} requiredRoles={['admin', 'support']} />
          <NavItem icon={LaptopIcon} label="Asset Management" to="/assets" collapsed={collapsed} requiredRoles={['admin', 'support']} />
        </div>

        {!collapsed && <div className="h-px bg-sidebar-border mx-3 my-3" />}

        <div className={cn("mb-2", !collapsed && "px-3")}>
          {!collapsed && <p className="text-xs uppercase font-semibold text-sidebar-foreground/50 mb-1">Account</p>}
          <NavItem icon={User} label="My Profile" to="/profile" collapsed={collapsed} />
          <NavItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
          <NavItem icon={HelpCircle} label="Help & Support" to="/help" collapsed={collapsed} />
        </div>
      </div>

      {user && (
        <div className={cn(
          "mt-auto border-t border-sidebar-border p-4",
          collapsed ? "flex justify-center" : ""
        )}>
          {!collapsed ? (
            <div className="flex items-center justify-between animate-slide-in-right">
              <div className="flex items-center cursor-pointer" onClick={handleProfileClick}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                ) : (
                  <UserCircle className="w-8 h-8 mr-2" />
                )}
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/70 capitalize">{user.role}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleProfileClick}
                      className="text-sidebar-foreground hover:bg-sidebar-accent/50"
                    >
                      <User className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={logout}
                      className="text-sidebar-foreground hover:bg-sidebar-accent/50"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
