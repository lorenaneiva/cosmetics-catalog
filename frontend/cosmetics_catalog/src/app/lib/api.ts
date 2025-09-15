const RAW = process.env.NEXT_PUBLIC_API
  ?? "https://cosmetics-catalog.onrender.com/api";

export const API = RAW.replace(/\/$/, "");

export async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(`API ${res.status} ${res.statusText} – ${url}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json"))
    throw new Error(`Resposta não-JSON (content-type: ${ct}) – ${url}`);
  return res.json() as Promise<T>;
}