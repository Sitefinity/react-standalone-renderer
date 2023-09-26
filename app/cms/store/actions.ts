import {store, ACTIONS} from '@/app/cms/store/store';

function requestLazyContent(id: string) {
    return {
        type: ACTIONS.SERVICES.REQUEST_LAZY,
        id,
    };
}

function receivedLazyContent(data: any) {
    return {
        type: ACTIONS.SERVICES.RECEIVE_LAZY,
        data,
    };
}

function requestRender(data: any) {
    return {
        type: ACTIONS.RENDER.REQUEST,
        data,
    };
}

function renderDone(data: any) {
    return {
        type: ACTIONS.RENDER.DONE,
        data,
    };
}

export const RequestLazyContent = (id: string) => store.dispatch(requestLazyContent(id));
export const ReceivedLazyContent = (data: any) => store.dispatch(receivedLazyContent(data));
export const RequestRender = (data: any) => store.dispatch(requestRender(data));
export const RenderDone = (data: any) => store.dispatch(renderDone(data));
