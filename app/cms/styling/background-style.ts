import {SdkItem} from '@/app/cms/sdk/dto/sdk-item';
import {ImagePosition} from '@/app/cms/styling/position';

export interface BackgroundStyle {
    BackgroundType: 'None' | 'Color' | 'Image' | 'Video';
    Color: string;
    ImageItem: SdkItem;
    VideoItem: SdkItem;
    Position: ImagePosition;
}
