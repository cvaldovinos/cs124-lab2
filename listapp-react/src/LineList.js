import './LineList.css';
import LineData from './LineData.js';
import LineDisplay from './LineDisplay.js';
import {Fragment} from "react";

function LineList(props) {
    // function lineDisplay() {
    //     if (props.linelist.length > 29) {
    //         return (props.linelist.map((data) => <LineDisplay/>))
    //     } else {
    //         return(
    //             for (let i = 0; i < props.linelist.length; i++) {
    //                 <img/>
    //             });
    //     }
    // }
    let dataLength = props.linelist.length;

    return(

        <Fragment>
            <div>
                <ul type={"none"}>
                    {props.linelist.map((data, index) =>
                        <LineData position={index}
                                  length={dataLength}
                                  line={data}
                                  key={data.key}
                                  text={data.text}
                                  clicked={data.clicked}
                                  checked={data.checked}
                                  onItemChanged={props.onItemChanged}
                                  onItemDeleted={props.onItemDeleted}
                                  onItemAdded={props.onItemAdded}
                                  onEdited={props.onEdited}/>)}
                </ul>
            </div>
            <div id="display_lines">
                <img id="firstline"/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
                <img/>
            </div>
            {props.showButton && <div><button className={"trashButton"} onClick={props.onDeleteChecks}>&#128465;</button></div>}
        </Fragment>
    )
}

export default LineList;