import { getPact } from '@/lib/actions/pact';
import { auth } from '@/auth';
import PactDetailClient from './PactDetailClient';

interface Props {
  params: { pactId: string };
}

export default async function PactDetailPage({ params }: Props) {
  const session = await auth();
  
  if (!session) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <p>Будь ласка, увійдіть для перегляду угоди</p>
      </div>
    );
  }

  const userId = (session.user as { id: string }).id;

  let pact;
  try {
    pact = await getPact(params.pactId);
  } catch {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <p>Угода не знайдена</p>
      </div>
    );
  }

  return <PactDetailClient pact={pact} userId={userId} />;
}
