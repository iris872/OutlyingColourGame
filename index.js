document.addEventListener("DOMContentLoaded", function () {
  const squares = document.querySelectorAll(".square");

  beginNewRound(squares);

  squares.forEach(function (square) {
    square.addEventListener("click", function () {
      if (square.classList.contains("correct-square")) {
        let currentScoreElement = document.querySelector(".current-score");
        let currentScore = parseInt(
          currentScoreElement.innerHTML.split(" ")[1]
        );

        currentScoreElement.innerHTML = `Score: ${currentScore + 1}`;
        beginNewRound(squares);
      } else {
        let currentScoreElement = document.querySelector(".current-score");
        let currentScore = parseInt(
          currentScoreElement.innerHTML.split(" ")[1]
        );

        let bestScoreElement = document.querySelector(".best-score");
        let bestScore = parseInt(bestScoreElement.innerHTML.split(" ")[1]);

        if (currentScore > bestScore) {
          bestScoreElement.innerHTML = `Best: ${currentScore}`;
        }
        currentScoreElement.innerHTML = `Score: 0`;
        beginNewRound(squares);
      }
    });
  });
});

function beginNewRound(squares) {
  let colorArray = colorChoice();
  squares.forEach(function (square) {
    square.style.backgroundColor = colorArray[0];
    square.classList.remove("correct-square");
  });

  const differentSquareIndex = Math.floor(Math.random() * squares.length);
  squares[differentSquareIndex].classList.add("correct-square");
  squares[differentSquareIndex].style.backgroundColor = colorArray[1];
}

function colorChoice() {
  let currentScoreElement = document.querySelector(".current-score");
  let currentScore = parseInt(currentScoreElement.innerHTML.split(" ")[1]);
  let currentOffset = parseFloat(Math.random() * 0.5) + (0.1 - (currentScore / 1000));

  let r = Math.floor((Math.random() * 235) + 20);
  let g = Math.floor((Math.random() * 235) + 20);
  let b = Math.floor((Math.random() * 235) + 20);
  let a = parseFloat((Math.random() * 0.6).toFixed(3)) + 0.2;

  let correctColor = `rgba(${r}, ${g}, ${b}, ${a})`;

  let outlyingAlpha = Math.random() * 2 === 1 ? parseFloat(a) - parseFloat(currentOffset) : parseFloat(a) + parseFloat(currentOffset);

  outlyingAlpha > 1 ? outlyingAlpha = 1 : outlyingAlpha = outlyingAlpha;

  let outlyingColor = `rgba(${r}, ${g}, ${b}, ${outlyingAlpha})`;
  console.log("Correct Colour: " + outlyingColor)
  console.log("Incorrect Colour " +correctColor)

  return [correctColor, outlyingColor];
}
