import './ListBox.css'
import {Fragment, useState} from "react";


function ListBox(props) {


    // setSettings(false);

    return (
        <div>
        {/*  fix tabbing order here  */}
            <div className={"notes"} aria-label={"note"}>
                <div id={"listbox"}>
                    <button className={"bluebox"} onClick={(e) => {props.onListView(props.name, props.id)}}>
                    {props.name}
                    </button>
                    <button className="settings" aria-label={"note options"} onClick={(e) => {
                        if (props.changeThis===props.id) {
                            props.onChangeThisUpdate("")
                        } else{
                            props.onChangeThisUpdate(props.id);
                        }
                    }}/>
                </div>

                {((props.changeThis === props.id) && !props.showDelete && !props.showRename) &&
                    <div id={"optionsBox"} >
                        <div className={"options"} tabIndex="0"
                             onClick={(e) => props.onDeleteToggle()}
                        >Delete</div>
                        <div className={"options"} tabIndex="0"
                             onClick={(e) => props.onRenameToggle()}>Rename</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ListBox;



