import Tag from '~/app/components/ui/Tag';
import { useSession } from '~/app/store/sessionStore';

export default function UserId() {
  const session = useSession();

  return (
    <Tag color="purple" copy={session.user?.generatedId || ''}>
      {session.user?.generatedId || ''}
    </Tag>
  );
}
