// --- HỆ THỐNG CỐT TRUYỆN MỞ ĐẦU (12 CẢNH + CHẠY CHỮ + NEXT / SKIP) ---
const STORY_IMG_DIRS = ["tiêu béo adventure", ".", "story", "images", "img", "assets"];
const STORY_TYPEWRITER_SPEED_MS = 22;

const STORY_SLIDES = [
    {
        index: 1,
        stems: ["story1", "1", "01", "story_1", "story 1", "1 - tieu beo", "1 - tiêu béo"],
        text: "Đây là Tiêu Béo — hoàng tử tôn quý của Vương Quốc Mèo. Trước khi bước vào cuộc đại chiến mèo xuyên không định mệnh, cậu được cử tới thế giới loài người để rèn luyện và trải nghiệm cuộc sống đầy phức tạp nơi đây."
    },
    {
        index: 2,
        stems: ["story2", "2", "02", "story_2", "story 2"],
        text: "Sống ở thế giới loài người một thời gian, mọi thứ êm đềm hơn Tiêu tưởng rất nhiều. Nhờ tài tích trữ điêu luyện, cậu đã gom được cả một kho báu Pate và hạt, chỉ mong những ngày tháng ăn no ngủ kỹ thế này kéo dài mãi mãi."
    },
    {
        index: 3,
        stems: ["story3", "3", "03", "story_3", "story 3"],
        text: "Thỉnh thoảng Tiêu vẫn nghe phong phanh về loài Chuột — lũ sinh vật ranh ma chuyên phá hoại thế giới loài người và là kẻ thù truyền kiếp của tộc Mèo. Nhưng chưa tận mắt chạm trán bao giờ nên cậu chẳng mấy bận tâm, ngày ngày chỉ việc đánh chén no nê rồi cuộn tròn đánh một giấc."
    },
    {
        index: 4,
        stems: ["story4", "4", "04", "story_4", "story 4"],
        text: "Tiêu đâu ngờ rằng, ngay sau giấc ngủ tưởng chừng bình yên như mọi hôm này, vận mệnh của cậu sắp rẽ sang một cuộc chiến không khoan nhượng..."
    },
    {
        index: 5,
        stems: ["story5", "5", "05", "story_5", "story 5"],
        text: "Vừa mở mắt tỉnh dậy, Tiêu Béo chết lặng. Toàn bộ kho báu Pate cùng đống lương thực tích cóp bấy lâu đã bốc hơi sạch sành sanh, không còn lấy một mẩu vụn!"
    },
    {
        index: 6,
        stems: ["story6", "6", "06", "story_6", "story 6"],
        text: "Không tin vào mắt mình, vị hoàng tử vội vã rảo bước sục sạo khắp căn nhà, lùng sục từ gầm bàn tới từng góc phòng với tia hy vọng mong manh."
    },
    {
        index: 7,
        stems: ["story7", "7", "07", "story_7", "story 7"],
        text: "Tiêu thậm chí còn chui vào tận khe chân quạt và những ngóc ngách kín nhất, wondering không biết có phải đám loài người ở đây đã lén \"ăn nhầm\" mất phần của mình hay không."
    },
    {
        index: 8,
        stems: ["story8", "8", "08", "story_8", "story 8"],
        text: "Đang lúc rối bời giữa căn phòng trống trơn, ánh mắt của Tiêu bất ngờ khựng lại trước một dấu vết kỳ lạ in hằn trên nền gạch..."
    },
    {
        index: 9,
        stems: ["story9", "9", "09", "story_9", "story 9"],
        text: "Đó chính là dấu ấn ký khét tiếng của Chụt Béo Ị — một tên thủ lĩnh cấp cao của Vương Quốc Chuột mà Tiêu từng nghe danh. Vì thói tham lam vô độ, chuyên cướp bóc và nuốt chửng mọi thứ trên đời mà hắn phình to thành bộ dạng béo ị, xấu xí."
    },
    {
        index: 10,
        stems: ["story10", "10", "story_10", "story 10"],
        text: "Để lại dấu ấn ngay tại hiện trường chẳng khác nào một lời khiêu chiến thẳng vào lòng tự tôn của hoàng tử Vương Quốc Mèo. Tiêu Béo ngẩng cao đầu, hạ quyết tâm sẽ đích thân lên đường trừng trị lũ chuột xấc xược này và đòi lại từng gói Pate!"
    },
    {
        index: 11,
        stems: ["story11", "11", "story_11", "story 11"],
        text: "Với sự tính toán sắc bén của một hoàng tử, Tiêu Béo hiểu rõ nếu đơn phương độc mã sẽ khó lòng xoay xở trước bầy chuột vừa đông đảo vừa hung hãn. Cậu bắt đầu tìm gặp và kết nối với các đồng minh mèo khác ở thế giới loài người để lập thành liên minh."
    },
    {
        index: 12,
        stems: ["story12", "12", "story_12", "story 12"],
        text: "Hóa ra các đồng minh ở thế giới loài người cũng từng bị lũ chuột cuỗm sạch thức ăn, nhưng chưa ai dám đứng lên đòi lại công bằng. Nhìn cảnh anh em đồng loại chịu thiệt, lòng tự tôn của hoàng tử Mèo bùng lên dữ dội: Tiêu Béo thề sẽ bắt từng con chuột một nôn ra hết số Pate đã cướp, chính thức mở màn cuộc chiến đòi lại công bằng!"
    }
];

let storyCurrentIndex = 0;
let storyTypewriterTimer = null;
let storyIsTyping = false;
let storyCompletedIntro = false;

function stopStoryTypewriter() {
    if (storyTypewriterTimer) {
        clearInterval(storyTypewriterTimer);
        storyTypewriterTimer = null;
    }
    storyIsTyping = false;
}

function updateStoryTypingHint() {
    const hintEl = document.getElementById("story-hint");
    const nextBtn = document.getElementById("story-next-btn");
    const isLast = storyCurrentIndex >= STORY_SLIDES.length - 1;

    if (hintEl) {
        if (storyIsTyping) {
            hintEl.textContent = "Đang chạy chữ... (Bấm để hiện nhanh)";
        } else {
            hintEl.textContent = isLast
                ? "Bấm Next hoặc khung thoại để vào Hub!"
                : "Bấm Next hoặc khung thoại để sang cảnh tiếp theo";
        }
    }

    if (nextBtn) {
        nextBtn.textContent = isLast ? "Vào Hub ▶" : "Next ▶";
    }
}

function renderStorySlide(idx) {
    const safeIdx = Math.max(0, Math.min(STORY_SLIDES.length - 1, idx));
    storyCurrentIndex = safeIdx;
    const slide = STORY_SLIDES[safeIdx];

    stopStoryTypewriter();

    const counterEl = document.getElementById("story-step-counter");
    const speakerEl = document.getElementById("story-speaker-tag");
    const textEl = document.getElementById("story-text");
    const imgEl = document.getElementById("story-image");
    const fallbackEl = document.getElementById("story-image-fallback");

    if (counterEl) {
        counterEl.textContent = `${slide.index} / ${STORY_SLIDES.length}`;
    }
    if (speakerEl) {
        speakerEl.textContent = `CỐT TRUYỆN · CẢNH ${slide.index}`;
    }

    if (imgEl && fallbackEl) {
        fallbackEl.style.display = "none";
        fallbackEl.textContent = "";
        imgEl.style.display = "block";

        const candidates = buildAssetCandidates(
            STORY_IMG_DIRS,
            slide.stems,
            [".png", ".jpg", ".jpeg", ".webp", ".gif"]
        );

        let cIdx = 0;
        imgEl.alt = `Cốt truyện ${slide.index}`;
        imgEl.onerror = function () {
            cIdx += 1;
            if (cIdx < candidates.length) {
                this.src = candidates[cIdx];
            } else {
                this.onerror = null;
                this.style.display = "none";
                fallbackEl.style.display = "block";
                fallbackEl.textContent = `[Ảnh cốt truyện ${slide.index}]`;
            }
        };
        imgEl.src = candidates[0] || "";
    }

    const fullText = slide.text || "";
    if (!textEl) return;

    textEl.textContent = "";
    storyIsTyping = true;
    updateStoryTypingHint();

    let charPos = 0;
    storyTypewriterTimer = setInterval(() => {
        charPos += 1;
        textEl.textContent = fullText.slice(0, charPos);

        if (charPos >= fullText.length) {
            stopStoryTypewriter();
            updateStoryTypingHint();
        }
    }, STORY_TYPEWRITER_SPEED_MS);
}

function revealFullCurrentStoryText() {
    const slide = STORY_SLIDES[storyCurrentIndex];
    const textEl = document.getElementById("story-text");
    stopStoryTypewriter();
    if (slide && textEl) {
        textEl.textContent = slide.text;
    }
    updateStoryTypingHint();
}

function advanceStorySlide() {
    if (storyCurrentIndex < STORY_SLIDES.length - 1) {
        renderStorySlide(storyCurrentIndex + 1);
    } else {
        finishStoryIntro();
    }
}

function handleStoryNextClick() {
    if (storyIsTyping) {
        revealFullCurrentStoryText();
        return;
    }
    advanceStorySlide();
}

function handleStoryDialogueClick() {
    if (storyIsTyping) {
        revealFullCurrentStoryText();
        return;
    }
    advanceStorySlide();
}

function finishStoryIntro() {
    stopStoryTypewriter();
    storyCompletedIntro = true;

    const storyScreen = document.getElementById("story-screen");
    const hubScreen = document.getElementById("hub-screen");
    const gameScreen = document.getElementById("game-screen");

    if (storyScreen) storyScreen.style.display = "none";
    if (gameScreen) gameScreen.style.display = "none";
    if (hubScreen) hubScreen.style.display = "block";

    currentScreen = "hub";
    renderHubLoadout();
}

function openStoryIntro() {
    const storyScreen = document.getElementById("story-screen");
    const hubScreen = document.getElementById("hub-screen");
    const gameScreen = document.getElementById("game-screen");

    if (hubScreen) hubScreen.style.display = "none";
    if (gameScreen) gameScreen.style.display = "none";
    if (storyScreen) storyScreen.style.display = "flex";

    currentScreen = "story";
    renderStorySlide(0);
}

// --- ĐƯỜNG DẪN 26 ẢNH NHÂN VẬT & ẢNH ĐỊCH ---
const CHAR_IMG_DIR = ".";
const ENEMY_IMG_DIR = "tiêu béo adventure";

function toSlugNoTone(str = "") {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .trim();
}

function buildAssetCandidates(dirs, stems, exts) {
    const candidates = [];
    for (const dir of dirs) {
        const prefix = (!dir || dir === ".") ? "" : `${dir}/`;
        for (const stem of stems) {
            for (const ext of exts) {
                const url = encodeURI(`${prefix}${stem}${ext}`);
                if (!candidates.includes(url)) candidates.push(url);
            }
        }
    }
    return candidates;
}

function attachImageWithFallback(imgEl, candidates, altText = "Sprite") {
    if (!imgEl) return;
    imgEl.alt = altText;
    if (!Array.isArray(candidates) || candidates.length === 0) return;

    let idx = 0;
    imgEl.onerror = function () {
        idx += 1;
        if (idx < candidates.length) {
            this.src = candidates[idx];
        } else {
            this.onerror = null;
            this.style.display = "none";
        }
    };
    imgEl.style.display = "";
    imgEl.src = candidates[0];
}

function buildCharImageCandidates(charObj) {
    const base = CHAR_POOL.find(c => c.id === charObj?.id) || charObj || CHAR_POOL[0];
    const numMatch = (base.id || "").match(/(\d+)/);
    const numRaw = numMatch ? String(parseInt(numMatch[1], 10)) : "";
    const numPad = numMatch ? numMatch[1].padStart(2, "0") : "";

    const rawName = (base.name || "").trim();
    const lowerName = rawName.toLowerCase();
    const slugName = toSlugNoTone(rawName);

    const stems = [];
    const addStem = (s) => {
        if (s && !stems.includes(s)) stems.push(s);
    };

    if (numRaw && lowerName) addStem(`${numRaw} - ${lowerName}`);
    if (numRaw && slugName)  addStem(`${numRaw} - ${slugName}`);
    if (numPad && lowerName) addStem(`${numPad} - ${lowerName}`);
    if (numPad && slugName)  addStem(`${numPad} - ${slugName}`);
    addStem(lowerName);
    addStem(slugName);
    if (numRaw) addStem(numRaw);
    if (numPad) addStem(numPad);

    const exts = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
    const candidates = buildAssetCandidates([CHAR_IMG_DIR], stems, exts);

    const tieuCandidates = buildAssetCandidates(
        [CHAR_IMG_DIR],
        ["tieu"],
        [".png", ".jpg", ".jpeg", ".webp", ".gif"]
    );
    for (const tUrl of tieuCandidates) {
        if (!candidates.includes(tUrl)) candidates.push(tUrl);
    }

    return candidates;
}

function attachCharacterImage(imgEl, charObj) {
    attachImageWithFallback(imgEl, buildCharImageCandidates(charObj), charObj?.name || "Character");
}

function buildEnemyImageCandidates(enemyObj) {
    const fileName = (enemyObj?.imgFile || "").trim();
    const rawName = (enemyObj?.name || "").trim();
    const lowerName = rawName.toLowerCase();
    const slugName = toSlugNoTone(rawName);

    const dirs = [ENEMY_IMG_DIR, "."];
    const candidates = [];

    if (fileName) {
        for (const dir of dirs) {
            const prefix = (!dir || dir === ".") ? "" : `${dir}/`;
            const url = encodeURI(`${prefix}${fileName}`);
            if (!candidates.includes(url)) candidates.push(url);
        }
    }

    const stems = [lowerName, slugName].filter(Boolean);
    const exts = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
    for (const url of buildAssetCandidates(dirs, stems, exts)) {
        if (!candidates.includes(url)) candidates.push(url);
    }

    return candidates;
}

function debugMissingCharacterImages() {
    CHAR_POOL.forEach((charBase) => {
        const candidates = buildCharImageCandidates(charBase);
        const probe = new Image();
        let i = 0;
        const tryNext = () => {
            if (i >= candidates.length) {
                console.warn(`[IMG FAIL] ${charBase.id} - ${charBase.name}`);
                return;
            }
            const url = candidates[i++];
            probe.onload = () => {
                console.log(`[IMG OK] ${charBase.id} - ${charBase.name} -> ${decodeURI(url)}`);
            };
            probe.onerror = tryNext;
            probe.src = url;
        };
        tryNext();
    });

    RAT_POOL.forEach((ratBase) => {
        const candidates = buildEnemyImageCandidates(ratBase);
        const probe = new Image();
        let i = 0;
        const tryNext = () => {
            if (i >= candidates.length) {
                console.warn(`[ENEMY IMG FAIL] ${ratBase.id} - ${ratBase.name} (${ratBase.imgFile})`);
                return;
            }
            const url = candidates[i++];
            probe.onload = () => {
                console.log(`[ENEMY IMG OK] ${ratBase.id} - ${ratBase.name} -> ${decodeURI(url)}`);
            };
            probe.onerror = tryNext;
            probe.src = url;
        };
        tryNext();
    });
}

// --- HỆ THỐNG 10 NGUYÊN TỐ (8 HỆ GỐC + 2 HỆ SIÊU HIẾM ÁNH SÁNG & BÓNG TỐI) ---
const ELEMENT_LABELS = {
    hoa:      "Hỏa",
    thuy:     "Thủy",
    thao:     "Thảo",
    dat:      "Đất",
    kim:      "Kim",
    loi:      "Lôi",
    phong:    "Phong",
    bang:     "Băng",
    anh_sang: "Ánh sáng",
    bong_toi: "Bóng tối"
};

const WEAKNESS_MAP = {
    hoa:      ["kim"],
    thuy:     ["hoa"],
    thao:     ["dat"],
    dat:      ["thuy"],
    kim:      ["thao"],
    loi:      ["kim", "thuy"],
    phong:    ["hoa", "thao"],
    bang:     ["thao", "phong"],
    anh_sang: ["bong_toi"],
    bong_toi: ["anh_sang"]
};

const SPECIAL_ELEMENTS = ["bang", "phong", "kim"];
const ULTRA_RARE_ELEMENTS = ["anh_sang", "bong_toi"];
const ADVANTAGE_MULTIPLIER = 1.15;
const SUPREME_ADVANTAGE_MULTIPLIER = 1.25;
const CRIT_MULTIPLIER = 1.5;
const CHILL_HEAL_REDUCTION = 0.3;
const BURN_HP_RATIO = 0.05;
const MAX_BURN_STACKS = 3;

const MAX_EFFECT_CHANCE = 85;
const MAX_CRIT_CHANCE = 100;

function clampEffectChance(chance) {
    return Math.max(0, Math.min(MAX_EFFECT_CHANCE, Math.round(chance || 0)));
}

function clampCritChance(chance) {
    return Math.max(0, Math.min(MAX_CRIT_CHANCE, Math.round(chance || 0)));
}

function isSupremePairMatch(attackElement, targetElement) {
    return (
        (attackElement === "anh_sang" && targetElement === "bong_toi") ||
        (attackElement === "bong_toi" && targetElement === "anh_sang")
    );
}

function isAdvantage(attackElement, targetElement) {
    if (!attackElement || !targetElement) return false;
    if (isSupremePairMatch(attackElement, targetElement)) return true;
    const targets = WEAKNESS_MAP[attackElement] || [];
    return targets.includes(targetElement);
}

function getAdvantageMultiplierForPair(attackElement, targetElement, extraBonusPct = 0) {
    const baseMult = isSupremePairMatch(attackElement, targetElement)
        ? SUPREME_ADVANTAGE_MULTIPLIER
        : ADVANTAGE_MULTIPLIER;
    return baseMult + (extraBonusPct / 100);
}

function getElementsWeakTo(elementKey) {
    return Object.keys(WEAKNESS_MAP).filter(atkEl =>
        (WEAKNESS_MAP[atkEl] || []).includes(elementKey)
    );
}

function applyDefReduction(rawDmg, targetDef) {
    return Math.max(1, Math.round(rawDmg - (targetDef || 0)));
}

