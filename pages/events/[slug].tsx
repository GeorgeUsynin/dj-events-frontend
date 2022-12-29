import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { API_URL } from '../config';
import { routes } from '@/constants/routes';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { TEvents } from 'pages';
import { TEvent, TStrapiResponseWithCloudinaryImage } from '../types';
import styles from '@/styles/Event.module.css';

const EventPage = ({ evt }: { evt: TEvents[number] }) => {
    const deleteEvent = (e: React.MouseEvent<HTMLSpanElement>) => {
        console.log('delete event');
    };

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`events/edit/${evt.id}`}>
                        <FaPencilAlt /> Edit Event
                    </Link>
                    <span className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </span>
                </div>
                <span>
                    {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image} alt='event_image' width={960} height={600} />
                    </div>
                )}
                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Desription</h3>
                <p>{evt.description}</p>
                <h3>Venue {evt.venue}</h3>
                <p>{evt.address}</p>
                <Link href={routes.events} className={styles.back}>
                    {'<'} Go Back
                </Link>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const response = await fetch(`${API_URL}/api/events?populate=*`);
    const strapi_events: TStrapiResponseWithCloudinaryImage<TEvent> = await response.json();
    const events = strapi_events.data.map(evt => ({ slug: evt.attributes.slug }));

    const paths = events.map(evt => ({ params: { slug: evt.slug } }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
    const response = await fetch(`${API_URL}/api/events/?filters[slug][$eq]=${slug}&populate=*`);
    const strapi_events: TStrapiResponseWithCloudinaryImage<TEvent> = await response.json();
    const events = strapi_events.data.map(evt => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes.image.data.attributes.formats.large.url,
    }));

    return {
        props: {
            evt: events[0],
        },
    };
}

//getServerSideProps

// export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {
//     const slug = req.query.slug;
//     const response = await fetch(`${API_URL}/api/events/${slug}`);
//     const events = await response.json();

//     return {
//         props: {
//             evt: events[0],
//         },
//     };
// }

export default EventPage;
