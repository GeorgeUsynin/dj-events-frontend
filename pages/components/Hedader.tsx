import Link from 'next/link';
import styles from '../../styles/Header.module.css';
import { routes } from '../constants/routes';

export default function Hedader() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href={routes.home}>DJ events</Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href={routes.events}>Events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
