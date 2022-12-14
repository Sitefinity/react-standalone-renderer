import { RendererContract, ComponentMetadata, GetWidgetMetadataArgs, RenderWidgetArgs, GetWidgetsArgs, TotalCountResult, WidgetItem, WidgetSection, RenderResult, GetCategoriesArgs } from "./interfaces";
import ReactDOM from "react-dom";

import sitefinityContentBlockJson from '../components/content-block/designer-metadata.json'
import sitefinitySectionJson from '../components/section/designer-metadata.json';
import sitefinityContentListJson from '../components/content-list/designer-metadata.json';
import sitefinityChartJson from '../components/chart/designer-metadata.json';

import contentWidgetsJson from './designer-metadata/content-widgets.json';
import layoutWidgetsJson from './designer-metadata/layout-widgets.json';
import { RenderWidgetService } from "../services/render-widget-service";

export class RendererContractImpl implements RendererContract {
    private metadataMap: { [key: string]: any } = {
        "SitefinityContentBlock": sitefinityContentBlockJson,
        "SitefinitySection": sitefinitySectionJson,
        "SitefinityContentList": sitefinityContentListJson,
        "SitefinityChart": sitefinityChartJson
    }

    getWidgetMetadata(args: GetWidgetMetadataArgs): Promise<ComponentMetadata> {
        const componentMetadata = this.metadataMap[args.widgetName] as ComponentMetadata;
        if (componentMetadata) {
            return Promise.resolve(componentMetadata);
        }

        return Promise.resolve({
            Name: args.widgetName,
            Caption: args.widgetName,
            PropertyMetadata: [],
            PropertyMetadataFlat: [],
        });
    }

    // html string to change the widget and rerender it
    renderWidget(args: RenderWidgetArgs): Promise<RenderResult> {
        return new Promise((resolve) => {
            const tempElement = document.createElement("div");
            const component = RenderWidgetService.createComponent(args.model, { DetailItem: null, LazyComponentMap: null });
            
            ReactDOM.render(component, tempElement);
            setTimeout(() => {
                resolve({
                    element: tempElement.firstElementChild as HTMLElement,
                    content: '',
                    scripts: []
                })
            }, 500);
        });
    }

    getWidgets(args: GetWidgetsArgs): Promise<TotalCountResult<WidgetSection[]>> {
        if (args.category === "Content") {
            return Promise.resolve(contentWidgetsJson);
        } else if (args.category === "Layout") {
            return Promise.resolve(layoutWidgetsJson);
        }

        return Promise.resolve({
            totalCount: 0,
            dataItems: []
        });
    }

    getCategories(args: GetCategoriesArgs): Promise<Array<string>> {
        return Promise.resolve(["Content", "Layout"]);
    }
}
