/**
 * Handle mouse move
 * */
export function handleMouseMove(e){
    const targetBox = this.target === document ? {
        top: 0,
        left: 0,
        width: document.body.clientWidth,
        height: document.body.clientHeight
    } : this.target.getBoundingClientRect();

    // Position to the top/left of the browser
    const xPositionToBrowser = e.clientX;
    const yPositionToBrowser = e.clientY;

    // Position to the top/left of the document
    const xPositionToDocument = e.pageX;
    const yPositionToDocument = e.pageY;

    // Position to the top/left of the currentTarget
    const xPosition = Math.max(0, Math.min(e.clientX - targetBox.left, targetBox.width));
    const yPosition = Math.max(0, Math.min(e.clientY - targetBox.top, targetBox.height));

    if(typeof this.onUpdate === 'function'){
        this.onUpdate({
            id: this.id,
            type: this.type,
            target: this.target,
            browserPosition: getPosition(targetBox, xPositionToBrowser, yPositionToBrowser),
            documentPosition: getPosition(targetBox, xPositionToDocument, yPositionToDocument),
            ...getPosition(targetBox, xPosition, yPosition)
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