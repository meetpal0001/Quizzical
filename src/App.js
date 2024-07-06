import './App.css';
import Cover from "./Cover"
import Quiz from "./Quiz"

import React  from 'react';

function App() {

  const [showCover,setShowCover]=React.useState(true)
  const [difficulty,setDifficulty]=React.useState("easy")


  function begin(){
    setShowCover(false)
  }



  return (
    <div className="App">
      {showCover?<Cover begin={begin} setDifficulty={setDifficulty} difficulty={difficulty}/>:<Quiz difficulty={difficulty} setShowCover={setShowCover}/>}
    </div>
  );
}

export default App;
