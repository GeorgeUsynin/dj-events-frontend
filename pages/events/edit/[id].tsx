import React, { useState } from 'react';
import moment from 'moment';
import slugify from 'slugify';
import { FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { routes } from '@/constants/routes';
import { API_URL } from '@/config/index';
import { TStrapiResponseWithCloudinaryImage, TEvent, TStrapiData } from '@/types/index';
import styles from '@/styles/Form.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function EditEventPage({ evt }: { evt: TStrapiData<TEvent> }) {
    const [values, setValues] = useState<Omit<TEvent, 'slug'>>({
        name: evt.attributes.name,
        performers: evt.attributes.performers,
        venue: evt.attributes.venue,
        address: evt.attributes.address,
        date: evt.attributes.date,
        time: evt.attributes.time,
        description: evt.attributes.description,
    });

    const [image_preview, setImagePreview] = useState(
        evt.attributes.image.data ? evt.attributes.image.data.attributes.formats.thumbnail.url : null
    );

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const has_empty_fields = Object.values(values).some(field => field === '');

        if (has_empty_fields) {
            toast.error('Please fill in all the fields');
            return;
        }

        const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { ...values, slug: slugify(values.name, { lower: true }) } }),
        });

        if (!res.ok) {
            toast.error('Something went wrong');
            return;
        } else {
            const evt = await res.json();
            router.push(`${routes.events}/${evt.data.attributes.slug}`);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <Layout>
            <Link href={routes.events}>Go Back</Link>
            <h1>Add event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input type='text' id='name' name='name' value={values.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input type='text' name='venue' id='venue' value={values.venue} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={moment(values.date).format('yyyy-MM-DD')}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input type='text' name='time' id='time' value={values.time} onChange={handleInputChange} />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type='submit' value='Update Event' className='btn' />
            </form>

            <h2>Event Image</h2>
            {image_preview ? (
                <Image src={image_preview} alt='image' height={100} width={170} />
            ) : (
                <div>
                    <p>No image uploaded </p>
                </div>
            )}

            <div>
                <button className='btn-secondary'>
                    <FaImage /> Set Image
                </button>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params: { id } }: { params: { id: number } }) {
    const response = await fetch(`${API_URL}/api/events/${id}?populate=*`);

    const evt: TStrapiResponseWithCloudinaryImage<TEvent> = await response.json();

    return {
        props: { evt: evt.data },
    };
}
