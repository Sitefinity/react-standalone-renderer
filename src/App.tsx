
import React, { useEffect, useState, Fragment } from 'react';
import { ModelBase } from './components/interfaces';
import { RendererContractImpl } from './editor/renderer-contract';
import { RenderContext } from './services/render-context';
import { RenderWidgetService } from './services/render-widget-service';
import { RequestContext } from './services/request-context';
import { LayoutService } from './sdk/services/layout.service';
import { ServiceMetadata, ServiceMetadataDefinition } from './sdk/service-metadata';
import { PageLayoutServiceResponse } from './sdk/services/layout-service.response';
import { renderSeoMeta, renderScripts, getLazyComponents } from './bootstrap/layout-functions'

interface AppState {
    culture: string;
    siteId: string;
    content: ModelBase<any>[];
    id: string;
    requestContext: RequestContext
}

interface Props {
    metadata: ServiceMetadataDefinition | undefined
    layout: PageLayoutServiceResponse | undefined
}

export function App({ metadata, layout: prefetchedLayout }: Props) {
    const [pageData, setPageData] = useState<AppState>();
    useEffect(() => {
        const getLayout = async () => {
            if (!metadata) {
                await ServiceMetadata.fetch();
            }

            let layout = prefetchedLayout;
            if (!layout) {
                const urlParams = new URLSearchParams(window.location.search);
                const actionParam = urlParams.get('sfaction');
                layout = await LayoutService.get(window.location.pathname, actionParam);
            }

            getRootElement().classList.add("container-fluid");

            let appState : AppState = {
                culture: layout.Culture,
                siteId: layout.SiteId,
                content: layout.ComponentContext.Components,
                id: layout.Id,
                requestContext: {
                    DetailItem: layout.DetailItem,
                    LazyComponentMap: null,
                }
            };

            if (RenderContext.isEdit()) {
                waitForRender(layout);
            } else if (layout.ComponentContext.HasLazyComponents) {
                appState.requestContext.LazyComponentMap = await getLazyComponents();
            }

            setPageData(appState);
            renderSeoMeta(layout);
            renderScripts(layout, getRootElement());
        }

        getLayout();

    }, [metadata, prefetchedLayout]);

    return (
        <Fragment>
            {pageData?.content.map((child) => {
                return RenderWidgetService.createComponent(child, pageData.requestContext);
            })}
        </Fragment>
    )
}

export default App;

function getRootElement(): HTMLElement {
    return (document.getElementById("root") || document.getElementById("__next")) as HTMLElement;
}

function waitForRender(layout: PageLayoutServiceResponse) {
    const timeout = 2000;
    const start = new Date().getTime();
    const handle = window.setInterval(() => {

        document.body.setAttribute('data-sfcontainer', '')
        getRootElement().setAttribute('data-sfcontainer', 'Body');
        // we do not know the exact time when react has finished the rendering process.
        // thus we check every 100ms for dom changes. A proper check would be to see if every single
        // component is rendered
        const timePassed = new Date().getTime() - start;
        if ((layout.ComponentContext.Components.length > 0 && getRootElement().childElementCount > 0) || layout.ComponentContext.Components.length === 0 || timePassed > timeout) {
            window.clearInterval(handle);

            (window as any)["rendererContract"] = new RendererContractImpl();
            window.dispatchEvent(new Event('contractReady'));
        }
    }, 1000);
}

