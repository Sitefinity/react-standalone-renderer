import {FilterClause} from '@/app/cms/sdk/filters/filter-clause';
import {RelationFilter} from '@/app/cms/sdk/filters/relation-filter';

export interface CombinedFilter {
    Operator: 'AND' | 'OR' | 'NOT';
    ChildFilters: Array<CombinedFilter | FilterClause | RelationFilter>;
}
