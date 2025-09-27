import Tag from './ui/Tag';
import { useSession } from '../store/sessionStore';

export default function UserId() {
  const session = useSession();

  return (
    <Tag color="purple" copy={session.user?.generatedId || ''}>
      {session.user?.generatedId || ''}
    </Tag>
  );
}
