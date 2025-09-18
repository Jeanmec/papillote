import React, { useRef, useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import Tag from './ui/Tag';

export default function App() {
  const [uniqueId, setUniqueId] = useState<string>('');
  useEffect(() => {
    const fetchId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setUniqueId(id);
      console.log(id);
    };
    fetchId();
  }, []);

  return <Tag color="purple">{uniqueId}</Tag>;
}