function hasAnyDebuff(enemy) {
    if (!enemy || !enemy.status) return false;
    return (
        (enemy.status.burnStacks || 0) > 0 ||
        Boolean(enemy.status.chilled) ||
        Boolean(enemy.status.knockedUp)
    );
}

// --- BỘ 50 THẺ NÂNG CẤP TRONG TRẬN (30 THƯỜNG · 15 HIẾM · 5 ĐỘT BIẾN) ---
const UPGRADE_RARITY_CONFIG = {
    thuong:   { label: "Thường",   weight: 65, color: "#E2E8F0", border: "#64748B" },
    hiem:     { label: "Hiếm",     weight: 27, color: "#38BDF8", border: "#38BDF8" },
    dot_bien: { label: "Đột biến", weight: 8,  color: "#F472B6", border: "#F472B6" }
};

const UPGRADE_POOL = [
    { id: "upg_t_01", name: "Mài Lưỡi Kiếm",       rarity: "thuong", desc: "+10% ATK trong trận.", effect: { atkPct: 10 } },
    { id: "upg_t_02", name: "Đòn Tay Chắc Nịch",   rarity: "thuong", desc: "+6 ATK cộng thẳng.", effect: { atkFlat: 6 } },
    { id: "upg_t_03", name: "Thế Thủ Vững Vàng",   rarity: "thuong", desc: "+12% DEF trong trận.", effect: { defPct: 12 } },
    { id: "upg_t_04", name: "Lớp Giáp Da",         rarity: "thuong", desc: "+4 DEF cộng thẳng.", effect: { defFlat: 4 } },
    { id: "upg_t_05", name: "Thể Lực Dồi Dào",     rarity: "thuong", desc: "+15% Max HP & hồi ngay 15% Max HP.", effect: { hpPct: 15, healMaxHpPct: 15 } },
    { id: "upg_t_06", name: "Bồi Bổ Cấp Tốc",      rarity: "thuong", desc: "+25 Max HP & hồi ngay 25 HP.", effect: { hpFlat: 25, healFlat: 25 } },
    { id: "upg_t_07", name: "Nhắm Chuẩn Điểm Yếu", rarity: "thuong", desc: "+10% Tỉ lệ Chí mạng.", effect: { critChance: 10 } },
    { id: "upg_t_08", name: "Chém Nhanh Tay",      rarity: "thuong", desc: "+8% Tỉ lệ Chí mạng & +5% ATK.", effect: { critChance: 8, atkPct: 5 } },
    { id: "upg_t_09", name: "Châm Ngòi Lửa Nhỏ",   rarity: "thuong", desc: "+10% tỉ lệ gây Thiêu đốt.", effect: { burnChance: 10 } },
    { id: "upg_t_10", name: "Hơi Lạnh Lan Tỏa",    rarity: "thuong", desc: "+10% tỉ lệ gây Tê tái.", effect: { chillChance: 10 } },
    { id: "upg_t_11", name: "Chấn Động Nhẹ",       rarity: "thuong", desc: "+10% tỉ lệ gây Hất tung.", effect: { knockupChance: 10 } },
    { id: "upg_t_12", name: "Hút Sinh Lực Nhẹ",    rarity: "thuong", desc: "+10% tỉ lệ Hồi phục theo ST.", effect: { healChance: 10, healRatio: 0.2 } },
    { id: "upg_t_13", name: "Hồi Phục Mát Mẻ",     rarity: "thuong", desc: "+15% hiệu quả Hồi phục.", effect: { healBonusPct: 15 } },
    { id: "upg_t_14", name: "Bắt Đúng Hệ Yếu",     rarity: "thuong", desc: "+10% sát thương Khắc hệ.", effect: { advantageBonusPct: 10 } },
    { id: "upg_t_15", name: "Tích Tụ Nội Lực",     rarity: "thuong", desc: "Nhận ngay +1 Nộ.", effect: { gainEnergyNow: 1 } },
    { id: "upg_t_16", name: "Dòng Chảy Nộ Khí",    rarity: "thuong", desc: "+15% sát thương chiêu Nộ.", effect: { ultDmgPct: 15 } },
    { id: "upg_t_17", name: "Đòn Đánh Kiên Cố",    rarity: "thuong", desc: "+8% ATK & +8% DEF.", effect: { atkPct: 8, defPct: 8 } },
    { id: "upg_t_18", name: "Bền Bỉ Vượt Trội",    rarity: "thuong", desc: "+10% Max HP & +10% DEF.", effect: { hpPct: 10, defPct: 10 } },
    { id: "upg_t_19", name: "Mũi Nhọn Sắc Bén",    rarity: "thuong", desc: "+10% ATK & +5% Tỉ lệ Chí mạng.", effect: { atkPct: 10, critChance: 5 } },
    { id: "upg_t_20", name: "Gió Lùa Nhẹ Nhàng",   rarity: "thuong", desc: "+8% tỉ lệ Hất tung & +5% ATK.", effect: { knockupChance: 8, atkPct: 5 } },
    { id: "upg_t_21", name: "Sương Giá Dịu Nhẹ",   rarity: "thuong", desc: "+8% tỉ lệ Tê tái & +10% Max HP.", effect: { chillChance: 8, hpPct: 10 } },
    { id: "upg_t_22", name: "Tàn Lửa Âm Ỉ",       rarity: "thuong", desc: "+8% tỉ lệ Thiêu đốt & +5% ATK.", effect: { burnChance: 8, atkPct: 5 } },
    { id: "upg_t_23", name: "Giọt Sương Hồi Sinh", rarity: "thuong", desc: "Hồi ngay 20% HP đã mất & +10% Hồi phục.", effect: { healMissingHpPct: 20, healBonusPct: 10 } },
    { id: "upg_t_24", name: "Khai Thác Điểm Mù",   rarity: "thuong", desc: "+7% Tỉ lệ Chí mạng & +8% Khắc hệ.", effect: { critChance: 7, advantageBonusPct: 8 } },
    { id: "upg_t_25", name: "Dẻo Dai Theo Lượt",   rarity: "thuong", desc: "+12% DEF & hồi ngay 15 HP.", effect: { defPct: 12, healFlat: 15 } },
    { id: "upg_t_26", name: "Phản Xạ Nhanh Nhạy",  rarity: "thuong", desc: "+8% Tỉ lệ Chí mạng & +8% DEF.", effect: { critChance: 8, defPct: 8 } },
    { id: "upg_t_27", name: "Nạp Nộ Đều Đặn",     rarity: "thuong", desc: "+10% sát thương Nộ & +1 Nộ ngay.", effect: { ultDmgPct: 10, gainEnergyNow: 1 } },
    { id: "upg_t_28", name: "Nhịp Đánh Ổn Định",   rarity: "thuong", desc: "+9% ATK & hồi ngay 12 HP.", effect: { atkPct: 9, healFlat: 12 } },
    { id: "upg_t_29", name: "Kháng Đòn Tạm Thời",  rarity: "thuong", desc: "+15% DEF nhưng -5% ATK.", effect: { defPct: 15, atkPct: -5 } },
    { id: "upg_t_30", name: "Cơ Hội Bất Ngờ",     rarity: "thuong", desc: "+10% tỉ lệ mọi hiệu ứng trạng thái.", effect: { allEffectChance: 10 } },

    { id: "upg_h_01", name: "Cuồng Phong Xé Gió",  rarity: "hiem", desc: "+20% ATK trong trận.", effect: { atkPct: 20 } },
    { id: "upg_h_02", name: "Pháo Đài Sắt Thép",   rarity: "hiem", desc: "+25% DEF & +10% Max HP.", effect: { defPct: 25, hpPct: 10 } },
    { id: "upg_h_03", name: "Bão Chí Mạng",        rarity: "hiem", desc: "+18% Tỉ lệ Chí mạng.", effect: { critChance: 18 } },
    { id: "upg_h_04", name: "Áp Lực Nguyên Tố",    rarity: "hiem", desc: "+20% sát thương Khắc hệ.", effect: { advantageBonusPct: 20 } },
    { id: "upg_h_05", name: "Hỏa Ngục Dồn Tầng",   rarity: "hiem", desc: "+18% tỉ lệ Thiêu đốt & Thiêu đốt +1.5% HP/tầng.", effect: { burnChance: 18, burnRatioBonus: 0.015 } },
    { id: "upg_h_06", name: "Băng Giá Cắt Cốt",    rarity: "hiem", desc: "+20% tỉ lệ Tê tái & giảm thêm 10% hồi máu quái.", effect: { chillChance: 20, chillReductionBonus: 0.1 } },
    { id: "upg_h_07", name: "Địa Chấn Hất Tung",   rarity: "hiem", desc: "+18% tỉ lệ Hất tung.", effect: { knockupChance: 18 } },
    { id: "upg_h_08", name: "Dòng Máu Hồi Phục",   rarity: "hiem", desc: "+18% tỉ lệ Hồi phục theo ST & +15% Hồi phục.", effect: { healChance: 18, healRatio: 0.25, healBonusPct: 15 } },
    { id: "upg_h_09", name: "Tụ Nộ Thần Tốc",      rarity: "hiem", desc: "Đòn đánh thường nhận thêm +1 Nộ.", effect: { energyPerHit: 1 } },
    { id: "upg_h_10", name: "Cường Hóa Tuyệt Kỹ",  rarity: "hiem", desc: "+30% sát thương chiêu Nộ.", effect: { ultDmgPct: 30 } },
    { id: "upg_h_11", name: "Kinh Công Trúng Đích",rarity: "hiem", desc: "+14% ATK & +12% Tỉ lệ Chí mạng.", effect: { atkPct: 14, critChance: 12 } },
    { id: "upg_h_12", name: "Sinh Lực Tràn Đầy",   rarity: "hiem", desc: "+30% Max HP & hồi ngay 30% Max HP.", effect: { hpPct: 30, healMaxHpPct: 30 } },
    { id: "upg_h_13", name: "Chuyển Hóa Sát Thương",rarity: "hiem", desc: "+16% ATK & +16% DEF.", effect: { atkPct: 16, defPct: 16 } },
    { id: "upg_h_14", name: "Chí Mạng Đau Điếng",  rarity: "hiem", desc: "+10% Tỉ lệ Chí mạng & +0.2x sát thương Crit.", effect: { critChance: 10, critMultBonus: 0.2 } },
    { id: "upg_h_15", name: "Truy Kích Kẻ Yếu",   rarity: "hiem", desc: "+15% sát thương Khắc hệ & +10% ATK.", effect: { advantageBonusPct: 15, atkPct: 10 } },

    { id: "upg_d_01", name: "Thiên Thạch Diệt Thế",rarity: "dot_bien", desc: "+35% ATK & +15% Tỉ lệ Chí mạng.", effect: { atkPct: 35, critChance: 15 } },
    { id: "upg_d_02", name: "Bùng Nổ Tuyệt Kỹ",   rarity: "dot_bien", desc: "+45% sát thương Nộ & hồi 1 Nộ sau khi tung Nộ.", effect: { ultDmgPct: 45, refundEnergyOnUlt: 1 } },
    { id: "upg_d_03", name: "Chúa Tể Trạng Thái",  rarity: "dot_bien", desc: "+25% tỉ lệ mọi hiệu ứng trạng thái.", effect: { allEffectChance: 25 } },
    { id: "upg_d_04", name: "Bất Diệt Sinh Tồn",   rarity: "dot_bien", desc: "+40% Max HP, +30% DEF & hồi ngay 50% Max HP.", effect: { hpPct: 40, defPct: 30, healMaxHpPct: 50 } },
    { id: "upg_d_05", name: "Tuyệt Đối Khắc Chế",  rarity: "dot_bien", desc: "+30% Khắc hệ, +15% Tỉ lệ Crit & +1 Nộ ngay.", effect: { advantageBonusPct: 30, critChance: 15, gainEnergyNow: 1 } }
];

// --- TRẠNG THÁI EXP & NÂNG CẤP TRONG CHUYẾN ĐI ---
let runLevel = 1;
let runExp = 0;
let runExpToNext = 100;
let pendingLevelUps = 0;
let isChoosingUpgrade = false;
let pendingAfterEnemyAction = false;
let currentOfferedUpgrades = [];

function createEmptyRunUpgrades() {
    return {
        atkPct: 0,
        atkFlat: 0,
        defPct: 0,
        defFlat: 0,
        hpPct: 0,
        hpFlat: 0,
        critChance: 0,
        critMultBonus: 0,
        burnChance: 0,
        burnRatioBonus: 0,
        chillChance: 0,
        chillReductionBonus: 0,
        knockupChance: 0,
        healChance: 0,
        healRatio: 0,
        healBonusPct: 0,
        allEffectChance: 0,
        advantageBonusPct: 0,
        ultDmgPct: 0,
        energyPerHit: 0,
        refundEnergyOnUlt: 0,
        pickedCards: []
    };
}

let runUpgrades = createEmptyRunUpgrades();

function resetRunProgression() {
    runLevel = 1;
    runExp = 0;
    runExpToNext = 100;
    pendingLevelUps = 0;
    isChoosingUpgrade = false;
    pendingAfterEnemyAction = false;
    currentOfferedUpgrades = [];
    runUpgrades = createEmptyRunUpgrades();

    const modal = document.getElementById("levelup-modal");
    if (modal) modal.style.display = "none";
    const victoryModal = document.getElementById("victory-modal");
    if (victoryModal) victoryModal.style.display = "none";
    renderExpHUD();
}

function renderExpHUD() {
    const lvEl = document.getElementById("player-level-text");
    const expEl = document.getElementById("player-exp-text");
    const fillEl = document.getElementById("player-exp-fill");

    if (lvEl) lvEl.textContent = `Lv.${runLevel}`;
    if (expEl) expEl.textContent = `EXP: ${runExp} / ${runExpToNext}`;
    if (fillEl) {
        const pct = Math.min(100, Math.round((runExp / Math.max(1, runExpToNext)) * 100));
        fillEl.style.width = `${pct}%`;
    }
}

function gainRunExp(amount) {
    if (!amount || amount <= 0) return;
    runExp += amount;

    while (runExp >= runExpToNext) {
        runExp -= runExpToNext;
        runLevel += 1;
        pendingLevelUps += 1;
        runExpToNext = Math.round(runExpToNext * 1.25);
    }

    renderExpHUD();
}

function pickRandomUpgradeCards(count = 3) {
    const poolCopy = [...UPGRADE_POOL];
    const picked = [];

    while (picked.length < count && poolCopy.length > 0) {
        const totalWeight = poolCopy.reduce((sum, card) => {
            const cfg = UPGRADE_RARITY_CONFIG[card.rarity] || UPGRADE_RARITY_CONFIG.thuong;
            return sum + cfg.weight;
        }, 0);

        let roll = Math.random() * totalWeight;
        let chosenIndex = 0;

        for (let i = 0; i < poolCopy.length; i++) {
            const cfg = UPGRADE_RARITY_CONFIG[poolCopy[i].rarity] || UPGRADE_RARITY_CONFIG.thuong;
            roll -= cfg.weight;
            if (roll <= 0) {
                chosenIndex = i;
                break;
            }
        }

        picked.push(poolCopy[chosenIndex]);
        poolCopy.splice(chosenIndex, 1);
    }

    return picked;
}

function openLevelUpModal() {
    if (pendingLevelUps <= 0) return;
    const modal = document.getElementById("levelup-modal");
    const listEl = document.getElementById("levelup-cards-list");
    const titleEl = document.getElementById("levelup-title");
    if (!modal || !listEl) return;

    isChoosingUpgrade = true;
    setPlayerTurnState(false);

    if (titleEl) {
        titleEl.textContent = `⬆️ LÊN CẤP Lv.${runLevel}! CHỌN 1 TRONG 3 KỸ NĂNG`;
    }

    currentOfferedUpgrades = pickRandomUpgradeCards(3);
    listEl.innerHTML = currentOfferedUpgrades.map((card, idx) => {
        const r = UPGRADE_RARITY_CONFIG[card.rarity] || UPGRADE_RARITY_CONFIG.thuong;
        return `
            <div class="upgrade-card" style="border-color:${r.border};" onclick="selectUpgradeCard(${idx})">
                <div>
                    <div style="font-size:16px;color:${r.color};text-transform:uppercase;">[${r.label}]</div>
                    <div style="font-size:22px;margin:4px 0 6px;color:#ffffff;">${card.name}</div>
                    <div style="font-size:19px;color:#cbd5e1;line-height:1.25;">${card.desc}</div>
                </div>
                <button style="margin-top:12px;width:100%;">Chọn thẻ này</button>
            </div>
        `;
    }).join("");

    modal.style.display = "flex";
}

