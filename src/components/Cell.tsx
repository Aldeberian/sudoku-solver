import "./Cell.css";
import {useEffect, useRef} from "react";

const Cell = (data : { val : number, i : number, j : number, bgColor : string, isNew : boolean}) => {
    const val = data.val;
    const i = data.i;
    const j = data.j;
    const backgroundColor = data.bgColor;
    const textColor = useRef<string>("black");

    useEffect(() => {
        if(data.isNew) {
            textColor.current = "#0000CD";
        }
    }, [val]);

    let conditional : string;
    if((i === 2 || i === 5) && (j === 2 || j === 5)) {
        conditional = 'cornerCell';
    } else if(i === 2 || i === 5) {
        conditional = 'bottomCell';
    } else if(j === 2 || j === 5) {
        conditional = 'rightCell';
    } else {
        conditional = 'classic';
    }
    return(
        <div style={{backgroundColor}} className={`container  ${conditional}`}>
            <div style={{ color: textColor.current }} className={`cell`}>{val === 0 ? " " : val}</div>
        </div>
    );
}

export default Cell;