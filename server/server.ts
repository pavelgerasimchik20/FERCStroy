import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./db";
import { logger } from "./logger";
import * as sqlite3 from "sqlite3";

interface MessagePayload {
  name: string;
  phone: string;
  message: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const app = express();
app.use(cors());
app.use(express.json());

function validatePayload(payload: MessagePayload): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!payload.name || payload.name.trim().length < 2)
    errors.name = "Имя минимум 2 символа";

  if (!payload.message || payload.message.trim().length < 2)
    errors.message = "Сообщение минимум 2 символа";

  const phoneStr = String(payload.phone || "").replace(/\s+/g, "");
  if (!/^(\+375|80)\d{9}$/.test(phoneStr)) {
    errors.phone = "Телефон в формате +375XXXXXXXXX или 80XXXXXXXXX";
  }

  return errors;
}

app.post("/api/messages", (req: Request, res: Response) => {
  const payload: MessagePayload = req.body;

  logger.info("Incoming message submission attempt", {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    payload: {
      name: payload.name,
      phone: payload.phone,
      message: payload.message?.substring(0, 50) + "...",
    },
  });

  const errors = validatePayload(payload);
  if (Object.keys(errors).length) {
    logger.warn("Validation failed", { errors, payload });
    return res.status(400).json({ errors });
  }

  const stmt = db.prepare(
    "INSERT INTO messages (name, phone, message) VALUES (?, ?, ?)"
  );
  stmt.run(
    payload.name.trim(),
    payload.phone.trim(),
    payload.message.trim(),
    function (this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        logger.error("Database error", { error: err.message });
        return res.status(500).json({ error: "DB error" });
      }

      logger.info("Message saved successfully", { messageId: this.lastID });
      res.status(201).json({ id: this.lastID });
    }
  );

  stmt.finalize();
});

const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`Server started on port ${port}`));
