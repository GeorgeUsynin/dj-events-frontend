import Link from 'next/link';
import Layout from './components/Layout';

const About = () => {
    return (
        <Layout title='About DJ events'>
            <h1>About</h1>
            <Link href='/events'>Events</Link>
        </Layout>
    );
};

export default About;
