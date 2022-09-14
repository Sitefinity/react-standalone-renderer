import React, { useState, useEffect } from "react";
import { ModelBase } from "../interfaces";
import { htmlAttributes } from "../../services/render-widget-service";
import { RestService } from "../../sdk/rest-service";
import { Chart, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';

export function ChartComponent(props: ModelBase<ChartEntity>) {
    const data = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181];
    const dataAttributes = htmlAttributes(props, null, null);
    return (
        <div {...dataAttributes} >
            <Chart {...dataAttributes} zoomable={props.Properties.Zoomable}>
                <ChartSeries>
                <ChartSeriesItem data={data} name="Fibonacci" />
                </ChartSeries>
            </Chart>
        </div>
    );
}

interface ChartEntity {
    Zoomable: boolean,
}
