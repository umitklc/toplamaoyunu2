let level = 1;  // Başlangıç seviyesi
let currentNumbers = [];  // Ekranda görünen sayılar
let currentSum = 0;  // Sayıların toplamı
let gameInterval;  // Sayıların ekrana eklenmesini sağlayacak interval
let gameSpeed = 1000;  // Başlangıçta sayılar arasındaki süre (ms)
let numbersAdded = 0;  // Eklenen sayıların sayısı

document.getElementById("check-button").addEventListener("click", checkAnswer);
document.getElementById("user-answer").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

document.getElementById("start-button").addEventListener("click", startGame);  // Başla butonuna tıklanınca oyunu başlat

function startGame() {
    // Başla butonunu gizle
    document.getElementById("start-button").style.display = "none";
    
    // Oyun başlatıldığında sayılar ekranda görünsün
    updateLevel();  // Başlangıç seviyesini güncelle
    gameInterval = setInterval(addNumber, gameSpeed);  // Sayı eklemek için interval başlat
}

function addNumber() {
    // Eğer sayılar 10'u geçtiyse, oyun durur
    if (numbersAdded >= 10) {
        clearInterval(gameInterval);  // Sayıları durdur
        return;  // Sayılar durduktan sonra fonksiyonu sonlandır
    }
    
    const randomNumber = Math.floor(Math.random() * 10) + 1;  // 1-10 arasında rastgele sayı
    currentNumbers.push(randomNumber);
    currentSum += randomNumber;  // Toplamı güncelle
    numbersAdded++;  // Eklenen sayı sayısını artır
    
    document.getElementById("number-screen").textContent = currentNumbers.join(" + ");  // Sayıları ekranda göster
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("user-answer").value);
    
    if (userAnswer === currentSum) {
        document.getElementById("message").textContent = "Doğru Cevap! Seviye " + (level + 1) + "'e geçiyorsunuz!";
        level++;  // Seviyeyi artır
        clearInterval(gameInterval);  // Sayı eklemeyi durdur
        setTimeout(startGame, 1000);  // Yeni seviyeye geçtikten sonra oyun başlat
        resetGame();
    } else {
        document.getElementById("message").textContent = "Yanlış Cevap, doğru cevap: " + currentSum;
    }
}

function updateLevel() {
    document.getElementById("level").textContent = `Seviye: ${level}`;
    gameSpeed = Math.max(800, 1000 - level * 100);  // Zorluk arttıkça hız artar, 500ms'den daha az olamaz
}

function resetGame() {
    currentNumbers = [];
    currentSum = 0;
    numbersAdded = 0;  // Sayı sayısını sıfırla
    document.getElementById("user-answer").value = "";
    document.getElementById("number-screen").textContent = "";
    document.getElementById("message").textContent = "";
}
