
// --- Character sets ---
const CHARS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers:   "0123456789",
    symbols:   "!@#$%^&*()_+-=[]{}|;:,.<>?"
}

// --- Page elements ---
const passwordDisplay = document.getElementById("password-display")
const generateBtn     = document.getElementById("generate-btn")
const copyBtn         = document.querySelector(".copy-btn")
const lengthSlider    = document.getElementById("length-slider")
const lengthValue     = document.getElementById("length-value")

const checkboxes = {
    lowercase: document.getElementById("lowercase"),
    uppercase: document.getElementById("uppercase"),
    numbers:   document.getElementById("numbers"),
    symbols:   document.getElementById("symbols")
}

// --- Slider: update the number in real time ---
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value
})

// --- Password generation ---
function generatePassword() {
    // Collect available characters based on checked checkboxes
    let availableChars = ""

    for (const [key, checkbox] of Object.entries(checkboxes)) {
        if (checkbox.checked) {
            availableChars += CHARS[key]
        }
    }

    // If no checkbox is selected — warn the user
    if (availableChars === "") {
        passwordDisplay.textContent = "Select at least one option!"
        return
    }

    const length = parseInt(lengthSlider.value)
    let password = ""

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length)
        password += availableChars[randomIndex]
    }

    passwordDisplay.textContent = password
}

// --- Copy to clipboard ---
copyBtn.addEventListener("click", () => {
    const text = passwordDisplay.textContent

    // Don't copy if password hasn't been generated yet
    if (text === "Press The Button..." || text === "Select at least one option!") return

    navigator.clipboard.writeText(text).then(() => {
        // Temporarily change the icon to give visual feedback
        copyBtn.textContent = "✅"
        setTimeout(() => { copyBtn.textContent = "📋" }, 1500)
    })
})

// --- Generate button ---
generateBtn.addEventListener("click", generatePassword)
