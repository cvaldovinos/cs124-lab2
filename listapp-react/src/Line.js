import "./Line.css";
import "./Lab1EmptyList.css";

function Line(props) {
    function emptyCheck(props) {
        return (
            props.field !== ""
        );
    }

    function clickWrapper() {
        {props.onClickLine(-1)};
        props.onMoveTapLine(props.tapLine);
        }
    //If you delete a Tap to Add Note line s.t. it's empty then click off the line, the checkbox
    // remains with an empty line

    //Add logic if empty return tap to add note
    function lineLogic(props) {
        if (props.clicked) {
            if (props.tapLine===props.position){
                return (<li>
                    <input className={"emptyCheckbox"}
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
                </li>)
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
                </li>)
            }
        } else if (emptyCheck(props)) {
            if (props.tapLine===props.position) {
                return (<li>
                <input className={"emptyCheckbox"}
                       type={"checkbox"}
                       onChange={(e) => {props.onCheck(props.line.key)}}>
                </input>
                <input className={"textboxes"}
                       type={"text"}
                       onClick={(e) => {
                           {props.onClickLine(props.line.key)}
                           e.stopPropagation();
                       }}
                       onChange={
                           (e) => props.onLineChangeField(props.line.key, e.target.value)
                       }
                       value={props.line.field}>
                </input>
            </li>);
            } else {
                return (<li>
                <input className={"checkboxes"}
                       type={"checkbox"}
                       onChange={(e) => {props.onCheck(props.line.key)}}>
                </input>
                <input className={"textboxes"}
                       type={"text"}
                       onClick={(e) => {
                           {props.onClickLine(props.line.key)}
                           e.stopPropagation();
                       }}
                       onChange={
                           (e) => props.onLineChangeField(props.line.key, e.target.value)
                       }
                       value={props.line.field}>
                </input>
            </li>);}
        } else {
            return (<li>
                <input className={"emptyCheckbox"}
                       type={"checkbox"}>
                </input>
                <input className={"textboxes"}
                       disabled={true}
                       type={"text"}
                       value={props.field}
                       onClick={() => console.log("yo")}>
                </input>
            </li>);
        }
    }

return (
    <div className={"all-lines"} onClick={(e) => clickWrapper()}>
        {lineLogic(props)}
        {/*{console.log(props.position, (props.tapLine===props.position))}*/}
    </div>
)
}

export default Line;