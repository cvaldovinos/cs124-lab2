import "./Line.css";
import "./Lab1EmptyList.css";

function Line(props) {
    function emptyCheck(props) {
        return (
            props.field !== ""
        );
    }


    function lineLogic(props) {
        if (emptyCheck(props)) {
            if (props.isTapLine) {
                return (<li>
                    <input className={"checkboxes"}
                           type={"checkbox"}>
                    </input>
                    <input className={"textboxes"}
                           type={"text"}
                           onClick={(e) => {e.stopPropagation()}}

                           onChange={
                               (e) => props.onLineChangeField(props.line.key, e.target.value)
                           }
                           value={props.line.field}>
                        {console.log(props.line.field)}

                    </input>
                </li>);
            } else {
                return (<li>
                    <input className={"checkboxes"}
                           type={"checkbox"}>
                    </input>
                    <input className={"textboxes"}
                           type={"text"}
                           onClick={(e) => {
                               e.stopPropagation()
                           }}
                           onChange={
                               (e) => props.onLineChangeField(props.line.key, e.target.value)
                           }
                           value={props.line.field}>

                    </input>
                </li>);
            }
        }
        else {
            return (<li>
                        <input className={"emptyCheckbox"}
                               type={"checkbox"}>
                        </input>
                        <input className={"textboxes"}
                               disabled={true}
                               type={"text"}
                               value={props.field}>
                        </input>
                    </li>);
        }
    }
return (
    <div className={"all-lines"}>
        {lineLogic(props)}
        {console.log(props.isTapLine)}
    </div>
)
}

export default Line;