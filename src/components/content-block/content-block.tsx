import React, { useState, useEffect } from "react";
import { RestService } from "../../framework/sdk/rest-service";
import { WidgetContext } from "../../framework/widgets/widget-metadata";
import { htmlAttributes } from "../../framework/widgets/utils";

export function ContentBlock(props: WidgetContext<ContentBlockEntity>) {
    const [data, setData] = useState<State>({ content: "", attributes: {} });

    useEffect(() => {
        const dataAttributes = htmlAttributes(props);
        if (props.model.Properties.WrapperCssClass)
            dataAttributes["class"] = props.model.Properties.WrapperCssClass;

        if (props.model.Properties && props.model.Properties.SharedContentID) {
            const fetchDdata = async () => {
                const res = await RestService.getSharedContent(props.model.Properties.SharedContentID, props.requestContext.culture)

                setData({ content: res.Content, attributes: dataAttributes });
            };

            fetchDdata();
        } else {
            setData({ content: props.model.Properties.Content || "", attributes: dataAttributes });
        }
    }, [props]);

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
