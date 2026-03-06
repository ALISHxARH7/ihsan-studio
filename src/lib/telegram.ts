const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export interface CalculatorData {
  tab: string;
  objectType: string;
  area?: string | number | null;
  services?: { name: string; price: string }[];
  total: string;
}

export interface TelegramPayload {
  name: string;
  contact: string;
  message?: string;
  calculatorData?: CalculatorData;
}

export async function sendToTelegram(payload: TelegramPayload): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram env vars not set');
    return;
  }

  const { name, contact, message, calculatorData } = payload;

  let text = '🏗 Новая заявка — IHSAN STUDIO\n\n';
  text += `👤 Имя: ${name || '—'}\n`;
  text += `📱 Контакт: ${contact || '—'}\n`;
  if (message) {
    text += `💬 Сообщение: ${message}\n`;
  }

  if (calculatorData) {
    const { tab, objectType, area, services, total } = calculatorData;
    text += '\n━━ Расчёт из калькулятора ━━\n';
    text += `📋 Тип: ${tab === 'design' ? 'Дизайн интерьера' : 'Архитектура'}\n`;
    text += `🏢 Объект: ${objectType}\n`;
    if (area) text += `📐 Площадь: ${area} м²\n`;
    if (services && services.length > 0) {
      text += '\nУслуги:\n';
      services.forEach((s) => {
        text += `  • ${s.name} — ${s.price}\n`;
      });
    }
    text += `\n💰 Стоимость: ${total} тенге\n`;
  }

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });
}
