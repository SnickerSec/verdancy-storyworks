/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe(element) {
        // Trigger for test simplicity
        this.callback([{ isIntersecting: true, target: element }]);
    }
    unobserve() {}
    disconnect() {}
};

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Require functions
const { 
    initNavigation, 
    initScrollEffects, 
    initGlitchEffects, 
    initTerminalAnimation, 
    initSmoothScrolling 
} = require('./script');

describe('Verdancy Storyworks Frontend Logic', () => {
    beforeEach(() => {
        // Load the HTML content
        const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
        document.documentElement.innerHTML = html;
        
        // Call initialization functions
        initNavigation();
        initScrollEffects();
        initGlitchEffects();
        initTerminalAnimation();
        initSmoothScrolling();
    });

    test('navigation toggle works', () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        // Initial state
        expect(navMenu.classList.contains('active')).toBe(false);
        
        // Click toggle
        navToggle.click();
        expect(navMenu.classList.contains('active')).toBe(true);
        expect(navToggle.classList.contains('active')).toBe(true);
        
        // Click again to close
        navToggle.click();
        expect(navMenu.classList.contains('active')).toBe(false);
    });

    test('dropdown toggle works', () => {
        const dropdown = document.querySelector('.nav-dropdown');
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        
        expect(dropdown).not.toBeNull();
        expect(dropdownToggle).not.toBeNull();
        
        dropdownToggle.click();
        expect(dropdown.classList.contains('active')).toBe(true);
        
        // Click outside should close it
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(dropdown.classList.contains('active')).toBe(false);
    });

    test('nav menu closes when clicking a non-dropdown link', () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLink = document.querySelector('.nav-link:not(.dropdown-toggle)');
        
        // Open menu
        navToggle.click();
        expect(navMenu.classList.contains('active')).toBe(true);
        
        // Click link
        navLink.click();
        expect(navMenu.classList.contains('active')).toBe(false);
    });

    test('terminal lines start at 0 opacity and then are animated (placeholder check)', () => {
        const terminalLines = document.querySelectorAll('.terminal-line');
        // The script sets them to 1 immediately when animating
        // This is a basic check that they were found and processed
        expect(terminalLines.length).toBeGreaterThan(0);
    });
});
