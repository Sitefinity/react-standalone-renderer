import {SdkItem} from '@/app/cms/sdk/dto/sdk-item';
import {ContentListModelBase} from '@/app/components/ContentList/Master/ContentListBaseModel';

export interface ListWithImageModel extends ContentListModelBase {
    Items: Array<ItemModel>;
}

export interface ItemModel {
    Image: {
        Css: string;
        Title: string;
        AlternativeText: string;
        Url: string;
    };
    Title: {
        Value: string;
        Css: string;
        Link: string;
    };
    Text: {
        Value: string;
        Css: string;
    };

    Original: SdkItem;
}
