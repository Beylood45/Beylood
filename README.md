# Beylood — Static website

Hal-bog ah, code sahlan, professional ah. Three files:
- `index.html` — qaab dhismeedka bogga
- `style.css`  — naqshadda iyo midabka
- `script.js`  — beddelka luuqadda iyo menu

## Sida loo isticmaalo

**Local:** Double-click `index.html` — wuxuu ka furmaa browser-kaaga si toos ah.

**GitHub Pages (online live):**
1. Push file-yada oo dhan `my-website` repo-gaaga.
2. GitHub → **Settings** → **Pages**
3. **Source:** Deploy from a branch
4. **Branch:** `main` / **Folder:** `/ (root)` → Save
5. Daqiiqo gudaheed website-kaaga waxa lagu heli karaa: `https://beylood45.github.io/my-website/`

## Folder structure

```
my-website/
├── index.html
├── style.css
├── script.js
├── README.md
├── assets/
│   ├── logo.png
│   ├── logo-transparent.png
│   ├── icon.png
│   └── founder.jpg
└── fonts/
    ├── poppins-*.woff2
    └── cairo-*.woff2
```

## Beddelka

- Qoraalka — beddel matn-ka `index.html` ama tarjumaadaha `script.js` (qaybta `dict`)
- Midabka — beddel `:root` block-ga sare ee `style.css`
- Sawirka founder-ka — bedel file-ka `assets/founder.jpg`
- Logo — bedel `assets/logo.png` iyo `logo-transparent.png`

## Luuqado

- Soomaali (default)
- English
- العربية (RTL)

Kaliya riix buton-ka luuqadda kor-ka si aad u rogto.
