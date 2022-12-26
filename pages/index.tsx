import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

type TEvents = {
    id: string;
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image: string;
};

export default function HomePage({ events }: { events: TEvents }) {
    return (
        <Layout>
            <h1>Upcoming Events</h1>
        </Layout>
    );
}

export async function getServerStaticProps() {
    const response = await fetch(`${API_URL}/api/events`);
    const events: TEvents = await response.json();

    return {
        props: { events },
        revalidate: 1,
    };
}
