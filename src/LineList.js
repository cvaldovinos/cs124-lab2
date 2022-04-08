import './LineList.css';
import LineData from './LineData.js';
import {Fragment} from "react";

function LineList(props) {
    let dataLength = props.lineList.length;
    let hideClass = "";

    // updates the image on the hide button
    if (props.hideChecks) {
        hideClass = "open";
    } else {
        hideClass = "closed";
    }

    function clickTextWrapper(e, text) {
        e.stopPropagation();
        props.onTapEdited(text);
    }


    return(

        <Fragment>
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
                    {/*<li>*/}
                    {/*    <div id={"textboxDiv"}><input type={"text"}*/}
                    {/*                                  onClick={(e) => clickTextWrapper(e, props.tap.text)}*/}
                    {/*                                  onChange={(e) => props.onTapChanged(e.target.value)}*/}
                    {/*                                  onKeyDown={(e) =>*/}
                    {/*                                  {if (e.key === 'Enter') {*/}
                    {/*                                      props.onTapChanged(e.key, props.tap.text);*/}
                    {/*                                      props.onTapEdited(props.tap.text);*/}
                    {/*                                  }}*/}
                    {/*                                  // } if (e.key === 'Backspace') {*/}
                    {/*                                  //     props.onItemChanged(props.line.key, e.key, props.text);*/}
                    {/*                                  }*/}
                    {/*                                  value={props.tap.text}/></div>*/}
                    {/*</li>*/}
            </ul>
            {/*<div id="display_lines">*/}

            {/*    /!*uses displayCheck to determine if we need to add only one line or fill the window with lines*!/*/}
            {/*    {displayCheck && props.lineList.map((data) => <img className={"lineImage"} alt=""/>)}*/}
            {/*    {!displayCheck && <Fragment>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*        <img className={"lineImage"} alt=""/>*/}
            {/*    </Fragment>}*/}
            {/*</div>*/}

            {/*displays our trash/"Delete" button*/}
            <div id={"lower-left-buttons"}>
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
            </div>
        </Fragment>
    )
}

export default LineList;