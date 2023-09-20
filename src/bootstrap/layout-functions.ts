
import React, { useEffect, useState, Fragment } from 'react';
import { PageLayoutServiceResponse } from '../sdk/services/layout-service.response';
import { RootUrlService } from '../sdk/root-url.service';
import { LayoutService } from '../sdk/services/layout.service';
import { ModelBase } from '../components/interfaces';

export function renderScripts(response: PageLayoutServiceResponse, rootElement: HTMLElement) {
    response.Scripts.forEach((script) => {
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

        rootElement.appendChild(scriptElement);
    });
}

export function renderSeoMeta(response: PageLayoutServiceResponse) {
    if (response.MetaInfo) {
        document.title = response.MetaInfo.Title;

        const metaMap = {
            "og:title": response.MetaInfo.OpenGraphTitle,
            "og:image": response.MetaInfo.OpenGraphImage,
            "og:video": response.MetaInfo.OpenGraphVideo,
            "og:type": response.MetaInfo.OpenGraphType,
            "og:description": response.MetaInfo.OpenGraphDescription,
            "og:site": response.MetaInfo.OpenGraphSite,
        }

        Object.keys(metaMap).forEach((key) => {
            const metaElement = document.createElement("meta");
            metaElement.setAttribute('property', key);
            const value = (metaMap as any)[key];
            if (value) {
                metaElement.setAttribute('content', (metaMap as any)[key]);
                document.head.appendChild(metaElement);
            }
        });

        if (response.MetaInfo.Description) {
            const metaElement = document.createElement("meta");
            metaElement.setAttribute('description', response.MetaInfo.Description);
            document.head.appendChild(metaElement);
        }

        if (response.MetaInfo.CanonicalUrl) {
            const linkElement = document.createElement("link");
            linkElement.setAttribute("rel", "canonical");
            linkElement.setAttribute("href", response.MetaInfo.CanonicalUrl);
            document.head.appendChild(linkElement);
        }
    }
}

export async function getLazyComponents() {
    const lazy = await LayoutService.getLazyComponents(window.location.href);
    const lazyComponentsMap: {[key: string]: ModelBase<any>} = {};
    lazy.Components.forEach((component) => {
        lazyComponentsMap[component.Id] = component;
    });

    return lazyComponentsMap;
}
