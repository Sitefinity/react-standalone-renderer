import React from 'react';

import {EditorMetadata} from '@/app/cms/editor/editor-metadata';
import {WidgetModel} from '@/app/cms/editor/interfaces';
import {RenderContext} from '@/app/cms/services/render-context';
import {RequestContext} from '@/app/cms/services/request-context';
import {ModelBase} from '@/app/interfaces';

import {ContentBlock} from '@/app/components/ContentBlock/ContentBlock';
import {ContentList} from '@/app/components/ContentList/ContentList';
import {Section} from '@/app/components/Section/Section';
import ServerSide from '@/app/components/ServerSide/ServerSide';
import ClientSide from '@/app/components/ClientSide/ClientSide';

export const TYPES_MAP = {
    SitefinityContentBlock: ContentBlock,
    SitefinitySection: Section,
    SitefinityContentList: ContentList,
    SitefinityServerSide: ServerSide,
    SitefinityClientSide: ClientSide,
};

export class RenderWidgetService {
    public static createComponent(widgetModel: WidgetModel, requestContext: RequestContext) {
        const mappedType = (TYPES_MAP as any)[widgetModel.Name];

        if (requestContext.LazyComponentMap && requestContext.LazyComponentMap.hasOwnProperty(widgetModel.Id)) {
            widgetModel.Properties = requestContext.LazyComponentMap[widgetModel.Id].Properties;
        }

        parseProperties(widgetModel, requestContext);

        const element = React.createElement(mappedType, {key: widgetModel.Id, ...widgetModel});

        if (mappedType) {
            return element;
        } else {
            console.info(`Component ${element.props.Name} has no mapping within the CMS.`);
        }
    }
}

function parseProperties(widgetModel: WidgetModel, requestContext: RequestContext) {
    (widgetModel as any)['requestContext'] = requestContext;

    Object.keys(widgetModel.Properties).forEach((key) => {
        try {
            (widgetModel.Properties as any)[key] = JSON.parse((widgetModel.Properties as any)[key]);
        } catch {}
    });
}

export function htmlAttributes(
    widgetModel: ModelBase<any>,
    editorMetadata: EditorMetadata | null,
    error: string | null,
) {
    if (!RenderContext.isEdit()) return {};

    const attributes: any = {
        'data-sfname': widgetModel.Name,
        'data-sftitle': widgetModel.Name,
        'data-sfid': widgetModel.Id,
        'data-sfisorphaned': false,
    };
    if (editorMetadata) {
        if (editorMetadata.EmptyIcon) {
            attributes['data-sfemptyicon'] = editorMetadata.EmptyIcon;
        }

        if (editorMetadata.EmptyIconAction) {
            attributes['data-sfemptyiconaction'] = editorMetadata.EmptyIconAction;
        }

        if (editorMetadata.EmptyIconText) {
            attributes['data-sfemptyicontext'] = editorMetadata.EmptyIconText;
        }
    }

    attributes['data-sfiscontentwidget'] = widgetModel.Name != 'SitefinitySection';
    attributes['data-sfisemptyvisualhidden'] = false;
    if (error) {
        attributes['data-sferror'] = error;
    }

    return attributes;
}
