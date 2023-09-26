
import { ServiceMetadata } from '../../sdk/service-metadata';
import { RestService } from '../../sdk/rest-service';
import { GetAllArgs } from '../../sdk/services/get-all-args';
import { Fragment } from 'react';
import { LayoutService } from '@/sdk/services/layout.service';
import { ModelBase } from '@/components/interfaces';
import { RequestContext } from '@/services/request-context';
import { RenderWidgetService } from '@/services/render-widget-service';
import { notFound } from 'next/navigation';
import { ErrorResponse } from '@/sdk/services/error.response';
import { PageLayoutServiceResponse } from '@/sdk/services/layout-service.response';
import PageClient from './page-client';

export async function generateStaticParams() {
    const getAllArgs: GetAllArgs = {
        Skip: 0,
        Take: 50,
        Count: true,
        Fields: ["ViewUrl", "Renderer"],
        Type: "Telerik.Sitefinity.Pages.Model.PageNode",
    };

    await ServiceMetadata.fetch();

    const filteredItems = [];
    while (true) {
        let items = await RestService.getItems(getAllArgs);
        let response = items.Items;
        if (response.length === 0) {
            break;
        }

        let filtered = response.filter(x => x["Renderer"] === 'React').map(x => x["ViewUrl"]);
        if (filtered.length > 0) {
            filteredItems.push(...filtered);
        }

        getAllArgs.Skip = (getAllArgs.Skip as number) + (getAllArgs.Take as number);
    }

    return filteredItems.map((relativeUrl) => {
        return {
            slug: relativeUrl.split('/').splice(1),
        }
    });
}

interface AppState {
    culture: string;
    siteId: string;
    content: ModelBase<any>[];
    id: string;
    requestContext: RequestContext
}

interface PageParams {
    params: {
        slug: string[]
    },
    searchParams: { [key:string]: string }
}

// export async function generateMetadata({ params, searchParams }: PageParams, parent: ResolvingMetadata): Promise<Metadata> {
//     await ServiceMetadata.fetch();

//     const actionParam = searchParams['sfaction'];
//     const layoutOrError = await LayoutService.get(params.slug.join("/"), actionParam);

//     const errorResponse = layoutOrError as ErrorResponse;
//     if (errorResponse.error && errorResponse.error.code) {
//         if (errorResponse.error.code === "NotFound") {
//             return notFound();
//         }

//         throw errorResponse.error.code;
//     }
//     const layout = layoutOrError as PageLayoutServiceResponse;

//     const metadata: Metadata = {
//         title: layout.MetaInfo.Title,
//         alternates: {
//             canonical: layout.MetaInfo.CanonicalUrl,
//         }
//     }

//     if (layout.MetaInfo.OpenGraphType) {
//         metadata.openGraph = {
//             title: layout.MetaInfo.OpenGraphTitle,
//             description: layout.MetaInfo.OpenGraphDescription,
//             images: layout.MetaInfo.OpenGraphImage,
//             videos: layout.MetaInfo.OpenGraphVideo,
//             type: layout.MetaInfo.OpenGraphType as any,
//             siteName: layout.MetaInfo.OpenGraphSite
//         };
//     }

//     return metadata;
// }

export default async function Page({ params, searchParams }: PageParams) {
    await ServiceMetadata.fetch();

    const actionParam = searchParams['sfaction'];
    const layoutOrError = await LayoutService.get(params.slug.join("/"), actionParam);

    const errorResponse = layoutOrError as ErrorResponse;
    if (errorResponse.error && errorResponse.error.code) {
        if (errorResponse.error.code === "NotFound") {
            return notFound();
        }

        throw errorResponse.error.code;
    }

    const layout = layoutOrError as PageLayoutServiceResponse;

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

    return (
        <Fragment>
            <PageClient layout={layout} />
            {appState.content.map((child) => {
                return RenderWidgetService.createComponent(child, appState.requestContext);
            })}
        </Fragment>
    )
}
