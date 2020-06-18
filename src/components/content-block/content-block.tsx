import React, { useState, useEffect } from "react";
import { ModelBase } from "../interfaces";
import { htmlAttributes } from "../../services/render-widget-service";
import { RestService } from "../../sdk/rest-service";

export function ContentBlock(props: ModelBase<ContentBlockEntity>) {
    const [data, setData] = useState<State>({ content: "", attributes: {} });

    useEffect(() => {
        const dataAttributes = htmlAttributes(props, null, null);
        if (props.Properties.WrapperCssClass)
            dataAttributes["class"] = props.Properties.WrapperCssClass;
        
        if (props.Properties && props.Properties.SharedContentID) {
            const fetchDdata = async () => {
                const res = await RestService.getSharedContent(props.Properties.SharedContentID, props.Culture)

                setData({ content: res.Content, attributes: dataAttributes });
            };

            fetchDdata();
        } else {
            setData({ content: props.Properties.Content || "", attributes: dataAttributes });
        }
    }, [props.Properties]);

    function createMarkup(content: string) {
        return {
            __html: content
        }   
    }

    return (
        <div {...data.attributes as any} dangerouslySetInnerHTML={createMarkup(data.content)} />
    );
}

interface State {
    content: string;
    attributes: { [key: string]: string }
}

export class ContentBlockEntity {
    Content!: string;
    ExcludeFromSearchIndex!: boolean;
    ProviderName!: string;
    SharedContentID!: string;
    WrapperCssClass!: string;
}
