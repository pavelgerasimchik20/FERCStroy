import React, { useState } from "react";

type Props = {
  onBack: () => void;
};

export default function SendForm({ onBack }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  function validate() {
    const errs: { [key: string]: string } = {};

    if (name.trim().length < 2) errs.name = "Имя минимум 2 символа";
    if (message.trim().length < 2) errs.message = "Сообщение минимум 2 символа";
    if (!/^(\+375|80)\d{9}$/.test(phone.trim())) {
      errs.phone = "Телефон в формате +375XXXXXXXXX или 80XXXXXXXXX";
    }

    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSuccess(null);

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors || { server: "Ошибка сервера" });
      } else {
        setSuccess("Сообщение успешно отправлено!");
        setName("");
        setPhone("");
        setMessage("");
      }
    } catch {
      setErrors({ server: "Ошибка сети" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={onBack}>Назад</button>
      <h2>Форма отправки сообщения</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>

        <div>
          <label>
            Телефон:
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+375291234567"
            />
          </label>
          {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
        </div>

        <div>
          <label>
            Сообщение:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          {errors.message && (
            <div style={{ color: "red" }}>{errors.message}</div>
          )}
        </div>

        {errors.server && <div style={{ color: "red" }}>{errors.server}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </form>
    </div>
  );
}
