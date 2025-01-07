// ==UserScript==
// @name         Globoplay Custom Subtitles
// @namespace    https://github.com/6laercio/globoplay-custom-subs/
// @version      1.0
// @description  Customiza as legendas do Globoplay
// @author       Laercio Nascimento
// @match        https://globoplay.globo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function customizeSubtitles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .subtitle__wrapper--override-webvtt .subtitle div[style*="direction: ltr"] div {
                color: yellow !important;
                background-color: transparent !important;
                text-shadow: -1px -1px 0 #000,
                            1px -1px 0 #000,
                            -1px 1px 0 #000,
                            1px 1px 0 #000 !important;
            }
        `;
        document.head.appendChild(styleElement);
    }

    function observeDOMChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (document.querySelector('.subtitle__wrapper')) {
                    customizeSubtitles();
                }
            });
        });

        const config = {
            childList: true,
            subtree: true
        };

        observer.observe(document.body, config);
    }

    window.addEventListener('load', () => {
        customizeSubtitles();
        observeDOMChanges();
    });
})();
