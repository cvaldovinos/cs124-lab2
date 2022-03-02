import "./LineData.css";
import "./Lab1EmptyList.css";

function LineData(props) {
    const checkClasses = ["checkboxes "];
    const textClasses = ["textboxes "];

    if (!props.line.text_visible) {
        textClasses.push("hidden ");
    }
    if (!props.line.check_visible) {
        checkClasses.push("hidden ");
    }
    if (props.disableChecks) {
        checkClasses.push("disabled ");
    }

function clickTextWrapper(e, key) {
    e.stopPropagation();
    props.onEdited(key);
}

function changeCheckWrapper(e, key) {
    props.onEdited(-1);
    props.onItemChanged(key,"checkbox",e.target.value);
}

return (
    <div>
        <li>
            {/*<button id={"select-button"}></button>*/}
            {/*<input type={"checkbox"}*/}
            {/*       className={checkClasses.join(" ")}*/}
            {/*       onChange={(e) => changeCheckWrapper(e, props.line.key)}/>*/}
            <input type={"text"}
                   className={textClasses.join(" ")}
                   onClick={(e) => clickTextWrapper(e, props.line.key)}
                   onChange={(e) => props.onItemChanged(props.line.key, "text", e.target.value)}
                   value={props.text}/>
        </li>
    </div>
)
}

export default LineData;