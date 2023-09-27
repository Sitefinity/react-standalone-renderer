
import { RequestContext } from '@/services/request-context';
import { RenderWidgetService } from '@/services/render-widget-service';
import { WidgetModel } from '@/editor/interfaces';

export default function Render() {
    const decoded = atob(arguments[0].searchParams.model)
    const widgetModel = JSON.parse(decoded) as WidgetModel;

    const requestContext: RequestContext = {
        detailItem: null,
        isEdit: false,
        isPreview: false,
        lazyComponentMap: {

        }
    };

    return (
        <div id="widgetPlaceholder">
            {RenderWidgetService.createComponent(widgetModel, requestContext)}
        </div>
    )
}
