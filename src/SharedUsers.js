import './SharedUsers.css'
import {Fragment} from "react";

function SharedUsers(props){
    let filteredEdit = props.canEdit.filter((e) => (e !== props.owner));
    let filteredView = props.canView.filter((e) => (!props.canEdit.includes(e)))

    return ( <Fragment >
        {(props.id === props.changeThis) && <div>
            <div id={"nameMessage"}> {props.isOwner? "Share" : "Shared with"} </div>
            <input id={"shareWithUser"}
            className={"notebox"}
            type={"text"}
            autoComplete={"off"}
            onKeyDown={(e) => {if (e.key === 'Enter') {
            props.onListShared(props.changeThis,
            document.getElementById('shareWithUser').value,
            document.getElementById('permission').value);
            document.getElementById("shareWithUser").value = "";
        }if (e.key === 'Escape') {
            props.setShowRename(false);
            props.setChangeThis("");
        }
        }}/>
            <select id={"permission"}>
            <option>Editor</option>
            <option>Viewer</option>
            </select>
            <div>Owned by: {props.owner}</div>
            <div id={"shareDiv"}>
        {((filteredEdit.length) > 0) && <div>
            <span className={"shareTitles"}> Editors </span>
            <ul className={"shareList"}>
        {filteredEdit.map((data) =>
            <li className={"user"} key={data}> {data} {props.isOwner && <button onClick={() => props.updateSharing(props.id, data, 'Editor')} className={"editPerm"}>X</button>}</li>,

            )}
            </ul>
            </div>}
        {((filteredView.length) > 0) && <div>
            <span className={"shareTitles"}> Viewers</span>
            <ul className={"shareList"}>
        {filteredView.map((data) =>
            <li className={"user"} key={data}> {data} {props.isOwner && <button onClick={() => props.updateSharing(props.id, data, 'Viewer')}>X</button>}</li>
            )}
            </ul>
            </div>}
            </div>
        </div>}</Fragment>)
}


export default SharedUsers;
