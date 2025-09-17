import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { classes } from './styles/classes';
import DeviceInfo from 'react-native-device-info';
import { Introduction } from './components/sections/Introduction';
import { Hero } from './components/Hero';
import { checkUserExistence } from '../services/userService';

export const App = () => {
  const [userExists, setUserExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const id = await DeviceInfo.getUniqueId();
      const exists = await checkUserExistence(id);
      console.log({ exists }); // Debug log
      setUserExists(exists);
    };

    checkUser();
  }, []);

  return (
    <SafeAreaView style={[classes.container]}>
      <Hero />
      <Introduction />

      {/* {!passwordSet && <SetPassword />} */}
    </SafeAreaView>
  );
};

export default App;
