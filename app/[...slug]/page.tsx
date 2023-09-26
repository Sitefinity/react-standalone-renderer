'use client';

export const dynamicParams = false;

import React from 'react';

import {ModelBase} from '@/app/interfaces';
import {PageLayoutServiceResponse} from '@/app/cms/sdk/services/layout-service.response';
import {RenderWidgetService} from '@/app/cms/services/render-widget-service';
import {RequestContext} from '@/app/cms/services/request-context';
import {ServiceMetadataDefinition} from '@/app/cms/sdk/service-metadata';
import {usePageLayout} from '@/app/hooks/usePageLayout';

import 'bootstrap/dist/css/bootstrap.css';
import '@progress/kendo-theme-default/dist/all.css';

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

export default function Page({metadata, layout}: Props) {
    const [pageData, setPageData] = usePageLayout(metadata, layout);

    return (
        <>
            {pageData?.content?.map((child) => {
                return RenderWidgetService.createComponent(child, pageData.requestContext);
            })}
        </>
    );
}
