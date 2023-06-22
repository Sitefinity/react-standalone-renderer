import React from "react";
import { ModelBase } from "../interfaces";
import { htmlAttributes } from "../../services/render-widget-service";
import { TextBox } from "@progress/kendo-react-inputs";

export function TextBoxComponent(props: ModelBase<TextBoxEntity>) {
    const dataAttributes = htmlAttributes(props, null, null);
    return (
        <div {...dataAttributes} >
            <TextBox value={props.Properties.Value} placeholder={props.Properties.Placeholder}></TextBox>
        </div>
    );
}

interface TextBoxEntity {
    Value: string,
    Placeholder: string,
}
