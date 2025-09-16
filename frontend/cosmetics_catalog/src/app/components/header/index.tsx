
import styles from './header.module.css';
import Link from "next/link"
import { SearchApp } from '../search';
export function Header(){

    return(
        
        <header className={styles.header}>
            <div className={styles.div}>
                <div className={styles.logo}>
                    <h1><Link href='../' className={styles.links}>
                    <img src="byrose_logo_teste_fff9f9.png" alt="websitelogo" />
                    </Link></h1>
                </div>
            <SearchApp/>
            </div>
        </header>
    )
}