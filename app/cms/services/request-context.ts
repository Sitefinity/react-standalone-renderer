import {ModelBase} from '@/app/interfaces';
import {DetailItem} from '@/app/cms/sdk/services/detail-item';

export interface RequestContext {
    DetailItem: DetailItem | null;
    LazyComponentMap: {[key: string]: ModelBase<any>} | null;
}
