import AuthGuard from './components/AuthGuard';
import Home from './components/Home';

export default function App() {
  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  );
}
