
import React, { useEffect, useState, Fragment } from 'react';
import { RendererContractImpl } from './framework/editor/renderer-contract';
import { RootUrlService } from './framework/sdk/root-url.service';
import { ServiceMetadata } from './framework/sdk/service-metadata';
import { PageLayoutServiceResponse } from './framework/sdk/services/layout-service.response';
import { LayoutService } from './framework/sdk/services/layout.service';
import { RenderWidgetService } from './framework/services/render-widget-service';

import { ContentBlock } from './components/content-block/content-block';
import { Section } from './components/section/section';
import { ContentList } from './components/content-list/content-list';

import sitefinityContentBlockJson from './components/content-block/designer-metadata.json'
import sitefinitySectionJson from './components/section/designer-metadata.json';
import sitefinityContentListJson from './components/content-list/designer-metadata.json';
import { WidgetModel, WidgetRegistry } from './framework/widgets/widget-metadata';
import { RequestContext } from './framework/services/request-context';

const widgets: WidgetRegistry = {
    widgets: {
        "SitefinityContentBlock":  {
            designerMetadata: sitefinityContentBlockJson,
            componentType: ContentBlock
        },
        "SitefinitySection": {
            designerMetadata: sitefinitySectionJson,
            componentType: Section,
            selectorCategory: 'Layout & Presets'
        },
        "SitefinityContentList": {
            designerMetadata: sitefinityContentListJson,
            componentType: ContentList,
            editorMetadata: {
                Title: "Content list",
                EmptyIconText: "Select content",
                EmptyIcon: "plus-circle",
            }
        }
    }
}

export function App() {
    const [appState, setAppState] = useState<AppState>();

    useEffect(() => {
        const getLayout = async () => {
            await ServiceMetadata.fetch();
            var query = new URL(window.location.toString()).searchParams;

            const layout = await LayoutService.get(window.location.pathname, query.get("sfaction"));

            const requestContext: RequestContext = {
                isEdit: window.location.search.indexOf("sfaction=edit") !== -1,
                isPreview: window.location.search.indexOf("sfaction=preview") !== -1,
                culture: layout.Culture,
                detailItem: layout.DetailItem
            };

            setAppState({
                requestContext,
                widgets: layout.ComponentContext.Components
            });

            const rootElement = document.body;
            rootElement.classList.add("container-fluid");
            if (requestContext.isEdit) {
                const timeout = 2000;
                const start = new Date().getTime();
                const handle = window.setInterval(() => {
                    if (!layout)
                        return;

                    document.body.setAttribute('data-sfcontainer', 'Body')

                    // we do not know the exact time when react has finished the rendering process.
                    // thus we check every 100ms for dom changes. A proper check would be to see if every single
                    // component is rendered
                    const timePassed = new Date().getTime() - start;
                    if ((layout.ComponentContext.Components.length > 0 && rootElement.childElementCount > 0) || layout.ComponentContext.Components.length === 0 || timePassed > timeout) {
                        window.clearInterval(handle);

                        (window as any)["rendererContract"] = new RendererContractImpl(new RenderWidgetService(widgets));
                        window.dispatchEvent(new Event('contractReady'));
                    }
                }, 1000);
            }

            renderSeoMeta(layout);
            renderScripts(layout, rootElement);
        }

        getLayout();

    }, []);

    const renderWidgetService = new RenderWidgetService(widgets);
    return (
        <Fragment>
            {appState?.widgets.map((child) => {
                return renderWidgetService.createComponent(child, appState.requestContext);
            })}
        </Fragment>
    )
}

export default App;

function renderScripts(response: PageLayoutServiceResponse, rootElement: HTMLElement) {
    response.Scripts.forEach((script) => {
        const scriptElement = document.createElement('script');
        if (script.Source) {
            if (script.Source[0] === '/') {
                script.Source = RootUrlService.getUrl() + script.Source.substring(1);
            }

            scriptElement.setAttribute('src', script.Source);
        }

        script.Attributes.forEach((attribute) => {
            scriptElement.setAttribute(attribute.Key, attribute.Value);
        });

        if (script.Value) {
            scriptElement.innerText = script.Value;
        }

        rootElement.appendChild(scriptElement);
    });
}

function renderSeoMeta(response: PageLayoutServiceResponse) {
    if (response.MetaInfo) {
        document.title = response.MetaInfo.Title;

        const metaMap = {
            "og:title": response.MetaInfo.OpenGraphTitle,
            "og:image": response.MetaInfo.OpenGraphImage,
            "og:video": response.MetaInfo.OpenGraphVideo,
            "og:type": response.MetaInfo.OpenGraphType,
            "og:description": response.MetaInfo.OpenGraphDescription,
            "og:site": response.MetaInfo.OpenGraphSite,
        }

        Object.keys(metaMap).forEach((key) => {
            const metaElement = document.createElement("meta");
            metaElement.setAttribute('property', key);
            const value = (metaMap as any)[key];
            if (value) {
                metaElement.setAttribute('content', (metaMap as any)[key]);
                document.head.appendChild(metaElement);
            }
        });

        if (response.MetaInfo.Description) {
            const metaElement = document.createElement("meta");
            metaElement.setAttribute('description', response.MetaInfo.Description);
            document.head.appendChild(metaElement);
        }

        if (response.MetaInfo.CanonicalUrl) {
            const linkElement = document.createElement("link");
            linkElement.setAttribute("rel", "canonical");
            linkElement.setAttribute("href", response.MetaInfo.CanonicalUrl);
            document.head.appendChild(linkElement);
        }
    }
}

interface AppState {
    requestContext: RequestContext;
    widgets: WidgetModel<any>[];
}
