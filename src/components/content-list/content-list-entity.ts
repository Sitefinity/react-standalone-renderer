import { ContentListSettings } from "../../editor/designer-entities/content-list-settings";
import { MixedContentContext } from "../../editor/designer-entities/mixed-content-context";
import { CombinedFilter } from "../../sdk/filters/combined-filter";
import { FilterClause } from "../../sdk/filters/filter-clause";
import { RelationFilter } from "../../sdk/filters/relation-filter";

export interface ContentListEntity {
    SelectedItems: MixedContentContext;
    SfViewName: string;
    ListSettings: ContentListSettings;
    ListFieldMapping: Array<{ Name: string, FriendlyName: string }>;
    OrderBy: string;
    DetailPageMode: "SamePage" | "ExistingPage",
    DetailPage: MixedContentContext;
    SfDetailViewName: string;
    ContentViewDisplayMode: "Automatic" | "Master" | "Detail";
    SelectionGroupLogicalOperator: "AND" | "OR";
    FilterExpression: CombinedFilter | FilterClause | RelationFilter | null;
    SortExpression: string;
    SelectExpression: string;
    DisableCanonicalUrlMetaTag: boolean;
    PagerMode: "URLSegments" | "QueryParameter";
    PagerTemplate: string;
    PagerQueryTemplate: string;
    CssClasses: Array<{ FieldName: string, CssClass: string }>;
    ShowListViewOnChildDetailsView: boolean;
    ShowDetailsViewOnChildDetailsView: boolean;
    ShowListViewOnEmptyParentFilter: boolean;
    Attributes: { [key: string]: Array<{ Key: string, Value: string}> };
}
