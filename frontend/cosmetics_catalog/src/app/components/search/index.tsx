'use client'

import 'material-symbols/outlined.css';
import styles from './search.module.css' 
import { useState } from "react"
import { getProducts } from '../product'
import { useRouter } from 'next/navigation'

const data = getProducts()

const dataItens = Object.values(data)

export function SearchApp(){

    const [searchItem, setSearchItem] = useState("")
    const [filteredProducts, setFilteredProducts] = useState(dataItens)
    const router = useRouter()
    const handleInputChange= (e: React.ChangeEvent<HTMLInputElement>) =>{
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
        
        router.replace(`?search=${encodeURIComponent(searchTerm)}`)
    }
    return(
        <div>
        <form action="search">
            <div className={styles.search}>
                <span className='material-symbols-outlined'>search</span>
                <input type="search"
                value={searchItem}
                onChange={handleInputChange}
                placeholder='Buscar'
                />
            </div>
        </form>
        </div>
    )
}