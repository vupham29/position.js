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
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZD0iTTM3NC40IDIyNS4wNjZoMzMuMDY3Yy0xMi44LTU5LjczMy02MC44LTEwNy43MzQtMTIwLjUzMy0xMTkuNDY3djMzLjA2N2M0Mi42NjYgMTAuNjY4IDc1LjczMiA0My43MzQgODcuNDY2IDg2LjR6TTI4Ni45MzQgMzc0LjR2MzMuMDY3YzU5LjczMy0xMi44IDEwNy43MzQtNjAuOCAxMTkuNDY3LTEyMC41MzNoLTMzLjA2N2MtMTAuNjY4IDQyLjY2Ni00My43MzQgNzUuNzMyLTg2LjQgODcuNDY2ek0xMzcuNiAyODYuOTM0aC0zMy4wNjdjMTIuOCA1OS43MzMgNjAuOCAxMDcuNzM0IDEyMC41MzMgMTE5LjQ2N3YtMzMuMDY3Yy00Mi42NjYtMTAuNjY4LTc1LjczMi00My43MzQtODcuNDY2LTg2LjR6bS0zMi02MS44NjhoMzMuMDY3YzEwLjY2Ny00Mi42NjcgNDQuOC03NS43MzQgODcuNDY3LTg3LjQ2N3YtMzMuMDY2Yy02MC44MDEgMTIuODAxLTEwOC44IDYwLjgtMTIwLjUzNCAxMjAuNTMzeiIvPjxwYXRoIGQ9Ik01MTIgMjQxLjA2N0gyNzAuOTMzVjBoLTI5Ljg2NnYyNDEuMDY3SDB2MjkuODY2aDI0MS4wNjdWNTEyaDI5Ljg2NlYyNzAuOTMzSDUxMnoiLz48Y2lyY2xlIGN4PSIyNTYuMDA1IiBjeT0iMjU2LjAwNSIgcj0iNTQuNCIgc3R5bGU9ImZpbGw6I2NlZDRkYSIvPjwvc3ZnPg==);
        width:20px;
        height:20px;
        background-size:100%;
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
    target.style.cssText = 'position:relative; cursor:none;';

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