import React, { useRef, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/classes';
import DeviceInfo from 'react-native-device-info';
import { Tag } from './ui/Tag';

export const App = () => {
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
};
export default App;
