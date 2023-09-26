export const getRootElement = function (): HTMLElement {
    return (document.getElementById('root') || document.getElementById('__next')) as HTMLElement;
};
