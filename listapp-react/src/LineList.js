import './LineList.css';
import Line from './Line.js';
import {useState} from 'react';

function LineList(props) {
    const [tapLine, setTapLine] = useState([0]);

    function handleTapLine(props) {
        setTapLine(props);
    }

    return(
        <div>
            <ul type={"none"}>
        {props.listData.map((data,index) =>
        <Line position={index}
              key={data.key}
              value={data.value}
              onTap={setTapLine}
              onLineChangeField={props.onLineChangeField}/>)}
            </ul>
        </div>
    )

}

export default LineList;