function selectUpgradeCard(index) {
    const card = currentOfferedUpgrades[index];
    if (!card) return;

    const eff = card.effect || {};
    const prevMaxHp = playerStats.maxHp;

    runUpgrades.atkPct += eff.atkPct || 0;
    runUpgrades.atkFlat += eff.atkFlat || 0;
    runUpgrades.defPct += eff.defPct || 0;
    runUpgrades.defFlat += eff.defFlat || 0;
    runUpgrades.hpPct += eff.hpPct || 0;
    runUpgrades.hpFlat += eff.hpFlat || 0;
    runUpgrades.critChance += eff.critChance || 0;
    runUpgrades.critMultBonus += eff.critMultBonus || 0;
    runUpgrades.burnChance += eff.burnChance || 0;
    runUpgrades.burnRatioBonus += eff.burnRatioBonus || 0;
    runUpgrades.chillChance += eff.chillChance || 0;
    runUpgrades.chillReductionBonus += eff.chillReductionBonus || 0;
    runUpgrades.knockupChance += eff.knockupChance || 0;
    runUpgrades.healChance += eff.healChance || 0;
    runUpgrades.healRatio = Math.max(runUpgrades.healRatio, eff.healRatio || 0);
    runUpgrades.healBonusPct += eff.healBonusPct || 0;
    runUpgrades.allEffectChance += eff.allEffectChance || 0;
    runUpgrades.advantageBonusPct += eff.advantageBonusPct || 0;
    runUpgrades.ultDmgPct += eff.ultDmgPct || 0;
    runUpgrades.energyPerHit += eff.energyPerHit || 0;
    runUpgrades.refundEnergyOnUlt += eff.refundEnergyOnUlt || 0;

    runUpgrades.pickedCards.push(card);

    syncPlayerWithActiveChar(false);

    const gainedMaxHp = Math.max(0, playerStats.maxHp - prevMaxHp);
    let instantHeal = gainedMaxHp;
    if (eff.healMaxHpPct) {
        instantHeal += Math.round(playerStats.maxHp * (eff.healMaxHpPct / 100));
    }
    if (eff.healFlat) {
        instantHeal += eff.healFlat;
    }
    if (eff.healMissingHpPct) {
        const missing = Math.max(0, playerStats.maxHp - playerStats.hp);
        instantHeal += Math.round(missing * (eff.healMissingHpPct / 100));
    }

    if (instantHeal > 0) {
        playerStats.hp = Math.min(playerStats.maxHp, playerStats.hp + instantHeal);
        renderPlayerHUD();
        spawnHealPopup(instantHeal);
    }

    if (eff.gainEnergyNow) {
        playerEnergy = Math.min(MAX_ENERGY, playerEnergy + eff.gainEnergyNow);
        updateEnergyUI();
    }

    pendingLevelUps = Math.max(0, pendingLevelUps - 1);

    if (pendingLevelUps > 0) {
        openLevelUpModal();
        return;
    }

    const modal = document.getElementById("levelup-modal");
    if (modal) modal.style.display = "none";
    isChoosingUpgrade = false;

    if (pendingAfterEnemyAction) {
        pendingAfterEnemyAction = false;
        resumeAfterPlayerAction();
    } else if (currentStage >= STAGES_PER_FLOOR && activeEnemies.every(e => e.hp <= 0)) {
        openVictoryModal(0, 0);
    } else {
        setPlayerTurnState(true);
    }
}

// --- TIỀN, PATE, RANK & GACHA VŨ KHÍ ---
let playerGold = 2000;
let playerPate = 20;
const SINGLE_PULL_COST = 100;
const TEN_PULL_COST = 900;
const CHAR_PULL_COST = 150;
const TEN_CHAR_PULL_COST = 1350;

const RARITY_CONFIG = {
    thuong:  { label: "Thường",  rate: 50, color: "#FFFFFF", tier: 1, statLines: 1, statScale: 1.0, salvageGold: 30 },
    ngon:    { label: "Ngon",    rate: 36, color: "#4ADE80", tier: 2, statLines: 1, statScale: 1.8, salvageGold: 50 },
    hiem:    { label: "Hiếm",    rate: 10, color: "#FACC15", tier: 3, statLines: 2, statScale: 2.5, salvageGold: 120 },
    kinh_vl: { label: "Kinh vl", rate: 3,  color: "#F87171", tier: 4, statLines: 2, statScale: 3.5, salvageGold: 250 },
    gg:      { label: "GG",      rate: 1,  color: "#C084FC", tier: 5, statLines: 3, statScale: 5.0, salvageGold: 500 }
};

const ULTRA_RARE_WEAPON_CHANCE = 4;

function hasWeaponPassive(weapon) {
    if (!weapon) return false;
    if (ULTRA_RARE_ELEMENTS.includes(weapon.element) && weapon.passive) return true;
    const r = RARITY_CONFIG[weapon.rarity];
    return Boolean(weapon.passive && r && r.tier >= 4);
}

function rollWeaponStats(baseStats, rarityKey, isUltraRare = false) {
    if (isUltraRare) {
        return {
            stats: {
                atk: Math.max(10, Math.round((baseStats.atk || 10) * 1.4)),
                hp: Math.max(45, Math.round((baseStats.hp || 45) * 1.4)),
                def: Math.max(6, Math.round((baseStats.def || 6) * 1.4))
            },
            rolledLines: ["atk", "hp", "def"]
        };
    }

    const r = RARITY_CONFIG[rarityKey] || RARITY_CONFIG.thuong;
    const lineCount = Math.min(3, Math.max(1, r.statLines || 1));
    const scale = r.statScale || 1;

    const poolKeys = ["atk", "hp", "def"].sort(() => Math.random() - 0.5);
    const chosenKeys = poolKeys.slice(0, lineCount);

    const rolled = { atk: 0, hp: 0, def: 0 };
    for (const key of chosenKeys) {
        rolled[key] = Math.max(1, Math.round((baseStats[key] || 0) * scale));
    }

    return {
        stats: rolled,
        rolledLines: chosenKeys
    };
}

const WEAPON_POOL = [
    { id: "w_hoa_1",      name: "Kiếm Lửa",          element: "hoa",   rarity: "thuong",  baseStats: { atk: 4, hp: 20, def: 2 }, passive: null, img: null },
    { id: "w_thuy_1",     name: "Trượng Thủy",       element: "thuy",  rarity: "thuong",  baseStats: { atk: 3, hp: 25, def: 2 }, passive: null, img: null },
    { id: "w_thao_1",     name: "Cung Thảo",         element: "thao",  rarity: "ngon",    baseStats: { atk: 4, hp: 22, def: 2 }, passive: null, img: null },
    { id: "w_dat_1",      name: "Búa Nham",          element: "dat",   rarity: "ngon",    baseStats: { atk: 3, hp: 25, def: 3 }, passive: null, img: null },
    { id: "w_loi_1",      name: "Thương Lôi",        element: "loi",   rarity: "hiem",    baseStats: { atk: 5, hp: 18, def: 2 }, passive: null, img: null },
    { id: "w_hoa_kinh",   name: "Đao Hỏa Ngục",      element: "hoa",   rarity: "kinh_vl", baseStats: { atk: 6, hp: 20, def: 2 }, passive: { type: "burn", chance: 35, healRatio: 0, desc: "Đánh thường 35% gây Thiêu đốt" }, img: null },
    { id: "w_thuy_kinh",  name: "Giáo Sóng Ngầm",    element: "thuy",  rarity: "kinh_vl", baseStats: { atk: 5, hp: 26, def: 2 }, passive: { type: "heal", chance: 30, healRatio: 0.3, desc: "Đánh thường 30% hồi máu 30% sát thương" }, img: null },
    { id: "w_thao_kinh",  name: "Cung Rừng Sâu",     element: "thao",  rarity: "kinh_vl", baseStats: { atk: 5, hp: 24, def: 2 }, passive: { type: "heal", chance: 35, healRatio: 0.3, desc: "Đánh thường 35% hồi máu 30% sát thương" }, img: null },
    { id: "w_dat_kinh",   name: "Chùy Địa Chấn",     element: "dat",   rarity: "kinh_vl", baseStats: { atk: 5, hp: 28, def: 3 }, passive: { type: "knockup", chance: 25, healRatio: 0, desc: "Đánh thường 25% gây Hất tung" }, img: null },
    { id: "w_loi_kinh",   name: "Kích Lôi Điện",     element: "loi",   rarity: "kinh_vl", baseStats: { atk: 6, hp: 18, def: 2 }, passive: { type: "crit", chance: 30, healRatio: 0, desc: "Đánh thường 30% Chí mạng" }, img: null },
    { id: "w_bang_kinh",  name: "Kiếm Băng Giá",     element: "bang",  rarity: "kinh_vl", baseStats: { atk: 4, hp: 20, def: 2 }, passive: { type: "chill", chance: 40, healRatio: 0, desc: "Đánh thường 40% gây Tê tái" }, img: null },
    { id: "w_phong_kinh", name: "Liềm Cuồng Phong",   element: "phong", rarity: "kinh_vl", baseStats: { atk: 4, hp: 18, def: 2 }, passive: { type: "knockup", chance: 28, healRatio: 0, desc: "Đánh thường 28% gây Hất tung" }, img: null },
    { id: "w_kim_kinh",   name: "Đao Thiết Huyết",   element: "kim",   rarity: "kinh_vl", baseStats: { atk: 4, hp: 20, def: 3 }, passive: { type: "crit", chance: 25, healRatio: 0.2, desc: "Đánh thường 25% Chí mạng & hồi 20% sát thương" }, img: null },
    { id: "w_gg_long",    name: "Thánh Kiếm Long Hỏa",element: "hoa",   rarity: "gg",      baseStats: { atk: 6, hp: 24, def: 3 }, passive: { type: "burn", chance: 55, healRatio: 0.25, desc: "Đánh thường 55% Thiêu đốt & hồi 25% sát thương" }, img: null },
    { id: "w_gg_bang",    name: "Trượng Tuyệt Đối Hàn",element: "bang", rarity: "gg",      baseStats: { atk: 5, hp: 22, def: 3 }, passive: { type: "chill", chance: 55, healRatio: 0, desc: "Đánh thường 55% gây Tê tái" }, img: null }
];

const ULTRA_RARE_WEAPONS = [
    {
        id: "w_ur_light",
        name: "Thần Kiếm Nhật Quang",
        element: "anh_sang",
        rarity: "gg",
        ultraRare: true,
        baseStats: { atk: 12, hp: 50, def: 7 },
        passive: { type: "heal", chance: 50, healRatio: 0.45, desc: "Siêu hiếm: 50% hồi 45% ST & giảm 25% ST nhận lượt kế" },
        img: null
    },
    {
        id: "w_ur_dark",
        name: "Lưỡi Hái Vực Thẳm",
        element: "bong_toi",
        rarity: "gg",
        ultraRare: true,
        baseStats: { atk: 14, hp: 45, def: 6 },
        passive: { type: "crit", chance: 40, healRatio: 0.35, desc: "Siêu hiếm: 40% Crit, hút 35% ST & +20% ST lên địch dính trạng thái" },
        img: null
    }
];

let ownedWeapons = [];
let equippedWeapon = null;

// --- 26 NHÂN VẬT CHÍNH THỨC ---
const MAX_STAR = 5;

const STAR_STAT_MULTIPLIER = {
    1: 1.0,
    2: 1.25,
    3: 1.55,
    4: 1.9,
    5: 2.35
};

const SPECIAL_5STAR_BY_ELEMENT = {
    hoa:      { name: "Dư Ảnh Hỏa Thần",       dmgMult: 1.15, critBonus: 15, healBonus: 0,    defMult: 1.0,  energyBonus: 0, effectChanceBonus: 15, desc: "5★: +15% ST, +15% Tỉ lệ Crit & +15% tỉ lệ hiệu ứng" },
    thuy:     { name: "Suối Nguồn Vĩnh Hằng",   dmgMult: 1.05, critBonus: 0,  healBonus: 0.25, defMult: 1.1,  energyBonus: 0, effectChanceBonus: 10, desc: "5★: +25% Hồi phục, +10% DEF & +5% ST" },
    thao:     { name: "Cổ Thụ Sinh Mệnh",       dmgMult: 1.05, critBonus: 0,  healBonus: 0.2,  defMult: 1.15, energyBonus: 0, effectChanceBonus: 15, desc: "5★: +20% Hồi phục, +15% DEF & +15% tỉ lệ hiệu ứng" },
    dat:      { name: "Bàn Thạch Bất Diệt",      dmgMult: 1.1,  critBonus: 5,  healBonus: 0,    defMult: 1.25, energyBonus: 0, effectChanceBonus: 15, desc: "5★: +25% DEF, +10% ST & +15% tỉ lệ Hất tung" },
    kim:      { name: "Thiên Kiếm Ngưng Nộ",     dmgMult: 1.12, critBonus: 10, healBonus: 0,    defMult: 1.1,  energyBonus: 1, effectChanceBonus: 10, desc: "5★: Đòn thường +1 Nộ phụ, +12% ST & +10% Crit" },
    loi:      { name: "Lôi Đình Phán Quyết",     dmgMult: 1.18, critBonus: 20, healBonus: 0,    defMult: 1.0,  energyBonus: 0, effectChanceBonus: 15, desc: "5★: +18% ST & +20% Tỉ lệ Chí mạng" },
    phong:    { name: "Bão Cuốn Càn Quét",       dmgMult: 1.12, critBonus: 10, healBonus: 0,    defMult: 1.05, energyBonus: 0, effectChanceBonus: 20, desc: "5★: +20% tỉ lệ Hất tung, +12% ST & +10% Crit" },
    bang:     { name: "Hàn Băng Tuyệt Cảnh",      dmgMult: 1.1,  critBonus: 10, healBonus: 0,    defMult: 1.1,  energyBonus: 0, effectChanceBonus: 20, desc: "5★: +20% tỉ lệ Tê tái, +10% ST & +10% DEF" },
    anh_sang: { name: "Thánh Quang Phổ Chiếu",   dmgMult: 1.25, critBonus: 15, healBonus: 0.35, defMult: 1.25, energyBonus: 1, effectChanceBonus: 20, desc: "5★ Siêu hiếm: +25% ST, +25% DEF, +35% Hồi phục & +1 Nộ/đòn" },
    bong_toi: { name: "U Minh Diệt Thần",       dmgMult: 1.35, critBonus: 25, healBonus: 0.3,  defMult: 1.15, energyBonus: 1, effectChanceBonus: 20, desc: "5★ Siêu hiếm: +35% ST, +25% Crit, +30% Hút máu & +1 Nộ/đòn" }
};

