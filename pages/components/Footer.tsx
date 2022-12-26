import Link from 'next/link';
import { routes } from '@/constants/routes';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; DJ Events 2023</p>
            <p>
                <Link href={routes.about}>About this project</Link>
            </p>
        </footer>
    );
}
