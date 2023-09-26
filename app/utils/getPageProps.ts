import {LayoutService} from '@/app/cms/sdk/services/layout.service';
import {RenderContext} from '@/app/cms/services/render-context';
import {ServiceMetadata} from '@/app/cms/sdk/service-metadata';

type Params = {
    params: {
        slug: string[];
    };
};

export const getPageProps = async function ({params}: Params) {
    const path = '/' + params.slug.join('/');
    const metadata = await ServiceMetadata.fetch();
    const layout = await LayoutService.get(path, RenderContext.isEdit());

    return {
        props: {
            metadata,
            layout,
        },
    };
};
