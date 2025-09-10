import LottieView from 'lottie-react-native';
import { useRef, useEffect, useState } from 'react';

interface ConfettiProps {
  trigger: boolean;
}

export default function Confetti({ trigger }: ConfettiProps) {
  const confettiRef = useRef<LottieView>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (trigger) {
      setVisible(true);
      confettiRef.current?.play();
      timeout = setTimeout(() => setVisible(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [trigger]);

  if (!visible) return null;

  return (
    <LottieView
      source={require('../../assets/Confetti.json')}
      ref={confettiRef}
      style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%' }}
      loop={false}
    />
  );
}
