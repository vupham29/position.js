// style
import './style.scss';

// library
import '@/_index.js';

// package info
import packageInfo from '../package.json';

// update project information
const dataTitles = document.querySelectorAll('[data-title]');
const dataDescriptions = document.querySelectorAll('[data-description]');

// update information
dataTitles.forEach(e => e.innerHTML = packageInfo["project-name"]);
dataDescriptions.forEach(e => e.innerHTML = packageInfo.description);

// code
const instance = Position.create({
    target: '[data-position]',
    debug: true,
    onMouseMove: (self) => {
        console.log('Move', self);
    },
    onMouseEnter: (self) => {
        console.log('Enter', self);
    },
    onMouseLeave: (self) => {
        console.log('leave', self);
    }
});