import React, { Fragment } from "react"
import { SdkItem } from "../../../../sdk/dto/sdk-item";
import { ListWithSummaryModel } from "./list-with-summary-model";

export function ListWithSummary(props: { model: ListWithSummaryModel }) {
    const model = props.model;

    function onDetailItemOpenHandler(event: React.MouseEvent<HTMLAnchorElement>, item: SdkItem) {
        event.preventDefault();
        event.stopPropagation();

        model.OnDetailsOpen(item);
    }

    return (
        <Fragment>
            {model.Items.map((item, index) => {
                return (
                    <Fragment>
                        {index !== 0 && <hr />}
                        <div>
                            {item.Title &&
                                <h5 className={item.Title.Css}>
                                    {model.OpenDetails ?
                                        (<a href="#" onClick={(e) => onDetailItemOpenHandler(e, item.Original)}>{item.Title.Value}</a>) :
                                        (item.Title.Value)
                                    }
                                </h5>}
                            {item.PublicationDate &&
                                <p className={item.PublicationDate.Css}>
                                    <small>{item.PublicationDate.Value}</small>
                                </p>
                            }
                            {item.Text && <p className={item.Text.Css}>{item.Text.Value}</p>}
                        </div>
                    </Fragment>
                )
            })}
        </Fragment>
    )
}

