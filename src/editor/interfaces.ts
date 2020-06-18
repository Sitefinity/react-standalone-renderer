
export interface RendererContract {
    getWidgetMetadata(args: GetWidgetMetadataArgs): Promise<ComponentMetadata>;
    renderWidget(args: RenderWidgetArgs): Promise<RenderResult>;
    getCategories(args: GetCategoriesArgs): Promise<Array<string>>;
    getWidgets(args: GetWidgetsArgs): Promise<TotalCountResult<Array<WidgetSection>>>;
}

export interface TotalCountResult<T> {
    dataItems: T;
    totalCount: number;
}

export interface RenderResult {
    element: HTMLElement,
    content: string,
    scripts: Array<Script>
}

export interface Script {
    src: string;
    id: string;
}

export interface Script {
    src: string;
    id: string;
}

export interface WidgetItem {
    name: string;
    title: string;
    addWidgetTitle: string | null;
    addWidgetName: string | null;
    thumbnailUrl?: string;
    initialProperties: Array<{ name: string, value: string}>
}

export interface WidgetSection {
    title: string;
    widgets: WidgetItem[];
}

export interface RenderWidgetArgs {
    dataItem: DataItem;
    siteId: string;
    model: WidgetModel;
    token?: Token;
}
export interface GetCategoriesArgs {
    token?: Token;
    toolbox?: string;
}

export interface GetWidgetsArgs {
    dataItem: DataItem;
    category: string;
    search: string;
    skip: number;
    take: number;
    token?: Token;
    toolbox?: string;
}

export interface GetWidgetMetadataArgs {
    dataItem: DataItem;
    widgetKey: string;
    widgetName: string;
    siteId: string;
    token?: Token;
}

export interface ComponentMetadata {
    Caption: string,
    Name: string,
    PropertyMetadata: SectionGroup[],
    PropertyMetadataFlat: PropertyMetadata[],
}

export interface PropertyMetadata {
    Name: string;
    Title: string;
    Type: string;
    DefaultValue: string;
    Properties: { [key: string]: any }
}

export interface SectionGroup {
    Name: string;

    Sections: SectionData[];
}

export interface SectionData {
    /**
     * The section name
     *
     * @memberof {SectionData}
     */
      Name: string,

    /**
     * The section title
     *
     * @memberof {SectionData}
     */
      Title: string

    /**
     * Collection of properties
     *
     * @memberof {SectionData}
     */
      Properties: Array<PropertyMetadata>
}


export interface WidgetModel {
    Id: string;
    Name: string;
    Properties: {[key: string]: string};
}

export interface Token {
    type: string,
    value: string
}

export interface DataItem {
    readonly provider: string;
    /**
     * Gets the assigned culture of the item.
     */
    readonly culture: string;

    /**
     * Gets the identifier of the item. Returns null if there is no item.
     */
    readonly key: string;
}
