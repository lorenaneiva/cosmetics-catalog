// src/app/produtos/[id]/page.tsx
import styles from "./product.module.css";
import { notFound } from "next/navigation";
// (opcional) se for usar o componente Product abaixo, mantenha a import:
// import { Product } from "../../components/product";

export const dynamic = "force-dynamic"; // evita prerender no build

// URL base da API (defina na Vercel: NEXT_PUBLIC_API=https://cosmetics-catalog.onrender.com/api)
const RAW = process.env.NEXT_PUBLIC_API!;
const API = RAW.replace(/\/$/, "");

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

async function getProduct(id: string): Promise<ProductProps> {
  const safeId = encodeURIComponent(id);
  const res = await fetch(`${API}/products/${safeId}/`, { cache: "no-store" });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`API error ${res.status}`);

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    throw new Error(`Resposta não-JSON da API (content-type: ${ct})`);
  }

  return res.json();
}

// 👇 params é síncrono aqui (NADA de Promise)
export default async function DetailProduct({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProduct(params.id);

  return (
    <div className={styles.main}>
      {/* Galeria (descomente se quiser exibir as imagens) */}
      {/* <ul className={styles.slider}>
        {(data.images ?? []).map((img) => (
          <li key={img.id}>
            <img src={img.image} alt={data.name} width={120} />
          </li>
        ))}
      </ul> */}

      <div>
        <h1>{data.name}</h1>
        <h2>R$ {Number(data.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</h2>
        <p>Descrição: {data.description}</p>

        <p>
          Entre em contato:{" "}
          <a
            href="https://wa.me/91987615365/?text=Oi!%20Eu%20gostaria%20de%20mais%20informações%20sobre%20um%20produto,%20por%20favor."
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </p>

        {/* <Product />  // mantenha se esse componente fizer sentido aqui */}
      </div>
    </div>
  );
}
