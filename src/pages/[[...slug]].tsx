
import { RenderContext } from '../services/render-context';
import { LayoutService } from '../sdk/services/layout.service';
import { ServiceMetadata } from '../sdk/service-metadata';
import { App } from '../App';
import 'bootstrap/dist/css/bootstrap.css';
import '@progress/kendo-theme-default/dist/all.css';

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
    const slugs = ['/hackaton-page']
  
    return {
      paths: slugs.map((slug) => {
        return {
          params: {
            slug: slug.split('/').splice(1),
          },
        }
      }),
      fallback: false,
    }
  }