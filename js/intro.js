function updateIntroText() {
    const introTextSpan = document.getElementById('intro-text-span');
    if (window.innerWidth < 360) {
        introTextSpan.textContent = 'Викомп';
    } else {
        introTextSpan.textContent = 'ВикомпПлюс';
    }
}

updateIntroText();

window.addEventListener('resize', updateIntroText);
