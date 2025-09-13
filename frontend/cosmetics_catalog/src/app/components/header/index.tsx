'use client'
import styles from './header.module.css';
import Link from "next/link"
import { Search } from '../search';
import { useRouter } from "next/navigation";


export function Header(){

    const router = useRouter();
    function onSearchChange(term: string) {
        router.push(`/produtos?q=${term}`);
    }
    return(
        
        <header className={styles.header}>
            <div className={styles.div}>
                <div className={styles.logo}>
                    <h1><Link href='../' className={styles.links}>
                    <img src="byrose_logo_teste_fff9f9.png" alt="websitelogo" />
                    </Link></h1>
                </div>

                <Search placeholder="Buscar..." onSearchChange={onSearchChange}/>

                <nav>
                    <ul>
                        <li className={styles.list}>
                            <button className={styles.button}>
                                 <Link href='/produtos' className={styles.links} >Produtos</Link>
                            </button> 
                        </li>
                    </ul>
                </nav>
                
                

            </div>
        </header>
    )
}