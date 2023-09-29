import { RendererContract, ComponentMetadata, GetWidgetMetadataArgs, RenderWidgetArgs, GetWidgetsArgs, TotalCountResult, WidgetSection, RenderResult, GetCategoriesArgs, WidgetItem } from "./framework/editor/renderer-contract-interfaces";
import { RenderWidgetService } from "./framework/services/render-widget-service";
import { createRoot } from "react-dom/client";
import { RequestContext } from "./framework/services/request-context";

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
        const widgetEntries = this.renderWidgetService.registry.widgets;
        const filteredWidgets: WidgetItem[] = [];

        Object.keys(widgetEntries).forEach((key) => {
            const widgetEntry = widgetEntries[key];
            if ((widgetEntry.selectorCategory === args.category) || (!widgetEntry.selectorCategory && args.category === "Content")) {
                filteredWidgets.push({
                    name: key,
                    title: widgetEntry.editorMetadata?.Title || key,
                });
            }
        });

        return Promise.resolve({
            totalCount: filteredWidgets.length,
            dataItems: [
                {
                    title: "Default",
                    widgets: filteredWidgets
                }
            ]
        });
    }

    getCategories(args: GetCategoriesArgs): Promise<Array<string>> {
        return Promise.resolve(["Content", "Layout"]);
    }
}
