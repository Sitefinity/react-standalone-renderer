import {SdkItem} from '@/app/cms/sdk/dto/sdk-item';
import {ThumbnailItem} from '@/app/cms/sdk/dto/thumbnail-item';

export interface ImageItem extends SdkItem {
    Url: string;
    Title: string;
    AlternativeText: string;
    Width: number;
    Height: number;
    Thumbnails: ThumbnailItem[];
}
