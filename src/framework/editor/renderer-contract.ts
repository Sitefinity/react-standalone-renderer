import { RendererContract, ComponentMetadata, GetWidgetMetadataArgs, RenderWidgetArgs, GetWidgetsArgs, TotalCountResult, WidgetSection, RenderResult, GetCategoriesArgs } from "./interfaces";
import contentWidgetsJson from './designer-metadata/content-widgets.json';
import layoutWidgetsJson from './designer-metadata/layout-widgets.json';
import { RenderWidgetService } from "../services/render-widget-service";
import { createRoot } from "react-dom/client";
import { RequestContext } from "../services/request-context";

export class RendererContractImpl implements RendererContract {

    constructor(private readonly renderWidgetService: RenderWidgetService) {

    }

    getWidgetMetadata(args: GetWidgetMetadataArgs): Promise<ComponentMetadata> {
        const widgetRegistry = this.renderWidgetService.registry;
        const designerMetadata = widgetRegistry.widgets[args.widgetName].designerMetadata;
        return Promise.resolve(designerMetadata);
    }

    // html string to change the widget and rerender it
    renderWidget(args: RenderWidgetArgs): Promise<RenderResult> {
        return new Promise((resolve) => {
            const tempElement = document.createElement("div");
            const context: RequestContext = {
                detailItem: null,
                isEdit: true,
                isPreview: false,
                culture: args.dataItem.culture
            };

            const component = this.renderWidgetService.createComponent(args.model, context);

            createRoot(tempElement).render(component);
            // ReactDOM.render(component, tempElement);
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
