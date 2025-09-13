import { Product } from '../components/product'
import styles from '../components/product/products.module.css';
export default async function Produtos(){
    return(
        <div>
            <h2 style={{
                'display':'flex',
                'alignItems':'center',
                'justifyContent':'center'
                }}>Todos os produtos</h2>

            <div style={{
                backgroundColor: "#eee7e3ff"
                , display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                margin: "20px",
                padding:"10px", 
                minHeight: "50px"  }}>

                <p>Total de x produtos</p>
                
                <p>
                    ordenar por <select name="filtros" id="filtros"  className={styles.select}>
                        <option value="none"></option>
                        <option value="preco">preço</option>
                    </select>
                </p>
            </div>
            <Product/>
            
        </div>

    )
}