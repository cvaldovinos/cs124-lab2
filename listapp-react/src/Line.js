import "./Line.css";
import "./Lab1EmptyList.css";
import LineField from './LineField.js';

function Line(props) {
    function emptyCheck(props) {
        return (
            props.value !== ""
        );
    }
    function lineLogic(props) {
        if (emptyCheck(props)) {
            return (<li>
                        <input className={"checkboxes"}
                               type={"checkbox"}>
                        </input>
                        <LineField onLineChangeField={props.onLineChangeField}/>
                    </li>);
        }
        else {
            return (<li>
                        <input className={"emptyCheckbox"}
                               type={"checkbox"}>
                        </input>
                        <input className={"textboxes"}
                               disabled={true}
                               type={"text"}
                               value={props.value}>
                        </input>
                    </li>);
        }
    }
return (
    <div className={"all-lines"}>
        {lineLogic(props)}
    </div>
)
}

export default Line;