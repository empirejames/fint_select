document.addEventListener('DOMContentLoaded', () => {
    const fonts = [
        { name: "字體A", file: "字體A.ttf" },
        { name: "字體B", file: "字體B.ttf" },
        { name: "字體C", file: "字體C.ttf" },
        { name: "字體D", file: "字體D.ttf" },
        { name: "字體E", file: "字體E.ttf" },
        { name: "字體F", file: "字體F.ttf" },
        { name: "字體G", file: "字體G.ttf" },
        { name: "字體H", file: "字體H.ttf" },
        { name: "字體I", file: "字體I.woff2" },
        { name: "字體J", file: "字體J.woff2" },
        { name: "字體K", file: "字體K.ttf" },
        { name: "字體L", file: "字體L.TTF" },
        { name: "字體M", file: "字體M.ttf" },
        { name: "字體N", file: "字體N.ttf" }
    ];

    // DOM Elements
    const previewText = document.getElementById('previewText');
    const fontGrid = document.getElementById('fontGrid');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // 1. Generate @font-face rules dynamically
    const styleSheet = document.createElement('style');
    let cssRules = '';
    
    fonts.forEach((font, index) => {
        if (font.file === "") return; 
        
        const cssFontName = `CustomFontV9_${index}`;
        font.cssName = cssFontName;
        
        let format = '';
        const ext = font.file.split('.').pop().toLowerCase();
        if (ext === 'woff2') format = "format('woff2')";
        else if (ext === 'woff') format = "format('woff')";
        else if (ext === 'ttf') format = "format('truetype')";
        else if (ext === 'otf') format = "format('opentype')";
        else if (ext === 'ttc') format = "format('collection'), format('truetype')";

        const fileUrl = encodeURI('./src/' + font.file);
        
        cssRules += `
            @font-face {
                font-family: '${cssFontName}';
                src: url('${fileUrl}') ${format};
                font-display: swap;
            }
        `;
    });
    
    styleSheet.textContent = cssRules;
    document.head.appendChild(styleSheet);

    // 2. Generate Grid Cards
    fonts.forEach((font, index) => {
        // Skip default font if it doesn't have a file, or render it?
        // Let's render all fonts including default.
        const card = document.createElement('div');
        card.className = 'font-card';
        card.style.fontFamily = font.cssName || "inherit";
        
        const indexDiv = document.createElement('div');
        indexDiv.className = 'font-index';
        // Display index as A, B, C...
        indexDiv.textContent = String.fromCharCode(65 + index);
        
        const previewDiv = document.createElement('div');
        previewDiv.className = 'font-preview';
        previewDiv.textContent = previewText.value;
        
        card.appendChild(indexDiv);
        card.appendChild(previewDiv);
        fontGrid.appendChild(card);
    });

    // Hide loading overlay
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 800);

    // 3. Event Listeners
    
    // Update all previews on input
    previewText.addEventListener('input', (e) => {
        const newText = e.target.value;
        const previews = document.querySelectorAll('.font-preview');
        previews.forEach(p => {
            p.textContent = newText;
        });
    });

    // Font loading diagnostics
    document.fonts.addEventListener('loadingerror', (event) => {
        const failedFonts = [];
        for (const fontFace of event.fontfaces) {
            failedFonts.push(fontFace.family);
        }
        if (failedFonts.length > 0) {
            console.error("字體載入失敗 (被瀏覽器封鎖): " + failedFonts.join(", "));
        }
    });
});
