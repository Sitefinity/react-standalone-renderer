// @TODO: `createStore is deprecated, do we even need Redux here?
import {createStore} from 'redux';
import {rootReducer} from '@/app/cms/store/reducers';

export const ACTIONS = {
    SERVICES: {
        REQUEST_LAZY: 'requestLazyContent',
        RECEIVE_LAZY: 'receiveLazyContent',
    },
    RENDER: {
        REQUEST: 'renderRequested',
        DONE: 'renderDone',
    },
};

export const store = createStore(rootReducer, undefined, undefined);
