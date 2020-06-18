
export class RenderContext {
    static isEdit(): boolean {
        return window.location.href.indexOf("sfaction=edit") !== -1;
    }

    static isPreview(): boolean {
        return window.location.href.indexOf("sfaction=preview") !== -1;
    }
}
