# Happy Files Viewer - ໂປຣແກຣມເບິ່ງໄຟລ໌ມ່ວນ

<div align="center">
  <img src="build/icon.png" alt="Happy Files Viewer Logo" width="128"/>
  <h3>ແອັບພລິເຄຊັນເດັສທອບສຳລັບເບິ່ງແລະຈັດການໄຟລ໌ມ່ວນ</h3>
  
  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/happy-files-viewer)
  [![Platform](https://img.shields.io/badge/platform-Windows%20|%20macOS%20|%20Linux-lightgrey.svg)](#installation)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
</div>

## 📋 ລາຍລະອຽດໂປຣແກຣມ

Happy Files Viewer ເປັນແອັບພລິເຄຊັນທີ່ສ້າງຂຶ້ນດ້ວຍເທັກໂນໂລຊີ Electron ເພື່ອຊ່ວຍໃຫ້ທ່ານສາມາດເບິ່ງແລະຈັດການໄຟລ໌ຂອງທ່ານໄດ້ຢ່າງງ່າຍດາຍ ມີການອອກແບບທີ່ສວຍງາມແລະໃຊ້ງ່າຍ.

### ✨ ຄຸນສົມບັດຫຼັກ

- 🖥️ **ສາມາດໃຊ້ໄດ້ໃນທຸກລະບົບ**: Windows, macOS ແລະ Linux
- 📁 **ການຈັດການໄຟລ໌**: ເບິ່ງ, ສ້າງໃໝ່, ແລະຣີເຟຣຊໄຟລ໌ໄດ້
- 🎨 **ການອອກແບບທີ່ສວຍງາມ**: ໃຊ້ Modern UI ກັບ Gradient ແລະ Glassmorphism
- ⚡ **ປະສິດທິພາບສູງ**: ໃຊ້ງານໄດ້ລື່ນໄຫລແລະລວດໄວ
- 🔒 **ຄວາມປອດໄພ**: ໃຊ້ Security Best Practices ຂອງ Electron
- 📱 **Responsive**: ສາມາດປັບຂະໜາດໄດ້ຕາມຫນ້າຈໍ

## 🚀 ການຕິດຕັ້ງ

### ຄວາມຕ້ອງການພື້ນຖານ

ກ່ອນການຕິດຕັ້ງ, ກະລຸນາໃຫ້ແນ່ໃຈວ່າຄອມພິວເຕີຂອງທ່ານມີ:

- [Node.js](https://nodejs.org/) ເວີຊັນ 16 ຫຼືໃໝ່ກວ່າ
- npm ເວີຊັນ 8 ຫຼືໃໝ່ກວ່າ
- Git (ສຳລັບນັກພັດທະນາ)

### ການຕິດຕັ້ງສຳລັບຜູ້ໃຊ້

#### Windows
1. ດາວໂຫຼດໄຟລ໌ `Happy Files Viewer Setup.exe` ຈາກ [Releases](https://github.com/yourusername/happy-files-viewer/releases)
2. ດັບເບິ້ລຄລິກໄຟລ໌ເພື່ອເລີ່ມການຕິດຕັ້ງ
3. ປະຕິບັດຕາມຂັ້ນຕອນການຕິດຕັ້ງ

#### macOS
1. ດາວໂຫຼດໄຟລ໌ `Happy Files Viewer.dmg`
2. ເປີດໄຟລ໌ DMG
3. ລາກໄອຄອນແອັບໄປໃສ່ໂຟລເດີ Applications

#### Linux
1. ດາວໂຫຼດໄຟລ໌ `Happy Files Viewer.AppImage`
2. ເຮັດໃຫ້ໄຟລ໌ສາມາດເຮັດວຽກໄດ້:
   ```bash
   chmod +x Happy\ Files\ Viewer.AppImage
   ```
3. ດັບເບິ້ລຄລິກເພື່ອເຮັດວຽກ

### ການຕິດຕັ້ງສຳລັບນັກພັດທະນາ

```bash
# ໂຄລນໂປຣເຈັກ
git clone https://github.com/yourusername/happy-files-viewer.git
cd happy-files-viewer

# ຕິດຕັ້ງ Dependencies
npm install

# ເຮັດວຽກໃນໂໝດພັດທະນາ
npm start
```

## 🛠️ ວິທີການໃຊ້ງານ

### ການເລີ່ມໃຊ້ງານ

1. **ເປີດແອັບ**: ຄລິກໄອຄອນ Happy Files Viewer ເທິງເດັສທອບ
2. **ໂຫຼດໄຟລ໌**: ຄລິກປຸ່ມ "Refresh Files" ເພື່ອໂຫຼດໄຟລ໌
3. **ສ້າງໄຟລ໌ໃໝ່**: ຄລິກ "Create New File" ເພື່ອສ້າງໄຟລ໌ໃໝ່
4. **ເບິ່ງສະຖານະ**: ຄລິກ "System Status" ເພື່ອເບິ່ງສະຖານະລະບົບ

### Keyboard Shortcuts

| ປຸ່ມກົດ | ຄຳສັ່ງ |
|---------|---------|
| `Ctrl+R` / `Cmd+R` | ຣີເຟຣຊໄຟລ໌ |
| `Ctrl+N` / `Cmd+N` | ສ້າງໄຟລ໌ໃໝ່ |
| `Ctrl+O` / `Cmd+O` | ເປີດໂຟລເດີ |
| `F12` | ເປີດ Developer Tools |
| `Ctrl+Q` / `Cmd+Q` | ອອກຈາກແອັບ |

## 🔧 ການກຳຫນົດຄ່າ

### ການຕັ້ງຄ່າເຊີຟເວີ

ແອັບນີ້ຕ້ອງການເຊີຟເວີ Backend ທີ່ເຮັດວຽກຢູ່ `http://localhost:3000`

ໃຫ້ແນ່ໃຈວ່າເຊີຟເວີຂອງທ່ານມີ endpoints ເຫຼົ່ານີ້:

- `GET /happy-files` - ໂຫຼດລາຍການໄຟລ໌
- `POST /trigger-minutely` - ສ້າງໄຟລ໌ໃໝ່
- `GET /status` - ເບິ່ງສະຖານະລະບົບ

### ການປັບແຕ່ງ

ທ່ານສາມາດປັບແຕ່ງໄດ້:

- **ສີສັນ**: ແກ້ໄຂໄຟລ໌ `src/renderer/css/main.css`
- **API URL**: ແກ້ໄຂໃນ `src/renderer/js/api.js`
- **ຂະໜາດໜ້າຈໍ**: ແກ້ໄຂໃນ `src/main/window.js`

## 🏗️ ການ Build ແລະ Compile

### Build ສຳລັບການກະຈາຍ

```bash
# Build ສຳລັບທຸກແພລຕຟອມ
npm run build

# Build ສະເພາະ Windows
npm run build:win

# Build ສະເພາະ macOS  
npm run build:mac

# Build ສະເພາະ Linux
npm run build:linux
```

### ການທົດສອບ

```bash
# ເຮັດວຽກໃນໂໝດທົດສອບ
npm test

# ກວດສອບ Code Quality
npm run lint

# ແກ້ໄຂ Lint Issues ອັດຕະໂນມັດ
npm run lint:fix
```

## 📁 ໂຄງສ້າງໂປຣເຈັກ

```
happy-files-viewer/
├── src/
│   ├── main/              # Main Process (Node.js)
│   │   ├── main.js        # ຈຸດເລີ່ມຕົ້ນ
│   │   ├── window.js      # ການຈັດການໜ້າຈໍ
│   │   ├── menu.js        # ເມນູແອັບ
│   │   └── preload.js     # Security Bridge
│   ├── renderer/          # Renderer Process (Web)
│   │   ├── index.html     # HTML ຫຼັກ
│   │   ├── css/           # ໄຟລ໌ CSS
│   │   ├── js/            # ໄຟລ໌ JavaScript
│   │   └── assets/        # ຮູບພາບແລະ Resources
│   └── shared/            # ໄຟລ໌ທີ່ໃຊ້ຮ່ວມກັນ
├── build/                 # Icons ແລະ Build Resources
├── dist/                  # ໄຟລ໌ທີ່ Build ແລ້ວ
└── docs/                  # ເອກະສານ
```

## 🐛 ການແກ້ໄຂບັນຫາ

### ບັນຫາທົ່ວໄປ

#### ແອັບບໍ່ເປີດ
- ກວດສອບວ່າ Node.js ຖືກຕິດຕັ້ງແລ້ວ
- ລອງເຮັດວຽກຄຳສັ່ງ `npm install` ໃໝ່

#### ໂຫຼດໄຟລ໌ບໍ່ໄດ້
- ໃຫ້ແນ່ໃຈວ່າເຊີຟເວີ Backend ເຮັດວຽກຢູ່ port 3000
- ກວດສອບການເຊື່ອມຕໍ່ອິນເຕີເນັດ

#### ປັນຫາການ Build
```bash
# ລົບ node_modules ແລະ install ໃໝ່
rm -rf node_modules package-lock.json
npm install

# ລົບໂຟລເດີ dist
npm run clean
npm run build
```

## 🤝 ການສະໜັບສະໜູນແລະການພັດທະນາ

### ການລາຍງານບັນຫາ

ຖ້າທ່ານພົບບັນຫາ, ກະລຸນາລາຍງານຜ່ານ [GitHub Issues](https://github.com/yourusername/happy-files-viewer/issues)

### ການພັດທະນາ

ຍິນດີຕ້ອນຮັບການມີສ່ວນຮ່ວມ! ກະລຸນາອ່ານ [CONTRIBUTING.md](CONTRIBUTING.md) ກ່ອນ

#### ການຕັ້ງຄ່າສິ່ງແວດລ້ອມການພັດທະນາ

```bash
# ຕິດຕັ້ງ dependencies
npm install

# ເຮັດວຽກໃນໂໝດ development
npm run dev

# ເຮັດວຽກ linter
npm run lint
```

## 📜 License

ໂປຣເຈັກນີ້ໃຊ້ລິຂະສິດ MIT License - ເບິ່ງລາຍລະອຽດໃນໄຟລ໌ [LICENSE](LICENSE)

## 🙏 ຂອບໃຈ

- [Electron](https://electronjs.org/) - Framework ສຳລັບສ້າງແອັບເດັສທອບ
- [Node.js](https://nodejs.org/) - JavaScript Runtime
- ຊຸມຊົນນັກພັດທະນາທີ່ໃຫ້ການສະໜັບສະໜູນ

## 📞 ຕິດຕໍ່

- **ຜູ້ສ້າງ**: [Your Name](mailto:your.email@example.com)
- **GitHub**: [yourusername](https://github.com/yourusername)
- **Website**: [https://yourwebsite.com](https://yourwebsite.com)

---

<div align="center">
  <p>ສ້າງດ້ວຍ ❤️ ໃນປະເທດລາວ</p>
  <p>Made with ❤️ in Laos</p>
</div>

npm start          # Run the app
npm run dev        # Run with debugging
npm run lint       # Check code quality
npm run build      # Build for all platforms
npm run build:win  # Build for Windows only
npm run build:mac  # Build for macOS only
npm run build:linux # Build for Linux only
"# html-to-program" 
