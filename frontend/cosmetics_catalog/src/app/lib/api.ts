
const RAW = process.env.NEXT_PUBLIC_API_URL || "https://cosmetics-catalog.onrender.com/api";
const BASE = RAW.replace(/\/$/, ""); 

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const clean = path.replace(/^\//, ""); 
  const url = `${BASE}/${clean}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} – ${url}`);
  return res.json() as Promise<T>;
}
