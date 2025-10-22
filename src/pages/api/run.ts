import type { NextApiRequest, NextApiResponse } from "next";

const JUDGE0_HOST = "judge0-ce.p.rapidapi.com"; // Judge0 CE host
const RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;

const languageMap: Record<string, number> = {
  python: 71,      // Python 3
  cpp: 54,         // C++ (GCC 9.2.0)
  javascript: 63,  // Node.js 16
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { source_code, language, stdin = "" } = req.body;
  if (!source_code || !language) return res.status(400).json({ error: "Missing source_code or language" });

  const language_id = languageMap[language.toLowerCase()] || 71;

  try {
    const response = await fetch(`https://${JUDGE0_HOST}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": JUDGE0_HOST,
        "X-RapidAPI-Key": RAPIDAPI_KEY as string,
      },
      body: JSON.stringify({
        language_id,
        source_code,
        stdin,
      }),
    });

    const json = await response.json();

    const output =
      json.stdout ||
      json.stderr ||
      json.compile_output ||
      json.message ||
      json.status?.description ||
      "No output";

    return res.status(200).json({ output });
  } catch (err: any) {
    console.error("Error running code:", err);
    return res.status(500).json({ error: "Error executing code", details: err.message });
  }
}
