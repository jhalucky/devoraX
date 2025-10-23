import type { NextApiRequest, NextApiResponse } from "next";

const JUDGE0_HOST = process.env.JUDGE0_HOST || "judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;

const languageMap: Record<string, number> = {
  python: 71,     // Python 3
  cpp: 54,        // C++ (GCC)
  javascript: 63, // Node.js
};

type RunRequest = {
  source_code: string;
  language: keyof typeof languageMap;
  stdin?: string;
};

type RunResponse = {
  output?: string;
  error?: string;
  details?: string;
};

interface Judge0Response {
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  status?: { description?: string };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RunResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { source_code, language, stdin }: RunRequest = req.body;

  if (!source_code || !language) {
    return res.status(400).json({ error: "Missing source_code or language" });
  }

  const language_id = languageMap[language];

  try {
    const r = await fetch(
      `https://${JUDGE0_HOST}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": JUDGE0_HOST,
          "X-RapidAPI-Key": RAPIDAPI_KEY as string,
        },
        body: JSON.stringify({
          source_code,
          language_id,
          stdin,
        }),
      }
    );

    const json = (await r.json()) as Judge0Response;

    const output =
      json.stdout ||
      json.stderr ||
      json.compile_output ||
      json.message ||
      json.status?.description ||
      "No output";

    return res.status(200).json({ output });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("run error:", err);
    return res.status(500).json({ error: "Error executing code", details: message });
  }
}
