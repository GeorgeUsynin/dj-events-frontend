import Link from 'next/link';
import Image from 'next/image';
import { TEvent } from '../index';
import styles from '@/styles/EventItem.module.css';

export default function EventItem({ event }: { event: TEvent }) {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image
                    src={event.image ? event.image : 'images/event-default.png'}
                    alt='event_image'
                    width={170}
                    height={100}
                />
            </div>
            <div className={styles.info}>
                <span>
                    {new Date(event.date).toLocaleDateString('en-US')} at {event.time}
                </span>
                <h3>{event.name}</h3>
            </div>

            <div className={styles.link}>
                <Link href={`/events/${event.slug}`} className='btn'>
                    Details
                </Link>
            </div>
        </div>
    );
}
