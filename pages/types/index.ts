type TFormatNames = 'thumbnail' | 'small' | 'medium' | 'large';

type TImageFormats = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: null | string;
    width: number;
    height: number;
    size: number;
    url: string;
    provider_metadata: {
        public_id: string;
        resource_type: string;
    };
};

type TImage = {
    data: {
        id: number;
        attributes: {
            name: string;
            alternativeText: null | string;
            caption: null | string;
            width: number;
            height: number;
            formats: Record<TFormatNames, TImageFormats>;
            hash: string;
            ext: string;
            mime: string;
            size: number;
            url: string;
            previewUrl: null | string;
            provider: string;
            provider_metadata: {
                public_id: string;
                resource_type: string;
            };
            createdAt: string;
            updatedAt: string;
        };
    };
};

type TStrapiAttributes<T> = T & {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: TImage;
};

type TStrapiData<T> = {
    id: number;
    attributes: TStrapiAttributes<T>;
};

export type TStrapiResponseWithCloudinaryImage<T> = {
    data: TStrapiData<T>[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export type TEvent = {
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
};
