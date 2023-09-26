import {OffsetSize} from '@/app/cms/styling/offset-size';
import {VerticalOffsetStyle} from '@/app/cms/styling/vertical-offset-style';

export interface OffsetStyle extends VerticalOffsetStyle {
    Left: OffsetSize;
    Right: OffsetSize;
}
