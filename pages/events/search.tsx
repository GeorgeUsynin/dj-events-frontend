import qs from 'qs';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';
import { TEvent, TStrapiResponseWithCloudinaryImage } from '../types';

export default function SearchPage({ events }: { events: TEvents }) {
    const router = useRouter();

    return (
        <Layout title='Search Results'>
            <Link href={routes.events}>Go Back</Link>
            <h1>Search Results for {router.query.term}</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.length > 0 &&
                events.map(event => {
                    return <EventItem event={event} key={event.id} />;
                })}
        </Layout>
    );
}

export async function getServerSideProps({ query: { term } }: { query: { term: string } }) {
    const query = qs.stringify({
        filters: {
            $or: [
                { name: { $contains: term } },
                { performers: { $contains: term } },
                { description: { $contains: term } },
                { venue: { $contains: term } },
            ],
        },
    });

    const response = await fetch(`${API_URL}/api/events?${query}&populate=*`);
    const strapi_events: TStrapiResponseWithCloudinaryImage<TEvent> = await response.json();
    const events = strapi_events.data.map(evt => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes.image.data.attributes.formats.thumbnail.url,
    }));

    return {
        props: { events },
    };
}

type TEvents = Awaited<ReturnType<typeof getServerSideProps>>['props']['events'];
