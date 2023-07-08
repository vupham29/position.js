/**
 * Scroll handler
 * For vertical direction only
 * */
export function handleScroll(){
    const height = this.target.scrollHeight || document.scrollingElement.scrollHeight;
    const availableHeight = this.target.clientHeight || window.innerHeight;

    const scrollableHeight = height - availableHeight;
    const scrolledDistance = this.target.scrollTop || window.scrollY;

    if(typeof this.onUpdate === 'function'){
        this.onUpdate({
            id: this.id,
            type: this.type,

            height,
            availableHeight,
            scrollableHeight,
            scrolledDistance,

            scrollable: scrollableHeight > 0
        });
    }
}