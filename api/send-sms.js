export default async function handler(req, res) {
  // Allow the GitHub Pages frontend. For stricter security, replace * with your exact GitHub Pages origin.
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { number, message } = req.body || {};
  if (!/^09\d{9}$/.test(String(number || "")) || !String(message || "").trim()) {
    return res.status(400).json({ error: "Invalid Philippine mobile number or empty message." });
  }

  const apiKey = process.env.SEMAPHORE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "SEMAPHORE_API_KEY is not configured." });

  const form = new URLSearchParams();
  form.set("apikey", apiKey);
  form.set("number", number);
  form.set("message", message);
  if (process.env.SEMAPHORE_SENDER_NAME) form.set("sendername", process.env.SEMAPHORE_SENDER_NAME);

  try {
    const response = await fetch("https://api.semaphore.co/api/v4/messages", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString()
    });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { response: text }; }
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: "Could not connect to Semaphore." });
  }
}
