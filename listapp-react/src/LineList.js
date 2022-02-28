import './LineList.css';
import Line from './Line.js';

function LineList(props) {
    return(
        <div>
            <ul type={"none"}>
                {props.linelist.map((data, index) =>
                    <Line position={index}
                          line={data}
                          key={data.key}
                          field={data.field}
                          tapLine={props.tapLine}
                          clicked={data.clicked}
                          onClickLine={props.onClickLine}
                          onLineChangeField={props.onLineChangeField}
                          onMoveTapLine = {props.onMoveTapLine}
                          onCheck={props.onCheck}/>)}
            </ul>
        </div>
    )
}

export default LineList;