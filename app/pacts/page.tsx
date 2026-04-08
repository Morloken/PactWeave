import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/auth';
import { getMyPacts } from '@/lib/actions/pact';
import { FileText, Clock, CheckCircle, Sparkles, Shield, Zap } from 'lucide-react';

const statusStyles: Record<string, { bg: string; text: string; label: string; icon: any }> = {
  Draft: { bg: 'bg-slate-500/15', text: 'text-slate-300', label: 'Чернетка', icon: Shield },
  Pending: { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'Очікує', icon: Clock },
  Signed: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Підписано', icon: CheckCircle },
  Disputed: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'Спір', icon: Shield },
  Resolved: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Вирішено', icon: CheckCircle },
  Cancelled: { bg: 'bg-slate-500/15', text: 'text-slate-400', label: 'Скасовано', icon: Shield },
};

export default async function PactsPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/auth/signin');
  }

  const pacts = await getMyPacts();

  const total = pacts.length;
  const pending = pacts.filter(p => p.status === 'Pending').length;
  const signed = pacts.filter(p => p.status === 'Signed').length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600/15 to-indigo-600/15 border border-violet-500/15 p-6 hover:border-violet-500/30 transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-violet-300/70 font-medium">Всього угод</p>
              <p className="text-2xl font-bold text-white tracking-tight">{total}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-600/15 to-orange-600/15 border border-amber-500/15 p-6 hover:border-amber-500/30 transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-amber-300/70 font-medium">Очікують підпису</p>
              <p className="text-2xl font-bold text-white tracking-tight">{pending}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600/15 to-teal-600/15 border border-emerald-500/15 p-6 hover:border-emerald-500/30 transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-emerald-300/70 font-medium">Завершені</p>
              <p className="text-2xl font-bold text-white tracking-tight">{signed}</p>
            </div>
          </div>
        </div>
      </div>

      {pacts.length === 0 ? (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-violet-500/10 p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent"></div>
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/15 to-indigo-500/15 flex items-center justify-center mx-auto mb-5 border border-violet-500/15">
              <FileText className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Угод поки немає</h3>
            <p className="text-slate-400 text-sm mb-6">Створіть свою першу угоду та почніть грати за правилами</p>
            <Link
              href="/pacts/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all shadow-md shadow-violet-500/20 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Створити угоду
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white/90">Ваші угоди</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {pacts.map((pact) => {
              const style = statusStyles[pact.status] || statusStyles.Draft;
              const StatusIcon = style.icon;
              return (
                <Link
                  key={pact._id}
                  href={`/pacts/${pact._id}`}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-violet-500/10 p-6 hover:border-violet-500/25 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/3 to-indigo-600/3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${style.bg} ${style.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {style.label}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500/40 group-hover:bg-violet-400 transition-colors"></div>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors line-clamp-1 text-sm">
                      {pact.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(pact.createdAt).toLocaleDateString('uk-UA')}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
