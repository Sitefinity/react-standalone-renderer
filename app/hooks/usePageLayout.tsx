import {useEffect, useState} from 'react';

import {AppState} from '@/app/page';
import {getRootElement} from '@/app/utils/getRootElement';
import {LayoutService} from '@/app/cms/sdk/services/layout.service';
import {ModelBase} from '@/app/interfaces';
import {PageLayoutServiceResponse} from '@/app/cms/sdk/services/layout-service.response';
import {RenderContext} from '@/app/cms/services/render-context';
import {RendererContractImpl} from '@/app/cms/editor/renderer-contract';
import {renderScripts} from '@/app/utils/renderScripts';
import {renderSeoMeta} from '@/app/utils/renderSeoMeta';
import {ServiceMetadata, ServiceMetadataDefinition} from '@/app/cms/sdk/service-metadata';

type HookProps = ServiceMetadataDefinition | undefined;
type HookLayout = PageLayoutServiceResponse | undefined;

export const usePageLayout = (metadata: HookProps, layout: HookLayout): [AppState | undefined, Function] => {
    const [pageData, setPageData] = useState<AppState>();

    useEffect(() => {
        const f = async () => {
            if (!metadata) {
                await ServiceMetadata.fetch();
            } else {
                ServiceMetadata.serviceMetadataCache = metadata;
            }

            if (!layout) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                layout = await LayoutService.get(window.location.pathname, RenderContext.isEdit());
            }

            if (!layout?.ComponentContext?.HasLazyComponents || RenderContext.isEdit()) {
                setPageData({
                    culture: layout.Culture,
                    siteId: layout.SiteId,
                    content: layout.ComponentContext?.Components,
                    id: layout.Id,
                    requestContext: {
                        DetailItem: layout.DetailItem,
                        LazyComponentMap: null,
                    },
                });
            }

            getRootElement().classList.add('container-fluid');

            if (RenderContext.isEdit()) {
                const timeout = 2000;
                const start = new Date().getTime();
                const handle = window.setInterval(() => {
                    if (!layout) return;

                    document.body.setAttribute('data-sfcontainer', '');

                    getRootElement().setAttribute('data-sfcontainer', 'Body');

                    // we do not know the exact time when react has finished the rendering process.
                    // thus we check every 100ms for dom changes. A proper check would be to see if every single
                    // component is rendered
                    const timePassed = new Date().getTime() - start;

                    if (
                        (layout.ComponentContext.Components.length > 0 && getRootElement().childElementCount > 0) ||
                        layout.ComponentContext.Components.length === 0 ||
                        timePassed > timeout
                    ) {
                        window.clearInterval(handle);
                        (window as any)['rendererContract'] = new RendererContractImpl();
                        window.dispatchEvent(new Event('contractReady'));
                    }
                }, 1000);
            } else if (layout?.ComponentContext?.HasLazyComponents && !RenderContext.isEdit()) {
                const lazy = await LayoutService.getLazyComponents(window.location.href);
                const lazyComponentsMap: {[key: string]: ModelBase<any>} = {};

                lazy.Components.forEach((component) => {
                    lazyComponentsMap[component.Id] = component;
                });

                setPageData({
                    culture: layout.Culture,
                    siteId: layout.SiteId,
                    content: layout.ComponentContext.Components,
                    id: layout.Id,
                    requestContext: {
                        DetailItem: layout.DetailItem,
                        LazyComponentMap: lazyComponentsMap,
                    },
                });
            }

            renderSeoMeta(layout);
            renderScripts(layout);
        };

        f();
    }, [metadata, layout]);

    return [pageData, setPageData];
};
