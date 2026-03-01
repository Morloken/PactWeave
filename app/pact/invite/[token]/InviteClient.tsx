'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/app/toast';

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
      <div className="max-w-sm mx-auto py-12 px-4">
        <p className="text-gray-600">Завантаження...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-sm mx-auto py-12 px-4">
        <div className="border rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center">Вхід до PactWeave</h2>
          <p className="text-gray-500 text-center mt-4">
            Увійдіть, щоб приєднатися до угоди
          </p>
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleSignIn}
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Увійти через Google
            </button>
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
    <div className="max-w-sm mx-auto py-12 px-4">
      <div className="border rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center">Запрошення до угоди</h2>
        
        <div className="mt-6 space-y-4">
          <div className="border rounded-lg p-4">
            <p className="font-medium text-lg">{pact.title}</p>
            <p className="text-gray-500 text-sm mt-1">
              Ініціатор: {pact.initiator?.name || 'Невідомо'}
            </p>
          </div>

          <p className="text-gray-500 text-center">
            Ви були запрошені приєднатися до цієї угоди. Після приєднання ви зможете її підписати.
          </p>

          <button 
            onClick={handleJoin}
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? 'Завантаження...' : 'Приєднатися до угоди'}
          </button>
        </div>
      </div>
    </div>
  );
}
