import './App.css';
import React, {useEffect, useState} from 'react';
import Grid from "./components/Grid";
import Middle from "./components/Middle";

function App() {
  const [gameGrid, setGameGrid] = useState<number[][] | null>(null);
  const [solvedGrid, setSolvedGrid] = useState<number[][] | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const [solveClicked, setSolveClicked] = useState<boolean>(false);

  const [lastCell, setLastCell] = useState<{ i : number, j : number} | null>(null);

  function changeCell(val : number, i : number, j : number) {
      if(!gameGrid) {
          throw Error;
      }
      let temp = gameGrid;
      temp[i][j] = val;
      setLastCell({i : i, j : j});
      setGameGrid(temp);
  }

  function sleep(ms : number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  function isCellValid(i : number, j : number, val : number) : boolean {
      if(!gameGrid) {
          return false;
      }

      for(let k = 0; k < 9; k++) {
          if(gameGrid[k][j] === val) {
              return false;
          }
      }
      for(let k = 0; k < 9; k++) {
          if(gameGrid[i][k] === val) {
              return false;
          }
      }

      let xo : number = Math.floor(i/3)*3;
      let yo : number = Math.floor(j/3)*3;
      for(let x = 0 ; x < 3 ; x++) {
          for(let y = 0 ; y < 3 ; y++) {
              if(gameGrid[xo + x][yo + y] === val) {
                  return false;
              }
          }
      }

      return true;
  }

  async function solve() : Promise<boolean> {
      if(!gameGrid) {
          return false;
      }

      for(let x = 0; x < 9; x++) {
          for(let y = 0; y < 9 ; y++) {
              if(gameGrid[x][y] === 0) {
                  for(let num = 1 ; num < 10 ; num++) {
                      if(isCellValid(x, y, num)) {
                          changeCell(num, x, y);
                          await sleep(20);
                          if(await solve()) {
                              return true;
                          }
                          changeCell(0, x, y);
                      }
                  }
                  return false;
              }
          }
      }
      return true;
  }
  const solveClickHandle = () => {
      if(gameGrid != null) {
        setSolveClicked(true);
      }
  }
  async function fetchGrids() {
    try {
      const response = await fetch('https://sudoku-api.vercel.app/api/dosuku');
      const data = await response.json();
      setLastCell(null);
      setGameGrid(data.newboard.grids[0].value);
      setSolvedGrid(data.newboard.grids[0].solution);
      setDifficulty(data.newboard.grids[0].difficulty);

      setSolveClicked(false);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
      if(solveClicked) {
              solve()
                  .then(() => {
                      setSolveClicked(false);
                  })
      }
  }, [solveClicked]);

  return (
      <div className="grids-container">
        <Grid grid={gameGrid} lastCell={lastCell}/>
        <Middle difficulty={difficulty} newBoard={fetchGrids} solveClickHandle={solveClickHandle}/>
        <Grid grid={solvedGrid} lastCell={null}/>
      </div>
  );
}

export default App;
