import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie errors
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie errors
          }
        },
      },
    }
  );
}

export async function getSession() {
  const supabase = createSupabaseServerClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Session error:', error);
    return null;
  }
  
  return session;
}

export async function getUser() {
  const supabase = createSupabaseServerClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return null;
  }
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('User error:', error);
    return null;
  }
  
  return user;
}

export async function ensureProfile(user: { id: string; email?: string; user_metadata?: Record<string, unknown> }) {
  const supabase = createSupabaseServerClient();
  
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single();
  
  if (!existing) {
    const name = user.user_metadata?.full_name as string | undefined;
    const image = user.user_metadata?.avatar_url as string | undefined;
    
    await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      name: name || null,
      image: image || null,
      email_verified: true,
    });
  }
}
