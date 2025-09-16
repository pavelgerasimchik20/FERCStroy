import { useState } from "react";
import Welcome from "./pages/Welcome";
import SendForm from "./pages/SendForm";

export default function App() {
  const [step, setStep] = useState<"welcome" | "form">("welcome");
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {step === "welcome" ? (
        <Welcome onNext={() => setStep("form")} />
      ) : (
        <SendForm onBack={() => setStep("welcome")} />
      )}
    </div>
  );
}
