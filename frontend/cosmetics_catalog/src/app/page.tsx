export const dynamic = "force-dynamic"; 
import { Product } from './components/product'
import styles from './components/product/products.module.css';

type MySearchParams = { [key: string]: string | string[] | undefined };



export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<MySearchParams>;
}){
  const sp = (await searchParams) ??{}
  const raw = sp.search
  const search = Array.isArray(raw) ? raw[0] : raw ?? ""
  return(

      <div>
        <div style={{
          display:'grid',
          columnGap:'50px',
        }}>

            <h2 style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
                }}>Catálogo de produtos disponíveis para encomenda</h2>
                

          <Product search={search}/>

        </div>
          
      </div>

  )
}