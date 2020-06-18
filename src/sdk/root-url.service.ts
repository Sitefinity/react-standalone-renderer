import { CONFIG } from '../config';

export class RootUrlService {
    public static getUrl() {
        return `${window.location.origin}/`;
    }

    public static getServiceUrl() {
        return `${this.getUrl()}${CONFIG.serviceApi}/`
    }
}