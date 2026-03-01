import { getUser, ensureProfile } from '@/lib/supabase/server';

export async function auth() {
  const user = await getUser();
  
  if (user) {
    await ensureProfile(user);
  }
  
  return user ? { user: { id: user.id } } : null;
}
