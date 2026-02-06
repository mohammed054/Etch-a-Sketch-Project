# 🎨 Elite Etch-a-Sketch

An advanced, feature-rich Etch-a-Sketch web application built with modern HTML5, CSS3, and vanilla JavaScript.

## ✨ Features

### 🎯 Drawing Modes
- **✏️ Pen Mode**: Draw with customizable colors and opacity
- **🌈 Rainbow Mode**: Automatic color cycling for vibrant artwork
- **🎨 Gradient Mode**: Position-based color gradients
- **🧹 Eraser Mode**: Remove unwanted pixels

### 🎛️ Controls
- **Grid Size**: Adjustable from 8x8 to 64x64 pixels
- **Color Picker**: Choose any color for drawing
- **Opacity Control**: Adjust transparency from 10% to 100%
- **Grid Lines**: Toggle grid visibility for cleaner artwork

### 💾 Actions
- **Save Art**: Export your creation as PNG
- **Random Fill**: Generate random colorful patterns
- **Clear Grid**: Reset the canvas instantly

### ⌨️ Keyboard Shortcuts
- `P` - Pen Mode
- `R` - Rainbow Mode  
- `G` - Gradient Mode
- `E` - Eraser Mode
- `C` - Clear Grid
- `S` - Save Artwork

### 📱 Features
- **Responsive Design**: Works on all screen sizes
- **Touch Support**: Mobile and tablet compatible
- **Real-time Stats**: Pixel counter and drawing timer
- **Smooth Animations**: Professional UI interactions

## 🚀 Quick Start

### Local Development
1. Clone this repository
```bash
git clone https://github.com/mohammed054/Etch-a-Sketch-Project.git
cd Etch-a-Sketch-Project
```

2. Start a local server
```bash
# Using Python (recommended)
python -m http.server 8000

# Or using Node.js (if you have it)
npx serve .

# Or simply open index.html in your browser
open index.html
```

3. Open `http://localhost:8000` in your browser

## 🌐 GitHub Pages Setup

To deploy this project to GitHub Pages:

### Method 1: Automatic Deployment (Recommended)
1. Make sure you have gh-pages installed:
```bash
npm install
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Method 2: Manual GitHub Pages Configuration
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/(root)** folder
6. Click **Save**
7. Your site will be available at `https://mohammed054.github.io/Etch-a-Sketch-Project/`

## 🛠️ Technical Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and gradients
- **Vanilla JavaScript**: ES6+ features and OOP patterns
- **GitHub Pages**: Static site hosting
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
Etch-a-Sketch-Project/
├── index.html          # Main HTML file
├── styles.css          # Complete styling
├── script.js           # Main JavaScript application
├── package.json        # Project configuration
├── node_modules/       # Dependencies (gh-pages)
└── README.md          # This file
```

## 🎮 How to Use

1. **Set Grid Size**: Use the slider to choose your canvas size
2. **Choose Drawing Mode**: Select from Pen, Rainbow, Gradient, or Eraser
3. **Customize Colors**: Pick your color and adjust opacity
4. **Draw Art**: Click and drag to create
5. **Save Your Work**: Use the Save button to download as PNG

## 🌟 Advanced Tips

- Use **Rainbow Mode** for psychedelic effects
- **Gradient Mode** creates smooth color transitions
- Adjust **opacity** for layering effects
- Toggle **grid lines** for a cleaner final look
- Use **keyboard shortcuts** for faster workflow

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Etch-a-Sketch toy
- Built as a modern web development learning project
- Thanks to all contributors and the open-source community

---

**Enjoy creating your digital masterpieces! 🎨**