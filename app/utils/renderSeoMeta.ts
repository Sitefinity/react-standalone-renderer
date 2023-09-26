import {PageLayoutServiceResponse} from '@/app/cms/sdk/services/layout-service.response';

export const renderSeoMeta = function (response: PageLayoutServiceResponse) {
    if (response.MetaInfo) {
        document.title = response.MetaInfo.Title;

        const metaMap = {
            'og:title': response.MetaInfo.OpenGraphTitle,
            'og:image': response.MetaInfo.OpenGraphImage,
            'og:video': response.MetaInfo.OpenGraphVideo,
            'og:type': response.MetaInfo.OpenGraphType,
            'og:description': response.MetaInfo.OpenGraphDescription,
            'og:site': response.MetaInfo.OpenGraphSite,
        };

        Object.keys(metaMap).forEach((key) => {
            const metaElement = document.createElement('meta');
            metaElement.setAttribute('property', key);
            const value = (metaMap as any)[key];
            if (value) {
                metaElement.setAttribute('content', (metaMap as any)[key]);
                document.head.appendChild(metaElement);
            }
        });

        if (response.MetaInfo.Description) {
            const metaElement = document.createElement('meta');
            metaElement.setAttribute('description', response.MetaInfo.Description);
            document.head.appendChild(metaElement);
        }

        if (response.MetaInfo.CanonicalUrl) {
            const linkElement = document.createElement('link');
            linkElement.setAttribute('rel', 'canonical');
            linkElement.setAttribute('href', response.MetaInfo.CanonicalUrl);
            document.head.appendChild(linkElement);
        }
    }
};
