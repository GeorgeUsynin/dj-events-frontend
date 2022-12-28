import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { TEvent, TStrapiResponseWithCloudinaryImage } from '../types';

export default function EventsPage({ events }: { events: TEvents }) {
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
    const response = await fetch(`${API_URL}/api/events?sort=date:asc&populate=*`);
    const strapi_events: TStrapiResponseWithCloudinaryImage<TEvent> = await response.json();
    const events = strapi_events.data.map(evt => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes.image.data.attributes.formats.thumbnail.url,
    }));

    return {
        props: { events },
        revalidate: 1,
    };
}

type TEvents = Awaited<ReturnType<typeof getStaticProps>>['props']['events'];
