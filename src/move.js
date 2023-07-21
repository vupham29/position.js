import {createDebugPanelAndGetCursor} from "./debug";
import {initEvents} from "./events";
import {getPosition} from "./utils";

/**
 * Logic
 * */
export function initMouseMove(instance){
    const targetBox = instance.target.getBoundingClientRect();

    // init the position
    instance.browserPosition = getPosition(targetBox, 0, 0);
    instance.documentPosition = getPosition(targetBox, 0, 0);
    instance.targetPosition = getPosition(targetBox, 0, 0);

    // init events (enter, move, leave)
    initEvents(instance);

    // debug
    if(instance.debug){
        instance.cursor = createDebugPanelAndGetCursor(instance.target);
    }
}

/**
 * Do callbacks
 * */
function doCallbacks(instance, event){
    if(typeof instance.onUpdate === 'function'){
        instance.onUpdate({
            id: instance.id,
            type: instance.type,
            target: instance.target,
            browserPosition: instance.browserPosition,
            documentPosition: instance.documentPosition,
            targetPosition: instance.targetPosition,
            event
        });
    }
}