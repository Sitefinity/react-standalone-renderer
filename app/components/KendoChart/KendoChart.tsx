import React from 'react';
import {ModelBase} from '@/app/interfaces';
import {htmlAttributes} from '@/app/cms/services/render-widget-service';

import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisTitle,
    ChartCategoryAxisItem,
    ChartLegend,
    ChartTooltip,
} from '@progress/kendo-react-charts';

export function ChartComponent(props: ModelBase<ChartEntity>) {
    const [firstSeries, secondSeries, thirdSeries, fourthSeries] = [
        [100, 123, 234, 343],
        [120, 67, 231, 196],
        [45, 124, 189, 143],
        [87, 154, 210, 215],
    ];
    const categories = ['Q1', 'Q2', 'Q3', 'Q4'];
    const dataAttributes = htmlAttributes(props, null, null);
    return (
        <div {...dataAttributes}>
            <Chart>
                <ChartTooltip />
                <ChartLegend position="top" orientation="horizontal" visible />
                <ChartTitle text={props.Properties.ChartTitle} />
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem categories={categories}>
                        <ChartCategoryAxisTitle text={props.Properties.ChartCategoryAxisTitle} />
                    </ChartCategoryAxisItem>
                </ChartCategoryAxis>
                <ChartSeries>
                    <ChartSeriesItem
                        type={props.Properties.SeriesType}
                        gap={2}
                        spacing={0.25}
                        data={firstSeries}
                        name={props.Properties.FirstSeriesName}
                    />
                    <ChartSeriesItem
                        type={props.Properties.SeriesType}
                        data={secondSeries}
                        name={props.Properties.SecondSeriesName}
                    />
                    <ChartSeriesItem
                        type={props.Properties.SeriesType}
                        data={thirdSeries}
                        name={props.Properties.ThirdSeriesName}
                    />
                    <ChartSeriesItem
                        type={props.Properties.SeriesType}
                        data={fourthSeries}
                        name={props.Properties.FourthSeriesName}
                    />
                </ChartSeries>
            </Chart>
        </div>
    );
}

interface ChartEntity {
    ShowLegend: true;
    ChartTitle: string;
    ChartCategoryAxisTitle: string;
    SeriesType: 'column';
    FirstSeriesName: string;
    SecondSeriesName: string;
    ThirdSeriesName: string;
    FourthSeriesName: string;
}
