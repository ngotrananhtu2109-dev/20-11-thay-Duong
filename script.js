const giftScreen = document.getElementById('gift-screen');
const cardScreen = document.getElementById('card-screen');
const wishText = document.getElementById('wish-text');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const confettiBtn = document.getElementById('confetti-btn');

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const pitchBox = document.getElementById('pitch-box');
const dealSuccess = document.getElementById('deal-success');

const openCardsBtn = document.getElementById('open-cards-btn');
const tarotBox = document.getElementById('tarot-box');

const message = "Nhân ngày Nhà giáo Việt Nam 20/11, em xin gửi lời tri ân sâu sắc nhất tới thầy Dương. Cảm ơn thầy đã không chỉ truyền đạt kiến thức mà còn trang bị cho chúng em những kỹ năng thực tế và tư duy khởi nghiệp đầy bản lĩnh. Kính chúc thầy luôn dồi dào sức khỏe, giữ mãi ngọn lửa nhiệt huyết để tiếp tục truyền cảm hứng và ươm mầm cho thật nhiều thế hệ sinh viên thành công!";

let isPlaying = false;
let typingTimer;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = "AUDIO: OFF [🔇]";
    } else {
        bgMusic.play().catch(() => {});
        musicBtn.textContent = "AUDIO: LIVE [🔊]";
    }
    isPlaying = !isPlaying;
}
musicBtn.addEventListener('click', toggleMusic);

function fireConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ffcc', '#ff3333', '#ffa502', '#ffffff']
    });
}

function typeWriter(text, index = 0) {
    if (index === 0) {
        clearTimeout(typingTimer);
        wishText.textContent = "";
    }
    if (index < text.length) {
        wishText.textContent += text.charAt(index);
        typingTimer = setTimeout(() => typeWriter(text, index + 1), 25);
    }
}

giftScreen.addEventListener('click', () => {
    giftScreen.classList.add('hidden');
    cardScreen.classList.remove('hidden');
    
    if (!isPlaying) {
        toggleMusic();
    }
    
    fireConfetti();
    typeWriter(message);
});

const funnyTexts = [
    "SYSTEM ERROR: 404",
    "QUYỀN TRUY CẬP BỊ TỪ CHỐI",
    "BẤM NÚT XANH ĐI THẦY ƠI 👉",
    "CẢNH BÁO: LỖI HỆ THỐNG",
    "KHÔNG THỂ BẤM NÚT NÀY 🤖",
    "CHỐT ĐƠN BÊN KIA NÀO 🚀"
];

let yesScale = 1;

function moveNoButton(e) {
    if (e) e.preventDefault();

    const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
    noBtn.textContent = randomText;

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    yesScale = Math.min(yesScale + 0.08, 1.35);
    yesBtn.style.transform = `scale(${yesScale})`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

yesBtn.addEventListener('click', () => {
    pitchBox.classList.add('hidden');
    noBtn.classList.add('hidden');
    dealSuccess.classList.remove('hidden');
    
    fireConfetti();
    setTimeout(fireConfetti, 400);
});

confettiBtn.addEventListener('click', fireConfetti);

openCardsBtn.addEventListener('click', () => {
    tarotBox.classList.remove('hidden');
    openCardsBtn.classList.add('hidden');
});

function flipCard(cardElement) {
    if (!cardElement.classList.contains('flipped')) {
        cardElement.classList.add('flipped');
        confetti({
            particleCount: 45,
            spread: 50,
            origin: { y: 0.7 }
        });
    }
}