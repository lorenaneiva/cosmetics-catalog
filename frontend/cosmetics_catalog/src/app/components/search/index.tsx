'use client'
import styles from './search.module.css' 
import { useState } from "react"

export function Search({ placeholder, onSearchChange }: { placeholder: string, onSearchChange: (term: string) => void }){
    function handleSearch(term: string) {
        console.log(term);
    }

    return(
        <div className={styles.search}>
            <form onSubmit={(onclick)=>{
                
            }}>
                <input
                type="search"
                 placeholder={placeholder}
                onChange={(e) => {  onSearchChange(e.target.value);
                        }}
                />
                <button type="submit" aria-label="Buscar"></button>
            </form>
        </div>
    )
}