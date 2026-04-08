'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/app/toast';
import { Handshake, Shield, Users, UserPlus, Loader2, Sparkles } from 'lucide-react';

interface Props {
  pact: {
    _id: string;
    title: string;
    status: string;
    initiator: { name: string | null; image: string | null } | null;
  };
  token: string;
}

export default function InviteClient({ pact, token }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setUser(null);
        setUserLoading(false);
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setUserLoading(false);
    };
    getUser();
  });

  const handleSignIn = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/pact/invite/${token}`,
      },
    });
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-violet-500/20 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-violet-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
          <Shield className="absolute inset-0 m-auto w-6 h-6 text-violet-400 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/40 mx-auto">
                <Handshake className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">PactWeave</h1>
            <p className="text-slate-400 text-lg">Вас запрошують до угоди</p>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-violet-500/30 p-8 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative text-center">
              <h2 className="text-xl font-bold text-white mb-2">Вхід до системи</h2>
              <p className="text-slate-400 text-sm mb-6">
                Увійдіть, щоб приєднатися до угоди
              </p>

              <button 
                onClick={handleSignIn}
                className="relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Увійти через Google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleJoin = async () => {
    setLoading(true);
    try {
      const { joinPact } = await import('@/lib/actions/pact');
      await joinPact(pact._id);
      showToast('Ви приєдналися до угоди');
      router.push(`/pacts/${pact._id}`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Невідома помилка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/40 mx-auto">
              <Handshake className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">PactWeave</h1>
          <p className="text-slate-400 text-lg">Запрошення до угоди</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-violet-500/30 p-8 backdrop-blur-sm shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative space-y-6">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-violet-500/20">
              <p className="font-bold text-lg text-white mb-2">{pact.title}</p>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Users className="w-4 h-4" />
                <span>Ініціатор: {pact.initiator?.name || 'Невідомо'}</span>
              </div>
            </div>

            <p className="text-slate-400 text-center text-sm">
              Вас запрошують приєднатися до цієї угоди. Після приєднання ви зможете її підписати.
            </p>

            <button 
              onClick={handleJoin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              {loading ? 'Завантаження...' : 'Приєднатися до угоди'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
