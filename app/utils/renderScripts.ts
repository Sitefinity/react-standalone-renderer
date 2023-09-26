import {PageLayoutServiceResponse} from '@/app/cms/sdk/services/layout-service.response';
import {RootUrlService} from '@/app/cms/sdk/root-url.service';
import {getRootElement} from './getRootElement';

export const renderScripts = function (response: PageLayoutServiceResponse) {
    response.Scripts?.forEach((script) => {
        const scriptElement = document.createElement('script');
        if (script.Source) {
            if (script.Source[0] === '/') {
                script.Source = RootUrlService.getUrl() + script.Source.substring(1);
            }

            scriptElement.setAttribute('src', script.Source);
        }

        script.Attributes.forEach((attribute) => {
            scriptElement.setAttribute(attribute.Key, attribute.Value);
        });

        if (script.Value) {
            scriptElement.innerText = script.Value;
        }

        getRootElement().appendChild(scriptElement);
    });
};
