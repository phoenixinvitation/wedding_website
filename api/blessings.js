const JSONBIN_BASE_URL = "https://api.jsonbin.io/v3/b";
const MAX_BLESSINGS = 250;
const MEMORY_STORE_KEY = "__weddingBlessingsMemoryStore";

const seed = [
  { name: "Anitha Subramanian", relation: "Family", message: "Wishing you a lifetime of love, laughter and joy. May your bond grow stronger with every passing day." },
  { name: "Ravi Krishnan", relation: "Friend", message: "So happy for both of you! May your journey together be as beautiful as your love story." },
  { name: "Priya Mohan", relation: "Colleague", message: "Congratulations Karthik & Divya! Wishing you a marriage full of warmth, kindness and many adventures." },
  { name: "Suresh Iyer", relation: "Family", message: "Blessings from all of us. May Lord Ganesha shower his choicest blessings on the new beginning." },
  { name: "Meera Venkat", relation: "Friend", message: "Two beautiful souls becoming one. So thrilled to celebrate this with you." },
  { name: "Arun Pillai", relation: "Colleague", message: "Wishing the both of you a happily ever after. Many congratulations!" },
];

const normalizeWish = (wish) => {
  if (!wish || typeof wish !== "object") return null;
  const name = typeof wish.name === "string" ? wish.name.trim() : "";
  const relation = typeof wish.relation === "string" ? wish.relation.trim() : "";
  const message = typeof wish.message === "string" ? wish.message.trim() : "";

  if (!name || !message) return null;
  return { name, relation: relation || "Guest", message };
};

const normalizeWishList = (value) => {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeWish).filter(Boolean);
};

const parseApiRecord = (value) => {
  if (Array.isArray(value)) return normalizeWishList(value);
  if (!value || typeof value !== "object") return [];

  if (Array.isArray(value.wishes)) return normalizeWishList(value.wishes);
  if (value.record) return parseApiRecord(value.record);

  return [];
};

const getMemoryStore = () => {
  if (!Array.isArray(globalThis[MEMORY_STORE_KEY])) {
    globalThis[MEMORY_STORE_KEY] = [...seed];
  }
  return globalThis[MEMORY_STORE_KEY];
};

const setMemoryStore = (wishes) => {
  globalThis[MEMORY_STORE_KEY] = wishes.slice(0, MAX_BLESSINGS);
  return globalThis[MEMORY_STORE_KEY];
};

const parseRequestBody = (body) => {
  if (!body) return null;

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }

  if (Buffer.isBuffer(body)) {
    try {
      return JSON.parse(body.toString("utf8"));
    } catch {
      return null;
    }
  }

  if (typeof body === "object") return body;

  return null;
};

const getJsonBinConfig = () => {
  const binId = process.env.JSONBIN_BIN_ID;
  const masterKey = process.env.JSONBIN_API_KEY || process.env.JSONBIN_MASTER_KEY;
  const accessKey = process.env.JSONBIN_ACCESS_KEY;

  if (!binId || !masterKey) return null;
  return { binId, masterKey, accessKey };
};

const jsonBinHeaders = (config) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Master-Key": config.masterKey,
    "X-Bin-Versioning": "false",
  };

  if (config.accessKey) {
    headers["X-Access-Key"] = config.accessKey;
  }

  return headers;
};

const loadFromJsonBin = async (config) => {
  const response = await fetch(`${JSONBIN_BASE_URL}/${config.binId}/latest`, {
    method: "GET",
    headers: jsonBinHeaders(config),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`JSONBin GET failed with status ${response.status}`);
  }

  const payload = await response.json();
  return parseApiRecord(payload);
};

const saveToJsonBin = async (config, wishes) => {
  const response = await fetch(`${JSONBIN_BASE_URL}/${config.binId}`, {
    method: "PUT",
    headers: jsonBinHeaders(config),
    body: JSON.stringify({ wishes }),
  });

  if (!response.ok) {
    throw new Error(`JSONBin PUT failed with status ${response.status}`);
  }
};

const loadSharedWishes = async () => {
  const config = getJsonBinConfig();
  if (!config) {
    return { wishes: getMemoryStore(), source: "memory" };
  }

  try {
    const wishes = await loadFromJsonBin(config);
    if (wishes.length > 0) {
      setMemoryStore(wishes);
      return { wishes, source: "jsonbin" };
    }
    return { wishes: getMemoryStore(), source: "memory" };
  } catch {
    return { wishes: getMemoryStore(), source: "memory" };
  }
};

const appendWish = async (wish) => {
  const config = getJsonBinConfig();
  if (!config) {
    return { wishes: setMemoryStore([wish, ...getMemoryStore()]), source: "memory", degraded: true };
  }

  try {
    const current = await loadFromJsonBin(config);
    const next = [wish, ...current].slice(0, MAX_BLESSINGS);
    await saveToJsonBin(config, next);
    setMemoryStore(next);
    return { wishes: next, source: "jsonbin", degraded: false };
  } catch {
    return { wishes: setMemoryStore([wish, ...getMemoryStore()]), source: "memory", degraded: true };
  }
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Allow", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    const result = await loadSharedWishes();
    return res.status(200).json({ wishes: result.wishes, source: result.source });
  }

  if (req.method === "POST") {
    const payload = parseRequestBody(req.body);
    const wish = normalizeWish(payload);
    if (!wish) {
      return res.status(400).json({ error: "Invalid blessing payload." });
    }

    const result = await appendWish(wish);
    return res.status(result.degraded ? 202 : 201).json({
      wish,
      wishes: result.wishes,
      source: result.source,
    });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