const CHAR_POOL = [
    { id: "c_01", name: "U I A",     element: "bong_toi", ultraRare: true, atk: 16, hp: 125, def: 6, passive: { type: "crit", chance: 25, healRatio: 0.25, desc: "Đánh thường 25% Chí mạng & hồi 25% sát thương" }, ult: { dmgMultiplier: 2.65, effect: "crit", effectChance: 100, healRatio: 0.35, desc: "265% ATK Bóng tối + 100% Chí mạng & hồi 35% sát thương" } },
    { id: "c_02", name: "Mèo Chuối", element: "anh_sang", ultraRare: true, atk: 15, hp: 140, def: 8, passive: { type: "heal", chance: 30, healRatio: 0.35, desc: "Đánh thường 30% hồi máu 35% sát thương" }, ult: { dmgMultiplier: 2.5, effect: "heal", effectChance: 100, healRatio: 0.45, desc: "250% ATK Ánh sáng + hồi 45% sát thương & giảm 25% ST nhận lượt kế" } },
    { id: "c_03", name: "Sữa",       element: "thuy",     atk: 10, hp: 115, def: 5, passive: { type: "heal",    chance: 20, healRatio: 0.35, desc: "Đánh thường 20% hồi máu 35% sát thương" },    ult: { dmgMultiplier: 1.8, effect: "heal",    effectChance: 100, healRatio: 0.5,  desc: "180% ATK Thủy + hồi 50% sát thương" } },
    { id: "c_04", name: "Cam",       element: "hoa",      atk: 13, hp: 95,  def: 3, passive: { type: "crit",    chance: 15, healRatio: 0,    desc: "Đánh thường 15% Chí mạng" },                  ult: { dmgMultiplier: 2.2, effect: "crit",    effectChance: 100, healRatio: 0,    desc: "220% ATK Hỏa + 100% Chí mạng" } },
    { id: "c_05", name: "Bò",        element: "dat",      atk: 11, hp: 130, def: 7, passive: { type: "knockup", chance: 10, healRatio: 0,    desc: "Đánh thường 10% gây Hất tung" },              ult: { dmgMultiplier: 2.1, effect: "knockup", effectChance: 70,  healRatio: 0,    desc: "210% ATK Đất + 70% Hất tung" } },
    { id: "c_06", name: "Miu",       element: "thuy",     atk: 11, hp: 100, def: 4, passive: { type: "chill",   chance: 15, healRatio: 0,    desc: "Đánh thường 15% gây Tê tái" },                ult: { dmgMultiplier: 2.0, effect: "chill",   effectChance: 100, healRatio: 0,    desc: "200% ATK Thủy + 100% Tê tái" } },
    { id: "c_07", name: "Sen",       element: "loi",      atk: 13, hp: 95,  def: 4, passive: { type: "crit",    chance: 15, healRatio: 0,    desc: "Đánh thường 15% Chí mạng" },                  ult: { dmgMultiplier: 2.3, effect: "crit",    effectChance: 100, healRatio: 0,    desc: "230% ATK Lôi + 100% Chí mạng" } },
    { id: "c_08", name: "Mun",       element: "loi",      atk: 14, hp: 90,  def: 3, passive: { type: "crit",    chance: 20, healRatio: 0,    desc: "Đánh thường 20% Chí mạng" },                  ult: { dmgMultiplier: 2.4, effect: "crit",    effectChance: 100, healRatio: 0,    desc: "240% ATK Lôi + 100% Chí mạng" } },
    { id: "c_09", name: "Mướp",      element: "dat",      atk: 12, hp: 115, def: 6, passive: { type: "heal",    chance: 15, healRatio: 0.3,  desc: "Đánh thường 15% hồi máu 30% sát thương" },    ult: { dmgMultiplier: 2.0, effect: "knockup", effectChance: 60,  healRatio: 0,    desc: "200% ATK Đất + 60% Hất tung" } },
    { id: "c_10", name: "Vàng",      element: "dat",      atk: 12, hp: 110, def: 5, passive: { type: "crit",    chance: 12, healRatio: 0,    desc: "Đánh thường 12% Chí mạng" },                  ult: { dmgMultiplier: 2.1, effect: "burn",    effectChance: 50,  healRatio: 0,    desc: "210% ATK Đất + 50% Thiêu đốt" } },
    { id: "c_11", name: "Bông",      element: "thao",     atk: 11, hp: 105, def: 4, passive: { type: "heal",    chance: 20, healRatio: 0.35, desc: "Đánh thường 20% hồi máu 35% sát thương" },    ult: { dmgMultiplier: 1.9, effect: "heal",    effectChance: 100, healRatio: 0.45, desc: "190% ATK Thảo + hồi 45% sát thương" } },
    { id: "c_12", name: "Mít",       element: "hoa",      atk: 13, hp: 105, def: 4, passive: { type: "burn",    chance: 20, healRatio: 0,    desc: "Đánh thường 20% gây Thiêu đốt" },             ult: { dmgMultiplier: 2.2, effect: "burn",    effectChance: 100, healRatio: 0,    desc: "220% ATK Hỏa + 100% Thiêu đốt" } },
    { id: "c_13", name: "Xoài",      element: "thao",     atk: 12, hp: 100, def: 4, passive: { type: "chill",   chance: 15, healRatio: 0,    desc: "Đánh thường 15% gây Tê tái" },                ult: { dmgMultiplier: 2.0, effect: "chill",   effectChance: 80,  healRatio: 0,    desc: "200% ATK Thảo + 80% Tê tái" } },
    { id: "c_14", name: "Bưởi",      element: "thao",     atk: 11, hp: 110, def: 5, passive: { type: "heal",    chance: 18, healRatio: 0.3,  desc: "Đánh thường 18% hồi máu 30% sát thương" },    ult: { dmgMultiplier: 1.9, effect: "heal",    effectChance: 100, healRatio: 0.4,  desc: "190% ATK Thảo + hồi 40% sát thương" } },
    { id: "c_15", name: "Kem",       element: "bang",     atk: 11, hp: 100, def: 4, passive: { type: "chill",   chance: 25, healRatio: 0,    desc: "Đánh thường 25% gây Tê tái" },                ult: { dmgMultiplier: 2.1, effect: "chill",   effectChance: 100, healRatio: 0,    desc: "210% ATK Băng + 100% Tê tái" } },
    { id: "c_16", name: "Milo",      element: "dat",      atk: 12, hp: 115, def: 5, passive: { type: "knockup", chance: 12, healRatio: 0,    desc: "Đánh thường 12% gây Hất tung" },              ult: { dmgMultiplier: 2.0, effect: "knockup", effectChance: 75,  healRatio: 0,    desc: "200% ATK Đất + 75% Hất tung" } },
    { id: "c_17", name: "Luna",      element: "bang",     atk: 12, hp: 95,  def: 4, passive: { type: "chill",   chance: 20, healRatio: 0,    desc: "Đánh thường 20% gây Tê tái" },                ult: { dmgMultiplier: 2.2, effect: "chill",   effectChance: 100, healRatio: 0,    desc: "220% ATK Băng + 100% Tê tái" } },
    { id: "c_18", name: "Bella",     element: "kim",      atk: 12, hp: 105, def: 6, passive: { type: "crit",    chance: 15, healRatio: 0,    desc: "Đánh thường 15% Chí mạng" },                  ult: { dmgMultiplier: 2.2, effect: "crit",    effectChance: 100, healRatio: 0,    desc: "220% ATK Kim + 100% Chí mạng" } },
    { id: "c_19", name: "Lily",      element: "thuy",     atk: 10, hp: 110, def: 5, passive: { type: "heal",    chance: 22, healRatio: 0.35, desc: "Đánh thường 22% hồi máu 35% sát thương" },    ult: { dmgMultiplier: 1.8, effect: "heal",    effectChance: 100, healRatio: 0.45, desc: "180% ATK Thủy + hồi 45% sát thương" } },
    { id: "c_20", name: "Lucy",      element: "phong",    atk: 12, hp: 100, def: 4, passive: { type: "knockup", chance: 12, healRatio: 0,    desc: "Đánh thường 12% gây Hất tung" },              ult: { dmgMultiplier: 2.2, effect: "knockup", effectChance: 90,  healRatio: 0,    desc: "220% ATK Phong + 90% Hất tung" } },
    { id: "c_21", name: "Daisy",     element: "thao",     atk: 11, hp: 105, def: 4, passive: { type: "heal",    chance: 18, healRatio: 0.3,  desc: "Đánh thường 18% hồi máu 30% sát thương" },    ult: { dmgMultiplier: 1.9, effect: "heal",    effectChance: 100, healRatio: 0.4,  desc: "190% ATK Thảo + hồi 40% sát thương" } },
    { id: "c_22", name: "Coco",      element: "thuy",     atk: 11, hp: 105, def: 4, passive: { type: "chill",   chance: 18, healRatio: 0,    desc: "Đánh thường 18% gây Tê tái" },                ult: { dmgMultiplier: 2.0, effect: "chill",   effectChance: 90,  healRatio: 0,    desc: "200% ATK Thủy + 90% Tê tái" } },
    { id: "c_23", name: "Mimi",      element: "kim",      atk: 11, hp: 100, def: 6, passive: { type: "crit",    chance: 12, healRatio: 0,    desc: "Đánh thường 12% Chí mạng" },                  ult: { dmgMultiplier: 2.1, effect: "crit",    effectChance: 100, healRatio: 0,    desc: "210% ATK Kim + 100% Chí mạng" } },
    { id: "c_24", name: "Chloe",     element: "loi",      atk: 13, hp: 95,  def: 4, passive: { type: "crit",    chance: 18, healRatio: 0,    desc: "Đánh thường 18% Chí mạng" },                  ult: { dmgMultiplier: 2.3, effect: "crit",    effectChance: 100, healRatio: 0,    desc: "230% ATK Lôi + 100% Chí mạng" } },
    { id: "c_25", name: "Nala",      element: "hoa",      atk: 14, hp: 100, def: 4, passive: { type: "burn",    chance: 22, healRatio: 0,    desc: "Đánh thường 22% gây Thiêu đốt" },             ult: { dmgMultiplier: 2.3, effect: "burn",    effectChance: 100, healRatio: 0,    desc: "230% ATK Hỏa + 100% Thiêu đốt" } },
    { id: "c_26", name: "Stella",    element: "kim",      atk: 12, hp: 105, def: 6, passive: { type: "crit",    chance: 15, healRatio: 0,    desc: "Đánh thường 15% Chí mạng" },                  ult: { dmgMultiplier: 2.2, effect: "crit",    effectChance: 100, healRatio: 0,    desc: "220% ATK Kim + 100% Chí mạng" } }
];

function getAllCharTemplates() {
    return CHAR_POOL;
}

function getStarMultiplier(star) {
    return STAR_STAT_MULTIPLIER[star] || 1.0;
}

function getCharStarStats(charObj) {
    const star = charObj.star || 1;
    const mult = getStarMultiplier(star);
    return {
        atk: Math.round(charObj.atk * mult),
        hp: Math.round(charObj.hp * mult),
        def: Math.round(charObj.def * mult)
    };
}

function getChar5StarPerk(charObj) {
    if (!charObj || (charObj.star || 1) < MAX_STAR) return null;
    return SPECIAL_5STAR_BY_ELEMENT[charObj.element] || null;
}

