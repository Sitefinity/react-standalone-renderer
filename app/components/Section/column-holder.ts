import {ModelBase} from '@/app/interfaces';

export interface ColumnHolder {
    Children: Array<ComponentContainer>;
    Attributes: {[key: string]: string};
    Style?: {[key: string]: string};
}

export interface ComponentContainer {
    model: ModelBase<any>;
}
