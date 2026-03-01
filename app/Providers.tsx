'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  PlusCircle, 
  LogOut, 
  Menu,
  Handshake,
  PanelLeftClose,
  PanelLeft,
  Plus,
} from 'lucide-react';
import { ToastProvider } from './toast';

interface User {
  id: string;
  email?: string;
  user_metadata?: { full_name?: string; avatar_url?: string };
}

function UserAvatar({ user }: { user: User }) {
  const initials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.[0].toUpperCase() || '?';
  
  return (
    <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-medium shrink-0">
      {initials}
    </div>
  );
}

function Sidebar({ user, onSignOut, isCollapsed, onToggleCollapse, onMobileMenuToggle }: { 
  user: User | null; 
  onSignOut: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onMobileMenuToggle: () => void;
}) {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/pacts', label: 'Мої угоди', icon: FileText },
    { href: '/pacts/new', label: 'Створити угоду', icon: PlusCircle },
  ];
  
  return (
    <aside className={`
      hidden lg:flex flex-col h-full bg-violet-950 text-white transition-all duration-300 ease-in-out shrink-0
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      <div className="flex flex-col h-full">
        <div className={`p-4 ${isCollapsed ? 'px-2' : 'p-6'}`}>
          <div className={`flex items-center gap-3 mb-8 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
              <Handshake className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold">PactWeave</h1>
                <p className="text-xs text-violet-300">Угоди нового покоління</p>
              </div>
            )}
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/pacts' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded-lg transition-colors
                    ${isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'}
                    ${isActive 
                      ? 'bg-violet-800 text-white' 
                      : 'text-violet-200 hover:bg-violet-900 hover:text-white'}
                  `}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto p-4 border-t border-violet-800">
          {user ? (
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <UserAvatar user={user} />
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.user_metadata?.full_name || 'Користувач'}
                    </p>
                    <p className="text-xs text-violet-300 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="p-2 hover:bg-violet-800 rounded-lg transition-colors shrink-0"
                    title="Вийти"
                  >
                    <LogOut className="w-5 h-5 text-violet-300" />
                  </button>
                </>
              )}
              {isCollapsed && (
                <button
                  onClick={onSignOut}
                  className="p-2 hover:bg-violet-800 rounded-lg transition-colors"
                  title="Вийти"
                >
                  <LogOut className="w-5 h-5 text-violet-300" />
                </button>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className={`block w-full text-center py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors ${isCollapsed ? 'px-2' : ''}`}
            >
              {isCollapsed ? <LogOut className="w-5 h-5 mx-auto" /> : 'Увійти'}
            </Link>
          )}
          
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-center w-full mt-3 py-2 text-violet-300 hover:text-white hover:bg-violet-800 rounded-lg transition-colors"
            title={isCollapsed ? 'Розгорнути' : 'Згорнути'}
          >
            {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            {!isCollapsed && <span className="ml-2">Згорнути</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

function MobileSidebar({ user, onSignOut, isOpen, onClose }: {
  user: User | null;
  onSignOut: () => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/pacts', label: 'Мої угоди', icon: FileText },
    { href: '/pacts/new', label: 'Створити угоду', icon: PlusCircle },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      <aside className="fixed top-0 left-0 z-50 h-full w-64 bg-violet-950 text-white lg:hidden">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">PactWeave</h1>
              <p className="text-xs text-violet-300">Угоди нового покоління</p>
            </div>
          </div>
          
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/pacts' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-violet-800 text-white' 
                      : 'text-violet-200 hover:bg-violet-900 hover:text-white'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="border-t border-violet-800 pt-4">
            {user ? (
              <div className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.user_metadata?.full_name || 'Користувач'}
                  </p>
                  <p className="text-xs text-violet-300 truncate">{user.email}</p>
                </div>
                <button
                  onClick={onSignOut}
                  className="p-2 hover:bg-violet-800 rounded-lg transition-colors"
                  title="Вийти"
                >
                  <LogOut className="w-5 h-5 text-violet-300" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                onClick={onClose}
                className="block w-full text-center py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
              >
                Увійти
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ isCollapsed, onMobileMenuToggle }: { isCollapsed: boolean; onMobileMenuToggle: () => void }) {
  const pathname = usePathname();
  
  const getBreadcrumb = () => {
    if (pathname === '/pacts') return { label: 'Мої угоди', href: '/pacts' };
    if (pathname === '/pacts/new') return { label: 'Створити угоду', href: '/pacts/new' };
    if (pathname.startsWith('/pacts/') && pathname.split('/').length === 3) return { label: 'Деталі угоди', href: pathname };
    return { label: 'Головна', href: '/' };
  };
  
  const breadcrumb = getBreadcrumb();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-white px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/pacts" className="text-violet-600 hover:text-violet-700 font-medium">
            Угоди
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{breadcrumb.label}</span>
        </div>
      </div>
      
      <Link
        href="/pacts/new"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Створити угоду</span>
        <span className="sm:hidden">Створити</span>
      </Link>
    </header>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user as User | null);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-violet-50">
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex h-screen w-full overflow-hidden bg-violet-50">
        <MobileSidebar 
          user={user} 
          onSignOut={handleSignOut} 
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        
        <Sidebar 
          user={user} 
          onSignOut={handleSignOut} 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header 
            isCollapsed={sidebarCollapsed} 
            onMobileMenuToggle={() => setMobileMenuOpen(true)}
          />
          
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
