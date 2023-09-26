import {SdkItem} from '@/app/cms/sdk/dto/sdk-item';

export interface ContentListModelBase {
    Attributes: {[key: string]: string};
    OpenDetails: boolean;
    Pager?: {};
    OnDetailsOpen: (sdkItem: SdkItem) => void;
}
