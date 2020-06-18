import { ModelBase } from "../components/interfaces";
import { DetailItem } from "../sdk/services/detail-item";

export interface RequestContext {
    DetailItem: DetailItem | null;
    LazyComponentMap: { [key: string]: ModelBase<any> } | null;
}
