import { onMessage } from "webext-bridge/background";

// Обработчик сообщений
onMessage("api-request", async ({ data }) => {
  try {
    const payload = {
      model: "gpt-3.5-turbo",
      //@ts-ignore
      messages: [{ role: "user", content: data.question }]
    };

    const response = await fetch("https://api.proxyapi.ru/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-zgSspuAkJwmukktPmMnz1Yg1oYco84kf"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const result = await response.json();
    return { result }; // Важно: возвращаем данные
  } catch (error) {
    //@ts-ignore
    return { error: error.message };
  }
});