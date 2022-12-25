import Head from 'next/head';
import { ReactNode } from 'react';
import styles from '../../styles/Layout.module.css';

type TLayout = {
    title: string;
    description: string;
    keywords: string;
    children: ReactNode;
};

export default function Layout({ title, description, keywords, children }: TLayout) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>
            <div className={styles.container}>{children}</div>
        </div>
    );
}

Layout.defaultProps = {
    title: 'DJ Events | Finds the hottest parties',
    description: 'Finf the lates DJ and other musical events',
    keywords: 'music, dj, edm, events',
};