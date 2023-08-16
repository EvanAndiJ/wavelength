//require('dotenv').config();
// let roundref =   //5 and 10 unnessary but haven't updated for without
//   `0   no game
//   1   t1 psychic chooses prompt
//   2   t1 psychic sets clue
//   3   t1 guesses target
//   4   t2 guesses over under
//   5   reveal target, update scores, change teams
//   6   t2 psychic chooses prompt
//   7   t2 psychic sets clue
//   8   t2 guesses target
//   9   t1 guesses over under
//   10  reveal target, update scores`;

let cards = [["Bad","Good"],
["Mildly addictive","Highly addictive"],
["Hot","Cold"],
["Normal","Weird"],
["Colorless","Colorful"],
["Low calorie","High calorie"],
["Feels bad","Feels good"],
["Inessential","Essential"],
["Cheap","Expensive"],
["Underrated weapon","Overrated weapon"],
["Rare","Common"],
["Unsexy emoji","Sexy emoji"],
["Easy subject","Hard subject"],
["Unknown","Famous"],
["Difficult to use","Easy to use"],
["Tired","Wired"],
["Dirty","Clean"],
["Requires luck","Requires skill"],
["Flavorless","Flavorful"],
["Boring topic","Fascinating topic"],
["Bad actor","Good actor"],
["Basic","Hipster"],
["Dangerous job","Safe job"],
["Fantasy","Sci-Fi"],
["Casual","Formal"],
["Underpaid","Overpaid"],
["Dry","Wet"],
["Underrated skill","Overrated skill"],
["Forbidden","Encouraged"],
["Sad song","Happy song"],
["Fragile","Durable"],
["Geek","Dork"],
["Good","Evil"],
["Worst day of the year","Best day of the year"],
["Bad habit","Good habit"],
["Cat person","Dog person"],
["Guilty pleasure","Openly love"],
["Untalented","Talented"],
["Dark","Light"],
["Underrated actor","Overrated actor"],
["Hard to find","Easy to find"],
["Ugly man","Beautiful man"],
["Hard to remember","Easy to remember"],
["Lowbrow","Highbrow"],
["Unhealthy","Healthy"],
["Bad man","Good man"],
["Historically important","Historically irrelevant"],
["Hairless","Hairy"],
["Inflexible","Flexible"],
["Normal pet","Exotic pet"],
["Introvert","Extrovert"],
["Book was better","Movie was better"],
["Bad movie","Good movie"],
["Ugly","Beautiful"],
["Happens slowly","Happens suddenly"],
["Job","Career"],
["Loved","Hated"],
["The Light Side of the Force","The Dark Side of the Force"],
["Bad pizza topping","Good pizza topping"],
["Dystopia","Utopia"],
["Mature person","Immature person"],
["Underrated thing to own","Overrated thing to own"],
["Mean person","Nice person"],
["Action movie","Adventure movie"],
["Mental activity","Physical activity"],
["Uncontroversial topic","Controversial topic"],
["Need","Want"],
["Dry food","Wet food"],
["Normal thing to own","Weird thing to own"],
["Straight","Curvy"],
["Bad person","Good person"],
["80s","90s"],
["Ethical to eat","Unethical to eat"],
["Movie","Film"],
["Optional","Mandatory"],
["Underrated letter of the alphabet","Overrated letter of the alphabet"],
["Ordinary","Extraordinary"],
["Hard to pronounce","Easy to pronounce"],
["Low quality","High quality"],
["Unsexy animal","Sexy animal"],
["Plain","Fancy"],
["Has a bad reputation","Has a good reputation"],
["Poorly made","Well made"],
["Not a sandwich","A sandwich"],
["Quiet place","Loud place"],
["Comedy","Drama"],
["Dangerous","Safe"],
["Culturally significant","Culturally insignificant"],
["Replaceable","Irreplaceable"],
["Worst athlete of all time","Greatest athlete of all time"],
["Role model","Bad influence"],
["Useless major","Useful major"],
["Peaceful","Warlike"],
["Underrated movie","Overrated movie"],
["Rough","Smooth"],
["Bad for you","Good for you"],
["Round","Pointy"],
["Proof that God exists","Proof that God doesn't exist"],
["Sad movie","Happy movie"],
["Waste of time","Good use of time"],
["Scary animal","Nice animal"],
["Mainstream","Niche"],
["Short lived","Long lived"],
["Nobody does it","Everybody does it"],
["Smells bad","Smells good"],
["Star Wars","Star Trek"],
["Snack","Meal"],
["Least evil company","Most evil company"],
["Soft","Hard"],
["Sustenance","Haute cuisine"],
["Square","Round"],
["Better hot","Better cold"],
["Stupid","Brilliant"],
["Artisanal","Mass produced"],
["Bad superpower","Good superpower"],
["Ineffective","Effective"],
["Unbelievable","Believable"],
["Trashy","Classy"],
["Temporary","Permanent"],
["Looks like a person","Doesn't look like a person"],
["Tastes bad","Tastes good"],
["Sport","Game"],
["Uncool","Cool"],
["Worst living person","Greatest living person"],
["Underrated","Overrated"],
["Messy food","Clean food"],
["Unethical","Ethical"],
["Bad gift","Good gift"],
["Unfashionable","Fashionable"],
["Freedom fighter","Terrorist"],
["Unforgiveable","Forgiveable"],
["Failure","Masterpiece"],
["Harmless","Harmful"],
["Gryffindor","Slytherin"],
["Unhygienic","Hygienic"],
["Bad music","Good music"],
["Useless","Useful"],
["Movie that Godzilla would ruin","Movie that Godzilla would improve"],
["Unimportant","Important"],
["Easy to spell","Hard to spell"],
["Vice","Virtue"],
["Underrated musician","Overrated musician"],
["Unpopular activity","Popular activity"],
["Divided","Whole"],
["Unreliable","Reliable"],
["Easy to kill","Hard to kill"],
["Unstable","Stable"],
["Round animal","Pointy animal"],
["Bad TV show","Good TV show"],
["Traditionally masculine","Traditionally feminine"],
["Useless body part","Useful body part"],
["Fad","Classic"],
["Weak","Strong"],
["Disgusting cereal","Delicious cereal"],
["Useless invention","Useful invention"],
["Liberal","Conservative"],
["Unpopular","Popular"],
["Friend","Enemy"],
["Boring","Exciting"],
["Smelly in a bad way","Smelly in a good way"],
["Villain","Hero"],
["Underrated thing to do","Overrated thing to do"],
["Useless in an emergency","Useful in an emergency"],
["For kids","For adults"],
["Wise","Intelligent"],
["Easy to do","Hard to do"],
["Worthless","Priceless"],
["Nature","Nurture"],
["Dictatorship","Democracy"],
["Normal greeting","Weird greeting"],
["Dog name","Cat name"],
["Non-partisan","Partisan"],
["Limited","Infinite"],
["Casual event","Formal event"],
["Bad investment","Good investment"],
["Small talk","Heavy topic"],
["Mild","Spicy"],
["Religious","Sacrilegious"],
["Not art","Art"],
["Illegal","Prohibited"],
["Popular","Elitist"],
["Out of control","In control"],
["Quiet","Loud"],
["Unsexy PokÃ©mon","Sexy PokÃ©mon"],
["Secret","Public knowledge"],
["Too small","Too big"],
["Short","Long"],
["Worst year in history","Best year in history"],
["Socialist","Capitalist"],
["Little known fact","Well known fact"],
["Stationary","Mobile"],
["Local issue","Global issue"],
["Talent","Skill"],
["Worst era to time travel","Best era to time travel"],
["The worst","The best"],
["Small number","Large number"],
["TRUE","FALSE"],
["Old fashioned","Avant garde"],
["Ugly word","Beautiful word"],
["Small","Tiny"],
["Unnatural","Natural"],
["Genuine person","Phony person"],
["Derivative","Original"],
["Etiquette","Manners"],
["Unsexy color","Sexy color"],
["Benefits you","Benefits everyone"],
["Powerless","Powerful"],
["Doesn't vape","Vapes"],
["Fruit","Vegetable"],
["Science","Pseudoscience"],
["Funny topic","Serious topic"],
["Limp","Firm"],
["Guilty pleasure","Actually just bad"],
["Gossip","News"],
["Hard to sit on","Easy to sit on"],
["Not enough","Too much"],
["Horizontal","Vertical"],
["Unscented","Scented"],
["Huggable","Not huggable"],
["Heterogeneous","Homogenous"],
["Inclusive","Exclusive"],
["Bad dog breed","Good dog breed"],
["Art","Commerce"],
["One hit wonder","Pop icon"],
["Bad advice","Good advice"],
["Tick","Tock"],
["Bad candy","Good candy"],
["Traditional","Radical"],
["Bad mouthfeel","Good mouthfeel"],
["Illegal","Legal"],
["Deep thought","Shallow thought"],
["Bad school","Good school"],
["Never on time","Always on time"],
["Won't live to 100","Will live to 100"],
["Bad Disney character","Good Disney character"],
["Similar","Identical"],
["Bad president","Good president"],
["Weird","Strange"],
["Famous","Infamous"],
["Least powerful god","Most powerful god"],
["Boring person","Fun person"],
["Underrated book","Overrated book"],
["Conventional wisdom","Fringe belief"],
["Worst chore","Best chore"],
["Endangered species","Overpopulated species"],
["Blue","Green"],
["Thrilling","Terrifying"],
["Nerd","Jock"],
["Expected","Unexpected"],
["Person you could beat up","Person who'd beat you up"],
["Unreasonable phobia","Reasonable phobia"],
["Underrated game","Overrated game"]
];

