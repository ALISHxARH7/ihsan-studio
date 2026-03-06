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
    // Netlify sometimes base64-encodes the body for UTF-8 content
    let bodyStr = event.body || '{}';
    if (event.isBase64Encoded) {
      bodyStr = Buffer.from(bodyStr, 'base64').toString('utf-8');
    }
    data = JSON.parse(bodyStr);
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: 'Bad Request' };
  }

  const { name, contact, message, calculatorData } = data;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // Build plain text message (no HTML parse_mode — avoids encoding issues with Cyrillic)
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
    if (area) text += `📐 Площадь: ${area} м2\n`;
    if (services && services.length > 0) {
      text += '\nУслуги:\n';
      services.forEach((s) => {
        text += `  • ${s.name} — ${s.price}\n`;
      });
    }
    text += `\n💰 Стоимость: ${total} тенге\n`;
  }

  // Send to Telegram
  if (BOT_TOKEN && CHAT_ID) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error('Telegram API error:', errText);
      }
    } catch (err) {
      console.error('Telegram send failed:', err.message);
    }
  } else {
    console.warn('Env vars missing: BOT_TOKEN=' + !!BOT_TOKEN + ' CHAT_ID=' + !!CHAT_ID);
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ success: true }),
  };
};
