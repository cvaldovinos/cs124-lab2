import "./LineData.css";
import "./Lab1EmptyList.css";

function LineData(props) {

function clickTextWrapper(e, key) {
    e.stopPropagation();
    props.onEdited(key);
}

return (
    <div>
        <li>
            <input type={"checkbox"}
                   className={"checkboxes"}
                   onChange={(e) => {props.onItemChanged(props.line.key,"checkbox",e.target.value)}}/>
            <input type={"text"}
                   className={"textboxes"}
                   onClick={(e) => clickTextWrapper(e, props.line.key)}
                   onChange={(e) => props.onItemChanged(props.line.key, "text", e.target.value)}
                   value={props.text}/>
        </li>
    </div>
)
}

export default LineData;