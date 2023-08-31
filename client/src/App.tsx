import './App.css';
import React, {useState} from 'react';
import { Outlet, useParams } from 'react-router-dom';
//@ts-expect-error
import { ColorContext } from './context/Contexts.ts';

export default function App() {
  const [theme, setTheme] = useState('blues')
  const toggleTheme = () => {
    setTheme(theme === 'blues' ? 'reds' : 'blues')
  }
  
  return (
    <ColorContext.Provider value={{theme, setTheme: toggleTheme}}>
    <div className={`App ${theme}`}>
      <h1 className='mainTitle'>WAVELENGTH</h1>
      <Outlet/>
    </div>
    </ColorContext.Provider>
  );
}

//     <div class="modalBG" id='modalBG'>
//       <div class="modalArea" id="modalHow">
//         <h3>How To Play:</h3>
//         <p>- Each turn one team will pick a Psychic. The psychic draws a card and looks at the random target area. </p>
//         <p>- They will give a one word clue about the location of the target area in relation to the card. </p>
//         <p>- The rest of the team will move the slider to where they think it is and click guess. </p>
//         <p>- After setting their guess, the other team will have a chance to guess if the target is to the left or right of your team's guess. </p>
//         <p>- The target is then revealed and points are awarded. First to 10 wins. </p>
//         <p>- Each card can be thought of as a specturm. If the target is all the way to the right, you can safely give a clue word that only describes the green promp. </p> 
//         <p>- If, for whatever reason, you need to start a turn over, click "Oops, redraw" to reset the turn and the psychic will draw a new promp </p> 
//         <button onclick="howClose()" class='closeButt'>&#9747;</button>
//       </div>

//       <div class="modalArea" id='modalTots'>
//         Choose One
//         <div class="totLine" id="opt0" onclick="pickTot(this.id)">
//           <div class='totL' id='opt0L'>hot</div>
//           <div class='totR' id='opt0R'>cold</div>
//         </div>
//         <div class="totLine" id="opt1" onclick="pickTot(this.id)">
//           <div class='totL' id='opt1L'>big</div>
//           <div class='totR' id='opt1R'>small</div>
//         </div>
//         <div class="totLine" id="opt2" onclick="pickTot(this.id)">
//           <div class='totL' id='opt2L'>bird</div>
//           <div class='totR' id='opt2R'>lizard</div>
//         </div>
//       </div>
      
//       <div class="modalArea" id='modalClue'>
//         <label class='clueLine' for="clueField">Enter a one word clue about the target's position:</label>
//         <input class='clueLine' type="text" id="newClue" name="clueField" maxlength="12"/>
//         <button class='clueLine' onclick="enterClue()">Submit</button>
//       </div>

//       <div class="modalArea" id='addPlayer'>
//         Enter player names to add
//         <input type="text" id='newPlayer'/>
//         <button onclick="addRemovePlayer()">Submit</button>
//       </div>

//       <div class="modalArea" id='removePlayer'>
//         Enter player names to remove
//         <input type="text" id='exPlayer'/>
//         <button onclick="addRemovePlayer(1)">Submit</button>
//       </div>

//       <div class="modalArea" id='optionsBox'>
//         <h2 id='optionsHeader'>Options:</h2>
//         {/* <!-- <button class="optButton"onclick="newPlayerWindow()">Add Players</button>
//         <button class="optButton"onclick="removePlayerWindow()">Remove Players</button>
//         <button class="optButton"onclick="makeTeams()">Randomize teams</button> --> */}
//         <button class="optButton" onclick="howTo()">How To</button> 
//         <button class="optButton" onclick="oopsRedrawd()">Oops, redraw</button>
//         <button class="optButton" onclick="reset()">Reset</button>
//         <button class="closeButt" onclick="optionsClose()" style="color:#185e5c">&#9747;</button>
//       </div>

//       <div class="modalArea" id='modalWin'>
//         <span id='winner'></span>
//         <button onclick="reset(1)">Hell Yeah!</button>
//       </div>

//     </div>
//   </div>
// )