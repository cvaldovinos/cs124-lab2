import './LineList.css';
import LineData from './LineData.js';
import LineDisplay from './LineDisplay.js';
import {Fragment} from "react";

function LineList(props) {
    let dataLength = props.lineList.length;
    let windowLength = 29;
    let displayCheck = dataLength > windowLength;
    let hideClass = "";

    if (props.hideChecks) {
        hideClass = "open";
    } else {
        hideClass = "closed";
    }


    return(

        <Fragment>
            <div>
                <ul type={"none"}>
                    {props.lineList.map((data, index) =>
                        <LineData position={index}
                                  length={dataLength}
                                  disableChecks={props.disableChecks}
                                  hideChecks={props.hideChecks}
                                  selected={props.selectedLines.includes(data.key)}
                                  line={data}
                                  key={data.key}
                                  text={data.text}
                                  clicked={data.clicked}
                                  checked={data.checked}
                                  onItemChanged={props.onItemChanged}
                                  onItemDeleted={props.onItemDeleted}
                                  onItemAdded={props.onItemAdded}
                                  onEdited={props.onEdited}
                                  onToggleSelected={props.onToggleSelected}
                        />)}
                </ul>
            </div>
            <div id="display_lines">
                {displayCheck && props.lineList.map((data) => <LineDisplay/>)}
                {!displayCheck && <Fragment>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                    <LineDisplay/>
                </Fragment>}
            </div>
            {props.showDeleteButton && <div><button className={"trashButton"} onClick={props.onDelete}>&#128465;</button></div>}
            {props.showHideButton &&
                <button id="eyeButton"
                        onClick={props.onHideToggle}>
                    <div>
                        <img id="eye" className={hideClass}/>
                    </div>
                </button>}
        </Fragment>
    )
}

export default LineList;