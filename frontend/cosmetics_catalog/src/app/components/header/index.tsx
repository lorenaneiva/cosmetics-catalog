
import styles from './header.module.css';
import Link from "next/link"
import { SearchApp } from '../search';
export function Header(){

    return(
        
    <header className={styles.header}>
        <div className={styles.div}>
                <div className={styles.logo}>
                    <Link href='../'>
                    

                    <img src="byrose_logo_teste_fff9f9.png" alt="websitelogo" />
                    </Link>
                </div>

            <div className={styles.search}><SearchApp/></div>
            </div>
        </header>
    )
}