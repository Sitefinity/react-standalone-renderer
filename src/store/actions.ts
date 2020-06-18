import { store, ACTIONS } from "./store";

function requestLazyConent(id: string) {
    return {
        type: ACTIONS.SERVICES.REQUEST_LAZY,
        id
    };
}

function receivedLazyContent(data: any) {
    return {
        type: ACTIONS.SERVICES.RECEIVE_LAZY,
        data
    };
}

function requstRender(data: any) {
    return {
        type: ACTIONS.RENDER.REQUEST,
        data
    }
}

function renderDone(data: any) {
    return {
        type: ACTIONS.RENDER.DONE,
        data
    }
}

export const RequestLazyConent = (id: string) => store.dispatch(requestLazyConent(id));
export const ReceivedLazyContent = (data: any) => store.dispatch(receivedLazyContent(data));
export const RequstRender = (data: any) => store.dispatch(requstRender(data));
export const RenderDone = (data: any) => store.dispatch(renderDone(data));
