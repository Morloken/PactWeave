'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Loader2,
  UserPlus,
  FileSignature,
  XCircle,
  Clock,
  CheckCircle,
  AlertCircle
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
  Draft: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Чернетка', icon: AlertCircle },
  Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Очікує', icon: Clock },
  Signed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Підписано', icon: CheckCircle },
  Disputed: { bg: 'bg-red-100', text: 'text-red-800', label: 'Спір', icon: AlertCircle },
  Resolved: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Вирішено', icon: CheckCircle },
  Cancelled: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Скасовано', icon: XCircle },
};

function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XCircle className="w-5 h-5" />
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
    <div>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/pacts')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{pact.title}</h1>
            </div>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
              <StatusIcon className="w-4 h-4" />
              {style.label}
            </span>
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Сторони угоди</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Ініціатор</span>
                  {isInitiator && <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">Ви</span>}
                </div>
                <p className="font-medium">{pact.initiator?.name || 'Невідомо'}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Контрагент</span>
                  {isCounterparty && <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">Ви</span>}
                </div>
                {pact.counterparty ? (
                  <p className="font-medium">{pact.counterparty.name || 'Невідомо'}</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-400 italic">Очікує приєднання</p>
                    {canInvite && (
                      <button
                        onClick={handleSendInvite}
                        disabled={loading === 'invite'}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-lg transition-colors"
                      >
                        {loading === 'invite' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                        Запросити
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Поля угоди</h2>
              <span className="text-sm text-gray-500">{pact.customFields.length} полів</span>
            </div>
            
            {pact.customFields.length === 0 ? (
              <p className="text-gray-500">Полів немає</p>
            ) : (
              <div className="space-y-3">
                {pact.customFields.map((field) => (
                  <div key={field.fieldId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {field.name}
                        {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                      </p>
                      <p className="text-sm text-gray-500">
                        {field.value !== null && field.value !== undefined ? String(field.value) : '—'}
                      </p>
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">{field.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Дії</h2>
            
            <div className="space-y-3">
              {canInvite && (
                <button
                  onClick={handleSendInvite}
                  disabled={loading === 'invite'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
                >
                  {loading === 'invite' ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                  Надіслати запрошення
                </button>
              )}

              {canJoin && (
                <button
                  onClick={handleJoin}
                  disabled={loading === 'join'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                >
                  {loading === 'join' ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                  Приєднатися до угоди
                </button>
              )}

              {canSign && (
                <button
                  onClick={handleSign}
                  disabled={loading === 'sign'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  {loading === 'sign' ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileSignature className="w-5 h-5" />}
                  Підписати угоду
                </button>
              )}

              {pact.status === 'Signed' && (
                <div className="p-4 bg-green-50 rounded-lg text-green-800">
                  Угода підписана обома сторонами!
                </div>
              )}

              {canCancel && (
                <button
                  onClick={handleCancel}
                  disabled={loading === 'cancel'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {loading === 'cancel' ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                  Скасувати угоду
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-gray-400">
            Створено: {new Date(pact.createdAt).toLocaleString('uk-UA')}
          </p>
        </div>
      </main>

      <Dialog open={showInviteDialog} onClose={() => setShowInviteDialog(false)} title="Запрошення">
        <div className="space-y-4">
          <p className="text-gray-600">Скопіюйте це посилання та надішліть контрагенту:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
