import React, { useState } from 'react';

type Props = {
  onBack: () => void;
};

export default function SendForm({ onBack }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, phone, message });
    // TODO.request
  };

  return (
    <div>
      <button onClick={onBack}>Назад</button>
      <h2>Форма отправки сообщения</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              required
              minLength={2}
            />
          </label>
        </div>
        <div>
          <label>
            Телефон:
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              placeholder="+375..."
            />
          </label>
        </div>
        <div>
          <label>
            Сообщение:
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              minLength={2}
            />
          </label>
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
