document.addEventListener('DOMContentLoaded', () => {
    const fonts = [
        { name: "預設字體", file: "" },
        { name: "灵动指书", file: "lingdong-zhishu  灵动指书手机字体  人丑多读书.ttf" },
        { name: "口力口體", file: "口力口體.ttf" },
        { name: "愛ㄉ粗麵體", file: "愛ㄉ粗麵體.ttf" },
        { name: "注音 SekiGothic", file: "注音體_BpmfGenSekiGothic-B.ttf" },
        { name: "注音 SenRounded", file: "注音體_BpmfGenSenRounded-B.ttf" },
        { name: "粒線體 Mono", file: "粒線體_lihsianti-monospaced.ttf" },
        { name: "粒線體 Prop", file: "粒線體_lihsianti-proportional.ttf" },
        { name: "粗線體", file: "粗線體 台湾粗线体.ttf" },
        { name: "胖西 瘦瘦", file: "胖西手寫體 瘦瘦.woff2" },
        { name: "胖西 蓬蓬", file: "胖西手寫體 蓬蓬.woff2" },
        { name: "芫萎", file: "芫萎_Iansui-Regular.ttf" },
        { name: "華康墨字體", file: "華康墨字體_fixed.ttf" },
        { name: "華康娃娃體", file: "華康娃娃體.ttf" },
        { name: "陈森田", file: "chen_fixed_final.ttf" }
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
        // Display index starting from 1
        indexDiv.textContent = index + 1;
        
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
