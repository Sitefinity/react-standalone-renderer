import { CONFIG } from "../../config";
import { RootUrlService } from "../root-url.service";
import { PageLayoutServiceResponse } from "./layout-service.response";
import { LazyComponentsResponse } from "./lazy-components.response";

export class LayoutService {

    public static get(pagePathAndQuery: string, edit: boolean): Promise<PageLayoutServiceResponse> {
        let url = `/api/default/pages/Default.Model(url=@param)?@param='${encodeURIComponent(pagePathAndQuery)}'`;
        if (edit) {
            url += "&sfaction=edit";
        }

        url = RootUrlService.getUrl() + url.substring(1);

        return fetch(url).then(x => x.json());
    }

    public static getLazyComponents(pagePathAndQuery: string): Promise<LazyComponentsResponse> {
        var headers: {[key: string]: string} = {};
        var referrer = document.referrer;
        if (referrer && referrer.length > 0) {
            headers["SF_URL_REFERER"] = referrer;
        }
        else {
            headers["SF_NO_URL_REFERER"] = 'true';
        }

        let serviceUrl = `${RootUrlService.getServiceUrl()}Default.LazyComponents(url=@param)?@param='${encodeURIComponent(pagePathAndQuery)}'`;
        serviceUrl += "&correlationId=" + (window as any)["sfCorrelationId"];

        return fetch(serviceUrl, { headers }).then(x => x.json());
    }
}

