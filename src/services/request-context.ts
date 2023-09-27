import { ModelBase } from "../components/interfaces";
import { DetailItem } from "../sdk/services/detail-item";

export interface RequestContext {
    detailItem: DetailItem | null;
    lazyComponentMap: { [key: string]: ModelBase<any> } | null;
    isEdit: boolean;
    isPreview: boolean;
}
