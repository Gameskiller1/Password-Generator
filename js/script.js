
// =============================================
// TRANSLATIONS
// =============================================
const i18n = {
    en: {
        title: "Password Generator",
        tabPassword: "Password",
        tabPassphrase: "Passphrase",
        length: "Password Length",
        count: "Count",
        wordCount: "Word Count",
        separator: "Separator",
        lowercase: "Lowercase (a-z)",
        uppercase: "Uppercase (A-Z)",
        numbers: "Numbers (0-9)",
        symbols: "Symbols (!@#$...)",
        excludeSimilar: "Exclude similar (0O, 1lI)",
        capitalize: "Capitalize words",
        generate: "Generate!",
        placeholder: "Press The Button...",
        noChars: "Select at least one option!",
        strengthUnrecommended: "Unrecommended",
        strengthReallyWeak: "Really Weak",
        strengthWeak: "Weak",
        strengthFair: "Fair",
        strengthGood: "Good",
        strengthVeryGood: "Very Good",
        strengthStrong: "Strong",
        strengthSuperStrong: "Super Strong",
    },
    ru: {
        title: "Генератор паролей",
        tabPassword: "Пароль",
        tabPassphrase: "Фраза",
        length: "Длина пароля",
        count: "Количество",
        wordCount: "Количество слов",
        separator: "Разделитель",
        lowercase: "Строчные (a-z)",
        uppercase: "Заглавные (A-Z)",
        numbers: "Цифры (0-9)",
        symbols: "Символы (!@#$...)",
        excludeSimilar: "Исключить похожие (0O, 1lI)",
        capitalize: "Заглавные буквы",
        generate: "Генерировать!",
        placeholder: "Нажми кнопку...",
        noChars: "Выбери хотя бы один вариант!",
        strengthUnrecommended: "Не рекомендуется",
        strengthReallyWeak: "Очень слабый",
        strengthWeak: "Слабый",
        strengthFair: "Средний",
        strengthGood: "Хороший",
        strengthVeryGood: "Очень хороший",
        strengthStrong: "Сильный",
        strengthSuperStrong: "Супер сильный",
    }
}

let currentLang = "en"

function applyLang(lang) {
    currentLang = lang
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n
        if (i18n[lang][key]) el.textContent = i18n[lang][key]
    })
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang)
    })

    // Reset placeholders
    const pd = document.getElementById("password-display")
    const pp = document.getElementById("passphrase-display")
    if (pd.textContent === i18n["en"].placeholder || pd.textContent === i18n["ru"].placeholder) {
        pd.textContent = i18n[lang].placeholder
    }
    if (pp.textContent === i18n["en"].placeholder || pp.textContent === i18n["ru"].placeholder) {
        pp.textContent = i18n[lang].placeholder
    }
}

document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang))
})


// =============================================
// CHARACTER SETS
// =============================================
const CHARS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers:   "0123456789",
    symbols:   "!@#$%^&*()_+-=[]{}|;:,.<>?"
}

const SIMILAR = /[0O1lI]/g


// =============================================
// ELEMENTS
// =============================================
const passwordDisplay = document.getElementById("password-display")
const generateBtn     = document.getElementById("generate-btn")
const lengthSlider    = document.getElementById("length-slider")
const lengthValue     = document.getElementById("length-value")
const countSlider     = document.getElementById("count-slider")
const countValue      = document.getElementById("count-value")
const multiOutput     = document.getElementById("multi-output")
const strengthFill    = document.getElementById("strength-fill")
const strengthLabel   = document.getElementById("strength-label")
const excludeSimilar  = document.getElementById("exclude-similar")

const checkboxes = {
    lowercase: document.getElementById("lowercase"),
    uppercase: document.getElementById("uppercase"),
    numbers:   document.getElementById("numbers"),
    symbols:   document.getElementById("symbols")
}

