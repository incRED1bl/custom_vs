document.addEventListener('DOMContentLoaded', function() {
    const checkElement = setInterval(() => {
        const commandDialog = document.querySelector(".quick-input-widget");
        if (commandDialog) {
            if (commandDialog.style.display !== "none") {
                runMyScript();
            }
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (commandDialog.style.display === 'none') {
                            handleEscape();
                        } else {
                            runMyScript();
                        }
                    }
                });
            });
            observer.observe(commandDialog, { attributes: true });
            clearInterval(checkElement);
        } else {
            console.log("Command dialog not found yet. Retrying...");
        }
    }, 500);

    document.addEventListener('keydown', function(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
            event.preventDefault();
            runMyScript();
        } else if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            handleEscape();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            handleEscape();
        }
    }, true);

    function runMyScript() {
        const targetDiv = document.querySelector(".monaco-workbench");
        const existingElement = document.getElementById("command-blur");
        if (existingElement) {
            existingElement.remove();
        }
        const newElement = document.createElement("div");
        newElement.setAttribute('id', 'command-blur');
        newElement.style.cssText = `
            position: fixed;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, .15);
            top: 0;
            left: 0;
            z-index: 10;
            backdrop-filter: blur(8px);
            animation: fadeInBlur 0.3s ease-out;
        `;
        newElement.addEventListener('click', function() {
            newElement.remove();
        });
        targetDiv.appendChild(newElement);
        // Raise command palette above the blur overlay
        const palette = document.querySelector('.quick-input-widget');
        if (palette) {
            palette.style.zIndex = '100';
        }
    }

    function handleEscape() {
        const element = document.getElementById("command-blur");
        if (element) {
            element.click();
        }
    }

    // Pulsating Neon Glow for Active Line
    function initNeonPulse() {
        try {
            const editor = document.querySelector('.monaco-editor');
            if (!editor) {
                console.log('Editor not found for neon pulse');
                return;
            }
            const style = document.createElement('style');
            style.id = 'neon-pulse-style';
            style.textContent = `
                .monaco-editor .current-line {
                    position: relative !important;
                    box-shadow: 0 0 10px #00ffcc !important;
                    animation: neonPulse 1.5s infinite !important;
                }
                @keyframes neonPulse {
                    0% { box-shadow: 0 0 5px #00ffcc !important; }
                    50% { box-shadow: 0 0 15px #00ffcc, 0 0 25px #00ffcc !important; }
                    100% { box-shadow: 0 0 5px #00ffcc !important; }
                }
            `;
            document.head.appendChild(style);
            console.log('Neon pulse style injected');
        } catch (e) {
            console.error('Error injecting neon pulse style:', e);
        }
    }
})
