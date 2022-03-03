import "./LineData.css";
import "./Lab1EmptyList.css";
import {Fragment} from "react";

function LineData(props) {
    const checkClasses = ["checkboxes "];
    const textClasses = ["textboxes "];
    const selectClasses = ["select-button "];
    const itemClasses = [];
    const divClasses = [];

    let hideLine = props.hideChecks && props.line.checked;

    if (!props.line.text_visible) {
        textClasses.push("hidden ");
    }
    if (!props.line.check_visible) {
        checkClasses.push("hidden ");
    }
    if (!props.line.select_visible)  {
        selectClasses.push("hidden ");
    }
        if (props.disableChecks) {
        checkClasses.push("disabled ");
    }
    if (props.selected) {
        textClasses.push("selected ");
        itemClasses.push("selected ");
        divClasses.push("yo ");
    } else {
        textClasses.push("normal ");
    }

function clickTextWrapper(e, key) {
    e.stopPropagation();
    props.onEdited(key);
}

function changeCheckWrapper(e, key) {
    props.onEdited(-1);
    props.onItemChanged(key,"checkbox",e.target.value);
}

return (<Fragment>
    {!hideLine && <div id={"div1"}>
        <li id={"li1"} className={itemClasses.join(" ")}>
            <button className={selectClasses.join(" ")} onClick={(e) => props.onToggleSelected(props.line.key)}></button>
            {props.checked && <input type={"checkbox"}
                   className={checkClasses.join(" ")}
                   onChange={(e) => changeCheckWrapper(e, props.line.key)} checked/>}
            {!props.checked && <input type={"checkbox"}
                                     className={checkClasses.join(" ")}
                                     onChange={(e) => changeCheckWrapper(e, props.line.key)}/>}
            <input type={"text"}
                   className={textClasses.join(" ")}
                   onClick={(e) => clickTextWrapper(e, props.line.key)}
                   onChange={(e) => props.onItemChanged(props.line.key, "text", e.target.value)}
                   value={props.text}/>
        </li>
    </div>}
    </Fragment>
)
}

export default LineData;