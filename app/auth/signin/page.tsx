'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/');
      } else {
        setLoading(false);
      }
    };
    getUser();
  }, [router]);

  const handleSignIn = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-40 px-4">
        <p className="text-gray-600">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-40 px-4">
      <h1 className="text-2xl font-bold text-center">Вхід</h1>
      <p className="text-gray-500 text-sm text-center mt-2">
        Увійдіть через Google для продовження
      </p>

      <div className="border rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-center">
          <button 
            onClick={handleSignIn}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Увійти через Google
          </button>
        </div>
      </div>
    </div>
  );
}
