import fs from "fs";
import path from "path";

interface Meta {
  [key: string]: any;
}

class Logger {
  private logDir: string;

  constructor() {
    this.logDir = path.join(__dirname, "logs");
    this.ensureLogDirExists();
  }

  private ensureLogDirExists(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private getCurrentLogFile(): string {
    const date = new Date().toISOString().split("T")[0];
    return path.join(this.logDir, `app-${date}.log`);
  }

  private formatMessage(level: string, message: string, meta: Meta = {}): string {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}\n`;
  }

  private log(level: string, message: string, meta: Meta = {}): void {
    const logMessage = this.formatMessage(level, message, meta);
    const logFile = this.getCurrentLogFile();

    console.log(logMessage.trim());

    fs.appendFile(logFile, logMessage, (err) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      }
    });
  }

  info(message: string, meta: Meta = {}): void {
    this.log("info", message, meta);
  }

  warn(message: string, meta: Meta = {}): void {
    this.log("warn", message, meta);
  }

  error(message: string, meta: Meta = {}): void {
    this.log("error", message, meta);
  }

  debug(message: string, meta: Meta = {}): void {
    this.log("debug", message, meta);
  }
}

export const logger = new Logger();
