# hack_moodle_v3.0
**Extension for automatic answer filling in Moodle**

## 🚀 Features
- Auto-fill answers in Moodle tests
- Development mode with file watching and hot-reload (`webpack --watch`)
- TypeScript for type safety and better code maintenance
- Webpack with HtmlWebpackPlugin, CopyWebpackPlugin, and webpack-ext-reloader
- Content scripts & background scripts architecture

## 📦 Installation
```bash  
git clone https://github.com/shnupel/hack_moodle_v3.git  
npm install  
```  

## 🛠️ Usage
**Development mode**:
```bash  
npm run dev  
```  
**Build for production**:
```bash  
npm run build  
```  

## 🔧 Architecture
- **Webpack**
    - Entry points: `index.ts` (content script), `background.ts` (background script)
    - TypeScript via `ts-loader`
    - Auto-reload via `webpack-ext-reloader`
- **Manifest V3**: Service Worker instead of background pages
- **HTML**: Generated `popup.html` via `HtmlWebpackPlugin`

## 📁 Project Structure
```
hack_moodle_v3/  
├── dist/              # Build output  
├── src/  
│   ├── scripts/       # TypeScript (content, background)  
│   ├── index.html     # Popup template  
│   ├── manifest.json  # Extension config  
│   └── public/        # Static assets (icons, fonts)  
├── webpack.config.js  
└── package.json  
```  

## 📜 License
MIT License  
[License details](https://github.com/shnupel/hack_moodle_v3/blob/main/LICENSE)

---  

### English Version

## 🛠️ hack_moodle_v3.0
**Extension for automatic answer filling in Moodle**

## 🚀 Features
- Auto-fill answers in Moodle tests
- Development mode with file watching and hot-reload (`webpack --watch`)
- TypeScript for type safety and better code maintenance
- Webpack with HtmlWebpackPlugin, CopyWebpackPlugin, and webpack-ext-reloader
- Content scripts & background scripts architecture

## 📦 Installation
```bash  
git clone https://github.com/shnupel/hack_moodle_v3.git  
npm install  
```  

## 🛠️ Usage
**Development mode**:
```bash  
npm run dev  
```  
**Build for production**:
```bash  
npm run build  
```  

## 🔧 Architecture
- **Webpack**
    - Entry points: `index.ts` (content script), `background.ts` (background script)
    - TypeScript via `ts-loader`
    - Auto-reload via `webpack-ext-reloader`
- **Manifest V3**: Service Worker instead of background pages
- **HTML**: Generated `popup.html` via `HtmlWebpackPlugin`

## 📁 Project Structure
```
hack_moodle_v3/  
├── dist/              # Build output  
├── src/  
│   ├── scripts/       # TypeScript (content, background)  
│   ├── index.html     # Popup template  
│   ├── manifest.json  # Extension config  
│   └── public/        # Static assets (icons, fonts)  
├── webpack.config.js  
└── package.json  
```  

## 📜 License
MIT License  
[License details](https://github.com/shnupel/hack_moodle_v3/blob/main/LICENSE)
