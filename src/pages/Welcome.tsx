export default function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h1>Здравствуйте!</h1>
      <p>
        Добро пожаловать! Нажмите кнопку ниже, чтобы перейти к форме и отправить сообщение.
      </p>
      <button onClick={onNext}>Далее</button>
    </div>
  );
}
