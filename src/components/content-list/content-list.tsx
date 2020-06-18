import React, { useEffect, useState } from "react";
import { EditorMetadata } from "../../editor/editor-metadata";
import { PageItem } from "../../sdk/dto/page-item";
import { SdkItem } from "../../sdk/dto/sdk-item";
import { RestSdkTypes, RestService } from "../../sdk/rest-service";
import { DetailItem } from "../../sdk/services/detail-item";
import { htmlAttributes } from "../../services/render-widget-service";
import { ModelBase } from "../interfaces";
import { ContentListEntity } from "./content-list-entity";
import { ContentListRestService } from "./content-list-rest.service";
import { ContentListDetail } from "./detail/content-list-detail";
import { ContentListModelDetail } from "./detail/content-list-detail-model";
import { ContentListMaster } from "./master/content-list-master";
import { ContentListModelMaster } from "./master/content-list-master-model";
const editorMetadata: EditorMetadata = {
    Title: "Content list",
    EmptyIconText: "Select content",
    EmptyIcon: "plus-circle",
};

export function ContentList(props: ModelBase<ContentListEntity>) {
    const attributes = htmlAttributes(props, editorMetadata, null);
    const [data, setData] = useState<State>({ detailModel: null, listModel: null, attributes });
    
    function handleDetailView(detailItem: DetailItem) {
        const contentListAttributes = getAttributesWithClasses(props, "Details view", null);
    
        const detailModel = {
            Attributes: contentListAttributes,
            DetailItem: detailItem,
            ViewName: props.Properties.SfDetailViewName
        } as ContentListModelDetail;

        setData({ detailModel, listModel: null, attributes });
    }

    function handleListView() {
        const listFieldMapping: {[key: string]: string} = {};
        props.Properties.ListFieldMapping.forEach((entry) => {
            listFieldMapping[entry.FriendlyName] = entry.Name;
        });

        const fieldCssClassMap: {[key: string]: string} = {};
        props.Properties.CssClasses.forEach((entry) => {
            fieldCssClassMap[entry.FieldName] = entry.CssClass;
        });

        const items = ContentListRestService.getItems(props.Properties, props.requestContext.DetailItem);

        let contentListMasterModel: ContentListModelMaster = {
            OnDetailsOpen: ((sdkItem) => {
                const selectedContent = props.Properties.SelectedItems.Content[0];
                const detailItem: DetailItem = {
                    Id: sdkItem.Id,
                    ProviderName: sdkItem.Provider,
                    ItemType: selectedContent.Type
                };
        
                if (props.Properties.DetailPageMode === "SamePage") {
                    handleDetailView(detailItem);
        
                    const newUrl = window.location.origin + window.location.pathname + sdkItem.ItemDefaultUrl + window.location.search;
                    window.history.pushState(detailItem, '', newUrl);
                } else if (props.Properties.DetailPage) {
                    RestService.getItem(RestSdkTypes.Pages, props.Properties.DetailPage.ItemIdsOrdered[0], props.Properties.DetailPage.Content[0].Variations[0].Source).then((page: SdkItem) => {
                        const newUrl = (page as PageItem).ViewUrl + sdkItem.ItemDefaultUrl;
                        window.location.href = newUrl;
                    });
                }
            }),
            OpenDetails: !(props.Properties.ContentViewDisplayMode === "Master" && props.Properties.DetailPageMode === "SamePage"),
            FieldCssClassMap: fieldCssClassMap,
            FieldMap: listFieldMapping,
            Items: items,
            ViewName: props.Properties.SfViewName as any,
            Attributes: getAttributesWithClasses(props, "Content list", "row row-cols-1 row-cols-md-3")
        };

        setData({ listModel: contentListMasterModel, detailModel: null, attributes });
    }

    props.Properties.DetailPageMode = props.Properties.DetailPageMode || "SamePage";
    props.Properties.ContentViewDisplayMode = props.Properties.ContentViewDisplayMode || "Automatic";
    props.Properties.Attributes = props.Properties.Attributes || {};
    props.Properties.CssClasses = props.Properties.CssClasses || [];
    props.Properties.ListFieldMapping = props.Properties.ListFieldMapping || [];
    props.Properties.OrderBy = props.Properties.OrderBy || "PublicationDate DESC";
    props.Properties.ListSettings = props.Properties.ListSettings || {};
    props.Properties.ListSettings.DisplayMode = props.Properties.ListSettings.DisplayMode || "All";
    props.Properties.ListSettings.ItemsPerPage = props.Properties.ListSettings.ItemsPerPage || 20;
    props.Properties.ListSettings.LimitItemsCount = props.Properties.ListSettings.LimitItemsCount || 20;
    props.Properties.SelectExpression = props.Properties.SelectExpression || "*";
    props.Properties.SelectionGroupLogicalOperator = props.Properties.SelectionGroupLogicalOperator || "AND";

    useEffect(() => {
        if (props.Properties.ContentViewDisplayMode === "Automatic") {
            if (props.requestContext.DetailItem) {
                handleDetailView(props.requestContext.DetailItem);
            } else {
                handleListView();
            }
        } else if (props.Properties.ContentViewDisplayMode === "Detail") {
            if (props.Properties.SelectedItems && props.Properties.SelectedItems.Content && props.Properties.SelectedItems.Content.length > 0) {
                const selectedContent = props.Properties.SelectedItems.Content[0];
                handleDetailView({
                    Id: props.Properties.SelectedItems.ItemIdsOrdered[0],
                    ItemType: selectedContent.Type,
                    ProviderName: selectedContent.Variations[0].Source
                });
            }
        } else if (props.Properties.ContentViewDisplayMode === "Master") {
            handleListView();
        }
    }, [props]);
    

    return (
        <div {...data.attributes as any}>
            {data.detailModel && <ContentListDetail detailModel={data.detailModel}></ContentListDetail>}
            {data.listModel && <ContentListMaster model={data.listModel}></ContentListMaster>}
        </div> 
    );
}

function getAttributesWithClasses(props: ModelBase<ContentListEntity>, fieldName: string, additiinalClasses: string | null): Array<{ Key: string, Value: string}> {
    const viewCss = props.Properties.CssClasses.find(x => x.FieldName === fieldName);

    const contentListAttributes = props.Properties.Attributes["ContentList"] || [];
    let classAttribute = contentListAttributes.find(x => x.Key === "class");
    if (!classAttribute) {
        classAttribute = {
            Key: "class",
            Value: ''
        };

        contentListAttributes.push(classAttribute);
    }

    if (viewCss) {
        classAttribute.Value += ` ${viewCss.CssClass}`;
    }

    if (additiinalClasses)
        classAttribute.Value += ` ${additiinalClasses}`;

    return contentListAttributes;
}

interface State {
    detailModel: ContentListModelDetail | null;
    listModel: ContentListModelMaster | null;
    attributes: { [key: string]: string }
}