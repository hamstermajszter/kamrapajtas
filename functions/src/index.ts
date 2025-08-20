/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {VertexAI} from "@google-cloud/vertexai";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10, region: "us-central1" });

// Initialize Admin SDK once
initializeApp();

type PantryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  createdAt: unknown;
};

export const generateRecipes = onCall({invoker: "public"}, async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new Error("Unauthenticated request");
  }

  const db = getFirestore();
  const userDoc = await db.collection("userPantries").doc(uid).get();
  const items: PantryItem[] = userDoc.exists ? (userDoc.data()?.items ?? []) : [];

  const ingredientList = items
    .map((i) => `${i.name} — ${i.quantity} ${i.unit}`)
    .join("\n");

  const systemPrompt = [
    "Te egy magyar szakács vagy. A felhasználó kamrájában lévő hozzávalókból készíts 3 receptet.",
    "Minden recept legyen magyar nyelvű, hétköznapi alapanyagokra épüljön, és törekedjen a pazarlás minimalizálására.",
    "Formátum: kizárólag JSON tömb, 3 elem, minden elem objektum a következő kulcsokkal:",
    "title (string), ingredients (string[]), steps (string[]), estimatedTimeMinutes (number), difficulty (\"könnyű\"|\"közepes\"|\"nehéz\"), missingIngredients (string[]).",
    "A missingIngredients csak azokat tartalmazza, amelyek nincsenek a kamrában."
  ].join("\n");

  const userPrompt = [
    "Hozzávalók a kamrában:",
    ingredientList || "(üres)",
    "\nKészíts 3 különböző receptet az elérhető hozzávalók minél jobb felhasználásával.",
  ].join("\n");

  const project = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || (process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG).projectId : undefined);
  const location = "us-central1";

  const vertex = new VertexAI({project, location});
  const model = vertex.getGenerativeModel({model: "gemini-1.5-flash"});

  const response = await model.generateContent({
    contents: [
      {role: "system", parts: [{text: systemPrompt}]},
      {role: "user", parts: [{text: userPrompt}]},
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
    },
  });

  const candidate = response.response?.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text ?? "[]";

  let recipes: unknown = [];
  try {
    recipes = JSON.parse(text);
  } catch (e) {
    logger.error("Failed to parse model JSON", e);
    // Fallback: return empty list to avoid client crash
    recipes = [];
  }

  return {recipes};
});
