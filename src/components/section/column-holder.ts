import { ModelBase } from "../interfaces";

export interface ColumnHolder {
    Children: Array<ComponentContainer>
    Attributes: { [key: string]: string },
}

export interface ComponentContainer {
    model: ModelBase<any>;
}
