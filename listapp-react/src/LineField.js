import "./LineField.css";
import "./Lab1EmptyList.css";

function LineField(props) {
 return (
     <input className={"textboxes"}
            type={"text"}
            onClick={(e) => e.stopPropagation()}
            onChange={
                (e) => props.onLineChangeField(props.key, e.target.value)
            }
            value={props.value}>
     </input>
 )
}

export default LineField;