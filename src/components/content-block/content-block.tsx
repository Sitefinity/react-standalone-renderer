import React from "react";
import { ModelBase } from "../interfaces";
import { htmlAttributes } from "../../services/render-widget-service";

export async function ContentBlock(props: ModelBase<ContentBlockEntity>) {
    // const [data, setData] = useState<State>({ content: "", attributes: {} });

    // useEffect(() => {
    //     const dataAttributes = htmlAttributes(props, null, null);
    //     if (props.Properties.WrapperCssClass)
    //         dataAttributes["class"] = props.Properties.WrapperCssClass;

    //     if (props.Properties && props.Properties.SharedContentID) {
    //         const fetchData = async () => {
    //             const res = await RestService.getSharedContent(props.Properties.SharedContentID, props.Culture)

    //             setData({ content: res.Content, attributes: dataAttributes });
    //         };

    //         fetchData();
    //     } else {
    //         setData({ content: props.Properties.Content || "", attributes: dataAttributes });
    //     }
    // }, [props]);

    let content = props.Properties.Content;

    const dataAttributes = htmlAttributes(props, null, null, props.requestContext.isEdit);
    if (props.Properties.WrapperCssClass)
        dataAttributes["class"] = props.Properties.WrapperCssClass;

    return (
        <div {...dataAttributes as any} dangerouslySetInnerHTML={{ __html: content || "" }} />
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
