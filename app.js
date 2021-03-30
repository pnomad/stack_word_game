const wordInput = document.querySelector(".word-input");
const button = document.querySelector(".word-button");
const time = document.querySelector(".time");
const monitor = document.querySelector(".monitor");
const stack = document.querySelector(".stack");

const GAME_TIME=10;

let count=GAME_TIME;
let isPlaying=false;
let word;
let timeInterval;
let checkInterval;
let firstWord;

init();

function init(){
    buttonChange('start')
}

button.addEventListener('click', run);

function run(){
    if(isPlaying){
        return;
    }
    isPlaying=true;
    wordInput.value='';
    stack.innerHTML='';
    count = GAME_TIME;
    getWords();
    wordInput.focus();
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50)
    buttonChange("doing");
}

wordInput.addEventListener("keypress",(event)=>{
    if(button.innerText==="start"){
        return;
    }
    if(button.innerText==="loading"){
        return;
    }
    if(event.keyCode===13){
        checkWord();
        wordInput.value="";
    }
    checkStatus();
})

function checkStatus(){
    if(!isPlaying&& count === 0){
        buttonChange("start");
        clearInterval(checkInterval);
    }
}


function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=1')
  .then(function (response) {
    firstWord=response.data[0];
    makeBlock(firstWord);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
  console.log(firstWord)
}

function buttonChange(text){
    button.innerText=text;
    text==="start"?button.classList.remove("loading") : button.classList.add("loading");
}

function checkWord(){
    const before=stack.lastElementChild;
    const last=before.innerText.slice(-1);

    if(last===wordInput.value[0]){ 
        makeBlock(wordInput.value);
    }
    return;
}

function makeBlock(text){
    const div=document.createElement("div");
    
    div.classList.add("stack-word");
    div.innerText=text;
    stack.append(div);
}

function countDown(){
    count > 0 ? count-- : isPlaying=false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    time.innerText=count;
}

