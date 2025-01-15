// Oyun durumu
let gameState = {
  player1Wins: 0,
  player2Wins: 0,
  roundCount: 0
};

// Zar atma animasyonu
function rollDice(diceElement) {
  diceElement.style.animation = 'none';
  diceElement.offsetHeight; // Reflow
  diceElement.style.animation = 'rollDice 1s ease-out';
}

// Oyunu başlat
function playGame() {
  // Eğer bir oyuncu 3 skora ulaştıysa oyunu bitir
  if (gameState.player1Wins >= 3 || gameState.player2Wins >= 3) {
      announceWinner();
      return;
  }
  
  gameState.roundCount++;
  
  // Zarları at
  let randomNumber1 = Math.floor(Math.random() * 6) + 1;
  let randomNumber2 = Math.floor(Math.random() * 6) + 1;
  
  // Zar görsellerini güncelle ve animasyonu başlat
  const dice1 = document.querySelector(".img1");
  const dice2 = document.querySelector(".img2");
  
  rollDice(dice1);
  rollDice(dice2);
  
  setTimeout(() => {
      dice1.setAttribute("src", `images/${randomNumber1}.png`);
      dice2.setAttribute("src", `images/${randomNumber2}.png`);
      
      // Kazananı belirle
      if (randomNumber1 > randomNumber2) {
          document.querySelector("h1").innerHTML = "Bu turu Oyuncu 1 kazandı! ";
          document.querySelector(".player1").style.color = "green";
          document.querySelector(".player2").style.color = "white";
          gameState.player1Wins++;
          if (gameState.player1Wins >= 3) {
              setTimeout(announceWinner, 1000);
          }
      } else if (randomNumber1 < randomNumber2) {
          document.querySelector("h1").innerHTML = "Bu turu Oyuncu 2 kazandı! ";
          document.querySelector(".player2").style.color = "green";
          document.querySelector(".player1").style.color = "white";
          gameState.player2Wins++;
          if (gameState.player2Wins >= 3) {
              setTimeout(announceWinner, 1000);
          }
      } else {
          document.querySelector("h1").innerHTML = " Bu tur berabere! 🤝";
          document.querySelector(".player1").style.color = "white";
          document.querySelector(".player2").style.color = "white";
      }
      
      // Skor göstergelerini güncelle
      updateScores();
  }, 1000);
}

// Skorları güncelle
function updateScores() {
  document.querySelector(".player1").innerHTML = `Oyuncu 1<br>Skor: ${gameState.player1Wins}`;
  document.querySelector(".player2").innerHTML = `Oyuncu 2<br>Skor: ${gameState.player2Wins}`;
}

// Final kazananını belirle
function announceWinner() {
  let message;
  if (gameState.player1Wins >= 3) {
      message = "🎉 Oyuncu 1 Oyunu Kazandı! 🎉";
  } else if (gameState.player2Wins >= 3) {
      message = "🎉 Oyuncu 2 Oyunu Kazandı! 🎉";
  }
  document.querySelector("h1").innerHTML = message;
}

// İlk skorları göster
updateScores();
