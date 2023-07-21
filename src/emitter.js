export default class Emitter{
    constructor(events){
        this.events = validateEvents(events);
    }

    on(event, callback){
        // add if existed or create the new one
        this.events[event]?.push(callback) || (this.events[event] = [callback]);
    }

    emit(event, ...args){
        // check if event is not valid
        if(!this.events[event]) return;

        // trigger callbacks
        this.events[event].forEach(cb => cb(...args));
    }

    destroy(){

        this.events = {};
    }
}

/**
 * Validate event
 * @param {object} events
 * @return {object}
 * */
const validateEvents = (events) => {
    if(!events) return {};

    const returnObj = {};
    for(const [key, value] of Object.entries(events)){
        if(typeof value === 'function') returnObj[key] = [value];
    }
    return returnObj;
};