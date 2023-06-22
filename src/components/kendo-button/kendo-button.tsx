import React from "react";
import { ModelBase } from "../interfaces";
import { htmlAttributes } from "../../services/render-widget-service";
import { Button } from "@progress/kendo-react-buttons";

export function ButtonComponent(props: ModelBase<ButtonEntity>) {
    const dataAttributes = htmlAttributes(props, null, null);
    return (
        <div {...dataAttributes} >
            <Button themeColor={props.Properties.ThemeColor} icon={props.Properties.Icon}>{props.Properties.Text}</Button>
        </div>
    );
}

interface ButtonEntity {
    Text: string,
    Icon: string,
    ThemeColor: 'primary',
}
