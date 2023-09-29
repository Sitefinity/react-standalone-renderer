import { SdkItem } from "../../../../framework/sdk/dto/sdk-item";
import { ContentListModelBase } from "../content-list-model-base";

export interface CardsListModel extends ContentListModelBase {
    Items: Array<CardItemModel>
}

export interface CardItemModel {
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
