export default function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h1>Здравствуйте!</h1>
      <p style={{
        fontSize: ""
      }}>
        Добро пожаловать! Нажмите кнопку ниже, чтобы перейти к форме и отправить
        сообщение.
      </p>
      <button
        style={{
          marginTop: "2vh",
        }}
        onClick={onNext}
      >
        Далее
      </button>
    </div>
  );
}
