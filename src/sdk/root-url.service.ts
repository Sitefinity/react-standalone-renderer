import { CONFIG } from '../config';

export class RootUrlService {
    public static getUrl() {
        
        // when generating static files (true prod build)
        const isNextStaticRender = typeof window === 'undefined';
        if (isNextStaticRender) {
            return 'http://localhost/';
        }
        
        // when developing against a remote hosted CMS (local development)
        if (process.env.NODE_ENV === 'development') {
            return `${window.location.origin}/`;
        }

        // when hosting th bundle in the CMS (for content editors)
        return `${window.location.origin}/`;
    }

    public static getServiceUrl() {
        return `${this.getUrl()}${CONFIG.serviceApi}/`
    }
}