import React from "react";
import { ChartComponent } from "../components/chart/chart-component";
import { ContentBlock } from "../components/content-block/content-block";
import { ContentList } from "../components/content-list/content-list";
import { ModelBase } from "../components/interfaces";
import { Section } from "../components/section/section";
import { EditorMetadata } from "../editor/editor-metadata";
import { WidgetModel } from "../editor/interfaces";
import { RenderContext } from "./render-context";
import { RequestContext } from "./request-context";
import { GridComponent } from "../components/grid/grid-component";
import { ButtonComponent } from "../components/kendo-button/kendo-button";
import { TextBoxComponent } from "../components/kendo-textbox/kendo-textbox";

export const TYPES_MAP = {
    "SitefinityContentBlock": ContentBlock,
    "SitefinitySection": Section,
    "SitefinityContentList": ContentList,
    // "SitefinityChart": ChartComponent,
    "SitefinityKendoButton": ButtonComponent,
    "SitefinityKendoTextBox": TextBoxComponent,
    "SitefinityKendoGrid": GridComponent,
};

export class RenderWidgetService {
    public static createComponent(widgetModel: WidgetModel, requestContext: RequestContext) {
        const mappedType = (TYPES_MAP as any)[widgetModel.Name];
        if (requestContext.LazyComponentMap && requestContext.LazyComponentMap.hasOwnProperty(widgetModel.Id)) {
            widgetModel.Properties = requestContext.LazyComponentMap[widgetModel.Id].Properties;
        }

        parseProperties(widgetModel, requestContext);
        const element = React.createElement(mappedType, { key: widgetModel.Id, ...widgetModel }, );
        return element;
    }
}

function parseProperties(widgetModel: WidgetModel, requestContext: RequestContext) {
    (widgetModel as any)["requestContext"] = requestContext;
    Object.keys(widgetModel.Properties).forEach((key) => {
        try {
            (widgetModel.Properties as any)[key] = JSON.parse((widgetModel.Properties as any)[key])
        } catch {

        }
    });
}

export function htmlAttributes(widgetModel: ModelBase<any>, editorMetadata: EditorMetadata | null, error: string | null) {
    if (!RenderContext.isEdit())
        return {};
    
    const attributes: any = {
        "data-sfname": widgetModel.Name,
        "data-sftitle": widgetModel.Name,
        "data-sfid" : widgetModel.Id,
        "data-sfisorphaned": false
    }
    if (editorMetadata) {
        if (editorMetadata.EmptyIcon) {
            attributes["data-sfemptyicon"] = editorMetadata.EmptyIcon;
        }

        if (editorMetadata.EmptyIconAction) {
            attributes["data-sfemptyiconaction"] = editorMetadata.EmptyIconAction;
        }

        if (editorMetadata.EmptyIconText) {
            attributes["data-sfemptyicontext"] = editorMetadata.EmptyIconText;
        }
    }

    attributes["data-sfiscontentwidget"] = widgetModel.Name != "SitefinitySection";
    attributes["data-sfisemptyvisualhidden"] = false;
    if (error) {
        attributes["data-sferror"] = error;
    }

    return attributes;
}
