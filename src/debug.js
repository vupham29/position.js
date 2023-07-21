/**
 * Debug
 * */
export function createDebugPanelAndGetCursor(target){
    const debugPanel = document.createElement('div');

    // class
    debugPanel.classList.add('position-debug-panel');

    // style
    debugPanel.style.cssText = `position:absolute; top:0; left:0; right:0; bottom:0;`;

    // cursor
    const cursorEl = document.createElement('div');
    cursorEl.style.cssText = `
        width:20px;
        height:20px;
        position:absolute;
        top:0;
        left:0;
    `;

    // text
    const span = document.createElement('span');
    span.style.cssText = `position:absolute; top:75%; left:85%;`;

    cursorEl.append(span);
    debugPanel.append(cursorEl);
    target.append(debugPanel);
    target.style.cssText = 'position:relative;';

    return cursorEl;
}


/**
 * Animate cursor
 * */
export function animateCursor(target, position){
    const targetBox = target.getBoundingClientRect();
    target.style.transform = `translate(${position.x - targetBox.width * 0.5}px, ${position.y - targetBox.height * 0.5}px)`;

    target.querySelector('span').textContent = `
    ${position.x}
    ${position.y}
    `;
}