function buildCharInstanceFromTemplate(charId, star = 1, uid = null) {
    const tpl = CHAR_POOL.find(c => c.id === charId) || CHAR_POOL[0];
    const safeStar = Math.min(MAX_STAR, Math.max(1, Number(star) || 1));
    const safeUid = uid || `${tpl.id}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    return {
        ...tpl,
        star: safeStar,
        uid: safeUid
    };
}

let ownedChars = [buildCharInstanceFromTemplate("c_01", 1, "init_uia")];
let activeChar = ownedChars[0];

// --- DANH SÁCH ĐỊCH (QUÁI THƯỜNG · QUÁI TINH ANH · BOSS CÓ NỘ) ---
const MAX_FLOOR = 5;
const STAGES_PER_FLOOR = 5;
let currentFloor = 1;
let currentStage = 1;

const RAT_POOL = [
    {
        id: "rat_bach",
        name: "Chụt Bạch",
        tier: "normal",
        element: "bang",
        baseHp: 75,
        baseAtk: 10,
        baseDef: 2,
        isElite: false,
        isBoss: false,
        minFloor: 1,
        imgFile: "chụt bạch.png",
        icon: "🐭",
        color: "#e2e8f0",
        bg: "rgba(51, 65, 85, 0.85)",
        passive: { desc: "Thường: Đòn đánh thường có 15% gây Tê tái." },
        ult: null
    },
    {
        id: "rat_thiu_ngu",
        name: "Chụt Thíu Ngủ",
        tier: "normal",
        element: "dat",
        baseHp: 90,
        baseAtk: 11,
        baseDef: 3,
        isElite: false,
        isBoss: false,
        minFloor: 1,
        imgFile: "chụt thíu ngủ.png",
        icon: "💤",
        color: "#cbd5e1",
        bg: "rgba(71, 85, 105, 0.85)",
        passive: { desc: "Thường: Cơ thể lười biếng, giảm nhẹ sát thương nhận vào." },
        ult: null
    },
    {
        id: "rat_kiem_si",
        name: "Chụt Kiếm Sĩ",
        tier: "normal",
        element: "kim",
        baseHp: 85,
        baseAtk: 14,
        baseDef: 3,
        isElite: false,
        isBoss: false,
        minFloor: 1,
        imgFile: "chụt kiếm sĩ.png",
        icon: "⚔️",
        color: "#fbbf24",
        bg: "rgba(120, 53, 15, 0.85)",
        passive: { desc: "Thường: Lưỡi kiếm sắc bén, có 15% đánh Chí mạng." },
        ult: null
    },
    {
        id: "rat_helicopter",
        name: "Chụt Helicopter",
        tier: "normal",
        element: "phong",
        baseHp: 82,
        baseAtk: 13,
        baseDef: 2,
        isElite: false,
        isBoss: false,
        minFloor: 1,
        imgFile: "chụt helicopter.png",
        icon: "🚁",
        color: "#38bdf8",
        bg: "rgba(12, 74, 110, 0.85)",
        passive: { desc: "Thường: Cánh quạt xoay gió, có 15% gây Hất tung." },
        ult: null
    },
    {
        id: "rat_may_tinh",
        name: "Chụt Máy Tính",
        tier: "normal",
        element: "loi",
        baseHp: 88,
        baseAtk: 13,
        baseDef: 2,
        isElite: false,
        isBoss: false,
        minFloor: 2,
        imgFile: "chụt máy tính.jpg",
        icon: "💻",
        color: "#a78bfa",
        bg: "rgba(49, 46, 129, 0.85)",
        passive: { desc: "Thường: Xung điện mạch in, đánh thường dễ bạo kích." },
        ult: null
    },
    {
        id: "rat_boxing",
        name: "Chụt Boxing",
        tier: "elite",
        element: "hoa",
        baseHp: 145,
        baseAtk: 21,
        baseDef: 6,
        isElite: true,
        isBoss: false,
        minFloor: 2,
        imgFile: "chụt boxing.jpg",
        icon: "🥊",
        color: "#c084fc",
        bg: "rgba(88, 28, 135, 0.88)",
        passive: {
            type: "knockup_burn",
            chance: 35,
            desc: "Tinh anh: Cú đấm bốc 35% gây Hất tung hoặc Thiêu đốt & tăng 20% ST."
        },
        ult: null
    },
    {
        id: "rat_star_war",
        name: "Chụt Star War",
        tier: "elite",
        element: "anh_sang",
        baseHp: 155,
        baseAtk: 22,
        baseDef: 7,
        isElite: true,
        isBoss: false,
        minFloor: 2,
        imgFile: "chụt star war.jpg",
        icon: "⚔️",
        color: "#38bdf8",
        bg: "rgba(15, 23, 42, 0.92)",
        passive: {
            type: "crit_chill",
            chance: 40,
            desc: "Tinh anh: Kiếm ánh sáng 40% đánh Chí mạng & gây Tê tái, khắc mạnh Bóng tối."
        },
        ult: null
    },
    {
        id: "rat_beo_i",
        name: "Chụt Béo Ị",
        tier: "boss",
        element: "dat",
        baseHp: 240,
        baseAtk: 25,
        baseDef: 11,
        isElite: false,
        isBoss: true,
        minFloor: 1,
        imgFile: "chụt béo ị.png",
        icon: "👑",
        color: "#fb7185",
        bg: "rgba(136, 19, 55, 0.92)",
        passive: {
            type: "iron_belly",
            chance: 35,
            desc: "Boss: Thân hình khổng lồ giảm 20% ST nhận & 35% gây Hất tung khi đánh."
        },
        ult: {
            name: "Địa Chấn Béo Ị",
            maxEnergy: 3,
            dmgMultiplier: 1.9,
            effect: "knockup",
            effectChance: 85,
            desc: "Nộ (3 Nộ): Nện thân gây 190% ATK Đất & 85% Hất tung."
        }
    },
    {
        id: "rat_gangster",
        name: "Chụt Gangster",
        tier: "boss",
        element: "bong_toi",
        baseHp: 225,
        baseAtk: 28,
        baseDef: 9,
        isElite: false,
        isBoss: true,
        minFloor: 3,
        imgFile: "chụt gangster.jpg",
        icon: "🔫",
        color: "#f87171",
        bg: "rgba(127, 29, 29, 0.92)",
        passive: {
            type: "gang_crit_burn",
            chance: 40,
            desc: "Boss: Xả đạn băng đảng 40% Chí mạng & 35% gây Thiêu đốt."
        },
        ult: {
            name: "Bão Đạn Xã Đen",
            maxEnergy: 3,
            dmgMultiplier: 2.05,
            effect: "burn",
            effectChance: 90,
            desc: "Nộ (3 Nộ): Xả đạn gây 205% ATK Bóng tối & 90% Thiêu đốt."
        }
    }
];

function getFloorScale(floor) {
    const clampedFloor = Math.max(1, Math.min(MAX_FLOOR, floor || 1));
    return 1 + (clampedFloor - 1) * 0.25;
}

function createScaledRat(template, floor, suffixLabel = "") {
    const scale = getFloorScale(floor);
    const atkScale = 1 + ((floor || 1) - 1) * 0.2;
    const defScale = 1 + ((floor || 1) - 1) * 0.18;

    return {
        id: template.id,
        name: suffixLabel ? `${template.name} ${suffixLabel}` : template.name,
        tier: template.tier || (template.isBoss ? "boss" : (template.isElite ? "elite" : "normal")),
        element: template.element,
        maxHp: Math.round(template.baseHp * scale),
        hp: Math.round(template.baseHp * scale),
        atk: Math.round(template.baseAtk * atkScale),
        def: Math.round(template.baseDef * defScale),
        isElite: Boolean(template.isElite),
        isBoss: Boolean(template.isBoss),
        imgFile: template.imgFile || null,
        icon: template.icon,
        color: template.color,
        bg: template.bg,
        passive: template.passive ? { ...template.passive } : null,
        ult: template.ult ? { ...template.ult } : null,
        energy: 0,
        status: {
            burnStacks: 0,
            chilled: false,
            knockedUp: false
        }
    };
}

function shouldSpawnDuo(floor, stage) {
    if (stage === STAGES_PER_FLOOR) return false;
    if (floor <= 1) return false;
    if (stage === 2 && floor >= 2) return true;
    if (stage === 4 && floor >= 3) return true;
    return false;
}

function spawnFloorStageEnemies(floor, stage) {
    const normals = RAT_POOL.filter(r => !r.isElite && !r.isBoss && r.minFloor <= floor);
    const normalPool = normals.length > 0 ? normals : RAT_POOL.filter(r => !r.isElite && !r.isBoss);

    const elites = RAT_POOL.filter(r => r.isElite && r.minFloor <= floor);
    const elitePool = elites.length > 0 ? elites : RAT_POOL.filter(r => r.isElite);

    const bosses = RAT_POOL.filter(r => r.isBoss && r.minFloor <= floor);
    const bossPool = bosses.length > 0 ? bosses : RAT_POOL.filter(r => r.isBoss);

    if (stage === STAGES_PER_FLOOR && floor >= 3 && bossPool.length > 0) {
        const pickedBoss = bossPool[(floor + stage) % bossPool.length];
        return [createScaledRat(pickedBoss, floor, "")];
    }

    if ((stage === 5 || (stage === 3 && floor >= 2)) && elitePool.length > 0) {
        const pickedElite = elitePool[(floor * 2 + stage) % elitePool.length];
        if (shouldSpawnDuo(floor, stage) && normalPool.length > 0) {
            const supportNormal = normalPool[(floor + stage) % normalPool.length];
            return [
                createScaledRat(pickedElite, floor, "A"),
                createScaledRat(supportNormal, floor, "B")
            ];
        }
        return [createScaledRat(pickedElite, floor, "")];
    }

    if (shouldSpawnDuo(floor, stage) && normalPool.length > 0) {
        const firstTpl = normalPool[(floor + stage) % normalPool.length];
        const secondTpl = normalPool[(floor + stage + 1) % normalPool.length];
        return [
            createScaledRat(firstTpl, floor, "A"),
            createScaledRat(secondTpl, floor, "B")
        ];
    }

    const pickedTpl = normalPool[(floor * 2 + stage - 1) % normalPool.length];
    return [createScaledRat(pickedTpl, floor, "")];
}

// --- TRẠNG THÁI TRẬN ĐẤU & HIỆU ỨNG ---
let currentScreen = "story";
let isPlayerTurn = true;
const MAX_ENERGY = 4;
let playerEnergy = 0;

let playerStats = {
    hp: getCharStarStats(activeChar).hp,
    maxHp: getCharStarStats(activeChar).hp,
    def: getCharStarStats(activeChar).def,
    atk: getCharStarStats(activeChar).atk
};

let playerStatus = {
    chilled: false,
    lightShieldReduction: 0
};

let activeEnemies = spawnFloorStageEnemies(1, 1);
let selectedEnemyIndex = 0;

function getSelectedEnemy() {
    if (!Array.isArray(activeEnemies) || activeEnemies.length === 0) return null;
    if (selectedEnemyIndex < 0 || selectedEnemyIndex >= activeEnemies.length || activeEnemies[selectedEnemyIndex].hp <= 0) {
        const aliveIdx = activeEnemies.findIndex(e => e.hp > 0);
        selectedEnemyIndex = aliveIdx !== -1 ? aliveIdx : 0;
    }
    return activeEnemies[selectedEnemyIndex];
}

function selectEnemyTarget(idx) {
    if (idx < 0 || idx >= activeEnemies.length) return;
    if (activeEnemies[idx].hp <= 0) return;
    selectedEnemyIndex = idx;
    renderEnemyHUD();
}

function onEnemyCardClick(idx) {
    selectEnemyTarget(idx);
    inspectedEnemyIndex = idx;
    renderEnemyDetailPopup(idx);
}

function resetPlayerStatus() {
    playerStatus = { chilled: false, lightShieldReduction: 0 };
}

function setPlayerTurnState(canAct) {
    isPlayerTurn = canAct && !isChoosingUpgrade;
    const normBtn = document.querySelector(".combat-bar button[onclick='normalAttackTurn()']");
    if (normBtn) normBtn.disabled = !isPlayerTurn;
    updateEnergyUI();
}

// --- CỘNG HƯỞNG ĐỒNG BỘ HỆ & BẬC SAO ---
const RESONANCE_NAMES = {
    hoa:      "Hỏa Diệm (+15% ST)",
    thuy:     "Thủy Triều (+15% HP)",
    thao:     "Rừng Xanh (+15% Hồi phục)",
    dat:      "Vững Chắc (+15% DEF)",
    kim:      "Kim Cộng Hưởng (+2 Nộ/đòn)",
    loi:      "Sấm Sét (+15% Tỉ lệ Crit)",
    phong:    "Lốc Xoáy (+15% Tỉ lệ Hất tung)",
    bang:     "Băng Cộng Hưởng (+15% Tỉ lệ Tê tái)",
    anh_sang: "Thánh Quang Cộng Hưởng (+25% ST, +20% DEF & Hồi phục)",
    bong_toi: "U Minh Cộng Hưởng (+30% ST, +20% Crit & Hút máu)"
};

function getResonanceInfo() {
    const hasSameElement = Boolean(
        equippedWeapon &&
        activeChar &&
        equippedWeapon.element === activeChar.element
    );

    const perk5 = getChar5StarPerk(activeChar);

    if (!hasSameElement) {
        return {
            active: false,
            element: null,
            dmgBonus: perk5 ? (perk5.dmgMult - 1) : 0,
            hpBonus: 0,
            healBonus: perk5 ? perk5.healBonus : 0,
            defBonus: perk5 ? (perk5.defMult - 1) : 0,
            energyGain: 1 + (perk5 ? perk5.energyBonus : 0),
            critBonus: perk5 ? perk5.critBonus : 0,
            knockupBonus: perk5 ? perk5.effectChanceBonus : 0,
            chillBonus: perk5 ? perk5.effectChanceBonus : 0,
            effectChanceBonus: perk5 ? perk5.effectChanceBonus : 0,
            label: "Không có"
        };
    }

    const el = activeChar.element;
    const p5Dmg = perk5 ? (perk5.dmgMult - 1) : 0;
    const p5Heal = perk5 ? perk5.healBonus : 0;
    const p5Def = perk5 ? (perk5.defMult - 1) : 0;
    const p5Energy = perk5 ? perk5.energyBonus : 0;
    const p5Crit = perk5 ? perk5.critBonus : 0;
    const p5Eff = perk5 ? perk5.effectChanceBonus : 0;

    return {
        active: true,
        element: el,
        dmgBonus: (el === "hoa" ? 0.15 : el === "anh_sang" ? 0.25 : el === "bong_toi" ? 0.30 : 0) + p5Dmg,
        hpBonus: (el === "thuy" ? 0.15 : el === "anh_sang" ? 0.15 : 0),
        healBonus: (el === "thao" ? 0.15 : el === "anh_sang" ? 0.25 : el === "bong_toi" ? 0.20 : 0) + p5Heal,
        defBonus: (el === "dat" ? 0.15 : el === "anh_sang" ? 0.20 : 0) + p5Def,
        energyGain: (el === "kim" ? 2 : 1) + p5Energy,
        critBonus: (el === "loi" ? 15 : el === "bong_toi" ? 20 : 0) + p5Crit,
        knockupBonus: (el === "phong" ? 15 : 0) + p5Eff,
        chillBonus: (el === "bang" ? 15 : 0) + p5Eff,
        effectChanceBonus: p5Eff,
        label: RESONANCE_NAMES[el] || `${ELEMENT_LABELS[el]} Cộng Hưởng`
    };
}

function getEffectivePlayerStats() {
    const res = getResonanceInfo();
    const charScaled = getCharStarStats(activeChar);
    const wStats = equippedWeapon ? (equippedWeapon.stats || { atk: 0, hp: 0, def: 0 }) : { atk: 0, hp: 0, def: 0 };

    const baseAtk = charScaled.atk + (wStats.atk || 0) + (runUpgrades.atkFlat || 0);
    const baseHp = charScaled.hp + (wStats.hp || 0) + (runUpgrades.hpFlat || 0);
    const baseDef = charScaled.def + (wStats.def || 0) + (runUpgrades.defFlat || 0);

    const totalAtkMult = Math.max(0.2, 1 + (runUpgrades.atkPct || 0) / 100);
    const totalHpMult = Math.max(0.2, 1 + res.hpBonus + (runUpgrades.hpPct || 0) / 100);
    const totalDefMult = Math.max(0.2, 1 + res.defBonus + (runUpgrades.defPct || 0) / 100);

    return {
        atk: Math.max(1, Math.round(baseAtk * totalAtkMult)),
        maxHp: Math.max(10, Math.round(baseHp * totalHpMult)),
        def: Math.max(0, Math.round(baseDef * totalDefMult)),
        element: activeChar.element,
        resonance: res
    };
}

function formatCharDisplayName(charObj) {
    const elName = ELEMENT_LABELS[charObj.element] || charObj.element.toUpperCase();
    const starCount = charObj.star || 1;
    const ultraTag = ULTRA_RARE_ELEMENTS.includes(charObj.element) ? " ✦SIÊU HIẾM" : "";
    return `${charObj.name} [${elName}] ★${starCount}${ultraTag}`;
}

function updateBattlePlayerSprite() {
    const playerUnit = document.getElementById("player-unit");
    if (!playerUnit) return;

    let nameEl = document.getElementById("player-unit-name");
    if (!nameEl) {
        nameEl = document.createElement("div");
        nameEl.id = "player-unit-name";
        nameEl.className = "player-name";
        playerUnit.prepend(nameEl);
    }
    nameEl.textContent = formatCharDisplayName(activeChar);

    let spriteEl = playerUnit.querySelector(".player-sprite");
    if (!spriteEl) {
        spriteEl = document.createElement("img");
        spriteEl.className = "player-sprite";
        playerUnit.appendChild(spriteEl);
    }

    attachCharacterImage(spriteEl, activeChar);
}

function syncPlayerWithActiveChar(resetHp = true) {
    const s = getEffectivePlayerStats();
    playerStats.maxHp = s.maxHp;
    playerStats.def = s.def;
    playerStats.atk = s.atk;

    if (resetHp) {
        playerStats.hp = s.maxHp;
    } else {
        playerStats.hp = Math.min(playerStats.hp, s.maxHp);
    }

    updateBattlePlayerSprite();
    renderPlayerHUD();
}

function renderHubLoadout() {
    const goldEl = document.getElementById("hub-gold");
    const pateEl = document.getElementById("hub-pate");
    const gachaGoldEl = document.getElementById("gacha-gold");
    const gachaPateEl = document.getElementById("gacha-pate");

    if (goldEl) goldEl.textContent = playerGold;
    if (pateEl) pateEl.textContent = playerPate;
    if (gachaGoldEl) gachaGoldEl.textContent = playerGold;
    if (gachaPateEl) gachaPateEl.textContent = playerPate;
}

function renderPlayerHUD() {
    document.getElementById("player-hp").textContent = playerStats.hp;
    document.getElementById("player-max-hp").textContent = playerStats.maxHp;
    document.getElementById("player-def").textContent = playerStats.def;
    document.getElementById("player-atk").textContent = playerStats.atk;
}

let inspectedEnemyIndex = null;

function renderEnemyHUD() {
    const enemyUnitEl = document.getElementById("enemy-unit");
    if (!enemyUnitEl) return;

    const target = getSelectedEnemy();
    const duoTag = activeEnemies.length > 1 ? ` (đôi)` : "";

    const topBannerEl = document.getElementById("top-stage-banner");
    if (topBannerEl) {
        topBannerEl.textContent = `map ${currentFloor} - đợt ${currentStage}${duoTag}`;
    }

    const cardsHtml = activeEnemies.map((enemy, idx) => {
        const isDead = enemy.hp <= 0;
        const isSelected = !isDead && target && idx === selectedEnemyIndex;
        const nameColor = enemy.isBoss ? "#fb7185" : (enemy.isElite ? "#c084fc" : (enemy.color || "#ffffff"));

        return `
            <div
                class="enemy-clean-card ${isSelected ? "is-selected" : ""}"
                onclick="onEnemyCardClick(${idx})"
                style="
                    cursor:${isDead ? "default" : "pointer"};
                    opacity:${isDead ? "0.35" : "1"};
                "
            >
                <div class="enemy-clean-sprite-wrap">
                    <img data-enemy-idx="${idx}" alt="${enemy.name}" style="${isDead ? "filter:grayscale(1);" : ""}">
                    <span class="enemy-fallback-icon" style="display:none;font-size:42px;">${isDead ? "💀" : enemy.icon}</span>
                </div>
                <div class="enemy-clean-name" style="color:${nameColor};">
                    ${isSelected ? "▾ " : ""}${enemy.name}
                </div>
            </div>
        `;
    }).join("");

    enemyUnitEl.style.bottom = "14%";
    enemyUnitEl.style.left = "74%";
    enemyUnitEl.style.transform = "translateX(-50%)";
    enemyUnitEl.innerHTML = `
        <div style="display:flex;gap:14px;align-items:flex-end;">
            ${cardsHtml}
        </div>
    `;

    enemyUnitEl.querySelectorAll("img[data-enemy-idx]").forEach((imgEl) => {
        const idx = Number(imgEl.dataset.enemyIdx);
        const enemyObj = activeEnemies[idx];
        const fallbackEl = imgEl.parentElement ? imgEl.parentElement.querySelector(".enemy-fallback-icon") : null;
        const candidates = buildEnemyImageCandidates(enemyObj);

        if (!candidates.length) {
            imgEl.style.display = "none";
            if (fallbackEl) fallbackEl.style.display = "inline";
            return;
        }

        let cIdx = 0;
        imgEl.alt = enemyObj?.name || "Enemy";
        imgEl.onerror = function () {
            cIdx += 1;
            if (cIdx < candidates.length) {
                this.src = candidates[cIdx];
            } else {
                this.onerror = null;
                this.style.display = "none";
                if (fallbackEl) fallbackEl.style.display = "inline";
            }
        };
        imgEl.src = candidates[0];
    });

    if (inspectedEnemyIndex !== null) {
        renderEnemyDetailPopup(inspectedEnemyIndex);
    }
}

function renderEnemyDetailPopup(idx) {
    const popup = document.getElementById("enemy-detail-popup");
    const enemy = activeEnemies[idx];
    if (!popup || !enemy) {
        if (popup) popup.style.display = "none";
        return;
    }

    const elName = ELEMENT_LABELS[enemy.element] || enemy.element.toUpperCase();
    const rankLabel = enemy.isBoss ? "Boss" : (enemy.isElite ? "Tinh anh" : "Thường");
    const maxE = enemy.ult ? (enemy.ult.maxEnergy || 3) : 0;

    const statusList = [];
    if (enemy.status?.burnStacks > 0) statusList.push(`Thiêu đốt x${enemy.status.burnStacks}`);
    if (enemy.status?.chilled) statusList.push("Tê tái");
    if (enemy.status?.knockedUp) statusList.push("Hất tung");
    const statusText = statusList.length > 0 ? statusList.join(", ") : "Không có";

    popup.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.15);padding-bottom:4px;margin-bottom:6px;">
            <strong style="color:#fde047;font-size:21px;">${enemy.name}</strong>
            <button onclick="closeEnemyDetailPopup()" style="font-size:16px;padding:1px 7px;cursor:pointer;">✕</button>
        </div>
        <div class="stat-row"><span>Hệ / Hạng</span><strong>${elName} · ${rankLabel}</strong></div>
        <div class="stat-row"><span>HP</span><strong>${enemy.hp} / ${enemy.maxHp}</strong></div>
        <div class="stat-row"><span>ATK</span><strong>${enemy.atk}</strong></div>
        <div class="stat-row"><span>DEF</span><strong>${enemy.def}</strong></div>
        ${enemy.isBoss ? `<div class="stat-row"><span>Nộ</span><strong>${enemy.energy || 0} / ${maxE}</strong></div>` : ""}
        <div class="stat-row"><span>Trạng thái</span><strong>${statusText}</strong></div>
        ${enemy.passive ? `<div style="margin-top:6px;color:#93c5fd;"><strong>Nội tại:</strong> ${enemy.passive.desc}</div>` : ""}
        ${enemy.ult ? `<div style="margin-top:4px;color:#fde047;"><strong>Nộ:</strong> ${enemy.ult.desc}</div>` : ""}
    `;
    popup.style.display = "block";
}

function closeEnemyDetailPopup() {
    inspectedEnemyIndex = null;
    const popup = document.getElementById("enemy-detail-popup");
    if (popup) popup.style.display = "none";
}

function updateCombatHUD() {
    const label = document.getElementById("equipped-label");
    if (label) {
        label.textContent = "";
        label.style.display = "none";
    }
}

function updateEnergyUI() {
    const el = document.getElementById("energy-text");
    const ultBtn = document.getElementById("ult-btn");
    if (el) el.textContent = `Nộ: ${playerEnergy}/${MAX_ENERGY}`;
    if (ultBtn) ultBtn.disabled = !isPlayerTurn || isChoosingUpgrade || playerEnergy < MAX_ENERGY;
}

// --- CHUYỂN MÀN HUB <-> MAP 1 & PHÍM TẮT ---
function startAdventure() {
    const hubScreen = document.getElementById("hub-screen");
    const gameScreen = document.getElementById("game-screen");
    const storyScreen = document.getElementById("story-screen");
    if (!hubScreen || !gameScreen) return;

    if (storyScreen) storyScreen.style.display = "none";
    hubScreen.style.display = "none";
    gameScreen.style.display = "block";
    currentScreen = "game";
    playerEnergy = 0;
    currentFloor = 1;
    currentStage = 1;
    selectedEnemyIndex = 0;
    activeEnemies = spawnFloorStageEnemies(currentFloor, currentStage);

    resetRunProgression();
    resetPlayerStatus();
    syncPlayerWithActiveChar(true);
    updateCombatHUD();
    setPlayerTurnState(true);
    closeEnemyDetailPopup();
    renderEnemyHUD();
}

function backToHub() {
    const hubScreen = document.getElementById("hub-screen");
    const gameScreen = document.getElementById("game-screen");
    const storyScreen = document.getElementById("story-screen");
    if (!hubScreen || !gameScreen) return;

    stopStoryTypewriter();
    if (storyScreen) storyScreen.style.display = "none";
    resetRunProgression();
    gameScreen.style.display = "none";
    hubScreen.style.display = "block";
    currentScreen = "hub";
    renderHubLoadout();
    closeEnemyDetailPopup();
}

function addTestGold(amount = 10000) {
    playerGold += amount;
    saveGameProgress();
    renderHubLoadout();
}

function buyPate(amount = 5, cost = 150) {
    if (playerGold < cost) {
        alert("Không đủ Vàng để mua Pate!");
        return;
    }
    playerGold -= cost;
    playerPate += amount;
    saveGameProgress();
    renderHubLoadout();
}

document.addEventListener("keydown", (event) => {
    if (currentScreen === "story") {
        if (event.key === " " || event.key === "Enter" || event.key === "ArrowRight") {
            event.preventDefault();
            handleStoryNextClick();
            return;
        }
        if (event.key === "Escape") {
            event.preventDefault();
            finishStoryIntro();
            return;
        }
    }

    if (event.key === "F2") {
        event.preventDefault();
        addTestGold(10000);
        return;
    }
    if (event.key === "F3") {
        event.preventDefault();
        debugMissingCharacterImages();
        return;
    }
    if (event.key === "Escape") {
        if (isChoosingUpgrade) return;
        const statModal = document.getElementById("stat-modal");
        if (statModal && statModal.style.display === "block") {
            toggleStatModal(false);
            return;
        }
        const gachaModal = document.getElementById("gacha-modal");
        if (gachaModal && gachaModal.style.display === "block") {
            toggleGachaModal(false);
            return;
        }
        if (currentScreen === "game") {
            backToHub();
        }
    }
});

// --- GACHA, KHO VŨ KHÍ & PHÂN RÃ LẺ / SỐ LƯỢNG LỚN ---
function rollRarity() {
    const roll = Math.random() * 100;
    let cumulative = 0;
    for (const key of Object.keys(RARITY_CONFIG)) {
        cumulative += RARITY_CONFIG[key].rate;
        if (roll < cumulative) return key;
    }
    return "thuong";
}

