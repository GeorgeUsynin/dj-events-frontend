import { useState, useEffect, forwardRef, useImperativeHandle, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from '@/styles/Modal.module.css';
import { ForwardedRef } from 'react';

type TModal = {
    children: ReactNode;
    title?: string;
};

const Modal = ({ children, title }: TModal, ref: ForwardedRef<{ openModal: VoidFunction }>) => {
    const [is_browser, setIsBrowser] = useState(false);
    const [show_modal, setShowModal] = useState(false);

    const modal_wrapper_ref = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        openModal: () => setShowModal(true),
    }));

    useEffect(() => setIsBrowser(true), []);

    useEffect(() => {
        if (show_modal) {
            modal_wrapper_ref.current?.scrollIntoView();
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show_modal]);

    const modal_content = show_modal ? (
        <div className={styles.overlay} ref={modal_wrapper_ref}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href='#' onClick={() => setShowModal(false)}>
                        <FaTimes />
                    </a>
                </div>
                {title && <div>{title}</div>}
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null;

    if (is_browser) {
        return createPortal(modal_content, document.getElementById('modal-root')!);
    } else {
        return null;
    }
};

export default forwardRef(Modal);
