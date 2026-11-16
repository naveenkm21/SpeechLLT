import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

function getConfiguredApiKey(): string | null {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key || key === "MY_GEMINI_API_KEY") {
    return null;
  }
  return key;
}

interface TranslateRequestBody {
  text?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/translation-status", (_req: Request, res: Response) => {
    const apiKey = getConfiguredApiKey();
    res.json({
      liveApiConfigured: Boolean(apiKey),
    });
  });

  app.post("/api/translate", async (req: Request, res: Response) => {
    const body = (req.body || {}) as TranslateRequestBody;
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const sourceLanguage =
      typeof body.sourceLanguage === "string" ? body.sourceLanguage : "English";
    const targetLanguage =
      typeof body.targetLanguage === "string" ? body.targetLanguage : "French";

    if (!text) {
      res.status(400).json({ error: "Input text is required." });
      return;
    }

    if (text.length > 500) {
      res
        .status(400)
        .json({ error: "Input text must be 500 characters or fewer." });
      return;
    }

    const apiKey = getConfiguredApiKey();
    if (!apiKey) {
      res.json({
        mode: "simulated",
        liveApiConfigured: false,
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Also provide conceptual subword-like tokens for both the source and target sentences, the detected source language name, and a concise 1-sentence linguistic note about grammar or word-order shifts.\n\nText: "${text}"`;

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          systemInstruction:
            "You are a precise computational linguistics engine demonstrating neural machine translation. Return accurate translations and realistic subword tokens.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              translatedText: {
                type: Type.STRING,
                description: "The translated sentence in the target language.",
              },
              detectedLanguage: {
                type: Type.STRING,
                description: "Detected source language name.",
              },
              sourceTokens: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Subword or word tokens of the source sentence.",
              },
              targetTokens: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Subword or word tokens of the target translation.",
              },
              linguisticNote: {
                type: Type.STRING,
                description:
                  "A concise 1-sentence academic note on syntax, morphology, or word alignment.",
              },
            },
            required: [
              "translatedText",
              "detectedLanguage",
              "sourceTokens",
              "targetTokens",
              "linguisticNote",
            ],
          },
        },
      });

      const rawJson = (response.text ?? "{}").trim();
      const parsed = JSON.parse(rawJson);

      res.json({
        mode: "live",
        liveApiConfigured: true,
        ...parsed,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Translation request failed.";
      res.status(502).json({
        mode: "error",
        liveApiConfigured: true,
        error: message,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
