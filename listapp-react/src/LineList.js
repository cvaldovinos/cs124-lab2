import './LineList.css';
import Line from './Line.js';
import {useState} from 'react';

function LineList(props) {
    return(
        <div>
            <ul type={"none"}>
                {props.linelist.map((data, index) =>
                    <Line position={index}
                          line={data}
                          key={data.key}
                          field={data.field}
                          isTapLine={props.tapLine === index}
                          onLineChangeField={props.onLineChangeField}/>)}
            </ul>
        </div>
    )

}

export default LineList;