function pullSingleWeapon() {
    if (Math.random() * 100 < ULTRA_RARE_WEAPON_CHANCE) {
        const pickedUltra = ULTRA_RARE_WEAPONS[Math.floor(Math.random() * ULTRA_RARE_WEAPONS.length)];
        const rolledUltra = rollWeaponStats(pickedUltra.baseStats, "gg", true);
        return {
            ...pickedUltra,
            rarity: "gg",
            ultraRare: true,
            stats: rolledUltra.stats,
            rolledLines: rolledUltra.rolledLines,
            uid: `${pickedUltra.id}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
        };
    }

    const rarity = rollRarity();
    const candidates = WEAPON_POOL.filter(w => w.rarity === rarity);
    const pool = candidates.length > 0 ? candidates : WEAPON_POOL;
    const picked = pool[Math.floor(Math.random() * pool.length)];

    const rolled = rollWeaponStats(picked.baseStats || { atk: 3, hp: 15, def: 1 }, rarity, false);

    return {
        ...picked,
        rarity,
        ultraRare: false,
        stats: rolled.stats,
        rolledLines: rolled.rolledLines,
        uid: `${picked.id}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
    };
}

function gachaRoll(count = 1) {
    const cost = count === 10 ? TEN_PULL_COST : SINGLE_PULL_COST;
    if (playerGold < cost) {
        return { ok: false, message: "Không đủ tiền để quay!", results: [] };
    }
    playerGold -= cost;
    const results = [];
    for (let i = 0; i < count; i++) {
        const item = pullSingleWeapon();
        ownedWeapons.push(item);
        results.push(item);
    }
    saveGameProgress();
    return { ok: true, results };
}

function salvageWeapon(uid) {
    const idx = ownedWeapons.findIndex(w => w.uid === uid);
    if (idx === -1) return;

    const target = ownedWeapons[idx];
    const r = RARITY_CONFIG[target.rarity] || RARITY_CONFIG.thuong;
    const refund = ULTRA_RARE_ELEMENTS.includes(target.element) ? 1000 : (r.salvageGold || 25);

    if (equippedWeapon && equippedWeapon.uid === uid) {
        equippedWeapon = null;
    }

    ownedWeapons.splice(idx, 1);
    playerGold += refund;
    saveGameProgress();

    syncPlayerWithActiveChar(false);
    renderInventory();
    renderHubLoadout();
    updateCombatHUD();
}

function bulkSalvageWeapons(rarityList) {
    if (!Array.isArray(rarityList) || rarityList.length === 0) return;

    const kept = [];
    let totalGoldEarned = 0;
    let salvagedCount = 0;

    for (const item of ownedWeapons) {
        const isEquipped = equippedWeapon && equippedWeapon.uid === item.uid;
        const isUltra = ULTRA_RARE_ELEMENTS.includes(item.element);
        if (!isEquipped && !isUltra && rarityList.includes(item.rarity)) {
            const r = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.thuong;
            totalGoldEarned += (r.salvageGold || 25);
            salvagedCount++;
        } else {
            kept.push(item);
        }
    }

    if (salvagedCount === 0) {
        alert("Không có vũ khí thường/hiếm chưa trang bị nào thuộc hạng đã chọn để rã!");
        return;
    }

    ownedWeapons = kept;
    playerGold += totalGoldEarned;
    saveGameProgress();

    renderInventory();
    renderHubLoadout();
    alert(`Đã rã ${salvagedCount} vũ khí, nhận được +${totalGoldEarned} Vàng!`);
}

function bulkSalvageAllUnequipped() {
    const kept = [];
    let totalGoldEarned = 0;
    let salvagedCount = 0;

    for (const item of ownedWeapons) {
        const isEquipped = equippedWeapon && equippedWeapon.uid === item.uid;
        const isUltra = ULTRA_RARE_ELEMENTS.includes(item.element);
        if (!isEquipped && !isUltra) {
            const r = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.thuong;
            totalGoldEarned += (r.salvageGold || 25);
            salvagedCount++;
        } else {
            kept.push(item);
        }
    }

    if (salvagedCount === 0) {
        alert("Không còn vũ khí thường chưa lắp nào để rã!");
        return;
    }

    ownedWeapons = kept;
    playerGold += totalGoldEarned;
    saveGameProgress();

    renderInventory();
    renderHubLoadout();
    alert(`Đã rã ${salvagedCount} vũ khí chưa lắp, nhận được +${totalGoldEarned} Vàng!`);
}

function openHubModalSection(section = "all") {
    const modal = document.getElementById("gacha-modal");
    if (!modal) return;

    const titleEl = document.getElementById("gacha-modal-title");
    const shopSec = document.getElementById("shop-section");
    const weaponSec = document.getElementById("weapon-section");
    const charSec = document.getElementById("char-section");

    const showAll = section === "all";
    if (shopSec) shopSec.style.display = (showAll || section === "shop") ? "block" : "none";
    if (weaponSec) weaponSec.style.display = (showAll || section === "weapon") ? "block" : "none";
    if (charSec) charSec.style.display = (showAll || section === "char") ? "block" : "none";

    if (titleEl) {
        if (section === "char") titleEl.textContent = "KHO MÈO";
        else if (section === "weapon") titleEl.textContent = "KHO TRANG BỊ";
        else if (section === "shop") titleEl.textContent = "SHOP & GACHA";
        else titleEl.textContent = "SHOP · TRANG BỊ · MÈO";
    }

    modal.style.display = "block";
    renderHubLoadout();
    renderGachaUI([]);
    const charResEl = document.getElementById("char-result-list");
    if (charResEl) charResEl.innerHTML = "";
    renderCharInventory();
}

function toggleGachaModal(show) {
    const modal = document.getElementById("gacha-modal");
    if (!modal) return;
    if (show) {
        openHubModalSection("all");
    } else {
        modal.style.display = "none";
        renderHubLoadout();
    }
}

function handleGacha(count) {
    const res = gachaRoll(count);
    if (!res.ok) {
        alert(res.message);
        return;
    }
    renderGachaUI(res.results);
}

function equipWeapon(uid) {
    const found = ownedWeapons.find(w => w.uid === uid);
    if (!found) return;
    equippedWeapon = found;
    saveGameProgress();
    syncPlayerWithActiveChar(false);
    renderInventory();
    renderHubLoadout();
    updateCombatHUD();
}

function formatWeaponStatLines(weapon) {
    const s = weapon.stats || {};
    const lines = weapon.rolledLines || ["atk", "hp", "def"].filter(k => (s[k] || 0) > 0);
    const labels = {
        atk: `+${s.atk || 0} ATK`,
        hp: `+${s.hp || 0} HP`,
        def: `+${s.def || 0} DEF`
    };
    return lines.map(k => labels[k]).join(" | ");
}

function createWeaponCardHTML(item, showEquipBtn) {
    const isUltra = ULTRA_RARE_ELEMENTS.includes(item.element);
    const r = RARITY_CONFIG[item.rarity];
    const isEquipped = equippedWeapon && equippedWeapon.uid === item.uid;
    const elName = ELEMENT_LABELS[item.element] || item.element.toUpperCase();
    const statLineText = formatWeaponStatLines(item) || "Không có chỉ số";
    const passiveDesc = hasWeaponPassive(item) ? item.passive.desc : "Không có nội tại";
    const salvageGold = isUltra ? 1000 : (r.salvageGold || 25);
    const titleColor = isUltra ? "#fde047" : r.color;
    const badgeText = isUltra ? "✦ SIÊU HIẾM" : r.label;

    return `
        <div class="weapon-card" style="border-color:${isEquipped ? "#38bdf8" : (isUltra ? "#fde047" : "#39435e")};">
            <div style="color:${titleColor};">[${badgeText}] ${item.name}</div>
            <div>Hệ: ${elName}</div>
            <div style="color:#fde68a;margin-top:2px;">Chỉ số: ${statLineText}</div>
            <div style="color:#cbd5e1;margin-top:3px;">Nội tại: ${passiveDesc}</div>
            ${showEquipBtn ? `
                <div style="display:flex;gap:6px;margin-top:6px;">
                    <button onclick="equipWeapon('${item.uid}')">${isEquipped ? "Đang trang bị" : "Trang bị"}</button>
                    <button onclick="salvageWeapon('${item.uid}')">Rã (+${salvageGold}V)</button>
                </div>
            ` : ""}
        </div>
    `;
}

function renderGachaUI(latestResults) {
    renderHubLoadout();
    document.getElementById("gacha-result-list").innerHTML =
        latestResults.map(item => createWeaponCardHTML(item, false)).join("");
    renderInventory();
}

function renderInventory() {
    renderHubLoadout();
    document.getElementById("inventory-list").innerHTML =
        ownedWeapons.map(item => createWeaponCardHTML(item, true)).join("");
}

// --- GACHA NHÂN VẬT ---
const ULTRA_RARE_CHAR_CHANCE_EACH = 2;

function pullSingleChar() {
    const roll = Math.random() * 100;
    const standardPool = CHAR_POOL.filter(c => !ULTRA_RARE_ELEMENTS.includes(c.element));
    const ultraList = CHAR_POOL.filter(c => ULTRA_RARE_ELEMENTS.includes(c.element));

    let picked = null;
    if (roll < ULTRA_RARE_CHAR_CHANCE_EACH && ultraList[0]) {
        picked = ultraList[0];
    } else if (roll < ULTRA_RARE_CHAR_CHANCE_EACH * 2 && ultraList[1]) {
        picked = ultraList[1];
    } else {
        picked = standardPool[Math.floor(Math.random() * standardPool.length)];
    }

    const charObj = buildCharInstanceFromTemplate(picked.id, 1);
    ownedChars.push(charObj);
    return charObj;
}

function createCharCardHTML(item, showEquipBtn, showMergeBtn) {
    const isUltra = ULTRA_RARE_ELEMENTS.includes(item.element);
    const elName = ELEMENT_LABELS[item.element] || item.element.toUpperCase();
    const star = item.star || 1;
    const scaled = getCharStarStats(item);
    const isEquipped = activeChar && activeChar.uid === item.uid;
    const canMerge = star < MAX_STAR && Boolean(findMergePartner(item));

    return `
        <div class="weapon-card" style="border-color:${isEquipped ? "#38bdf8" : (isUltra ? "#fde047" : "#39435e")};">
            <div style="display:flex;align-items:center;gap:8px;">
                <img data-char-uid="${item.uid}" alt="${item.name}" style="width:48px;height:48px;object-fit:contain;image-rendering:pixelated;">
                <div>
                    <div style="color:${isUltra ? "#fde047" : "#ffffff"};">${item.name} [${elName}]</div>
                    <div style="color:#fde047;font-size:17px;">${"★".repeat(star)} (${star}/${MAX_STAR})</div>
                </div>
            </div>
            <div style="color:#fde68a;margin-top:4px;font-size:17px;">ATK: ${scaled.atk} | HP: ${scaled.hp} | DEF: ${scaled.def}</div>
            ${(showEquipBtn || showMergeBtn) ? `
                <div style="display:flex;gap:6px;margin-top:6px;">
                    ${showEquipBtn ? `<button onclick="selectChar('${item.uid}')">${isEquipped ? "Đang dùng" : "Chọn"}</button>` : ""}
                    ${showMergeBtn ? `<button onclick="mergeCharStar('${item.uid}')" ${canMerge ? "" : "disabled"}>Ghép ★${star + 1}</button>` : ""}
                </div>
            ` : ""}
        </div>
    `;
}

function handleCharGacha(count = 1) {
    const isTen = count === 10;
    const cost = isTen ? TEN_CHAR_PULL_COST : CHAR_PULL_COST;
    const pullCount = isTen ? 10 : 1;

    if (playerGold < cost) {
        alert("Không đủ tiền để quay nhân vật!");
        return;
    }

    playerGold -= cost;
    const results = [];
    for (let i = 0; i < pullCount; i++) {
        results.push(pullSingleChar());
    }
    saveGameProgress();

    const listEl = document.getElementById("char-result-list");
    listEl.innerHTML = results.map(item => createCharCardHTML(item, false, false)).join("");
    listEl.querySelectorAll("img[data-char-uid]").forEach((img) => {
        const found = results.find(r => r.uid === img.dataset.charUid);
        if (found) attachCharacterImage(img, found);
    });

    renderCharInventory();
    renderHubLoadout();
}

function findMergePartner(targetChar) {
    const star = targetChar.star || 1;
    if (star >= MAX_STAR) return null;
    return ownedChars.find(
        c => c.uid !== targetChar.uid && c.id === targetChar.id && (c.star || 1) === star
    ) || null;
}

let inspectedCharUid = null;

function initSleepingTieuImage() {
    const imgEl = document.getElementById("sleeping-tieu-img");
    if (!imgEl) return;
    const candidates = buildAssetCandidates(
        [".", "tiêu béo adventure", "images", "img", "assets"],
        ["tiêu nằm", "tieu nam", "tiêu_nằm", "tieu_nam"],
        [".jpg", ".jpeg", ".png", ".webp"]
    );
    attachImageWithFallback(imgEl, candidates, "");
}

let tieuBubbleTimer = null;

function pokeSleepingTieu() {
    const bubble = document.getElementById("tieu-sleep-bubble");
    if (!bubble) return;
    const lines = [
        "Meow...",
        "Đừng có chọc tui",
        "Hai bố con anh gần nghìn mét đất thì chống thế bòi",
        "Người khôn ăn nói nửa chừng, người ngu ăn nói nửa chừng tưởng khôn",
        "Chọn xoài đừng để xoài chua, chọn bạn đừng để bạn chọn xoài chua cho mình",
        "So tài so trí ta thua, nhưng so của quý không đùa được đâu"
    ];
    bubble.textContent = `💤 ${lines[Math.floor(Math.random() * lines.length)]}`;
    bubble.style.display = "block";

    if (tieuBubbleTimer) clearTimeout(tieuBubbleTimer);
    tieuBubbleTimer = setTimeout(() => {
        bubble.style.display = "none";
    }, 2600);
}

function resetCatFilters() {
    const searchEl = document.getElementById("cat-search-input");
    const elFilter = document.getElementById("cat-element-filter");
    const starFilter = document.getElementById("cat-star-filter");
    if (searchEl) searchEl.value = "";
    if (elFilter) elFilter.value = "all";
    if (starFilter) starFilter.value = "all";
    renderCharInventory();
}

function inspectChar(uid) {
    inspectedCharUid = uid;
    renderCharInventory();
}

function mergeCharStar(uid) {
    const idxA = ownedChars.findIndex(c => c.uid === uid);
    if (idxA === -1) return;

    const charA = ownedChars[idxA];
    const currentStar = charA.star || 1;
    if (currentStar >= MAX_STAR) {
        alert(`${charA.name} đã đạt bậc tối đa ★${MAX_STAR}!`);
        return;
    }

    const idxB = ownedChars.findIndex(
        c => c.uid !== uid && c.id === charA.id && (c.star || 1) === currentStar
    );
    if (idxB === -1) {
        alert(`Cần thêm 1 ${charA.name} cùng bậc ★${currentStar} để ghép!`);
        return;
    }

    const partner = ownedChars[idxB];
    const nextStar = Math.min(MAX_STAR, currentStar + 1);

    const keepActive = (activeChar && activeChar.uid === partner.uid) ? partner : charA;
    const removeUid = keepActive.uid === charA.uid ? partner.uid : charA.uid;

    keepActive.star = nextStar;
    ownedChars = ownedChars.filter(c => c.uid !== removeUid);
    inspectedCharUid = keepActive.uid;
    saveGameProgress();

    if (activeChar && activeChar.uid === removeUid) {
        activeChar = keepActive;
    }

    if (activeChar && activeChar.uid === keepActive.uid) {
        syncPlayerWithActiveChar(false);
        updateCombatHUD();
        updateEnergyUI();
    }

    renderCharInventory();
    renderHubLoadout();
}

function selectChar(uid) {
    const found = ownedChars.find(c => c.uid === uid);
    if (!found) return;
    activeChar = found;
    inspectedCharUid = found.uid;
    saveGameProgress();
    syncPlayerWithActiveChar(true);
    renderHubLoadout();
    updateCombatHUD();
    updateEnergyUI();
    renderCharInventory();
}

function renderCharDetailPanel(item) {
    const detailEl = document.getElementById("char-detail-panel");
    if (!detailEl) return;

    if (!item) {
        detailEl.innerHTML = `<div style="color:#94a3b8;">Không tìm thấy nhân vật phù hợp.</div>`;
        return;
    }

    const isEquipped = activeChar && activeChar.uid === item.uid;
    const isUltra = ULTRA_RARE_ELEMENTS.includes(item.element);
    const elName = ELEMENT_LABELS[item.element] || item.element.toUpperCase();
    const star = item.star || 1;
    const scaled = getCharStarStats(item);
    const canMerge = star < MAX_STAR && Boolean(findMergePartner(item));
    const passiveText = item.passive ? item.passive.desc : "Không có";
    const ultText = item.ult ? item.ult.desc : "Không có";
    const perk5 = getChar5StarPerk(item);

    detailEl.innerHTML = `
        <div class="cat-detail-portrait" style="border-color:${isUltra ? "#fde047" : "#334155"};">
            <img id="detail-char-img" alt="${item.name}">
            <div>
                <div style="font-size:23px;color:${isUltra ? "#fde047" : "#ffffff"};">
                    ${item.name} [${elName}]${isUltra ? " ✦" : ""}
                </div>
                <div style="color:#fde047;font-size:20px;">${"★".repeat(star)} (${star}/${MAX_STAR})</div>
            </div>
        </div>

        <div class="stat-row"><span>ATK</span><strong>${scaled.atk}</strong></div>
        <div class="stat-row"><span>HP</span><strong>${scaled.hp}</strong></div>
        <div class="stat-row"><span>DEF</span><strong>${scaled.def}</strong></div>

        <div style="margin-top:8px;font-size:18px;color:#93c5fd;line-height:1.25;">
            <strong>Nội tại:</strong> ${passiveText}
        </div>
        <div style="margin-top:6px;font-size:18px;color:#fde047;line-height:1.25;">
            <strong>Nộ:</strong> ${ultText}
        </div>
        ${perk5 ? `
            <div style="margin-top:6px;font-size:18px;color:#f472b6;line-height:1.25;">
                <strong>Đặc quyền ★5 (${perk5.name}):</strong> ${perk5.desc}
            </div>
        ` : ""}

        <div class="cat-detail-actions">
            <button onclick="selectChar('${item.uid}')">
                ${isEquipped ? "✓ Đang dùng (Equip)" : "Equip"}
            </button>
            <button onclick="mergeCharStar('${item.uid}')" ${canMerge ? "" : "disabled"}>
                ${star >= MAX_STAR ? "Max ★5" : `Merge (★${star + 1})`}
            </button>
        </div>
    `;

    const detailImg = document.getElementById("detail-char-img");
    if (detailImg) attachCharacterImage(detailImg, item);
}

function renderCharInventory() {
    initSleepingTieuImage();

    const listEl = document.getElementById("char-inventory-list");
    const dexCountEl = document.getElementById("cat-dex-count");
    if (!listEl) return;

    const uniqueOwnedIds = new Set(ownedChars.map(c => c.id));
    if (dexCountEl) {
        dexCountEl.textContent = `${uniqueOwnedIds.size} / ${CHAR_POOL.length} loại`;
    }

    const qRaw = (document.getElementById("cat-search-input")?.value || "").trim();
    const qSlug = toSlugNoTone(qRaw);
    const elFilter = document.getElementById("cat-element-filter")?.value || "all";
    const starFilter = document.getElementById("cat-star-filter")?.value || "all";

    const filtered = ownedChars.filter(c => {
        const star = c.star || 1;
        if (elFilter !== "all" && c.element !== elFilter) return false;
        if (starFilter !== "all" && star !== Number(starFilter)) return false;

        if (qSlug) {
            const nameMatch = toSlugNoTone(c.name).includes(qSlug) || c.name.toLowerCase().includes(qRaw.toLowerCase());
            const elLabel = ELEMENT_LABELS[c.element] || c.element;
            const elMatch = toSlugNoTone(elLabel).includes(qSlug) || c.element.toLowerCase().includes(qRaw.toLowerCase());
            if (!nameMatch && !elMatch) return false;
        }
        return true;
    });

    if (filtered.length === 0) {
        listEl.innerHTML = `<div style="grid-column:1/-1;color:#94a3b8;padding:10px;">Không có mèo khớp bộ lọc.</div>`;
        renderCharDetailPanel(null);
        return;
    }

    if (!inspectedCharUid || !filtered.some(c => c.uid === inspectedCharUid)) {
        inspectedCharUid = (activeChar && filtered.some(c => c.uid === activeChar.uid))
            ? activeChar.uid
            : filtered[0].uid;
    }

    listEl.innerHTML = filtered.map(item => {
        const star = item.star || 1;
        const isSelected = item.uid === inspectedCharUid;
        const isEquipped = activeChar && activeChar.uid === item.uid;
        const canMerge = star < MAX_STAR && Boolean(findMergePartner(item));
        const isUltra = ULTRA_RARE_ELEMENTS.includes(item.element);

        return `
            <div class="cat-mini-card ${isSelected ? "selected" : ""}" onclick="inspectChar('${item.uid}')">
                ${isEquipped ? `<span class="cat-badge-active">Dùng</span>` : ""}
                ${canMerge ? `<span class="cat-badge-merge">Ghép</span>` : ""}
                <img data-char-uid="${item.uid}" alt="${item.name}">
                <div style="font-size:18px;color:${isUltra ? "#fde047" : "#f8fafc"};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${item.name}
                </div>
                <div style="font-size:17px;color:#fde047;">★${star}</div>
            </div>
        `;
    }).join("");

    listEl.querySelectorAll("img[data-char-uid]").forEach((img) => {
        const found = filtered.find(c => c.uid === img.dataset.charUid);
        if (found) attachCharacterImage(img, found);
    });

    const targetDetail = filtered.find(c => c.uid === inspectedCharUid) || filtered[0];
    renderCharDetailPanel(targetDetail);
}

initSleepingTieuImage();

// --- BẢNG STAT CHI TIẾT & BẢNG KHẮC HỆ 10 NGUYÊN TỐ ---
function getDetailedCombatStats() {
    const stats = getEffectivePlayerStats();
    const res = stats.resonance;
    const perk5 = getChar5StarPerk(activeChar);

    let critChance = (res.critBonus || 0) + (runUpgrades.critChance || 0);
    let knockupChance = (res.knockupBonus || 0) + (runUpgrades.knockupChance || 0) + (runUpgrades.allEffectChance || 0);
    let chillChance = (res.chillBonus || 0) + (runUpgrades.chillChance || 0) + (runUpgrades.allEffectChance || 0);
    let burnChance = (res.effectChanceBonus || 0) + (runUpgrades.burnChance || 0) + (runUpgrades.allEffectChance || 0);
    let healChance = (res.effectChanceBonus || 0) + (runUpgrades.healChance || 0) + (runUpgrades.allEffectChance || 0);

    const sources = [activeChar.passive];
    if (hasWeaponPassive(equippedWeapon)) {
        sources.push(equippedWeapon.passive);
    }

    for (const p of sources) {
        if (!p || !p.type) continue;
        const c = p.chance || 0;
        if (p.type === "crit") critChance += c;
        if (p.type === "knockup") knockupChance += c;
        if (p.type === "chill") chillChance += c;
        if (p.type === "burn") burnChance += c;
        if (p.type === "heal") healChance += c;
    }

    return {
        charName: activeChar.name,
        star: activeChar.star || 1,
        level: runLevel,
        exp: runExp,
        expToNext: runExpToNext,
        elementName: ELEMENT_LABELS[stats.element] || stats.element.toUpperCase(),
        atk: stats.atk,
        hp: playerStats.hp,
        maxHp: stats.maxHp,
        def: stats.def,
        energy: playerEnergy,
        maxEnergy: MAX_ENERGY,
        resonanceLabel: res.label,
        dmgBonusPct: Math.round((res.dmgBonus || 0) * 100),
        healBonusPct: Math.round((res.healBonus || 0) * 100) + (runUpgrades.healBonusPct || 0),
        advantageBonusPct: 15 + (runUpgrades.advantageBonusPct || 0),
        ultDmgBonusPct: runUpgrades.ultDmgPct || 0,
        critChance: clampCritChance(critChance),
        knockupChance: clampEffectChance(knockupChance),
        chillChance: clampEffectChance(chillChance),
        burnChance: clampEffectChance(burnChance),
        healChance: clampEffectChance(healChance),
        ultInfo: activeChar.ult ? activeChar.ult.desc : "Không có",
        perk5Text: perk5 ? `${perk5.name}: ${perk5.desc}` : "Chưa đạt ★5",
        pickedCards: runUpgrades.pickedCards || []
    };
}

function renderElementChartHTML() {
    const rows = Object.keys(ELEMENT_LABELS).map(elKey => {
        const label = ELEMENT_LABELS[elKey];
        const weakAgainst = (WEAKNESS_MAP[elKey] || [])
            .map(targetKey => ELEMENT_LABELS[targetKey] || targetKey)
            .join(", ");
        const attackedBy = getElementsWeakTo(elKey)
            .map(atkKey => ELEMENT_LABELS[atkKey] || atkKey)
            .join(", ");

        const specialNote = ULTRA_RARE_ELEMENTS.includes(elKey)
            ? " (Siêu hiếm · Khắc đôi +25%)"
            : (SPECIAL_ELEMENTS.includes(elKey) ? " (Hệ đặc biệt)" : "");
        const khacText = weakAgainst ? `Khắc: ${weakAgainst}` : "Không khắc hệ riêng";
        const biKhacText = attackedBy ? `Bị khắc bởi: ${attackedBy}` : "Không bị hệ nào khắc";

        return `
            <tr>
                <td><strong>${label}</strong>${specialNote}</td>
                <td>${khacText}</td>
                <td>${biKhacText}</td>
            </tr>
        `;
    }).join("");

    return `
        <div class="stat-section-title">Bảng khắc hệ 10 nguyên tố</div>
        <table class="element-chart-table">
            <thead>
                <tr>
                    <th>Hệ</th>
                    <th>Khắc chế</th>
                    <th>Bị khắc chế</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function renderStatModal() {
    const container = document.getElementById("stat-modal-content");
    if (!container) return;

    const d = getDetailedCombatStats();
    const pickedHtml = d.pickedCards.length > 0
        ? d.pickedCards.map(c => {
            const r = UPGRADE_RARITY_CONFIG[c.rarity] || UPGRADE_RARITY_CONFIG.thuong;
            return `<div style="padding:3px 0;color:${r.color};">• [${r.label}] <strong>${c.name}</strong>: ${c.desc}</div>`;
        }).join("")
        : `<div style="color:#94a3b8;">Chưa chọn thẻ nâng cấp nào trong chuyến đi này.</div>`;

    container.innerHTML = `
        <div class="stat-section-title">Chỉ số cơ bản (${d.charName} · ${d.elementName} · ★${d.star} · Lv.${d.level})</div>
        <div class="stat-row"><span>HP</span><strong>${d.hp} / ${d.maxHp}</strong></div>
        <div class="stat-row"><span>ATK</span><strong>${d.atk}</strong></div>
        <div class="stat-row"><span>DEF</span><strong>${d.def}</strong></div>
        <div class="stat-row"><span>EXP trong trận</span><strong>${d.exp} / ${d.expToNext}</strong></div>
        <div class="stat-row"><span>Nộ hiện tại</span><strong>${d.energy} / ${d.maxEnergy}</strong></div>

        <div class="stat-section-title">Cộng hưởng, Bậc ★5 & Sát thương</div>
        <div class="stat-row"><span>Cộng hưởng hệ</span><strong>${d.resonanceLabel}</strong></div>
        <div class="stat-row"><span>Khả năng đặc biệt ★5</span><strong>${d.perk5Text}</strong></div>
        <div class="stat-row"><span>Khắc hệ</span><strong>+${d.advantageBonusPct}% (Cặp Siêu hiếm +25%)</strong></div>
        <div class="stat-row"><span>Tăng sát thương cộng hưởng/★5</span><strong>+${d.dmgBonusPct}%</strong></div>
        <div class="stat-row"><span>Tăng sát thương chiêu Nộ</span><strong>+${d.ultDmgBonusPct}%</strong></div>
        <div class="stat-row"><span>Tăng hồi phục tổng</span><strong>+${d.healBonusPct}%</strong></div>

        <div class="stat-section-title">Tỉ lệ kích hoạt hiệu ứng (Trần 85% / Crit 100%)</div>
        <div class="stat-row"><span>Tỉ lệ Chí mạng</span><strong>${d.critChance}%</strong></div>
        <div class="stat-row"><span>Tỉ lệ Hất tung (mất 1 lượt)</span><strong>${d.knockupChance}%</strong></div>
        <div class="stat-row"><span>Tỉ lệ Tê tái</span><strong>${d.chillChance}%</strong></div>
        <div class="stat-row"><span>Tỉ lệ Thiêu đốt</span><strong>${d.burnChance}%</strong></div>
        <div class="stat-row"><span>Tỉ lệ Hồi phục theo ST</span><strong>${d.healChance}%</strong></div>

        <div class="stat-section-title">Chiêu Nộ</div>
        <div style="color:#fde047;">${d.ultInfo}</div>

        <div class="stat-section-title">Thẻ nâng cấp đã chọn trong trận (${d.pickedCards.length})</div>
        ${pickedHtml}

        ${renderElementChartHTML()}
    `;
}

function toggleStatModal(show) {
    let modal = document.getElementById("stat-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "stat-modal";
        modal.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <h3 style="margin:0;font-size:26px;">📊 BẢNG STAT CHI TIẾT</h3>
                <button onclick="toggleStatModal(false)">Đóng</button>
            </div>
            <div id="stat-modal-content" style="margin-top:8px;"></div>
        `;
        document.body.appendChild(modal);
    }

    if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }

    modal.style.display = show ? "block" : "none";
    if (show) renderStatModal();
}

