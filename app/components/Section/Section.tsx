import React, {useState, useEffect} from 'react';
import {ModelBase} from '@/app/interfaces';

import {htmlAttributes, RenderWidgetService} from '@/app/cms/services/render-widget-service';
import {RenderContext} from '@/app/cms/services/render-context';

import {RestSdkTypes, RestService} from '@/app/cms/sdk/rest-service';
import {RootUrlService} from '@/app/cms/sdk/root-url.service';

import {ImageItem} from '@/app/cms/sdk/dto/image-item';
import {VideoItem} from '@/app/cms/sdk/dto/video-item';

import {StylingConfig} from '@/app/cms/styling/styling-config';
import {StyleGenerator} from '@/app/cms/styling/style-generator.service';

import {ColumnHolder, ComponentContainer} from '@/app/components/Section/column-holder';
import {SectionHolder} from '@/app/components/Section/section-holder';
import {SectionEntity} from '@/app/components/Section/section.entity';

const ColumnNamePrefix = 'Column';
const sectionKey = 'Section';

export function Section(props: ModelBase<SectionEntity>) {
    const [data, setData] = useState<State>({Columns: [], Section: {Attributes: {}}});

    useEffect(() => {
        props.Properties.ColumnsCount = props.Properties.ColumnsCount || 1;
        props.Properties.ColumnProportionsInfo = props.Properties.ColumnProportionsInfo || '[12]';
        const columns = populateColumns(props);
        populateSection(props.Properties).then((section) => {
            const dataAttributes = htmlAttributes(props, null, null);
            section.Attributes = Object.assign(section.Attributes, dataAttributes);
            setData({
                Columns: columns,
                Section: section,
            });
        });
    }, [props.Properties]);

    return (
        <section {...data.Section.Attributes} style={data.Section.Style}>
            {data.Section.ShowVideo && data.Section.VideoUrl && (
                <video className="sc-video__element" autoPlay muted loop>
                    <source src="{{viewModel.Section.VideoUrl}}" />
                </video>
            )}
            {data.Columns.map((x, i) => {
                return (
                    <div key={i} {...x.Attributes} style={data.Section.Style}>
                        {x.Children.map((y) => {
                            return RenderWidgetService.createComponent(y.model, y.model.requestContext);
                        })}
                    </div>
                );
            })}
        </section>
    );
}

function populateColumns(model: ModelBase<SectionEntity>): ColumnHolder[] {
    let columns: ColumnHolder[] = [];
    const properties = model.Properties;

    for (let i = 0; i < properties.ColumnsCount; i++) {
        let currentName = `${ColumnNamePrefix}${i + 1}`;

        const classAttribute = `col-md-${properties.ColumnProportionsInfo[i]}`;
        const classAttributes = [classAttribute];
        let children: Array<ComponentContainer> = [];
        if (model.Children) {
            children = model.Children.filter((x) => x.PlaceHolder === currentName).map((x) => {
                x.requestContext = model.requestContext;
                return {
                    model: x,
                };
            });
        }

        const column: ColumnHolder = {
            Attributes: {},
            Children: children,
        };

        if (RenderContext.isEdit()) {
            column.Attributes['data-sfcontainer'] = currentName;

            let currentTitle = null;
            if (properties.Labels && properties.Labels.hasOwnProperty(currentName)) {
                currentTitle = properties.Labels[currentName].Label;
            } else {
                currentTitle = currentName;
            }

            column.Attributes['data-sfplaceholderlabel'] = currentTitle;
        }

        if (properties.Attributes && properties.Attributes.hasOwnProperty(currentName)) {
            properties.Attributes[currentName].forEach((attribute) => {
                column.Attributes[attribute.Key] = attribute.Value;
            });
        }

        if (properties.ColumnsBackground && properties.ColumnsBackground.hasOwnProperty(currentName)) {
            const backgroundStyle = properties.ColumnsBackground[currentName];
            if (backgroundStyle.BackgroundType == 'Color') {
                column.Style = {'--sf-background-color': `${backgroundStyle.Color}`};
            }
        }

        if (properties.ColumnsPadding && properties.ColumnsPadding.hasOwnProperty(currentName)) {
            const columnPadding = properties.ColumnsPadding[currentName];
            const paddings = StyleGenerator.getPaddingClasses(columnPadding);
            if (paddings) {
                column.Attributes['className'] = paddings;
                classAttributes.push(paddings);
            }
        }

        if (properties.CustomCssClass && properties.CustomCssClass.hasOwnProperty(currentName)) {
            const columnCssClass = properties.CustomCssClass[currentName];
            if (columnCssClass && columnCssClass.Class) {
                classAttributes.push(columnCssClass.Class);
            }
        }

        if (column.Attributes['className']) classAttributes.push(column.Attributes['className']);

        column.Attributes['className'] = classAttributes.filter((x) => x).join(' ');

        columns.push(column);
    }

    return columns;
}

