'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Copy, 
  Loader2,
  UserPlus,
  FileSignature,
  XCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Users,
  ScrollText,
  Shield,
  Zap,
  Crown,
  Sword
} from 'lucide-react';
import { useToast } from '@/app/toast';

interface Props {
  pact: {
    _id: string;
    title: string;
    status: string;
    initiatorId: string;
    counterpartyId: string | null;
    customFields: Array<{
      fieldId: string;
      name: string;
      type: string;
      value: unknown;
      isRequired: boolean;
    }>;
    initiator: { name: string | null; image: string | null } | null;
    counterparty: { name: string | null; image: string | null } | null;
    createdAt: string;
    updatedAt: string;
  };
  userId: string;
}

const statusStyles: Record<string, { bg: string; text: string; label: string; icon: any }> = {
  Draft: { bg: 'bg-slate-500/15', text: 'text-slate-300', label: 'Чернетка', icon: Shield },
  Pending: { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'Очікує', icon: Clock },
  Signed: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Підписано', icon: CheckCircle },
  Disputed: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'Спір', icon: AlertCircle },
  Resolved: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Вирішено', icon: CheckCircle },
  Cancelled: { bg: 'bg-slate-500/15', text: 'text-slate-400', label: 'Скасовано', icon: XCircle },
};

function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-violet-500/20 max-w-md w-full p-5 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            {title}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-violet-500/15 rounded-lg transition-colors">
            <XCircle className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function PactDetailClient({ pact, userId }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const isInitiator = pact.initiatorId === userId;
  const isCounterparty = pact.counterpartyId === userId;
  
  const canInvite = pact.status === 'Draft' && isInitiator;
  const canJoin = pact.status === 'Pending' && !isInitiator && !pact.counterpartyId;
  const canSign = pact.status === 'Pending' && isCounterparty;
  const canCancel = pact.status === 'Draft' && isInitiator;

  const handleSendInvite = async () => {
    setLoading('invite');
    try {
      const { sendPactInvite } = await import('@/lib/actions/pact');
      const result = await sendPactInvite(pact._id);
      const link = `${window.location.origin}/pact/invite/${result.inviteToken}`;
      setInviteLink(link);
      setShowInviteDialog(true);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Помилка');
    } finally {
      setLoading(null);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    showToast('Посилання скопійовано!');
    setShowInviteDialog(false);
  };

  const handleJoin = async () => {
    setLoading('join');
    try {
      const { joinPact } = await import('@/lib/actions/pact');
      await joinPact(pact._id);
      showToast('Ви приєдналися до угоди!');
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Помилка');
    } finally {
      setLoading(null);
    }
  };

  const handleSign = async () => {
    setLoading('sign');
    try {
      const { signPact } = await import('@/lib/actions/pact');
      await signPact(pact._id);
      showToast('Угода підписана!');
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Помилка');
    } finally {
      setLoading(null);
    }
  };

  const handleCancel = async () => {
    setLoading('cancel');
    try {
      const { cancelPact } = await import('@/lib/actions/pact');
      await cancelPact(pact._id);
      showToast('Угода скасована');
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Помилка');
    } finally {
      setLoading(null);
    }
  };

  const style = statusStyles[pact.status] || statusStyles.Draft;
  const StatusIcon = style.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/pacts')}
            className="p-2 hover:bg-violet-500/15 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-violet-300" />
          </button>
          <h1 className="text-lg font-semibold text-white">{pact.title}</h1>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${style.bg} ${style.text}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {style.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-violet-500/10 p-6">
          <h2 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-400" />
            Сторони угоди
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-slate-900/40 border border-violet-500/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  Ініціатор
                </span>
                {isInitiator && <span className="text-xs bg-violet-500/15 text-violet-300 px-2 py-0.5 rounded font-medium">Ви</span>}
              </div>
              <p className="font-medium text-white">{pact.initiator?.name || 'Невідомо'}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-900/40 border border-violet-500/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400 flex items-center gap-2">
                  <Sword className="w-4 h-4 text-cyan-400" />
                  Контрагент
                </span>
                {isCounterparty && <span className="text-xs bg-violet-500/15 text-violet-300 px-2 py-0.5 rounded font-medium">Ви</span>}
              </div>
              {pact.counterparty ? (
                <p className="font-medium text-white">{pact.counterparty.name || 'Невідомо'}</p>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-slate-500 italic">Очікує приєднання</p>
                  {canInvite && (
                    <button
                      onClick={handleSendInvite}
                      disabled={loading === 'invite'}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs rounded-lg font-medium transition-all"
                    >
                      {loading === 'invite' ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserPlus className="w-3 h-3" />}
                      Запросити
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-violet-500/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/80 flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-violet-400" />
              Поля угоди
            </h2>
            <span className="text-xs text-slate-400">{pact.customFields.length} полів</span>
          </div>
          
          {pact.customFields.length === 0 ? (
            <p className="text-slate-500 italic">Полів немає</p>
          ) : (
            <div className="space-y-3">
              {pact.customFields.map((field) => (
                <div key={field.fieldId} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/40 border border-violet-500/5">
                  <div>
                    <p className="font-medium text-white flex items-center gap-2">
                      {field.name}
                      {field.isRequired && <span className="text-red-400">*</span>}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {field.value !== null && field.value !== undefined ? String(field.value) : '—'}
                    </p>
                  </div>
                  <span className="text-xs bg-violet-500/10 text-violet-300 px-3 py-1.5 rounded font-medium border border-violet-500/10">{field.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-violet-500/10 p-6">
        <h2 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-violet-400" />
          Дії
        </h2>
        
        <div className="space-y-3">
          {canInvite && (
            <button
              onClick={handleSendInvite}
              disabled={loading === 'invite'}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg font-medium transition-all shadow-md shadow-violet-500/15 text-sm"
            >
              {loading === 'invite' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              Надіслати запрошення
            </button>
          )}

          {canJoin && (
            <button
              onClick={handleJoin}
              disabled={loading === 'join'}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-lg font-medium transition-all shadow-md shadow-amber-500/15 text-sm"
            >
              {loading === 'join' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              Приєднатися до угоди
            </button>
          )}

          {canSign && (
            <button
              onClick={handleSign}
              disabled={loading === 'sign'}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-lg font-medium transition-all shadow-md shadow-emerald-500/15 text-sm"
            >
              {loading === 'sign' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSignature className="w-4 h-4" />}
              Підписати угоду
            </button>
          )}

          {pact.status === 'Signed' && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Угода підписана обома сторонами!
            </div>
          )}

          {canCancel && (
            <button
              onClick={handleCancel}
              disabled={loading === 'cancel'}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-all text-sm"
            >
              {loading === 'cancel' ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              Скасувати угоду
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-500">
        Створено: {new Date(pact.createdAt).toLocaleString('uk-UA')}
      </p>

      <Dialog open={showInviteDialog} onClose={() => setShowInviteDialog(false)} title="Запрошення">
        <div className="space-y-3">
          <p className="text-slate-300 text-sm">Скопіюйте це посилання та надішліть контрагенту:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 px-3 py-2 rounded-lg border border-violet-500/20 bg-slate-900/50 text-white text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg flex items-center gap-2 font-medium transition-all text-sm"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
