import React, {useEffect, useState} from 'react';
import {SdkItem} from '@/app/cms/sdk/dto/sdk-item';
import {RestService} from '@/app/cms/sdk/rest-service';
import {ContentListModelDetail} from '@/app/components/ContentList/Detail/ContentListDetailModel';

export function ContentListDetail(props: {detailModel: ContentListModelDetail}) {
    const [data, setData] = useState<State>();
    const model = props.detailModel;

    let queryParams: {[key: string]: string} = {};
    new URLSearchParams(window.location.search).forEach((val, key) => {
        queryParams[key] = val;
    });

    let item$: Promise<SdkItem>;
    if (queryParams.hasOwnProperty('sf-content-action')) {
        item$ = RestService.getItemWithStatus(
            model.DetailItem.ItemType,
            model.DetailItem.Id,
            model.DetailItem.ProviderName,
            queryParams,
        );
    } else {
        item$ = RestService.getItem(model.DetailItem.ItemType, model.DetailItem.Id, model.DetailItem.ProviderName);
    }

    useEffect(() => {
        item$.then((dataItem) => {
            let attributes: {[key: string]: string} = {};
            if (model.Attributes) {
                model.Attributes.forEach((pair) => {
                    attributes[pair.Key] = pair.Value;
                });
            }

            let detailViewModel: State = {
                Attributes: attributes,
                ViewName: model.ViewName,
                DetailItem: dataItem,
            };

            setData(detailViewModel);
        });
    }, [props.detailModel]);

    return (
        <div {...(data?.Attributes as any)}>
            {data?.ViewName === 'News' && (
                <h3>
                    <span>{data?.DetailItem.Title}</span>
                </h3>
            )}
        </div>
    );
}

interface State {
    ViewName: string;
    DetailItem: SdkItem;
    Attributes: {[key: string]: string};
}
