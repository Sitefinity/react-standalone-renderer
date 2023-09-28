import { SdkItem } from "../../../../framework/sdk/dto/sdk-item";
import { CardsListModel } from "./cards-list-model";
import React from "react"

export function CardsList(props: { model: CardsListModel }) {
    const model = props.model;

    function onDetailItemOpenHandler(event: React.MouseEvent<HTMLAnchorElement>, item: SdkItem) {
        event.preventDefault();
        event.stopPropagation();

        model.OnDetailsOpen(item);
    }

    return (
        <div {...model.Attributes as any}>
            {model.Items.map((item) => {
                return (<div className="x">
                    <div className="card h-100">
                        <img className={item.Image.Css} src={item.Image.Url} alt={item.Image.AlternativeText} title={item.Image.Title} />
                        <div className="card-body">
                            <h5 className={item.Title.Css}>
                                {model.OpenDetails ?
                                    (<a href="#" onClick={(e) => onDetailItemOpenHandler(e, item.Original)}>{item.Title.Value}</a>) :
                                    (item.Title.Value)
                                }
                            </h5>
                            {item.Text && <p className={item.Text.Css}>{item.Text.Value}</p>}
                        </div>
                    </div>
                </div>)
            })}
        </div>
    )
}
