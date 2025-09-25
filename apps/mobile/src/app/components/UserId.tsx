import Tag from './ui/Tag';
import { useAuth } from '../layouts/AuthLayout';

export default function UserId() {
  const user = useAuth();

  return (
    <Tag color="purple" copy={user?.generatedId || ''}>
      {user?.generatedId || ''}
    </Tag>
  );
}
