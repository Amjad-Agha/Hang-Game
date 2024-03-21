// Generate the letters
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

let letters = document.querySelector(".letters");

alphabet.forEach((ele) =>{
  let span = document.createElement("span");
  span.append(ele);
  span.className = "letter-box"
  letters.append(span);
})

let span = document.querySelectorAll(".letters span");

// Object Of Words plus Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
// get random property
let keys =  Object.keys(words);
// get random category
let randomKeyIndex = Math.floor(Math.random() * keys.length);
let randomKeyValue = keys[randomKeyIndex];
// get random category words
let randomPropertyIndex = Math.floor(Math.random() * words[randomKeyValue].length);
let randomPropertyValue = words[randomKeyValue][randomPropertyIndex];
// set category info
document.querySelector(".category span").innerHTML = randomKeyValue;

// generate letters guess box
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomPropertyValue);

lettersAndSpace.forEach((ele) => {
  let emptySpan = document.createElement("span");
  lettersGuessContainer.append(emptySpan);
  if (ele === " ") {
    emptySpan.className = "with-space";
  }
})

// compare the clicked letters with chosen word letters
let wrongAttemps = 0;
let s = 0;
document.addEventListener("click",(ele) =>{
  let theLetterStatus = false;
  if(ele.target.className == "letter-box") {
    ele.target.classList.add("clicked");

    let theClickedLetter = ele.target.innerHTML.toLowerCase();
    lettersAndSpace.forEach((wordLetter,index) =>{
      if (theClickedLetter == wordLetter.toLowerCase()) {
        theLetterStatus = true;
        document.querySelectorAll(".letters-guess span")[index].innerHTML = wordLetter;
        document.getElementById("success").play();
        ++s;
        s == randomPropertyValue.length ? winGame():"";
      }
    });

    if(theLetterStatus == false) {
      ++wrongAttemps;
      document.querySelector(".hangman-draw").classList.add(`wrong-${wrongAttemps}`);
      document.getElementById("fail").play();
      if(wrongAttemps == 7) {
        endGame()
      }
    }
  }

});

// end game 
function endGame() {
  let div = document.createElement("div");
  div.className = "end-game"
  let divText = `Game Over, The Word Is: ${randomPropertyValue}`
  div.append(divText);
  document.body.append(div);
  letters.classList.add("finished");
  
}
// win game
function winGame() {
  let div = document.createElement("div");
  div.className = "end-game";
  let level = "";
  wrongAttemps <= 2 ? level = "Advanced":wrongAttemps <= 5 ? level = "Intermediat" :  level = "Beginner";
  let divText = `Congratulations, You Have ${wrongAttemps} failure, You Are ${level}`;
  div.append(divText);
  document.body.append(div);
  letters.classList.add("finished");
}
