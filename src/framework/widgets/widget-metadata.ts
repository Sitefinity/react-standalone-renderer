import { RenderWidgetService } from "../services/render-widget-service";
import { RequestContext } from "../services/request-context";

export interface WidgetRegistry {
    widgets: {
        [key: string]: WidgetMetadata
    }
}

export interface WidgetMetadata {
    componentType: any;
    designerMetadata: any;
    selectorCategory?: string;
    editorMetadata?: EditorMetadata
}

export interface EditorMetadata {
    Title?: string;
    Name?: string;
    EmptyIconText?: string;
    EmptyIconAction?: "Edit" | "None";
    EmptyIcon?: string;
}

export interface WidgetContext<T> {
    readonly model: WidgetModel<T>;
    readonly requestContext: RequestContext;
    readonly metadata: WidgetMetadata;
    readonly renderWidgetService: RenderWidgetService;
}

export interface WidgetModel<T> {
    Id: string;
    Name: string;
    Caption: string;

    Lazy: boolean;
    ViewName: string;
    PlaceHolder: string;
    Properties: T;
    Children: WidgetModel<any>[];
}
