import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { TEvent } from 'pages';

export default function EventsPage({ events }: { events: TEvent[] }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.length > 0 &&
                events.map(event => {
                    return <EventItem event={event} key={event.id} />;
                })}
        </Layout>
    );
}

export async function getStaticProps() {
    const response = await fetch(`${API_URL}/api/events`);
    const events: TEvent[] = await response.json();

    return {
        props: { events },
        revalidate: 1,
    };
}
