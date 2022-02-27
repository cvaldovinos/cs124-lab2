import "./LineField.css";
import "./Lab1EmptyList.css";

function LineField(props) {
    if (props.isTapLine) {

    }
 return (
     <input className={"textboxes"}
            type={"text"}
            onClick={(e) => e.stopPropagation()}
            onChange={
                (e) => props.onLineChangeField(props.line.key, e.target.value)
            }
            value={props.line.field}>
     </input>
 )
}

export default LineField;