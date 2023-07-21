import Emitter from "./emitter";
import {getPosition} from "./utils";
import {animateCursor} from "./debug";

/**
 * Init events
 * @param {object} instance
 * @return void
 * */
export function initEvents(instance){
    // Event emitter
    instance.emitter = new Emitter({
        'enter': instance.onMouseEnter,
        'leave': instance.onMouseLeave,
        'move': instance.onMouseMove
    });

    // Handle mouse move
    instance.handleMouseMove = handleMouseMove.bind(instance);
    instance.target.addEventListener('mousemove', instance.handleMouseMove);

    // Handle mouse enter
    instance.handleMouseEnter = handleMouseEnter.bind(instance);
    instance.target.addEventListener('mouseenter', instance.handleMouseEnter);

    // Handle mouse leave
    instance.handleMouseLeave = handleMouseLeave.bind(instance);
    instance.target.addEventListener('mouseleave', instance.handleMouseLeave);

    // Update position when scroll
    instance.handleMousePositionWhenScroll = handleMousePositionWhenScroll.bind(instance);
    window.addEventListener('scroll', instance.handleMousePositionWhenScroll);
}


/**
 * Mouse move handler
 * */
function handleMouseMove(e){
    const targetBox = this.target.getBoundingClientRect();

    // Position to the top/left of the browser
    const xPositionToBrowser = e.clientX;
    const yPositionToBrowser = e.clientY;

    // Position to the top/left of the document
    const xPositionToDocument = e.clientX + scrollX;
    const yPositionToDocument = e.clientY + scrollY;

    // Position to the top/left of the currentTarget
    const xPosition = Math.max(0, Math.min(xPositionToBrowser - targetBox.left, targetBox.width));
    const yPosition = Math.max(0, Math.min(yPositionToBrowser - targetBox.top, targetBox.height));

    // update to instance
    this.browserPosition = getPosition({
        width: innerWidth,
        height: innerHeight
    }, xPositionToBrowser, yPositionToBrowser);
    this.documentPosition = getPosition({
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }, xPositionToDocument, yPositionToDocument);
    this.targetPosition = getPosition(targetBox, xPosition, yPosition);

    // callback
    this.emitter.emit('move', {
        id: this.id,
        target: this.target,
        browserPosition: this.browserPosition,
        documentPosition: this.documentPosition,
        targetPosition: this.targetPosition,
        event: e,
        destroy: this.destroy
    });

    // debug
    if(this.debug){
        animateCursor(this.cursor, this.targetPosition);
    }
}


/**
 * Handle mouse position when scroll
 * */
function handleMousePositionWhenScroll(){
    this.target.dispatchEvent(new MouseEvent('mousemove', {
        clientX: this.browserPosition.x,
        clientY: this.browserPosition.y,
    }));
}


/**
 * Handle mouse enter
 * */
function handleMouseEnter(){
    this.emitter.emit('enter', {
        id: this.id,
        target: this.target,
        browserPosition: this.browserPosition,
        documentPosition: this.documentPosition,
        targetPosition: this.targetPosition,
        destroy: this.destroy
    });
}


/**
 * Handle mouse out
 * */
function handleMouseLeave(){
    this.emitter.emit('leave', {
        id: this.id,
        target: this.target,
        browserPosition: this.browserPosition,
        documentPosition: this.documentPosition,
        targetPosition: this.targetPosition,
        destroy: this.destroy
    });
}