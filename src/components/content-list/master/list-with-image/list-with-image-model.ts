import { SdkItem } from "../../../../framework/sdk/dto/sdk-item";
import { ContentListModelBase } from "../content-list-model-base";

export interface ListWithImageModel extends ContentListModelBase {
    Items: Array<ItemModel>
}

export interface ItemModel {
    Image: {
        Css: string;
        Title: string;
        AlternativeText: string;
        Url: string
    },
    Title: {
        Value: string,
        Css: string,
        Link: string
    },
    Text: {
        Value: string,
        Css: string
    },

    Original: SdkItem
}
