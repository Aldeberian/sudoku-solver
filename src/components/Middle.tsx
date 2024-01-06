import "./Middle.css";

const Middle = (data : { difficulty : string | null, newBoard : () => Promise<void>, solveClickHandle : () => void }) => {
    let difficulty : string | null = data.difficulty;

    return (
        <div id="container">
            <button className={`button`} type={"button"} onClick={data.newBoard}>New board</button>
            <button className={`button`} type={"button"} onClick={data.solveClickHandle}>Solve</button>
            { difficulty !== null ? (
                <button className={`button`} >{difficulty}</button>
            ) : null }
        </div>
    );
}

export default Middle;