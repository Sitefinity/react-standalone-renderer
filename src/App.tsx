
import React, { useEffect, useState, Fragment } from 'react';
import { ModelBase, PageContentServiceResponse } from './components/interfaces';
import { useLocation } from 'react-router-dom';
import { RendererContractImpl } from './editor/renderer-contract';
import { RenderContext } from './services/render-context';
import { RenderWidgetService } from './services/render-widget-service';
import { RequestContext } from './services/request-context';
import { LayoutService } from './sdk/services/layout.service';
import { ServiceMetadata } from './sdk/service-metadata';
import { PageLayoutServiceResponse } from './sdk/services/layout-service.response';
import { CONFIG } from './config';

export interface AppState {
    culture: string;
    siteId: string;
    content: ModelBase<any>[];
    id: string;
    requestContext: RequestContext
}

export function App() {
    const [pageData, setPageData] = useState<AppState>();
    const location = useLocation();

    useEffect(() => {
        const getLayout = async () => {
            
            await ServiceMetadata.fetch();
            const response = await LayoutService.get(window.location.href);
            if (!response.ComponentContext.HasLazyComponents || RenderContext.isEdit()) {
                setPageData({
                    culture: response.Culture,
                    siteId: response.SiteId,
                    content: response.ComponentContext.Components,
                    id: response.Id,
                    requestContext: {
                        DetailItem: response.DetailItem,
                        LazyComponentMap: null,
                    }
                });
            }

            window.document.body.classList.add("container-fluid");
            if (RenderContext.isEdit()) {
                const timeout = 2000;
                const start = new Date().getTime();
                const handle = window.setInterval(() => {
                    if (!response)
                        return;
                    
                    window.document.body.setAttribute('data-sfcontainer', 'Body');
                    // we do not know the exact time when react has finished the rendering process.
                    // thus we check every 100ms for dom changes. A proper check would be to see if every single
                    // component is rendered
                    const timePassed = new Date().getTime() - start;
                    if ((response.ComponentContext.Components.length > 0 && window.document.body.childElementCount > 0) || response.ComponentContext.Components.length === 0 || timePassed > timeout) {
                        window.clearInterval(handle);
                        
                        (window as any)["rendererContract"] = new RendererContractImpl();
                        window.dispatchEvent(new Event('contractReady'));
                    }
                }, 1000);
            } else if (response.ComponentContext.HasLazyComponents && !RenderContext.isEdit()) {
                const lazy = await LayoutService.getLazyComponents(window.location.href);
                const lazyComponentsMap: {[key: string]: ModelBase<any>} = {};
                lazy.Components.forEach((component) => {
                    lazyComponentsMap[component.Id] = component;
                });

                setPageData({
                    culture: response.Culture,
                    siteId: response.SiteId,
                    content: response.ComponentContext.Components,
                    id: response.Id,
                    requestContext: {
                        DetailItem: response.DetailItem,
                        LazyComponentMap: lazyComponentsMap,
                    }
                });
            }

            renderSeoMeta(response);
            renderScripts(response);
        }

        getLayout();

    }, []);

    return (
        <Fragment>
            {pageData?.content.map((child) => {
                return RenderWidgetService.createComponent(child, pageData.requestContext);
            })}
        </Fragment>
    )
}

export default App;

function renderScripts(response: PageLayoutServiceResponse) {
    response.Scripts.forEach((script) => {
        const scriptElement = document.createElement('script');
        if (script.Source) {
            scriptElement.setAttribute('src', script.Source);
        }

        script.Attributes.forEach((attribute) => {
            scriptElement.setAttribute(attribute.Key, attribute.Value);
        });

        if (script.Value) {
            scriptElement.innerText = script.Value;
        }

        document.body.appendChild(scriptElement);
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