function populateSection(properties: SectionEntity): Promise<SectionHolder> {
    const sectionObject: SectionHolder = {
        Attributes: {},
    };

    let attributes = properties.Attributes;
    if (attributes && attributes.hasOwnProperty(sectionKey)) {
        attributes[sectionKey].forEach((attribute) => {
            sectionObject.Attributes[attribute.Key] = attribute.Value;
        });
    }

    const sectionClasses: string[] = ['row'];
    if (properties.SectionPadding) {
        const paddingClasses = StyleGenerator.getPaddingClasses(properties.SectionPadding);
        sectionClasses.push(paddingClasses);
    }

    if (properties.SectionMargin) {
        const marginClasses = StyleGenerator.getPaddingClasses(properties.SectionMargin);
        sectionClasses.push(marginClasses);
    }

    if (properties.CustomCssClass && properties.CustomCssClass.hasOwnProperty(sectionKey)) {
        sectionClasses.push(properties.CustomCssClass[sectionKey].Class);
    }

    if (!properties.SectionBackground) {
        sectionObject.Attributes['className'] = sectionClasses.filter((x) => x).join(' ');
        return Promise.resolve(sectionObject);
    }

    if (!properties.SectionBackground) {
        sectionObject.Attributes['className'] = sectionClasses.filter((x) => x).join(' ');
        return Promise.resolve(sectionObject);
    }

    if (properties.SectionBackground.BackgroundType === 'Video') {
        if (properties.SectionBackground.VideoItem && properties.SectionBackground.VideoItem.Id) {
            sectionClasses.push(StylingConfig.VideoBackgroundClass);
            return RestService.getItemWithFallback<VideoItem>(
                RestSdkTypes.Video,
                properties.SectionBackground.VideoItem.Id,
                properties.SectionBackground.VideoItem.Provider,
            ).then((video) => {
                sectionObject.ShowVideo = true;
                const videoUrl = `${RootUrlService.getUrl()}${video.Url.substring(1)}`;
                sectionObject.VideoUrl = videoUrl;
                sectionObject.Attributes['className'] = sectionClasses.filter((x) => x).join(' ');

                return sectionObject;
            });
        }
    } else if (
        properties.SectionBackground.BackgroundType === 'Image' &&
        properties.SectionBackground.ImageItem &&
        properties.SectionBackground.ImageItem.Id
    ) {
        const imagePosition = properties.SectionBackground.Position || 'Fill';
        sectionClasses.push(StylingConfig.ImageBackgroundClass);
        return RestService.getItemWithFallback<ImageItem>(
            RestSdkTypes.Image,
            properties.SectionBackground.ImageItem.Id,
            properties.SectionBackground.ImageItem.Provider,
        ).then((image) => {
            let style: {[key: string]: string} = {};
            switch (imagePosition) {
                case 'Fill':
                    style['--sf-background-size'] = '100% auto';
                    break;
                case 'Center':
                    style['--sf-background-position'] = 'center';
                    break;
                default:
                    style['--sf-background-size'] = 'cover';
                    break;
            }

            const imageUrl = `${RootUrlService.getUrl()}${image.Url.substring(1)}`;
            style['--sf-background-image'] = `url(${imageUrl})`;
            sectionObject.Style = style;
            sectionObject.Attributes['className'] = sectionClasses.filter((x) => x).join(' ');
            return sectionObject;
        });
    } else if (properties.SectionBackground.BackgroundType === 'Color' && properties.SectionBackground.Color) {
        sectionObject.Style = {'--sf-background-color': `${properties.SectionBackground.Color}`};
    }

    sectionObject.Attributes['className'] = sectionClasses.filter((x) => x).join(' ');
    return Promise.resolve(sectionObject);
}

interface State {
    Columns: ColumnHolder[];
    Section: SectionHolder;
}
