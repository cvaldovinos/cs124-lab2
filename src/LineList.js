import './LineList.css';
import LineData from './LineData.js';
import {Fragment} from "react";

function LineList(props) {
    let dataLength = props.lineList.length;
    let windowLength = 29; // number of lines that typically fit on our Moto G4 page
    let displayCheck = dataLength > windowLength;
    let hideClass = "";

    // updates the image on the hide button
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
                                  anySelected={props.selectedLines.length > 0}
                                  line={data}
                                  key={data.key}
                                  text={data.text}
                                  clicked={data.clicked}
                                  checked={data.checked}
                                  priority={data.priority}
                                  onItemChanged={props.onItemChanged}
                                  onItemDeleted={props.onItemDeleted}
                                  onItemAdded={props.onItemAdded}
                                  onEdited={props.onEdited}
                                  onToggleSelected={props.onToggleSelected}
                        />)}
                </ul>
            </div>
            <div id="display_lines">

                {/*uses displayCheck to determine if we need to add only one line or fill the window with lines*/}
                {displayCheck && props.lineList.map((data) => <img className={"lineImage"} alt=""/>)}
                {!displayCheck && <Fragment>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                    <img className={"lineImage"} alt=""/>
                </Fragment>}
            </div>

            {/*displays our trash/"Delete" button*/}
            {props.showDeleteButton && <div><button className={"priority"}
                                                    onClick={props.onPriority}>
                                                &#128290;
                                            </button>
                                            <button className={"trashButton"}
                                                    onClick={props.onTrash}>
                                                &#128465;
                                            </button>
                                        </div>}

            {/*displays our show/hide completed items button */}
            {props.showHideButton &&
                <button id="eyeButton"
                        onClick={props.onHideToggle}>
                    <div>
                        <img id="eye" className={hideClass} alt={""}/>
                    </div>
                </button>}
        </Fragment>
    )
}

export default LineList;