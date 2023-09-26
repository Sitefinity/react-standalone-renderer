import {CombinedFilter} from '@/app/cms/sdk/filters/combined-filter';
import {FilterClause} from '@/app/cms/sdk/filters/filter-clause';

export interface RelationFilter {
    Name: string;
    Operator: 'Any' | 'All';
    ChildFilter: FilterClause | CombinedFilter | RelationFilter;
}
