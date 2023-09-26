'use client';

import React from 'react';
import {ModelBase} from '@/app/interfaces';
import {PageLayoutServiceResponse} from '@/app/cms/sdk/services/layout-service.response';
import {ServiceMetadataDefinition} from '@/app/cms/sdk/service-metadata';
import {RenderWidgetService} from '@/app/cms/services/render-widget-service';
import {RequestContext} from '@/app/cms/services/request-context';
import {usePageLayout} from './hooks/usePageLayout';

export interface AppState {
    culture: string;
    siteId: string;
    content: ModelBase<any>[];
    id: string;
    requestContext: RequestContext;
}

type Props = {
    metadata: ServiceMetadataDefinition | undefined;
    layout: PageLayoutServiceResponse | undefined;
};

export function Page({metadata, layout}: Props) {
    const [pageData, setPageData] = usePageLayout(metadata, layout);

    return (
        <>
            {pageData?.content?.map((child) => {
                return RenderWidgetService.createComponent(child, pageData.requestContext);
            })}
        </>
    );
}

export default Page;
