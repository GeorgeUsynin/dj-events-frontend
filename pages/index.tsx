import Layout from '@/components/Layout';
import Link from 'next/link';
import { routes } from './constants/routes';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export type TEvent = {
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

type TEvents = TEvent[];

export default function HomePage({ events }: { events: TEvents }) {
    const mapped_events = events.map(event => {
        return <EventItem event={event} key={event.id} />;
    });

    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.length > 0 && (
                <>
                    {mapped_events}
                    <Link href={routes.events} className='btn-secondary'>
                        View All Events
                    </Link>
                </>
            )}
        </Layout>
    );
}

export async function getStaticProps() {
    const response = await fetch(`${API_URL}/api/events`);
    const events: TEvents = await response.json();

    return {
        props: { events: events.slice(0, 3) },
        revalidate: 1,
    };
}
