import {debug} from "./debug";

/**
 * Logic
 * */
export function initMouseMove(instance){
    const targetBox = instance.target.getBoundingClientRect();

    // init the position
    instance.browserPosition = getPosition(targetBox, 0, 0);
    instance.documentPosition = getPosition(targetBox, 0, 0);
    instance.targetPosition = getPosition(targetBox, 0, 0);

    // handler function
    instance.handler = handleMouseMove.bind(instance);

    // update position when scroll
    const isScrollable = instance.target === document.body || instance.target === document.documentElement;
    if(isScrollable){
        instance.scrollHandler = handleScroll.bind(instance);
        window.addEventListener('scroll', instance.scrollHandler);
    }
}


/**
 * Mouse move handler
 * */
export function handleMouseMove(e){
    const targetBox = this.target.getBoundingClientRect();

    // Position to the top/left of the browser
    const xPositionToBrowser = e.clientX;
    const yPositionToBrowser = e.clientY;

    // Position to the top/left of the document
    const xPositionToDocument = e.pageX;
    const yPositionToDocument = e.pageY;

    // Position to the top/left of the currentTarget
    const xPosition = Math.max(0, Math.min(xPositionToBrowser - targetBox.left, targetBox.width));
    const yPosition = Math.max(0, Math.min(yPositionToBrowser - targetBox.top, targetBox.height));

    // debug
    if(this.debug){
        debug(this.target, {x: xPosition, y: yPosition});
    }

    // update to instance
    this.browserPosition = getPosition(targetBox, xPositionToBrowser, yPositionToBrowser);
    this.documentPosition = getPosition(targetBox, xPositionToDocument, yPositionToDocument);
    this.targetPosition = getPosition(targetBox, xPosition, yPosition);

    // callback
    doCallbacks(this);
}


/**
 * Handle target scroll
 * */
function handleScroll(){
    this.target.dispatchEvent(new MouseEvent('mousemove', {
        clientX: this.browserPosition.x,
        clientY: this.browserPosition.y,
    }));
}


/**
 * Do callbacks
 * */
function doCallbacks(instance){
    if(typeof instance.onUpdate === 'function'){
        instance.onUpdate({
            id: instance.id,
            type: instance.type,
            target: instance.target,
            browserPosition: instance.browserPosition,
            documentPosition: instance.documentPosition,
            targetPosition: instance.targetPosition,
        });
    }
}

/**
 * Convert position
 * */
const getPosition = (targetBox, xPosition, yPosition) => {
    return {
        x: xPosition,
        y: yPosition,

        xPercent: xPosition / targetBox.width,
        yPercent: yPosition / targetBox.height
    };
};