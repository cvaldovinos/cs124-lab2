import './ListBox.css'
import {Fragment, useState} from "react";


function ListBox(props) {

    const [settings, setSettings] = useState(false)

    return (
        <div>

        {/*  fix tabbing order here  */}
        <div className="notes">
            <div className={"listbox"} onClick={(e) => props.onListView(props.name, props.id)}>
                {props.name}
            </div>
            <button className="settings" onClick={(e) => setSettings(!settings)}></button>
        </div>
            {settings && <div>
                <div className={"options"} onClick={(e) => props.onDeleteToggle(props.id)}>Delete</div>
                <div className={"options"} onClick={(e) => props.onRenameToggle(props.id)}>Rename</div>
            </div>}
        </div>
    )
}

export default ListBox;



