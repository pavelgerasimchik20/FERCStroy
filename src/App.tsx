import Welcome from './pages/Welcome';
import SendForm from './pages/SendForm';
import { useState } from 'react';

export default function App() {
  const [step, setStep] = useState<'welcome'|'form'>('welcome');
  return (
    <div style={{ maxWidth: 720, margin: 40 }}>
      {step === 'welcome' ? <Welcome onNext={() => setStep('form')} /> : <SendForm onBack={() => setStep('welcome')} />}
    </div>
  );
}

