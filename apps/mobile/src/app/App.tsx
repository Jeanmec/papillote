import { AuthGuard } from './components/AuthGuard';
import { Home } from './components/Home';

export const App = () => {
  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  );
};

export default App;
