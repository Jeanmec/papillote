import { IntroductionLayout } from './layouts/IntroductionLayout';
import { AuthLayout } from './layouts/AuthLayout';
import Home from './components/Home';
import Toast from 'react-native-toast-message';
import toastConfig from './config/toastConfig';

export default function App() {
  return (
    <>
      <IntroductionLayout>
        <AuthLayout>
          <Home />
        </AuthLayout>
      </IntroductionLayout>
      <Toast config={toastConfig} />
    </>
  );
}
