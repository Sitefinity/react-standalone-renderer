export class RootUrlService {
    public static getUrl() {

        // when generating static files with next.js (true prod build)
        const isNextStaticRender = typeof window === 'undefined';
        if (isNextStaticRender) {
            return `${process.env["NEXT_CMS_URL"]}/`;
        }

        // when rendering runtime with next.js
        if (process.env["NEXT_PUBLIC_CMS_URL"]) {
            return `${process.env["NEXT_PUBLIC_CMS_URL"]}/`;
        }

        // when hosting th bundle in the CMS (for content editors)
        throw "Can't get url in this context"
    }

    public static getServiceUrl() {
        return `${this.getUrl()}api/default/`
    }
}
