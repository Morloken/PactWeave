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
  Sparkles,
  X,
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
    <div className="relative">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/30">
        {initials}
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
    </div>
  );
}

function Sidebar({ user, onSignOut, isCollapsed, onToggleCollapse }: { 
  user: User | null; 
  onSignOut: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const pathname = usePathname();
  const isOnCreatePage = pathname === '/pacts/new';
  
  const navItems = user ? [
    { href: '/pacts', label: 'Мої угоди', icon: FileText },
    { 
      href: isOnCreatePage ? '/pacts' : '/pacts/new', 
      label: isOnCreatePage ? 'Вийти' : 'Створити угоду', 
      icon: isOnCreatePage ? X : PlusCircle,
      isExit: isOnCreatePage,
    },
  ] : [];
  
  return (
    <aside className={`
      hidden lg:flex flex-col h-full bg-gradient-to-b from-slate-900 via-violet-950/40 to-slate-900 text-white transition-all duration-300 ease-out shrink-0 border-r border-violet-500/10
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      <div className="flex flex-col h-full">
        <div className={`p-5 ${isCollapsed ? 'px-2' : 'p-6'}`}>
          <div className={`flex items-center gap-3 mb-10 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold tracking-tight">PactWeave</h1>
                <p className="text-xs text-violet-300/60">Угоди нового покоління</p>
              </div>
            )}
          </div>
          
          {user && (
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/pacts' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 rounded-xl transition-all duration-200 group
                      ${isCollapsed ? 'justify-center px-3 py-3.5' : 'px-4 py-3.5'}
                      ${item.isExit
                        ? 'bg-red-500/15 text-red-300 hover:bg-red-500/25 hover:text-red-200 border border-red-500/20 hover:border-red-500/40'
                        : isActive 
                          ? 'bg-gradient-to-r from-violet-600/70 to-indigo-600/70 text-white shadow-md shadow-violet-500/20' 
                          : 'text-violet-200/70 hover:bg-violet-500/15 hover:text-white'}
                    `}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-semibold text-sm">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          )}
          
          {!user && !isCollapsed && (
            <div className="p-5 rounded-xl bg-slate-800/40 border border-violet-500/10">
              <p className="text-sm text-violet-200/80 font-medium mb-2">Ласкаво просимо!</p>
              <p className="text-xs text-slate-400 mb-4">Увійдіть, щоб створювати угоди</p>
              <Link
                href="/auth/signin"
                className="block w-full text-center py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-lg transition-all"
              >
                Увійти
              </Link>
            </div>
          )}
        </div>
        
        <div className="mt-auto p-5 border-t border-violet-500/10">
          {user ? (
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <UserAvatar user={user} />
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-white">
                      {user.user_metadata?.full_name || 'Гравець'}
                    </p>
                    <p className="text-xs text-violet-300/50 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Вийти"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </>
              )}
              {isCollapsed && (
                <button
                  onClick={onSignOut}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Вийти"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                </button>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className={`block w-full text-center py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl transition-all font-semibold text-white text-sm ${isCollapsed ? 'px-2' : ''}`}
            >
              {isCollapsed ? <LogOut className="w-4 h-4 mx-auto" /> : 'Увійти'}
            </Link>
          )}
          
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-center w-full mt-3 py-2 text-violet-300/50 hover:text-white hover:bg-violet-500/10 rounded-xl transition-all text-sm"
          >
            {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
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
  const isOnCreatePage = pathname === '/pacts/new';
  
  const navItems = user ? [
    { href: '/pacts', label: 'Мої угоди', icon: FileText },
    { 
      href: isOnCreatePage ? '/pacts' : '/pacts/new', 
      label: isOnCreatePage ? 'Вийти' : 'Створити угоду', 
      icon: isOnCreatePage ? X : PlusCircle,
      isExit: isOnCreatePage,
    },
  ] : [];
 
  if (!isOpen) return null;
 
  return (
    <>
      <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      <aside className="fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-slate-900 via-violet-950/60 to-slate-900 text-white lg:hidden border-r border-violet-500/10">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">PactWeave</h1>
                <p className="text-xs text-violet-300/60">Угоди нового покоління</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-violet-500/20 rounded-lg">
              <X className="w-5 h-5" />
            </button>
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
                    flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-semibold text-sm
                    ${item.isExit
                      ? 'bg-red-500/15 text-red-300 border border-red-500/20'
                      : isActive 
                        ? 'bg-gradient-to-r from-violet-600/70 to-indigo-600/70 text-white' 
                        : 'text-violet-200/70 hover:bg-violet-500/15'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          {!user && (
            <div className="p-4 rounded-xl bg-slate-800/40 border border-violet-500/10 mb-5">
              <p className="text-sm text-violet-200/80 font-medium mb-2">Ласкаво просимо!</p>
              <p className="text-xs text-slate-400 mb-4">Увійдіть, щоб створювати угоди</p>
              <Link
                href="/auth/signin"
                onClick={onClose}
                className="block w-full text-center py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-lg"
              >
                Увійти
              </Link>
            </div>
          )}
          
          <div className="border-t border-violet-500/10 pt-5">
            {user ? (
              <div className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-white">
                    {user.user_metadata?.full_name || 'Гравець'}
                  </p>
                  <p className="text-xs text-violet-300/50 truncate">{user.email}</p>
                </div>
                <button onClick={onSignOut} className="p-2 hover:bg-red-500/20 rounded-lg">
                  <LogOut className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                onClick={onClose}
                className="block w-full text-center py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl"
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

function Header({ user }: { user: User | null }) {
  const pathname = usePathname();
  const isOnCreatePage = pathname === '/pacts/new';
  
  const getBreadcrumb = () => {
    if (pathname === '/pacts') return { label: 'Мої угоди' };
    if (pathname === '/pacts/new') return { label: 'Створити угоду' };
    if (pathname.startsWith('/pacts/') && pathname.split('/').length === 3) return { label: 'Деталі угоди' };
    return { label: 'Головна' };
  };
  
  const breadcrumb = getBreadcrumb();
  
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-violet-500/10 bg-slate-900/70 backdrop-blur-xl px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => document.dispatchEvent(new CustomEvent('toggle-mobile-menu'))}
          className="lg:hidden p-2 hover:bg-violet-500/15 rounded-lg"
        >
          <Menu className="w-5 h-5 text-violet-300" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/pacts" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Угоди
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">{breadcrumb.label}</span>
        </div>
      </div>
      
      {user && (
        isOnCreatePage ? (
          <Link
            href="/pacts"
            className="flex items-center gap-2 px-4 py-2 bg-red-500/15 hover:bg-red-500/25 text-red-300 font-medium rounded-lg transition-all text-sm border border-red-500/20"
          >
            <X className="w-4 h-4" />
            <span>Вийти</span>
          </Link>
        ) : (
          <Link
            href="/pacts/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all shadow-md shadow-violet-500/20 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Створити угоду</span>
          </Link>
        )
      )}
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
    
    const handleMobileMenu = () => setMobileMenuOpen(prev => !prev);
    document.addEventListener('toggle-mobile-menu', handleMobileMenu);
    return () => document.removeEventListener('toggle-mobile-menu', handleMobileMenu);
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
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900">
        <div className="flex items-center justify-center w-full">
          <div className="relative">
            <div className="w-14 h-14 border-4 border-violet-500/20 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-14 h-14 border-4 border-transparent border-t-violet-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
            <Sparkles className="absolute inset-0 m-auto w-5 h-5 text-violet-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex h-screen w-full overflow-hidden">
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
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header user={user} />
          
          <main className="flex-1 overflow-y-auto p-5 lg:p-8 xl:p-10 bg-gradient-to-br from-slate-900 via-violet-950/20 to-slate-900">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
