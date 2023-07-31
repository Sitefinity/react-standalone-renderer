
import { RenderContext } from '../services/render-context';
import { LayoutService } from '../sdk/services/layout.service';
import { ServiceMetadata } from '../sdk/service-metadata';
import { App } from '../App';
import 'bootstrap/dist/css/bootstrap.css';
import '@progress/kendo-theme-default/dist/all.css';
import { RestService } from '../sdk/rest-service';
import { GetAllArgs } from '../sdk/services/get-all-args';

export default App;

type Params = {
    params: {
        slug: string[]
    }
}

export async function getStaticProps({ params }: Params) {
    const path = '/' + params.slug.join('/');
    const metadata = await ServiceMetadata.fetch();
    const layout = await LayoutService.get(path, RenderContext.isEdit());

    return {
        props: {
            metadata,
            layout
        },
    }
}

export async function getStaticPaths() {
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

        let filtered = response.filter(x => x["Renderer"] == 'React').map(x => x["ViewUrl"]);
        if (filtered.length > 0) {
            filteredItems.push(...filtered);
        }

        getAllArgs.Skip = (getAllArgs.Skip as number) + (getAllArgs.Take as number);
    }

    return {
        paths: filteredItems.map((slug) => {
            return {
                params: {
                    slug: slug.split('/').splice(1),
                },
            }
        }),
        fallback: false,
    }
}
