import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  Users, 
  TrendingDown,
  BarChart3,
  Settings,
  Plane,
  LucideIcon
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockUser } from "@/lib/mock-data";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "POS Management", url: "/pos", icon: Warehouse },
  { title: "Suppliers", url: "/suppliers", icon: Users },
  { title: "Waste Tracking", url: "/waste", icon: TrendingDown },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getNavCls = (active: boolean) =>
    active 
      ? "bg-sidebar-accent text-sidebar-primary font-medium" 
      : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Plane className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-foreground">PantryPilot</h1>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase mb-2">Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavCls(isActive(item.url))}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!isCollapsed && <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase mb-3">Settings</SidebarGroupLabel>}
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className={getNavCls(isActive("/settings"))}>
                <Settings className="h-5 w-5" />
                {!isCollapsed && <span className="font-medium">Setting</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-3 pt-3 border-t">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-white text-sm font-semibold">
              {mockUser.avatar}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{mockUser.role}</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
