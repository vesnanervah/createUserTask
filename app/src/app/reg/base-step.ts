export default class BaseStep {
    handleStepComplete(stepElem: HTMLDivElement, cb: () => void) {
        const animation = stepElem.animate([
            {
                transform: 'translateY(0px)'
            },
            {
                transform: 'translateY(100vh)'
            }
        ], 400);
        animation.onfinish = () => cb();
    }

    handleStepIncomplete(stepElem: HTMLDivElement) {
        stepElem.animate([
            {
                transform:'translateX(0px)'
            },
            {
                transform:'translateX(100px)'
            },
            {
                transform:'translateX(-100px)'
            },
            {
                transform:'translateX(50px)'
            },
            {
                transform:'translateX(-50px)'
            },
            {
                transform:'translateX(25px)'
            },
            {
                transform:'translateX(-25px)'
            },
            {
                transform:'translateX(10px)'
            },
            {
                transform:'translateX(-10px)'
            },
            {
                transform:'translateX(5px)'
            },
            {
                transform:'translateX(-5px)'
            },
            {
                transform:'translateX(0px)'
            }
        ], 300);
    }
}