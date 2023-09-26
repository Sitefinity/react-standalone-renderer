import {SdkItem} from '@/app/cms/sdk/dto/sdk-item';
import {ContentListModelBase} from '@/app/components/ContentList/Master/ContentListBaseModel';

export interface ListWithSummaryModel extends ContentListModelBase {
    Items: Array<ItemModel>;
}

export interface ItemModel {
    PublicationDate: {
        Css: string;
        Value: string;
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
