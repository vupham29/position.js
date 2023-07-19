// script
import {validateTarget} from "./helpers";
import {uid} from "./utils";
import {initMouseMove} from "./move";

/**
 * Private class
 * */
class Position{
    constructor(){
        // instances
        this.instances = [];
    }

    create(options){
        const instance = {
            id: uid('position-'),
            target: document.body,
            type: 'mousemove',
            debug: false,
            ...options
        };
        instance.target = validateTarget(instance.target);

        // validate
        if(!instance.target) return null;

        // mousemove handler
        initMouseMove(instance);

        // push to the instance
        this.instances.push(instance);

        return instance;
    }

    destroy(instance){
        // matched condition
        const isMatched = (i) => i.id === instance.id;

        const result = this.instances.find(isMatched);
        if(result){
            const index = this.instances.findIndex(isMatched);

            // remove event listener
            result.target.removeEventListener(instance.type, instance.handler);

            if(result.scrollHandler){
                window.removeEventListener('scroll', result.scrollHandler);
            }

            // remove from instances
            this.instances.splice(index, 1);

            return true;
        }
        return false;
    }
}

/**
 * Public library
 * */
window.Position = new Position();