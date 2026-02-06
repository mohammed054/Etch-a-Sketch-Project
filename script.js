class EtchASketch {
    constructor() {
        this.gridContainer = document.getElementById('grid-container');
        this.gridSize = 16;
        this.currentMode = 'pen';
        this.currentColor = '#000000';
        this.currentOpacity = 1;
        this.isDrawing = false;
        this.showGridLines = true;
        this.pixelCount = 0;
        this.startTime = Date.now();
        this.rainbowHue = 0;
        
        this.initializeElements();
        this.attachEventListeners();
        this.createGrid();
        this.startTimer();
    }

    initializeElements() {
        this.gridSizeSlider = document.getElementById('grid-size');
        this.gridSizeDisplay = document.getElementById('grid-size-display');
        this.createGridBtn = document.getElementById('create-grid');
        this.clearGridBtn = document.getElementById('clear-grid');
        this.colorPicker = document.getElementById('color-picker');
        this.opacitySlider = document.getElementById('opacity');
        this.opacityDisplay = document.getElementById('opacity-display');
        this.saveArtBtn = document.getElementById('save-art');
        this.randomFillBtn = document.getElementById('random-fill');
        this.toggleGridBtn = document.getElementById('toggle-grid');
        this.pixelCountDisplay = document.getElementById('pixel-count');
        this.drawTimeDisplay = document.getElementById('draw-time');
        this.modeButtons = document.querySelectorAll('.btn-mode');
    }

    attachEventListeners() {
        this.gridSizeSlider.addEventListener('input', (e) => {
            this.gridSizeDisplay.textContent = `${e.target.value}x${e.target.value}`;
        });

        this.createGridBtn.addEventListener('click', () => this.createGrid());
        this.clearGridBtn.addEventListener('click', () => this.clearGrid());
        this.saveArtBtn.addEventListener('click', () => this.saveArt());
        this.randomFillBtn.addEventListener('click', () => this.randomFill());
        this.toggleGridBtn.addEventListener('click', () => this.toggleGridLines());

        this.colorPicker.addEventListener('change', (e) => {
            this.currentColor = e.target.value;
        });

        this.opacitySlider.addEventListener('input', (e) => {
            this.currentOpacity = e.target.value;
            this.opacityDisplay.textContent = `${Math.round(e.target.value * 100)}%`;
        });

        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setMode(e.target.dataset.mode);
                this.updateModeButtons(e.target);
            });
        });

        document.addEventListener('mousedown', () => {
            this.isDrawing = true;
        });

        document.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });

        this.gridContainer.addEventListener('mouseleave', () => {
            this.isDrawing = false;
        });

        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    createGrid() {
        this.gridContainer.innerHTML = '';
        this.pixelCount = 0;
        this.updatePixelCount();
        
        const cellSize = 560 / this.gridSize;
        
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            
            cell.addEventListener('mouseenter', () => {
                if (this.isDrawing) {
                    this.drawOnCell(cell);
                }
            });

            cell.addEventListener('mousedown', () => {
                this.drawOnCell(cell);
            });

            cell.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.drawOnCell(cell);
            });

            cell.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if (element && element.classList.contains('grid-cell')) {
                    this.drawOnCell(element);
                }
            });

            this.gridContainer.appendChild(cell);
        }
    }

    drawOnCell(cell) {
        if (!cell.style.backgroundColor || cell.style.backgroundColor === 'rgba(0, 0, 0, 0)' || cell.style.backgroundColor === '') {
            this.pixelCount++;
            this.updatePixelCount();
        }

        switch (this.currentMode) {
            case 'pen':
                this.applyPenMode(cell);
                break;
            case 'rainbow':
                this.applyRainbowMode(cell);
                break;
            case 'gradient':
                this.applyGradientMode(cell);
                break;
            case 'eraser':
                this.applyEraserMode(cell);
                break;
        }
    }

    applyPenMode(cell) {
        const rgb = this.hexToRgb(this.currentColor);
        cell.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.currentOpacity})`;
    }

    applyRainbowMode(cell) {
        this.rainbowHue = (this.rainbowHue + 2) % 360;
        cell.style.backgroundColor = `hsla(${this.rainbowHue}, 100%, 50%, ${this.currentOpacity})`;
    }

    applyGradientMode(cell) {
        const rect = cell.getBoundingClientRect();
        const containerRect = this.gridContainer.getBoundingClientRect();
        const x = ((rect.left - containerRect.left) / containerRect.width) * 360;
        const y = ((rect.top - containerRect.top) / containerRect.height) * 100;
        
        cell.style.backgroundColor = `hsla(${x}, 70%, ${50 + y/2}%, ${this.currentOpacity})`;
    }

    applyEraserMode(cell) {
        cell.style.backgroundColor = '';
    }

    clearGrid() {
        const cells = this.gridContainer.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            cell.style.backgroundColor = '';
        });
        this.pixelCount = 0;
        this.updatePixelCount();
    }

    randomFill() {
        const cells = this.gridContainer.querySelectorAll('.grid-cell');
        let newPixels = 0;
        
        cells.forEach(cell => {
            if (Math.random() > 0.3) {
                const hue = Math.random() * 360;
                const saturation = 50 + Math.random() * 50;
                const lightness = 40 + Math.random() * 40;
                const opacity = 0.3 + Math.random() * 0.7;
                
                cell.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
                
                if (!cell.style.backgroundColor || cell.style.backgroundColor === '') {
                    newPixels++;
                }
            } else {
                cell.style.backgroundColor = '';
            }
        });
        
        this.pixelCount = this.gridContainer.querySelectorAll('.grid-cell[style*="background"]').length;
        this.updatePixelCount();
    }

    toggleGridLines() {
        const cells = this.gridContainer.querySelectorAll('.grid-cell');
        this.showGridLines = !this.showGridLines;
        
        cells.forEach(cell => {
            if (this.showGridLines) {
                cell.classList.remove('no-grid');
            } else {
                cell.classList.add('no-grid');
            }
        });
    }

    setMode(mode) {
        this.currentMode = mode;
        this.updateCursor();
    }

    updateModeButtons(activeBtn) {
        this.modeButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    updateCursor() {
        switch (this.currentMode) {
            case 'pen':
                this.gridContainer.style.cursor = 'crosshair';
                break;
            case 'rainbow':
                this.gridContainer.style.cursor = 'grab';
                break;
            case 'gradient':
                this.gridContainer.style.cursor = 'cell';
                break;
            case 'eraser':
                this.gridContainer.style.cursor = 'grab';
                break;
        }
    }

    handleKeyboardShortcuts(e) {
        switch (e.key.toLowerCase()) {
            case 'p':
                this.setMode('pen');
                this.updateModeButtons(document.querySelector('[data-mode="pen"]'));
                break;
            case 'r':
                this.setMode('rainbow');
                this.updateModeButtons(document.querySelector('[data-mode="rainbow"]'));
                break;
            case 'g':
                this.setMode('gradient');
                this.updateModeButtons(document.querySelector('[data-mode="gradient"]'));
                break;
            case 'e':
                this.setMode('eraser');
                this.updateModeButtons(document.querySelector('[data-mode="eraser"]'));
                break;
            case 'c':
                this.clearGrid();
                break;
            case 's':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.saveArt();
                } else {
                    this.saveArt();
                }
                break;
        }
    }

    saveArt() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const cellSize = 20;
        
        canvas.width = this.gridSize * cellSize;
        canvas.height = this.gridSize * cellSize;
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const cells = this.gridContainer.querySelectorAll('.grid-cell');
        cells.forEach((cell, index) => {
            const row = Math.floor(index / this.gridSize);
            const col = index % this.gridSize;
            const bgColor = cell.style.backgroundColor;
            
            if (bgColor && bgColor !== '') {
                ctx.fillStyle = bgColor;
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        });
        
        const link = document.createElement('a');
        link.download = `etch-a-sketch-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        this.showNotification('Artwork saved successfully!');
    }

    updatePixelCount() {
        this.pixelCountDisplay.textContent = `Pixels: ${this.pixelCount}`;
    }

    startTimer() {
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.drawTimeDisplay.textContent = `Time: ${elapsed}s`;
        }, 1000);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EtchASketch();
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);