// --- HIỆU ỨNG CHỮ SÁT THƯƠNG, KHẮC HỆ, CRIT & TRẠNG THÁI ---
const EFFECT_POPUP_CONFIG = {
    burn:    { text: "🔥 THIÊU ĐỐT", color: "#fb923c" },
    chill:   { text: "❄️ TÊ TÁI",    color: "#38bdf8" },
    knockup: { text: "💨 HẤT TUNG",  color: "#e2e8f0" }
};

function spawnStatusPopup(text, color = "#fde047", xPercent = 75, bottomPercent = 43) {
    const gameScreen = document.getElementById("game-screen");
    if (!gameScreen || !text) return;

    const popup = document.createElement("div");
    popup.className = "floating-dmg";
    popup.style.left = `${xPercent}%`;
    popup.style.bottom = `${bottomPercent}%`;
    popup.style.color = color;
    popup.style.fontSize = "22px";
    popup.textContent = text;

    gameScreen.appendChild(popup);
    setTimeout(() => popup.remove(), 850);
}

function spawnFloatingDamage(damage, { isCrit = false, isSuperEffective = false, customText = null } = {}) {
    const gameScreen = document.getElementById("game-screen");
    const enemyUnit = document.getElementById("enemy-unit");
    if (!gameScreen) return;

    const popup = document.createElement("div");
    popup.className = `floating-dmg ${isCrit ? "crit" : "normal"}`;

    if (customText) {
        popup.textContent = customText;
    } else if (isSuperEffective && isCrit) {
        popup.textContent = `-${damage} KHẮC · CRIT!`;
    } else if (isSuperEffective) {
        popup.textContent = `-${damage} KHẮC`;
        popup.style.color = "#fb923c";
    } else if (isCrit) {
        popup.textContent = `-${damage} CRIT!`;
    } else {
        popup.textContent = `-${damage}`;
    }

    const jitterX = Math.floor(Math.random() * 16) - 8;
    popup.style.left = `${75 + jitterX * 0.3}%`;

    gameScreen.appendChild(popup);

    if (enemyUnit) {
        enemyUnit.classList.remove("enemy-hit");
        void enemyUnit.offsetWidth;
        enemyUnit.classList.add("enemy-hit");
    }

    setTimeout(() => popup.remove(), 850);
}

function spawnPlayerDamage(damage, customText = null) {
    const gameScreen = document.getElementById("game-screen");
    const playerUnit = document.getElementById("player-unit");
    if (!gameScreen) return;

    const popup = document.createElement("div");
    popup.className = "floating-dmg player-hurt";
    popup.textContent = customText || `-${damage}`;

    const jitterX = Math.floor(Math.random() * 16) - 8;
    popup.style.left = `${35 + jitterX * 0.3}%`;

    gameScreen.appendChild(popup);

    if (playerUnit) {
        playerUnit.classList.remove("player-hit");
        void playerUnit.offsetWidth;
        playerUnit.classList.add("player-hit");
    }

    gameScreen.classList.remove("screen-hurt");
    void gameScreen.offsetWidth;
    gameScreen.classList.add("screen-hurt");

    setTimeout(() => popup.remove(), 850);
}

function spawnHealPopup(amount) {
    const gameScreen = document.getElementById("game-screen");
    if (!gameScreen || amount <= 0) return;

    const popup = document.createElement("div");
    popup.className = "floating-dmg normal";
    popup.style.left = "35%";
    popup.style.bottom = "38%";
    popup.style.color = "#4ade80";
    popup.textContent = `+${amount} HP`;

    gameScreen.appendChild(popup);
    setTimeout(() => popup.remove(), 850);
}

// --- HỒI PHỤC, CƠ CHẾ ÁNH SÁNG / BÓNG TỐI & ÁP DỤNG TRẠNG THÁI ---
function healPlayerByDamage(dealtDamage, ratio) {
    const res = getResonanceInfo();
    if (!ratio || ratio <= 0 || dealtDamage <= 0) return 0;

    const totalHealBonus = (res.healBonus || 0) + ((runUpgrades.healBonusPct || 0) / 100);
    let healAmount = dealtDamage * ratio * (1 + totalHealBonus);
    if (playerStatus.chilled) {
        healAmount *= (1 - CHILL_HEAL_REDUCTION);
    }

    const finalHeal = Math.max(1, Math.round(healAmount));
    playerStats.hp = Math.min(playerStats.maxHp, playerStats.hp + finalHeal);
    renderPlayerHUD();
    spawnHealPopup(finalHeal);
    return finalHeal;
}

function applyUniqueElementMechanicsOnHit(attackElement, enemy, dealtDamage, isUltimate = false) {
    if (!attackElement || dealtDamage <= 0) return;

    if (attackElement === "anh_sang") {
        healPlayerByDamage(dealtDamage, isUltimate ? 0.45 : 0.25);
        const shieldPct = isUltimate ? 0.35 : 0.25;
        playerStatus.lightShieldReduction = Math.max(playerStatus.lightShieldReduction || 0, shieldPct);
        spawnStatusPopup(`☀️ LÁ CHẮN -${Math.round(shieldPct * 100)}% ST`, "#fef08a", 35, 45);
    }

    if (attackElement === "bong_toi") {
        healPlayerByDamage(dealtDamage, isUltimate ? 0.40 : 0.22);
    }
}

function applyEffectToEnemy(enemy, effectType, chance, healRatio = 0, dealtDamage = 0) {
    if (!enemy || !effectType) return;

    const res = getResonanceInfo();
    const sharedBonus = (res.effectChanceBonus || 0) + (runUpgrades.allEffectChance || 0);
    let finalChance = (chance || 0) + sharedBonus;

    if (effectType === "knockup") {
        finalChance = clampEffectChance((chance || 0) + (res.knockupBonus || 0) + (runUpgrades.knockupChance || 0) + (runUpgrades.allEffectChance || 0));
    } else if (effectType === "chill") {
        finalChance = clampEffectChance((chance || 0) + (res.chillBonus || 0) + (runUpgrades.chillChance || 0) + (runUpgrades.allEffectChance || 0));
    } else if (effectType === "burn") {
        finalChance = clampEffectChance((chance || 0) + sharedBonus + (runUpgrades.burnChance || 0));
    } else if (effectType === "heal") {
        finalChance = clampEffectChance((chance || 0) + sharedBonus + (runUpgrades.healChance || 0));
    }

    if (effectType === "heal") {
        if (Math.random() * 100 < finalChance) {
            healPlayerByDamage(dealtDamage, Math.max(healRatio || 0.3, runUpgrades.healRatio || 0));
        }
        return;
    }

    if (Math.random() * 100 < finalChance) {
        if (effectType === "burn") {
            enemy.status.burnStacks = Math.min(MAX_BURN_STACKS, enemy.status.burnStacks + 1);
            spawnStatusPopup(`🔥 THIÊU ĐỐT x${enemy.status.burnStacks}`, EFFECT_POPUP_CONFIG.burn.color, 75, 43);
        } else if (effectType === "chill") {
            enemy.status.chilled = true;
            spawnStatusPopup(EFFECT_POPUP_CONFIG.chill.text, EFFECT_POPUP_CONFIG.chill.color, 75, 43);
        } else if (effectType === "knockup") {
            enemy.status.knockedUp = true;
            spawnStatusPopup(EFFECT_POPUP_CONFIG.knockup.text, EFFECT_POPUP_CONFIG.knockup.color, 75, 43);
        }
        renderEnemyHUD();
    }
}

function triggerBurnOnEnemies() {
    const effectiveBurnRatio = BURN_HP_RATIO + (runUpgrades.burnRatioBonus || 0);
    for (const enemy of activeEnemies) {
        if (enemy.hp > 0 && enemy.status.burnStacks > 0) {
            const burnDmg = Math.max(1, Math.round(enemy.maxHp * effectiveBurnRatio * enemy.status.burnStacks));
            enemy.hp = Math.max(0, enemy.hp - burnDmg);
            spawnFloatingDamage(burnDmg, { customText: `-${burnDmg} 🔥 ${enemy.name}` });
        }
    }
    renderEnemyHUD();
}

