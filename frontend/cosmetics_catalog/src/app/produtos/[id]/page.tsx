
import styles from "./product.module.css";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; 


type ImageT = { id: number; image: string };
export interface ProductProps {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    images: ImageT[];
}

const RAW = process.env.NEXT_PUBLIC_API!;
const API = RAW.replace(/\/$/, "");

async function getProduct(id: string): Promise<ProductProps> {
  const res = await fetch(`${API}/products/${encodeURIComponent(id)}/`, {
    cache: "no-store",
  });
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    throw new Error(`Resposta não-JSON da API (content-type: ${ct})`);
  }
  return res.json();
}

type Props = { params: { id: string } };

export default async function DetailProduct({ params }: Props) {
  const data = await getProduct(params.id);

  return (
    <div className={styles.main}>
      <h1>{data.name}</h1>
      <h2>
        R$ {Number(data.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </h2>
      <p>Descrição: {data.description}</p>

      {data.images?.length > 0 && (
        <ul style={{ display: "flex", gap: 12, listStyle: "none", padding: 0 }}>
          {data.images.map((img) => (
            <li key={img.id}>
              <img src={img.image} alt={data.name} width={220} />
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: 12 }}>
        Entre em contato:{" "}
        <a
          href="https://wa.me/91987615365/?text=Oi!%20Eu%20gostaria%20de%20mais%20informações%20sobre%20um%20produto,%20por%20favor."
          rel="noopener noreferrer"
          target="_blank"
        >
          WhatsApp
        </a>
      </p>
    </div>
  );
}
