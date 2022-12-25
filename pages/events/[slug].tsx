import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const EventPage = () => {
    const router = useRouter();

    console.log('router', router);

    return (
        <Layout>
            <h1>Event</h1>
            <button
                onClick={() => {
                    router.push('/about');
                }}
            >
                Go to About Page
            </button>
        </Layout>
    );
};

export default EventPage;