function executeAttack({ rawBaseAtk, attackElement, primaryEffect, secondaryEffect = null, extraUpgradeEffect = null, isUltimate = false }) {
    const enemy = getSelectedEnemy();
    if (!enemy || enemy.hp <= 0) return;

    const stats = getEffectivePlayerStats();
    const res = stats.resonance;

    const superEffective = attackElement ? isAdvantage(attackElement, enemy.element) : false;
    const advMult = attackElement
        ? getAdvantageMultiplierForPair(attackElement, enemy.element, runUpgrades.advantageBonusPct || 0)
        : 1;
    let dmg = superEffective ? rawBaseAtk * advMult : rawBaseAtk;

    if (res.dmgBonus > 0) {
        dmg *= (1 + res.dmgBonus);
    }

    if (attackElement === "bong_toi" && hasAnyDebuff(enemy)) {
        dmg *= 1.2;
    }

    let isCrit = false;
    let critChance = (res.critBonus || 0) + (runUpgrades.critChance || 0);
    if (primaryEffect && primaryEffect.type === "crit") {
        critChance += (primaryEffect.chance || 0);
    }
    if (secondaryEffect && secondaryEffect.type === "crit") {
        critChance += (secondaryEffect.chance || 0);
    }
    critChance = clampCritChance(critChance);

    if (critChance > 0 && Math.random() * 100 < critChance) {
        isCrit = true;
        dmg *= (CRIT_MULTIPLIER + (runUpgrades.critMultBonus || 0));
    }

    let actualDmg = applyDefReduction(dmg, enemy.def || 0);
    if (enemy.id === "rat_beo_i") {
        actualDmg = Math.max(1, Math.round(actualDmg * 0.8));
    }
    enemy.hp = Math.max(0, enemy.hp - actualDmg);

    renderEnemyHUD();
    spawnFloatingDamage(actualDmg, {
        isCrit,
        isSuperEffective: superEffective
    });

    applyUniqueElementMechanicsOnHit(attackElement, enemy, actualDmg, isUltimate);

    if (primaryEffect) {
        applyEffectToEnemy(
            enemy,
            primaryEffect.type,
            primaryEffect.chance,
            primaryEffect.healRatio || 0,
            actualDmg
        );
    }

    if (secondaryEffect && enemy.hp > 0) {
        applyEffectToEnemy(
            enemy,
            secondaryEffect.type,
            secondaryEffect.chance,
            secondaryEffect.healRatio || 0,
            actualDmg
        );
    }

    if (extraUpgradeEffect && enemy.hp > 0) {
        applyEffectToEnemy(
            enemy,
            extraUpgradeEffect.type,
            extraUpgradeEffect.chance,
            extraUpgradeEffect.healRatio || 0,
            actualDmg
        );
    }
}

function normalAttackTurn() {
    if (!isPlayerTurn || isChoosingUpgrade) return;
    setPlayerTurnState(false);

    const stats = getEffectivePlayerStats();
    const atkElement = equippedWeapon ? equippedWeapon.element : stats.element;

    const charPassive = activeChar.passive || null;
    const wepPassive = hasWeaponPassive(equippedWeapon) ? equippedWeapon.passive : null;

    const hasHealSource = (charPassive && charPassive.type === "heal") || (wepPassive && wepPassive.type === "heal");
    const upgradeHealSource = (!hasHealSource && (runUpgrades.healChance || 0) > 0)
        ? { type: "heal", chance: 0, healRatio: runUpgrades.healRatio || 0.2 }
        : null;

    executeAttack({
        rawBaseAtk: stats.atk,
        attackElement: atkElement,
        primaryEffect: charPassive,
        secondaryEffect: wepPassive,
        extraUpgradeEffect: upgradeHealSource,
        isUltimate: false
    });

    const totalEnergyGain = stats.resonance.energyGain + (runUpgrades.energyPerHit || 0);
    playerEnergy = Math.min(MAX_ENERGY, playerEnergy + totalEnergyGain);
    updateEnergyUI();

    gainRunExp(25);
    afterPlayerAction();
}

function ultimateAttackTurn() {
    if (!isPlayerTurn || isChoosingUpgrade || playerEnergy < MAX_ENERGY) return;
    setPlayerTurnState(false);

    const stats = getEffectivePlayerStats();
    const ult = activeChar.ult || { dmgMultiplier: 2.0, effect: null, effectChance: 0, healRatio: 0 };
    const ultMult = ult.dmgMultiplier * (1 + ((runUpgrades.ultDmgPct || 0) / 100));

    executeAttack({
        rawBaseAtk: stats.atk * ultMult,
        attackElement: stats.element,
        primaryEffect: ult.effect
            ? {
                type: ult.effect,
                chance: ult.effectChance || 100,
                healRatio: ult.healRatio || 0
            }
            : null,
        secondaryEffect: null,
        isUltimate: true
    });

    playerEnergy = Math.min(MAX_ENERGY, runUpgrades.refundEnergyOnUlt || 0);
    updateEnergyUI();

    gainRunExp(40);
    afterPlayerAction();
}

function openVictoryModal(goldEarned = 0, expEarned = 0) {
    setPlayerTurnState(false);

    let modal = document.getElementById("victory-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "victory-modal";
        modal.style.cssText = `
            position:fixed;inset:0;background:rgba(0,0,0,0.78);
            display:flex;align-items:center;justify-content:center;z-index:9999;
            font-family:'VT323',monospace;
        `;
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="
            background:#0f172a;border:2px solid #facc15;border-radius:12px;
            padding:24px 28px;max-width:400px;width:90%;text-align:center;color:#f8fafc;
        ">
            <h2 style="margin:0 0 8px;color:#fde047;font-size:32px;">🏆 CHIẾN THẮNG!</h2>
            <div style="font-size:22px;color:#cbd5e1;margin-bottom:14px;">
                Đã hoàn thành Floor ${currentFloor} · Ải ${currentStage}/${STAGES_PER_FLOOR}!
            </div>
            <div style="background:#1e293b;border-radius:8px;padding:10px;margin-bottom:18px;font-size:21px;">
                <div>💰 Vàng nhận ải cuối: <strong>+${goldEarned}</strong> (Tổng: <strong>${playerGold}</strong>)</div>
                <div>✨ EXP nhận ải cuối: <strong>+${expEarned}</strong></div>
            </div>
            <button onclick="claimVictoryAndBackToHub()" style="
                width:100%;padding:10px 14px;font-family:'VT323',monospace;font-size:22px;cursor:pointer;
            ">
                Quay về Hub
            </button>
        </div>
    `;

    modal.style.display = "flex";
}

function claimVictoryAndBackToHub() {
    const modal = document.getElementById("victory-modal");
    if (modal) modal.style.display = "none";
    saveGameProgress();
    backToHub();
}

function afterPlayerAction() {
    const hasBurning = activeEnemies.some(e => e.hp > 0 && e.status.burnStacks > 0);
    if (hasBurning) {
        triggerBurnOnEnemies();
    }

    const allDefeated = activeEnemies.every(e => e.hp <= 0);
    if (allDefeated) {
        const wasDuo = activeEnemies.length > 1;
        const hasBoss = activeEnemies.some(e => e.isBoss);
        const hasElite = activeEnemies.some(e => e.isElite);
        const bonusRankGold = hasBoss ? 140 : (hasElite ? 60 : 0);
        const bonusRankExp = hasBoss ? 65 : (hasElite ? 25 : 0);

        const baseGold = 150 + (currentFloor - 1) * 40 + (wasDuo ? 100 : 0) + bonusRankGold;
        const baseExp = 65 + (currentFloor - 1) * 20 + (wasDuo ? 45 : 0) + bonusRankExp;

        playerGold += baseGold;
        saveGameProgress();
        gainRunExp(baseExp);
        renderHubLoadout();

        if (currentStage >= STAGES_PER_FLOOR) {
            if (pendingLevelUps > 0) {
                pendingAfterEnemyAction = false;
                openLevelUpModal();
                return;
            }
            openVictoryModal(baseGold, baseExp);
            return;
        }

        currentStage += 1;
        selectedEnemyIndex = 0;
        activeEnemies = spawnFloorStageEnemies(currentFloor, currentStage);
        closeEnemyDetailPopup();
        renderEnemyHUD();

        if (pendingLevelUps > 0) {
            pendingAfterEnemyAction = false;
            openLevelUpModal();
            return;
        }

        setPlayerTurnState(true);
        return;
    }

    if (activeEnemies[selectedEnemyIndex] && activeEnemies[selectedEnemyIndex].hp <= 0) {
        const nextAlive = activeEnemies.findIndex(e => e.hp > 0);
        if (nextAlive !== -1) selectedEnemyIndex = nextAlive;
        renderEnemyHUD();
    }

    if (pendingLevelUps > 0) {
        pendingAfterEnemyAction = true;
        openLevelUpModal();
        return;
    }

    resumeAfterPlayerAction();
}

function resolveSingleEnemyTurn(enemy, playerDef, playerEl) {
    let rawPower = enemy.atk || 12;
    let usedUlt = false;

    if (enemy.isBoss && enemy.ult) {
        const maxE = enemy.ult.maxEnergy || 3;
        enemy.energy = (enemy.energy || 0) + 1;
        if (enemy.energy >= maxE) {
            usedUlt = true;
            enemy.energy = 0;
            rawPower = rawPower * (enemy.ult.dmgMultiplier || 1.9);
            spawnStatusPopup(`💥 ${enemy.name.toUpperCase()} DÙNG NỘ!`, "#fde047", 68, 52);
        }
    }

    if (enemy.id === "rat_boxing") {
        rawPower *= 1.2;
    }

    const enemySuperEffective = Boolean((enemy.isElite || enemy.isBoss || usedUlt) && enemy.element && isAdvantage(enemy.element, playerEl));
    if (enemySuperEffective) {
        rawPower = rawPower * getAdvantageMultiplierForPair(enemy.element, playerEl, 0);
    }

    let critChance = 0;
    if (enemy.id === "rat_kiem_si" || enemy.id === "rat_may_tinh") critChance = 15;
    if (enemy.id === "rat_star_war") critChance = 40;
    if (enemy.id === "rat_gangster") critChance = 40;

    let isCrit = false;
    if (critChance > 0 && Math.random() * 100 < critChance) {
        isCrit = true;
        rawPower *= CRIT_MULTIPLIER;
    }

    const dmg = applyDefReduction(rawPower, playerDef);

    if (usedUlt && enemy.ult.effect && Math.random() * 100 < (enemy.ult.effectChance || 85)) {
        if (enemy.ult.effect === "knockup") {
            enemy.status.knockedUp = true;
            spawnStatusPopup("💨 HẤT TUNG", "#e2e8f0", 35, 43);
        } else if (enemy.ult.effect === "burn") {
            spawnStatusPopup("🔥 THIÊU ĐỐT", "#fb923c", 35, 43);
        }
    } else if (enemy.passive) {
        if (enemy.id === "rat_bach" && Math.random() * 100 < 15) {
            playerStatus.chilled = true;
            spawnStatusPopup("❄️ TÊ TÁI", "#38bdf8", 35, 43);
        } else if (enemy.id === "rat_helicopter" && Math.random() * 100 < 15) {
            enemy.status.knockedUp = true;
            spawnStatusPopup("💨 HẤT TUNG", "#e2e8f0", 75, 43);
        } else if (enemy.id === "rat_boxing" && Math.random() * 100 < 35) {
            if (Math.random() < 0.5) {
                enemy.status.knockedUp = true;
                spawnStatusPopup("💨 HẤT TUNG", "#e2e8f0", 75, 43);
            } else {
                spawnStatusPopup("🔥 ĐẤM CHÁY RÁT", "#fb923c", 35, 43);
            }
        } else if (enemy.id === "rat_star_war" && Math.random() * 100 < 40) {
            playerStatus.chilled = true;
            spawnStatusPopup("❄️ HÀN QUANG TÊ TÁI", "#38bdf8", 35, 43);
        } else if (enemy.id === "rat_beo_i" && Math.random() * 100 < 35) {
            enemy.status.knockedUp = true;
            spawnStatusPopup("💨 ĐÈ HẤT TUNG", "#e2e8f0", 75, 43);
        } else if (enemy.id === "rat_gangster" && Math.random() * 100 < 35) {
            spawnStatusPopup("🔥 ĐẠN THIÊU ĐỐT", "#fb923c", 35, 43);
        }
    }

    return {
        dmg,
        isSuperEffective: enemySuperEffective,
        isCrit
    };
}

function resumeAfterPlayerAction() {
    setTimeout(() => {
        const aliveEnemies = activeEnemies.filter(e => e.hp > 0);
        const stats = getEffectivePlayerStats();
        let totalDmgTaken = 0;
        let anySuperEffective = false;
        let anyCrit = false;

        for (const enemy of aliveEnemies) {
            if (enemy.status.knockedUp) {
                enemy.status.knockedUp = false;
                continue;
            }

            const turnRes = resolveSingleEnemyTurn(enemy, stats.def, stats.element);
            totalDmgTaken += turnRes.dmg;
            if (turnRes.isSuperEffective) anySuperEffective = true;
            if (turnRes.isCrit) anyCrit = true;
        }

        if (totalDmgTaken > 0 && (playerStatus.lightShieldReduction || 0) > 0) {
            totalDmgTaken = Math.max(1, Math.round(totalDmgTaken * (1 - playerStatus.lightShieldReduction)));
            playerStatus.lightShieldReduction = 0;
        }

        renderEnemyHUD();

        if (totalDmgTaken > 0) {
            playerStats.hp = Math.max(0, playerStats.hp - totalDmgTaken);
            const tagText = anySuperEffective && anyCrit
                ? `-${totalDmgTaken} KHẮC · CRIT!`
                : (anySuperEffective ? `-${totalDmgTaken} KHẮC` : (anyCrit ? `-${totalDmgTaken} CRIT!` : null));
            spawnPlayerDamage(totalDmgTaken, tagText);
            renderPlayerHUD();
        }

        if (playerStats.hp <= 0) {
            alert(`${activeChar.name} đã gục ở Floor ${currentFloor} · Ải ${currentStage}! Quay về Hub chuẩn bị lại.`);
            resetRunProgression();
            playerStats.hp = stats.maxHp;
            playerEnergy = 0;
            resetPlayerStatus();
            renderPlayerHUD();
            setPlayerTurnState(true);
            backToHub();
            return;
        }

        setPlayerTurnState(true);
    }, 500);
}

// --- LƯU & TẢI TIẾN ĐỘ LOCALSTORAGE ---
const SAVE_STORAGE_KEY = "tieu_beo_adventure_save_v1";

function saveGameProgress() {
    try {
        const serializedChars = ownedChars.map(c => ({
            uid: c.uid,
            id: c.id,
            star: Math.min(MAX_STAR, Math.max(1, Number(c.star) || 1))
        }));

        const payload = {
            gold: playerGold,
            pate: playerPate,
            ownedWeapons: ownedWeapons,
            equippedWeaponUid: equippedWeapon ? equippedWeapon.uid : null,
            ownedChars: serializedChars,
            activeCharUid: activeChar ? activeChar.uid : null
        };
        localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
        console.warn("Không lưu được vào localStorage:", err);
    }
}

function loadGameProgress() {
    try {
        const raw = localStorage.getItem(SAVE_STORAGE_KEY);
        if (!raw) {
            ownedChars = [buildCharInstanceFromTemplate("c_01", 1, "init_uia")];
            activeChar = ownedChars[0];
            return;
        }

        const data = JSON.parse(raw);
        if (typeof data.gold === "number" && !Number.isNaN(data.gold)) {
            playerGold = data.gold;
        }
        if (typeof data.pate === "number" && !Number.isNaN(data.pate)) {
            playerPate = data.pate;
        }

        if (Array.isArray(data.ownedWeapons)) {
            ownedWeapons = data.ownedWeapons;
            equippedWeapon = ownedWeapons.find(w => w.uid === data.equippedWeaponUid) || null;
        }

        if (Array.isArray(data.ownedChars) && data.ownedChars.length > 0) {
            ownedChars = data.ownedChars.map(savedChar =>
                buildCharInstanceFromTemplate(savedChar.id, savedChar.star, savedChar.uid)
            );
            activeChar = ownedChars.find(c => c.uid === data.activeCharUid) || ownedChars[0];
            saveGameProgress();
        } else {
            ownedChars = [buildCharInstanceFromTemplate("c_01", 1, "init_uia")];
            activeChar = ownedChars[0];
        }
    } catch (err) {
        console.warn("Không đọc được dữ liệu lưu từ localStorage:", err);
    }
}

// --- TỰ ĐỘNG DÒ TÌM & NẠP 5 ICON HUB (GỐC + THƯ MỤC CON + .PNG/.JPG) ---
function initHubIcons() {
    const iconConfigs = [
        { id: "icon-gold",  stems: ["vàng_2", "vang_2", "vàng", "vang"] },
        { id: "icon-pate",  stems: ["pate_2", "pate"] },
        { id: "icon-cat",   stems: ["mèo_2", "meo_2", "mèo", "meo"] },
        { id: "icon-equip", stems: ["trang bị_2", "trang bi_2", "trang_bi_2", "trang bị", "trang bi"] },
        { id: "icon-shop",  stems: ["shop_2", "shop"] }
    ];

    const dirs = [".", "tiêu béo adventure", "images", "img", "assets"];
    const exts = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

    iconConfigs.forEach(cfg => {
        const imgEl = document.getElementById(cfg.id);
        if (!imgEl) return;
        const candidates = buildAssetCandidates(dirs, cfg.stems, exts);
        attachImageWithFallback(imgEl, candidates, "");
    });
}

// Khởi tạo ban đầu
loadGameProgress();
initHubIcons();
renderHubLoadout();
syncPlayerWithActiveChar(true);
renderEnemyHUD();
updateCombatHUD();
renderExpHUD();
setPlayerTurnState(true);
openStoryIntro();