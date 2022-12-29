import React, { useState } from 'react';
import slugify from 'slugify';
import { ToastContainer, toast } from 'react-toastify';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { routes } from '@/constants/routes';
import { API_URL } from '../config';
import styles from '@/styles/Form.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function AddEventPage() {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const has_empty_fields = Object.values(values).some(field => field === '');

        if (has_empty_fields) {
            toast.error('Please fill in all the fields');
            return;
        }

        const res = await fetch(`${API_URL}/api/events`, {
            method: 'POST',
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
                        <input type='date' name='date' id='date' value={values.date} onChange={handleInputChange} />
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

                <input type='submit' value='Add Event' className='btn' />
            </form>
        </Layout>
    );
}
