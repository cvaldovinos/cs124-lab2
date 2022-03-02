import './LineList.css';
import Line from './Line.js';
import {Fragment} from "react";

function LineList(props) {
    return(
        <Fragment>
            <div>
                <ul type={"none"}>
                    {props.linelist.map((data, index) =>
                        <Line position={index}
                              line={data}
                              key={data.key}
                              field={data.field}
                              clicked={data.clicked}
                              checked={data.checked}
                              tapLine={props.tapLine}
                              onClickLine={props.onClickLine}
                              onLineChangeField={props.onLineChangeField}
                              onMoveTapLine={props.onMoveTapLine}

                              onCheck={props.onCheck}/>)}
                </ul>

            </div>
            {props.showButton && <div><button className={"trashButton"} onClick={props.onDelete}>&#128465;</button></div>}
        </Fragment>
    )
}

export default LineList;