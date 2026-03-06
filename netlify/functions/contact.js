const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: 'Bad Request' };
  }

  const { name, contact, message, calculatorData } = data;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // Build message
  let text = `🏗 <b>Новая заявка — IHSAN STUDIO</b>\n\n`;
  text += `👤 <b>Имя:</b> ${name || '—'}\n`;
  text += `📱 <b>Контакт:</b> ${contact || '—'}\n`;
  if (message) {
    text += `💬 <b>Сообщение:</b> ${message}\n`;
  }

  if (calculatorData) {
    const { tab, objectType, area, services, total } = calculatorData;
    text += `\n<b>━━ Расчёт из калькулятора ━━</b>\n`;
    text += `📋 <b>Тип проекта:</b> ${tab === 'design' ? 'Дизайн интерьера' : 'Архитектура'}\n`;
    text += `🏢 <b>Тип объекта:</b> ${objectType}\n`;
    if (area) text += `📐 <b>Площадь:</b> ${area} м²\n`;
    if (services && services.length > 0) {
      text += `\n<b>Выбранные услуги:</b>\n`;
      services.forEach((s) => {
        text += `  • ${s.name} — <i>${s.price}</i>\n`;
      });
    }
    text += `\n💰 <b>Предв. стоимость: ${total} ₸</b>\n`;
  }

  // Send to Telegram (even if not configured, return success to user)
  if (BOT_TOKEN && CHAT_ID) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
      });
      if (!res.ok) {
        console.error('Telegram API error:', await res.text());
      }
    } catch (err) {
      console.error('Telegram send failed:', err);
    }
  } else {
    console.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ success: true }),
  };
};