// Passphrase elements
const passphraseDisplay = document.getElementById("passphrase-display")
const generatePpBtn     = document.getElementById("generate-pp-btn")
const wordCountSlider   = document.getElementById("word-count-slider")
const wordCountValue    = document.getElementById("word-count-value")
const ppCapitalize      = document.getElementById("pp-capitalize")
const strengthFillPp    = document.getElementById("strength-fill-pp")
const strengthLabelPp   = document.getElementById("strength-label-pp")

let currentSeparator = "-"


// =============================================
// SLIDERS
// =============================================
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value
})

countSlider.addEventListener("input", () => {
    const val = parseInt(countSlider.value)
    countValue.textContent = val

    // Hide main display and strength if count > 1
    passwordDisplay.parentElement.style.display = val > 1 ? "none" : "flex"
    document.querySelector(".strength-bar-wrap").style.display = val > 1 ? "none" : "flex"
})

wordCountSlider.addEventListener("input", () => {
    wordCountValue.textContent = wordCountSlider.value
})


// =============================================
// TABS
// =============================================
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"))
        btn.classList.add("active")

        const tab = btn.dataset.tab
        document.getElementById("tab-password").classList.toggle("hidden", tab !== "password")
        document.getElementById("tab-passphrase").classList.toggle("hidden", tab !== "passphrase")
    })
})


// =============================================
// SEPARATOR BUTTONS
// =============================================
document.querySelectorAll(".sep-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".sep-btn").forEach(b => b.classList.remove("active"))
        btn.classList.add("active")
        currentSeparator = btn.dataset.sep
    })
})


// =============================================
// COPY BUTTONS
// =============================================
document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.dataset.target
        const text = document.getElementById(targetId).textContent
        const placeholders = [i18n.en.placeholder, i18n.ru.placeholder, i18n.en.noChars, i18n.ru.noChars]
        if (placeholders.includes(text)) return

        navigator.clipboard.writeText(text).then(() => {
            btn.textContent = "✅"
            setTimeout(() => { btn.textContent = "📋" }, 1500)
        })
    })
})

function makeCopyBtn(text) {
    const btn = document.createElement("button")
    btn.textContent = "📋"
    btn.addEventListener("click", () => {
        navigator.clipboard.writeText(text).then(() => {
            btn.textContent = "✅"
            setTimeout(() => { btn.textContent = "📋" }, 1500)
        })
    })
    return btn
}


// =============================================
// STRENGTH CALCULATOR
// =============================================
function calcStrength(password) {
    if (!password) return 0

    const len = password.length
    let score = 1 // minimum — Unrecommended if password exists

    // Length — main factor (up to +5)
    if (len >= 6)  score++ // Really Weak → Weak
    if (len >= 8)  score++ // Weak → Fair
    if (len >= 10) score++ // Fair → Good
    if (len >= 14) score++ // Good → Very Good
    if (len >= 20) score++ // Very Good → Strong

    // Variety — bonus ONLY if length >= 6 (up to +2)
    if (len >= 6) {
        let variety = 0
        if (/[a-z]/.test(password)) variety++
        if (/[A-Z]/.test(password)) variety++
        if (/[0-9]/.test(password)) variety++
        if (/[^a-zA-Z0-9]/.test(password)) variety++
        if (variety >= 2) score++ // at least 2 types
        if (variety >= 4) score++ // all 4 types
    }

    return Math.min(score, 8)
}


function renderStrength(score, fillEl, labelEl) {
    const levels = [
        { pct: "0%",      color: "transparent", key: "" },
        { pct: "12.5%",   color: "#cc0000",     key: "strengthUnrecommended" }, // deep red
        { pct: "25%",     color: "#e94560",     key: "strengthReallyWeak" },    // red-pink
        { pct: "37.5%",   color: "#ff6b35",     key: "strengthWeak" },          // orange-red
        { pct: "50%",     color: "#f0a500",     key: "strengthFair" },          // amber
        { pct: "62.5%",   color: "#ffd700",     key: "strengthGood" },          // yellow
        { pct: "75%",     color: "#4fc3f7",     key: "strengthVeryGood" },      // sky blue
        { pct: "87.5%",   color: "#4caf50",     key: "strengthStrong" },        // green
        { pct: "100%",    color: "#00e676",     key: "strengthSuperStrong" },   // bright green
    ]
    const level = levels[score] || levels[0]
    fillEl.style.width = level.pct
    fillEl.style.backgroundColor = level.color
    labelEl.textContent = level.key ? i18n[currentLang][level.key] : ""
    labelEl.style.color = level.color
}


