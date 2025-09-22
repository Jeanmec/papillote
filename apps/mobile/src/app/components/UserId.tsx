import { useState, useEffect } from 'react';
import Tag from './ui/Tag';
import { getProfile } from 'src/services/userService';

export default function App() {
  const [generatedId, setGeneratedId] = useState<string>('');
  useEffect(() => {
    const fetchId = async () => {
      const currentUser = await getProfile();
      if (currentUser?.generatedId) {
        setGeneratedId(currentUser.generatedId);
      }
    };
    fetchId();
  }, []);

  return (
    <Tag color="purple" copy={generatedId}>
      {generatedId}
    </Tag>
  );
}
