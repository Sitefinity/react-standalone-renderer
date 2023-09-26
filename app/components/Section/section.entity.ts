import {LabelModel} from '@/app/components/Section/LabelModel';

import {BackgroundStyle} from '@/app/cms/styling/background-style';
import {CustomCssModel} from '@/app/cms/styling/custom-css-model';
import {OffsetStyle} from '@/app/cms/styling/offset-style';
import {SimpleBackgroundStyle} from '@/app/cms/styling/simple-background-style';

export interface SectionEntity {
    ColumnsCount: number;
    CssSystemGridSize: number;
    ColumnProportionsInfo: string[];
    SectionPadding: OffsetStyle;
    SectionMargin: OffsetStyle;
    SectionBackground: BackgroundStyle;
    ColumnsPadding: {[key: string]: OffsetStyle};
    ColumnsBackground: {[key: string]: SimpleBackgroundStyle};
    CustomCssClass: {[key: string]: CustomCssModel};
    Labels: {[key: string]: LabelModel};
    Attributes: {[key: string]: Array<{Key: string; Value: string}>};
}
