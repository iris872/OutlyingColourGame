//reference "logarithmicDifficulty" for difficulty calculations

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
  let logatrithmicDiffuculty = ((7 * Math.log(currentScore + 2) * 3) / 1000).toFixed(3);
    console.log(logatrithmicDiffuculty)
  // 7 is used to multiply the strength of the log, the +2 is to avoid -Infinity and 0, the 1000 brings it to a viable decimal point
  // and the 4 is to make the values align with my already established values such as at 100 the offset of the color becomes 0.15 - 0.129* (very hard to see) *(currentScore = 100)

  let r = Math.floor(Math.random() * 225 + 30);
  let g = Math.floor(Math.random() * 225 + 30);
  let b = Math.floor(Math.random() * 225 + 30);
  let a = parseFloat(Math.random() * 0.6 + 0.2).toFixed(3); // this number should never exceed .8 and never be less than .2
  let currentOffset = 0.15 - logatrithmicDiffuculty; // this number should never exceed .1 and should gradually decrease over time
  let correctColor = `rgba(${r}, ${g}, ${b}, ${a})`;

  let outlyingAlpha =
    Math.random() * 2 === 1
      ? parseFloat(a) - parseFloat(currentOffset)
      : parseFloat(a) + parseFloat(currentOffset);

  let outlyingColor = `rgba(${r}, ${g}, ${b}, ${outlyingAlpha})`;
  console.log("Correct Colour: " + outlyingColor);
  console.log("Incorrect Colour " + correctColor);

  return [correctColor, outlyingColor];
}
