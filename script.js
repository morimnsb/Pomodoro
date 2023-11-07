//Variables
var session ={
  workTime: 1,
  breakTime: 1,
};

var workSet = document.querySelector(".workSet");
var breakSet = document.querySelector(".breakSet");
var container = document.querySelector(".container");
var Screen = document.querySelector(".screen");

var CycleNum = document.querySelector(".Cycle");

var startBtn = document.querySelector(".startBtn");
var resetBtn = document.querySelector(".resetBtn");
var timerElement = document.querySelector('.timer');
var timer;
//default values
var cycleCounter = 0;  
var step = false;   
var isToggled = false;  
var counter = 0;
var run = false;
Screen.textContent = `work ${session.workTime}min  break  ${session.breakTime}min`;

const setSession = session =>{ 

     Screen.textContent =  `Work ${session.workTime} Min Break ${session.breakTime} Min`;
  }

const startTimer= (min) => {
  if (run) {
    manageTime(min);
    container.classList.add("changeColor");
    timeLeft = min * 60;
    Screen.style.fontSize =" 70px"
    Screen.style.animationDuration = `${timeLeft}s`;
    second = timeLeft % 60
   
    Screen.textContent = `${remainedMinutes}: ${remainedSeconds}`;
    CycleNum.innerText = `Cycle ${cycleCounter}`;
    timer = setInterval(()=>{
        timeLeft--;
        if (timeLeft >= 0) {
          second = timeLeft % 60
          minute = Math.floor(timeLeft / 60) 
       
          Screen.textContent = `${minute}  : ${second}`;
        } else {
            clearInterval(timer);
            step = !step
            nextStep()
            
            container.classList.remove("changeColor");
        } 
    }, 1000);
  }
}

const nextStep= ()=>{
  counter ++
  if (step){
  startTimer(session.breakTime)
  }else{
    startTimer(session.workTime)  }
  
  if (counter % 2 == 0){
    cycleCounter ++
    CycleNum.innerText = `Cycle ${cycleCounter}`;
  }
}
const start= ()=>{
  run = true
  startTimer(session.workTime);

  startBtn.style.display = "none"
  resetBtn.style.display = "flex"
}

const reset= ()=>{
  startBtn.style.display = "flex"
  resetBtn.style.display = "none"
  run =false
  clearInterval(timer)
  cycleCounter = 0 ;
  CycleNum.innerText = `Cycle ${cycleCounter}`;
  Screen.classList.remove("changeColor");
  Screen.textContent = `${session.workTime}:00`
}
function manageTime (min){
  seconds = (min * 60) -1;
  remainedSeconds = seconds % 60
  remainedMinutes = Math.floor(seconds / 60) 
  return remainedMinutes, remainedSeconds  ;
}


const Volume = (click) =>{
  click = click.id
  if( run == false){
    if ((session.workTime > 0 && session.workTime <60) && (session.breakTime > 0 && session.breakTime <60 ) && (run== false)){
      Screen.style.fontSize = "20px"  
        if(click == "plus-w"){
          session.workTime++
        }else if(click == "min-w" && session.workTime > 1 ){
          session.workTime--
        }else if(click == "plus-b"){
          session.breakTime++
        }else if(click == "min-b" && session.breakTime > 1){
          session.breakTime--
        };
        
      }
      setSession(session)
}
}