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
            debug: false,

            onMouseEnter: (self) => {
            },
            onMouseMove: (self) => {
            },
            onMouseLeave: (self) => {
            },

            ...options
        };
        instance.target = validateTarget(instance.target);

        // validate
        if(!instance.target) return null;

        // destroy method
        instance.destroy = this.destroy.bind(this, instance);

        // mousemove handler
        initMouseMove(instance);

        // push to the instance
        this.instances.push(instance);

        return {
            id: instance.id,
            target: instance.target,
            destroy: instance.destroy
        };
    }

    destroy(instance){
        // matched condition
        const isMatched = (i) => i.id === instance.id;

        const result = this.instances.find(isMatched);
        if(result){
            const index = this.instances.findIndex(isMatched);

            // remove event listener
            result.target.removeEventListener('mouseenter', instance.handleMouseEnter);
            result.target.removeEventListener('mouseleave', instance.handleMouseLeave);
            result.target.removeEventListener('mousemove', instance.handleMouseMove);
            window.removeEventListener('scroll', result.handleMousePositionWhenScroll);

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