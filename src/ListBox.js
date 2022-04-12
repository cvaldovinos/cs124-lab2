import './ListBox.css'
import {Fragment} from "react";


function ListBox(props) {
    return (
        <Fragment>
            <div className={"notes"} aria-label={"note"}>
                <div id={"listbox"}>
                    <button className={"bluebox"} tabIndex={props.popup ? -1 : 0} onClick={() => {props.onListView(props.name, props.id)}}>
                    {props.name}
                    </button>
                    <button className="settings" aria-label={"note options"} onClick={() => {
                        if (props.changeThis===props.id) {
                            props.onChangeThisUpdate("")
                        } else{
                            props.onChangeThisUpdate(props.id);
                        }
                    }}/>
                </div>
                {((props.changeThis === props.id) && !props.showDelete && !props.showRename) &&
                    <div id={"optionsBox"} >
                        <button className={"options"} tabIndex="0"
                                onClick={() => props.onRenameToggle()}>
                            Rename
                        </button>
                        <button className={"options"} tabIndex="0"
                             onClick={() => props.onDeleteToggle()}>
                            Delete
                        </button>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default ListBox;



