'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (!error) {
        router.push('/');
      } else {
        router.push('/auth/signin');
      }
    };
    handleCallback();
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Авторизація...</p>
    </div>
  );
}
