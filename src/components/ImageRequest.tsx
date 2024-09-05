'use client';

import { apiGet } from '@/utils/fetchHelpers';
import { useEffect, useState } from 'react';
import LoadingCircle from './LoadingCircle';
import Image from 'next/image';

export default function ImageRequest({ filename }: { filename: string }) {
    const [image, setImage] = useState<Response>(new Response());
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImage = async () => {
            setLoading(true);
            try {
                setImage(await apiGet(`images/${filename}`));
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchImage();
    }, [filename]);
    return (
        <>
            {loading ? (
                <section className="p-1 mx-5">
                    <LoadingCircle />
                </section>
            ) : (
                <Image
                    className="max-w-10 rounded-md select-none cursor-pointer mx-5"
                    unoptimized
                    src={image.url}
                    width={40}
                    height={40}
                    alt="Profile Image"
                />
            )}
        </>
    );
}
