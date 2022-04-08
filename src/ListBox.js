import './ListBox.css'
import {Fragment} from "react";


function ListBox(props) {

    return (
        <div>
            <button className="settings" onClick={(e) => props.onListDelete(props.id)}></button>
            <div className="notes"  onClick={(e) => props.onListView(props.name, props.id)}>
                {props.name}
            </div>
        </div>
    )
}

export default ListBox;



