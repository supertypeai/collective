import Link from 'next/link';
import styles from '@/styles/Home.module.css'

const index = () => {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    <Link href="/">
                        Back to homepage
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default index