import {
    RendererContract,
    ComponentMetadata,
    GetWidgetMetadataArgs,
    RenderWidgetArgs,
    GetWidgetsArgs,
    TotalCountResult,
    WidgetSection,
    RenderResult,
    GetCategoriesArgs,
} from './interfaces';

import sitefinityContentBlockJson from '@/app/components/ContentBlock/designer-metadata.json';
import sitefinitySectionJson from '@/app/components/section/designer-metadata.json';
import sitefinityContentListJson from '@/app/components/ContentList/designer-metadata.json';
import sitefinityServerSideJson from '@/app/components/ServerSide/designer-metadata.json';
import sitefinityClientSideJson from '@/app/components/ClientSide/designer-metadata.json';

import contentWidgetsJson from './designer-metadata/content-widgets.json';
import layoutWidgetsJson from './designer-metadata/layout-widgets.json';
import {RenderWidgetService} from '@/app/cms/services/render-widget-service';
import {createRoot} from 'react-dom/client';

export class RendererContractImpl implements RendererContract {
    private metadataMap: {[key: string]: any} = {
        SitefinityContentBlock: sitefinityContentBlockJson,
        SitefinitySection: sitefinitySectionJson,
        SitefinityContentList: sitefinityContentListJson,
        SitefinityServerSide: sitefinityServerSideJson,
        SitefinityClientSide: sitefinityClientSideJson,
    };

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
            const tempElement = document.createElement('div');
            const component = RenderWidgetService.createComponent(args.model, {
                DetailItem: null,
                LazyComponentMap: null,
            });

            createRoot(tempElement).render(component);
            setTimeout(() => {
                resolve({
                    element: tempElement.firstElementChild as HTMLElement,
                    content: '',
                    scripts: [],
                });
            }, 500);
        });
    }

    getWidgets(args: GetWidgetsArgs): Promise<TotalCountResult<WidgetSection[]>> {
        if (args.category === 'Content') {
            return Promise.resolve(contentWidgetsJson);
        } else if (args.category === 'Layout') {
            return Promise.resolve(layoutWidgetsJson);
        }

        return Promise.resolve({
            totalCount: 0,
            dataItems: [],
        });
    }

    getCategories(args: GetCategoriesArgs): Promise<Array<string>> {
        return Promise.resolve(['Content', 'Layout']);
    }
}
