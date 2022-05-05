import './ListBox.css'
import {Fragment} from "react";


function ListBox(props) {
    return (
        <Fragment>
            <div className={"notes"} aria-label={"note"}>
                <div id={"listbox"}>
                    <button className={"bluebox"}
                            style={{ background: !props.canEdit && props.canView ? "rgb(230, 242, 255)" : "lightsteelblue"}}
                            tabIndex={props.popup ? -1 : 0}
                            onClick={() => {props.onListView(props.name, props.id, props.canViewList, props.canEditList)}}>
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
                {((props.changeThis === props.id) && !props.showDelete && !props.showRename && !props.showShare) &&
                    <div id={"optionsBox"} >
                        {props.canEdit && <div><button className={"options"} tabIndex="0"
                                onClick={() => props.onRenameToggle()}>
                            Rename
                        </button>
                        <button className={"options"} tabIndex="0"
                             onClick={() => props.onDeleteToggle()}>
                            Delete
                        </button></div>}
                        {(!props.canEdit) &&
                            <button className={"options"} tabIndex="0"
                                    onClick={() => props.onRemoveToggle()}>
                                Remove
                            </button>}
                        {(props.isOwner) &&
                            <button className={"options"} tabIndex="0"
                                onClick={() => props.onShareToggle()}>
                                Share
                        </button>}
                        {(!props.isOwner) &&
                            <button className={"options"} tabIndex="0"
                                    onClick={() => props.onShareToggle()}>
                                Shared With
                            </button>}
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default ListBox;



