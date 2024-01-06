import './Grid.css';
import Cell from "./Cell";

const Grid = (data: { grid: number[][] | null, lastCell : { i : number, j : number} | null}) => {
    let grid : number[][] | null = data.grid;

    if(!grid) {
        grid = [];
        for (let i = 0; i < 9; i++) {
            let temp = Array(9).fill(0);
            grid.push(temp);
        }
    }

    return(
        <div className="grid-container ">
            {grid.map((line, i) => (
                <div key={i} className="line">
                    {line.map((val, j) => (
                        <Cell val={val} i={i} j={j} bgColor={
                            (   data.lastCell != null &&
                                data.lastCell.i === i && data.lastCell.j === j ) ?
                                "#FFFF00" : "white"
                        } isNew={
                            data.lastCell != null
                        }/>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;