let game = {
  current: [],
  draw: [],
  discard: [],
  team: true, //team 1-true 2-false
  team1: [],
  team2: [],
  target: 50,
  score: [0,0],
  round: 0,
  saveTime: 0,
  clue: '',
  guess: 0
}

function finState() {
  window.localStorage.removeItem('waveGame');
}
function setState() {
  game.saveTime = Date.now();
  window.localStorage.setItem('waveGame', JSON.stringify(game))
}
function getState() {
  let gameSave =  window.localStorage.getItem('waveGame')
  if (gameSave) {
    game = JSON.parse(gameSave);
    if ((Date.now() - game.saveTime)/1000 <= 1200) {
      lightTog();
      screenTog();
      updateTeams();
      promptUpdate();
      updateTot();
      if (game.round == 4 || game.round == 9) {
        document.getElementById('t1s').innerHTML = '-';
        document.getElementById('t2s').innerHTML = '-';
      } else {
        updateScore();
      }
      if (game.clue) {
        document.getElementById('clueField').innerHTML = `<span id="clueSpan">${game.clue.toUpperCase()}</span>`;
      }
      let targetBox = document.getElementById('targetBox')
      targetBox.style.left = game.target - 12 + "%"
      startButton();
    } else {
      finState();
    }
  }
}
function updateTeams() { //updates the team windows
  document.getElementById("t1").innerHTML = '';
  document.getElementById("t2").innerHTML = ''; 
  if (game.team1) { 
    game.team1.forEach(el => {
      let nl = document.createElement("li");
      nl.innerHTML = el;
      document.getElementById("t1").appendChild(nl);
    });
  };
  if (game.team2) { 
    game.team2.forEach(el => {
      let nl = document.createElement("li");
      nl.innerHTML = el;
      document.getElementById("t2").appendChild(nl);
    });
  };
}
function updateGuess() { //matches redline to the slider position
  let line = document.getElementById('guessLine');
  let input = document.getElementById('tarSlider').value
  line.style.left = input + '%';
}
function promptUpdate() {
  let info = document.getElementById('prompt')
  const prompts = [
    'Press Start!',
    "Psychic, click draw to pick a prompt.<br>Don't show anyone!",
    'Enter a clue, then show your team<br>after the target is hidden',
    `Move the slider to where the target is.<br>Then click Guess`,
    'Other team, is the target to the right,<br>or to the left of line?',
    ''
  ]
  switch (game.round) {
    case 0:
      info.innerHTML = prompts[0];
      break;
    case 1:
    case 6:
      info.innerHTML = prompts[1];
      break;
    case 2:
    case 7:
      info.innerHTML = prompts[2];
      break;
    case 3:
    case 8:
      info.innerHTML = prompts[3];
      break;
    case 4:
    case 9:
      info.innerHTML = prompts[4];
      break;
    default:
      info.innerHTML = '';
  }
}
const updateScore = () => {
  if (game.guess) {
    // console.log(game.team)
    game.team ? game.score[1] += game.guess : game.score[0] += game.guess;
    game.guess = 0;
  }
  let t1s = document.getElementById('t1s');
  let t2s = document.getElementById('t2s');
  if (game.score[0] >= 10 || game.score[1] >= 10) {
    t1s.innerHTML = game.score[0];
    t2s.innerHTML = game.score[1];
    game.score[0] > game.score[1] ? winner('1') : winner('2')
    finState();
  } else {
    t1s.innerHTML = game.score[0];
    t2s.innerHTML = game.score[1];
    setState();
  }
}
const updateTot = () => {
  let left = document.getElementById('totL');
  let right = document.getElementById('totR');
  if (game.current.length) {
    left.innerHTML = game.current[0].toUpperCase();
    right.innerHTML = game.current[1].toUpperCase();
  } else {
    left.innerHTML = '';
    right.innerHTML = '';
  }
}
const lightTog = () => {
  if (document.getElementsByClassName('turn')[0]) {
    document.getElementsByClassName('turn')[0].classList.toggle('turn');
  };
  let t1g = document.getElementById('t1g');
  let t1r = document.getElementById('t1r');
  let t2g = document.getElementById('t2g');
  let t2r = document.getElementById('t2r');
  if (game.round > 0 && game.round < 4) {
    t1g.classList.toggle('turn');
  } else if (game.round == 4) {
    t2r.classList.toggle('turn');
  } else if (game.round > 4 && game.round < 9) {
    t2g.classList.toggle('turn');
  } else if (game.round > 8) {
    t1r.classList.toggle('turn');
  }
}
const test = () => {
  const screen = document.getElementById('screen')
  screen.innerHTML = screen.offsetWidth
}
const screenTog = () => {
  const allowed = [0,1,2,5,6,7,10]
  const screen = document.getElementById('screen')
  if (!game.current.length) {
    screen.style.width = '0%';
  } else if (allowed.includes(game.round)) {
    (screen.offsetWidth == 432 || screen.offsetWidth == 270) ? screen.style.width = '0%' : screen.style.width = '102%';
  } else {
    screen.style.width = '102%';
  }
}
const winner = (team) => {
  game.round = 0;
  document.getElementById('modalBG').style.display = 'block';
  document.getElementById('modalWin').style.display = 'flex';
  document.getElementById('winner').innerHTML =  `Team ${team} Wins!`;
  document.getElementById('prompt').innerHTML =  `Team ${team} Wins!`;
}
function newPlayerWindow () {
  if (game.round == 0) {
    document.getElementById('optionsBox').style.display = 'none';
    document.getElementById('modalBG').style.display = 'block';
    document.getElementById('addPlayer').style.display = 'flex'; 
  } else {
    document.getElementById('optionsHeader').innerHTML = `Options:<br>Can't do that right now`;
    console.log(`Can't do that right now`)
  }
}
function removePlayerWindow() {
    document.getElementById('optionsBox').style.display = 'none';
    document.getElementById('modalBG').style.display = 'block';
    document.getElementById('removePlayer').style.display = 'flex';
}
function addRemovePlayer (n=0) {
  if (n == 0) {
    let newPlayer = document.getElementById('newPlayer');
    let all = newPlayer.value.split(' ')
    all.forEach(el => {
      if (!el) {
        return;
      }
      if (game.team1.length <= game.team2.length) { 
        game.team1.push(el) 
      } else {
        game.team2.push(el);
      }
    })
    updateTeams();
    setState();
  } else {
    let exPlayer = document.getElementById('exPlayer');
    let all = exPlayer.value.split(' ')
    all.forEach(el => {
      if (!el) {
        return;
      }
      if (game.team1.includes(el)) { 
        game.team1.splice(el,1) 
      } else if (game.team2.includes(el)) {
        game.team2.splice(el,1)
      }
    })
    updateTeams();
    setState();
  }
  newPlayer.value = '';
  document.getElementById('modalBG').style.display = 'none';
  document.getElementById('addPlayer').style.display = 'none';
  document.getElementById('removePlayer').style.display = 'none';

}
const makeTeams = () => {
  if (game.round==0) {
    document.getElementById('optionsBox').style.display = 'none';
    document.getElementById('modalBG').style.display = 'none';
    if (game.team1.length + game.team2.length < 2) {
      console.log('You need more people!');
    } else if (game.round > 0) {
      console.log('too late, teams set')
    } else {
      let peeps= game.team1.concat(game.team2);
      const check = peeps.slice(0);
      game.team1 = [];
      game.team2 = []; 
      for (var i = 0; i < check.length; i++) {
        let plyr = peeps.splice(Math.floor(Math.random() * peeps.length),1);
        if (game.team1.length <= game.team2.length) { 
          game.team1.push(plyr[0]);
        } else {
          game.team2.push(plyr[0]);
        }
      }
      updateTeams();
      setState();
    }
  } else {
    document.getElementById('optionsHeader').innerHTML = `Options:<br>Can't do that right now`; 
  }
}
function options() {
  document.getElementById('modalBG').style.display = 'block';
  document.getElementById('optionsBox').style.display = 'flex';
}
function howTo() {
  document.getElementById('modalBG').style.display = 'block';
  document.getElementById('modalHow').style.display = 'flex';
  document.getElementById('optionsBox').style.display = 'none';
}
function howClose() {
  document.getElementById('modalBG').style.display = 'none';
  document.getElementById('modalHow').style.display = 'none';
}
function optionsClose() {
  document.getElementById('optionsBox').style.display = 'none';
  document.getElementById('modalBG').style.display = 'none';
}
function startGame() {    //controls the actions of the middle button
  let screen = document.getElementById('screen');
  switch(game.round) {
    case 0:             //button="start", starts new game
      game.round = 1;
      promptUpdate();
      updateScore();
      lightTog();
      screen.style.width = '0%';
      startButton();
      break;
    case 1:             //button="draw" draws psychic prompt
    case 6:
      drawTot();
      startButton();
      break;
    case 2:             //button='enter clue" opens clue window
    case 7:
      newClue();
      break;
    case 3:             //button='guess' set's team's slider guess
    case 8:
      setGuess();
      startButton();
      break;
    default:
      return;
  }
}
function startButton() { //controls text on middle button
  switch (game.round) {
    case 0: document.getElementById('startButt').innerHTML = 'Start';
      break;
    case 1:
    case 6: document.getElementById('startButt').innerHTML = 'Draw';
      break;
    case 2:
    case 7: document.getElementById('startButt').innerHTML = 'Enter Clue';
      break;
    default: document.getElementById('startButt').innerHTML = 'Guess';

  }

}
function reset(opt=0) {
  if (opt == 1) {       //win reset
    document.getElementById('modalBG').style.display = 'none';
    document.getElementById('modalWin').style.display = 'none';
  } else {            //regular reset
    document.getElementById('optionsBox').style.display = 'none';
    document.getElementById('modalBG').style.display = 'none';
    game.score = [0,0];
    game.clue = '';
    game.round = 0;
    // game.team1 = [];
    // game.team2 = [];
    game.current = [];
    game.draw = [];
    game.discard = [];
    game.team = true;
    screenTog();
    updateScore();
    updateTeams();
    updateTot();
    lightTog();
    document.getElementById('clueField').innerHTML = 
    '<span style="opacity:.25;font-size:.4em;">enter clues here</span>';
  }
  promptUpdate();
  finState();
  document.getElementById('startButt').innerHTML = 'Start';
}
function oopsRedrawd() {  //steps back if playrs need to reset turn
  optionsClose()
  switch (game.round) {
    case 2:
    case 3:
    case 4:
      game.round = 1;
      break;
    case 7:
    case 8:
    case 9:
      game.round = 6;
      break;
    default:
      return;
  }
  promptUpdate();
  screenTog();
  lightTog();
  setState();
  startButton();
}
function drawTot() { //draws three prompt options to choose from
  if (game.round == 1 || game.round == 6) {
    let pot = cards.filter(card => !game.discard.includes(card));
    for (var i = 1; i < 4; i++) { 
      if (game.discard.length > 250) {
        game.discard = [];
      };
      n = Math.floor(Math.random() * pot.length);
      game.draw.push(pot.splice(n,1)[0])
      let left = document.getElementById('opt'+ (i-1) + 'L');
      let right = document.getElementById('opt'+ (i-1) + 'R');
      left.innerHTML = game.draw[i-1][0].toUpperCase();
      right.innerHTML = game.draw[i-1][1].toUpperCase();
    }
    document.getElementById('modalBG').style.display = 'block';
    document.getElementById('modalTots').style.display = 'flex';
  }
}
const pickTot = (id) => { //selects chosen prompt
  let pick = id[3];
  if (game.current.length > 0) {
    game.discard.push(game.current) };
  game.current = game.draw.splice(pick, 1)[0];
  game.draw.splice(0);
  game.round +=1; //increment to 2/7
  updateTot();
  promptUpdate();
  setState();
  document.getElementById('modalBG').style.display = 'none'
  document.getElementById('modalTots').style.display = 'none';
  getTarget();
  document.getElementById('tarSlider').value = 50;
  updateGuess();
  startButton();
}
function randomTot() { //selects a random prompt, not in game. 
  let pot = cards.filter(card => !game.discard.includes(card));
  if (game.current.length > 0) {
    game.discard.push(game.current) }
  if (game.discard.length > 250) {
    game.discard = [];
  };
  const toTot = pot.splice((Math.floor(Math.random() * pot.length)), 1)
  game.current = toTot[0]
  let left = document.getElementById('totL');
  let right = document.getElementById('totR');
  left.innerHTML = game.current[0].toUpperCase();
  right.innerHTML = game.current[1].toUpperCase();
  setState();
}
function newClue() { //opens the window to enter clues
  if (game.round == 2 || game.round == 7) {
    document.getElementById('modalBG').style.display = 'block';
    document.getElementById('modalClue').style.display = 'flex';
    document.getElementById('newClue').value = '';
    document.getElementById('screen').style.width = '0%'
  }
}
function enterClue() { //presents the clue 
  let clue = document.getElementById('newClue').value;
  if (clue) {
    document.getElementById('clueField').innerHTML = `<span id="clueSpan">${clue.toUpperCase()}</span>`;
    document.getElementById('screen').style.width = '102%'
    game.clue = clue;
    game.round +=1; //increment to 3/8
    promptUpdate();
    setState();
    startButton();
  }
  document.getElementById('modalBG').style.display = 'none';
  document.getElementById('modalClue').style.display = 'none';
  // console.log(game)
}
function getTarget() { //gets a random target and moves the target box
  // REACTified ^
  game.target = Math.floor(Math.random() * 100);
  let targetBox = document.getElementById('targetBox')
  targetBox.style.left = game.target - 12 + "%"
  setState();
}
const setGuess = () => { //set's the main team's guess on the slider
  if (game.round == 3 || game.round == 8) {
    let score = 0;
    let guess = document.getElementById('tarSlider').value
    if (guess <= game.target+2 && guess >= game.target-2) {
      score = 4;
    } else if (guess <= game.target+7 && guess >= game.target-7) {
      score = 3;
    } else if (guess <= game.target+12 && guess >= game.target-12) {
      score = 2;
    } else {
      score = 0;
    }
    game.team ? game.guess += score : game.guess += score;
    game.team = !game.team;
    game.round += 1; //increment to 4/9
    setState();
    lightTog();
    promptUpdate();
    // console.log(game)
  } 
}
const overUnder = (id) => { //
  const guess = document.getElementById('tarSlider')
  if (game.round == 4 || game.round == 9) {
    let compare = game.target - guess.value;
    let score = 0;
    if (id == 'over' && compare > 2) { 
        score = 1;
    } else if (id == 'equal' && compare >= -2 && compare <= 2) {
        score = 1;
    } else if (id == 'under' && compare < -2) {
        score = 1;
    }
    game.team ? game.score[0] += score : game.score[1] += score;
    updateScore();
    if (game.round + 1 == 10) {
      game.round = 1;
    } else {
      game.round += 2;
    }
    document.getElementById('startButt').innerHTML = 'Draw';
    promptUpdate(); 
    screenTog();
    lightTog();
    setState();
    // console.log(game)
  }
}
function logState() {
  console.log(window.localStorage.getItem('waveGame'));
} 
function logGame() {
  console.log(game)
}
function logSlide() {
  console.log(document.getElementById('tarSlider').value)
}

getState();
updateTeams();
setTimeout(updateGuess, 10);
document.getElementById('tarSlider').value=50;