import Layout from '@/components/Layout';
import Link from 'next/link';
import { routes } from './constants/routes';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { TEvent, TStrapiResponseWithCloudinaryImage } from './types';

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
    const response = await fetch(`${API_URL}/api/events?sort=date:asc&pagination[limit]=3&populate=*`);
    const strapi_events: TStrapiResponseWithCloudinaryImage<TEvent> = await response.json();
    const events = strapi_events.data.map(evt => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes.image.data
            ? evt.attributes.image.data.attributes.formats.thumbnail.url
            : '/images/event-default.png',
    }));

    return {
        props: { events },
        revalidate: 1,
    };
}

export type TEvents = Awaited<ReturnType<typeof getStaticProps>>['props']['events'];
