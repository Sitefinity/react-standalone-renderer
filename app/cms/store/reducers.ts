import {ACTIONS} from '@/app/cms/store/store';

export interface StoreState {
    serviceCalls: ServiceCall[];
    renderRequest: any;
}

const initialState = {
    serviceCalls: [],
    renderRequest: {data: null, html: null},
};

export interface ServiceCall {
    completed: boolean;
    id: string;
    data?: any;
}

export function rootReducer(state: StoreState = initialState, action: any) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case ACTIONS.SERVICES.REQUEST_LAZY:
            newState.serviceCalls.push({completed: false, id: action.id, data: null});
            return newState;
        case ACTIONS.SERVICES.RECEIVE_LAZY:
            const serviceCall = newState.serviceCalls.find((x) => x.id === action.data.Id) || {};
            Object.assign(serviceCall, {completed: true, data: action.data});
            return newState;
        case ACTIONS.RENDER.REQUEST:
            return Object.assign(newState, {renderRequest: {data: action.data}});
        case ACTIONS.RENDER.DONE:
            return Object.assign(newState, {renderRequest: {html: action.data, data: null}});
        default:
            return state;
    }
}