// =============================================
// PASSWORD GENERATION
// =============================================
function buildCharset() {
    let chars = ""
    for (const [key, cb] of Object.entries(checkboxes)) {
        if (cb.checked) chars += CHARS[key]
    }
    if (excludeSimilar.checked) {
        chars = chars.replace(SIMILAR, "")
    }
    return chars
}

function generateOne(chars, length) {
    let password = ""
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
}

generateBtn.addEventListener("click", () => {
    const chars = buildCharset()

    if (chars === "") {
        passwordDisplay.parentElement.style.display = "flex"
        passwordDisplay.textContent = i18n[currentLang].noChars
        multiOutput.innerHTML = ""
        renderStrength(0, strengthFill, strengthLabel)
        return
    }

    const length = parseInt(lengthSlider.value)
    const count  = parseInt(countSlider.value)

    multiOutput.innerHTML = ""

    if (count === 1) {
        passwordDisplay.parentElement.style.display = "flex"
        document.querySelector(".strength-bar-wrap").style.display = "flex"

        const pw = generateOne(chars, length)
        passwordDisplay.textContent = pw
        renderStrength(calcStrength(pw), strengthFill, strengthLabel)
    } else {
        // Multiple passwords
        for (let i = 0; i < count; i++) {
            const pw = generateOne(chars, length)
            const item = document.createElement("div")
            item.className = "multi-item"

            const span = document.createElement("span")
            span.textContent = pw

            item.appendChild(span)
            item.appendChild(makeCopyBtn(pw))
            multiOutput.appendChild(item)
        }
    }
})


// =============================================
// PASSPHRASE GENERATION
// =============================================

// A small built-in word list (English + Russian)
const WORDS = {
    en: ["apple","bridge","castle","dragon","eagle","forest","garden","harbor",
         "island","jungle","knight","lemon","marble","needle","ocean","palace",
         "quartz","river","silver","thunder","umbrella","violet","walnut","xenon",
         "yellow","zebra","anchor","butter","candle","desert","engine","falcon",
         "glacier","hammer","igloo","jasmine","kettle","lantern","magnet","nectar",
         "orbit","pepper","quantum","raven","spiral","timber","unicorn","velvet",
         "winter","xylophone","yonder","zephyr"],
    ru: ["яблоко","мост","замок","дракон","орёл","лес","сад","гавань",
         "остров","джунгли","рыцарь","лимон","мрамор","игла","океан","дворец",
         "кварц","река","серебро","гром","зонт","фиалка","грецкий","ксенон",
         "жёлтый","зебра","якорь","масло","свеча","пустыня","мотор","сокол",
         "ледник","молоток","иглу","жасмин","чайник","фонарь","магнит","нектар",
         "орбита","перец","квант","ворон","спираль","бревно","единорог","бархат",
         "зима","ксилофон","даль","зефир"]
}

generatePpBtn.addEventListener("click", () => {
    const count = parseInt(wordCountSlider.value)
    const sep   = currentSeparator
    const cap   = ppCapitalize.checked
    const wordList = WORDS[currentLang] || WORDS.en

    const words = []
    for (let i = 0; i < count; i++) {
        let word = wordList[Math.floor(Math.random() * wordList.length)]
        if (cap) word = word.charAt(0).toUpperCase() + word.slice(1)
        words.push(word)
    }

    const passphrase = words.join(sep)
    passphraseDisplay.textContent = passphrase

    // Strength based on word count
    const scoreMap = { 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 }
    renderStrength(scoreMap[count] || 2, strengthFillPp, strengthLabelPp)
})
