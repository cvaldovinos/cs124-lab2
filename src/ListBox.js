import './ListBox.css'
import {Fragment, useState} from "react";


function ListBox(props) {


    // setSettings(false);

    return (
        <Fragment>

        {/*  fix tabbing order here  */}
            <div className={"notes"}>
                <button className={"listbox"} onClick={(e) => props.onListView(props.name, props.id)}>
                    {props.name}
                </button>
                <button className="settings" onClick={(e) => {
                    if (props.changeThis===props.id) {
                        props.onChangeThisUpdate("");
                    } else{
                        props.onChangeThisUpdate(props.id);
                    }
                }}/>
            </div>
            {((props.changeThis === props.id) && !props.showDelete && !props.showRename) &&
                <div>
                    <div className={"options"}
                         onClick={(e) => props.onDeleteToggle()}
                    >Delete</div>
                    <div className={"options"}
                         onClick={(e) => props.onRenameToggle()}>Rename</div>
                </div>
            }
        </Fragment>
    )
}

export default ListBox;



