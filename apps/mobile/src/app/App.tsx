import AuthGuard from './components/AuthGuard';
import Home from './components/Home';
import Toast from 'react-native-toast-message';
import toastConfig from './config/toastConfig';

export default function App() {
  return (
    <>
      <AuthGuard>
        <Home />
      </AuthGuard>
      <Toast config={toastConfig} />
    </>
  );
}
