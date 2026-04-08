import { getPactByInviteToken } from '@/lib/actions/pact';
import { auth } from '@/auth';
import Link from 'next/link';
import InviteClient from './InviteClient';
import { AlertTriangle, ShieldOff, Home } from 'lucide-react';

interface Props {
  params: { token: string };
}

export default async function InvitePage({ params }: Props) {
  const session = await auth();

  let pact;
  try {
    pact = await getPactByInviteToken(params.token);
  } catch {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative w-full max-w-md">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-red-500/30 p-8 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Запрошення недійсне</h2>
              <p className="text-slate-400 mb-8">
                Це запрошення більше не дійсне або було використано.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30">
                <Home className="w-5 h-5" />
                На головну
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pact.status !== 'Pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative w-full max-w-md">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-amber-500/30 p-8 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
                <ShieldOff className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Угода недоступна</h2>
              <p className="text-slate-400 mb-2">
                Ця угода більше не приймає нових учасників
              </p>
              <p className="text-sm text-amber-400 font-medium mb-8">
                Статус: {pact.status}
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30">
                <Home className="w-5 h-5" />
                На головну
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <InviteClient pact={pact} token={params.token} />;
}
