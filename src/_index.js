// style
import './_index.scss';

// script
import {validateTarget} from "./helpers";
import {uid} from "./utils";
import {handleMouseMove} from "./move";
import {handleScroll} from "./scroll";

/**
 * Private class
 * */
class Position{
    constructor(){
        // instances
        this.instances = [];
    }

    create(options = {
               // dev mode
               debug: false,

               // callback
               onUpdate: null,
           }
    ){
        const instance = {
            id: uid('position-'),
            target: document,
            debug: false,
            ...this.defaultOptions,
            ...options
        };
        instance.target = validateTarget(instance.target);

        // validate
        if(!instance.target) return null;

        // mousemove handler
        if(instance.type === 'scroll'){
            instance.handler = handleScroll.bind(instance);
        }else{
            instance.handler = handleMouseMove.bind(instance);
        }

        // register event listener
        instance.target.addEventListener(instance.type, instance.handler);

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
            result.target.removeEventListener(instance.type, instance.handler);
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