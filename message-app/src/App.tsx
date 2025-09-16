import { useState } from "react";
import Welcome from "./pages/Welcome";
import SendForm from "./pages/SendForm";
import "./App.css";

export default function App() {
  const [step, setStep] = useState<"welcome" | "form">("welcome");
  return (
    <div className="fullscreen">
      <div className="card">
        {step === "welcome" ? (
          <Welcome onNext={() => setStep("form")} />
        ) : (
          <SendForm onBack={() => setStep("welcome")} />
        )}
      </div>
    </div>
  );
}
