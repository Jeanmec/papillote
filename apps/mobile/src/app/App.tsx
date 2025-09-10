import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { classes } from './styles/classes';
import DeviceInfo from 'react-native-device-info';
import { Introduction } from './components/Introduction';
import { Hero } from './components/Hero';
import SetPasswordSection from './components/SetPasswordSection';
import { storage } from './utils/mmkv';
import ChangingColorOfLayers from './components/Confetti';

export const App = () => {
  const [uniqueId, setUniqueId] = useState<string>('');

  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  const passwordSet = storage.getBoolean('password_set') ?? false;

  storage.clearAll();

  useEffect(() => {
    const fetchId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setUniqueId(id);
    };
    fetchId();

    setShowIntro(!(storage.getBoolean('introduction_completed') ?? false));
  }, []);

  const onCompleteIntro = () => {
    storage.set('introduction_completed', true);
    setShowIntro(false);
  };

  return (
    <SafeAreaView style={[classes.container]}>
      <Hero />

      {showIntro && <Introduction onComplete={onCompleteIntro} />}

      {!showIntro && !passwordSet && <SetPasswordSection />}
    </SafeAreaView>
  );
};

export default App;
