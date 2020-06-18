import { createStore } from "redux";
import { rootReducer } from "./reducers";

export const ACTIONS = {
    SERVICES: {
        REQUEST_LAZY: "requestLazyContent",
        RECEIVE_LAZY: "receiveLazyContent"
    },
    RENDER: {
        REQUEST: "renderRequested",
        DONE: "renderDone"
    }
}

export const store = createStore(rootReducer, undefined, undefined);
