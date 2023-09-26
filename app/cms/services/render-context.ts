export class RenderContext {
    static isEdit(): boolean {
        if (typeof window !== 'undefined') {
            return window.location.href.indexOf('sfaction=edit') !== -1;
        }

        return false;
    }

    static isPreview(): boolean {
        if (typeof window !== 'undefined') {
            return window.location.href.indexOf('sfaction=preview') !== -1;
        }

        return false;
    }
}
