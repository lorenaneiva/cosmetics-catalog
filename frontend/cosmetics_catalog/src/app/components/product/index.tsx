import Link from "next/link";
import styles from "./products.module.css";

const RAW = process.env.NEXT_PUBLIC_API!;
const API = RAW.replace(/\/$/, "");

export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: { id: number; image: string }[];
}
interface ResponseProps {
  results: ProductProps[];
}

async function getProducts(): Promise<ResponseProps> {
  const res = await fetch(`${API}/products/`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    throw new Error(`Resposta não-JSON da API (content-type: ${ct})`);
  }
  return res.json() as Promise<ResponseProps>;
}

export async function Product() {
  const data = await getProducts();

  return (
    <div>
      <ul className={styles.lista}>
        {data.results.map((p) => (
          <li key={p.id}>
            <Link href={`/produtos/${p.id}`}>
              {p.images?.length > 0 && (
                <img src={p.images[0].image} alt={p.name} width={120} />
              )}
              <main>
                <h2>{p.name}</h2>
                <p>
                  R$
                  {" "}{Number(p.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                <p>
                  Descrição:{" "}
                  {p.description.length > 100
                    ? p.description.slice(0, 100) + "..."
                    : p.description}
                </p>
              </main>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
