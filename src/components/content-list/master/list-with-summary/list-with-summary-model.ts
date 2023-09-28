import { SdkItem } from "../../../../framework/sdk/dto/sdk-item";
import { ContentListModelBase } from "../content-list-model-base";

export interface ListWithSummaryModel extends ContentListModelBase {
    Items: Array<ItemModel>
}

export interface ItemModel {
    PublicationDate: {
        Css: string;
        Value: string;
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
