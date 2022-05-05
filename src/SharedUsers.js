import './SharedUsers.css'
import {Fragment} from "react";
// import {orderBy, query, where} from "firebase/firestore";
// import {useCollectionData} from "react-firebase-hooks/firestore";

function SharedUsers(props){
    let filteredEdit = props.canEdit.filter((e) => (e !== props.owner));
    let filteredView = props.canView.filter((e) => (!props.canEdit.includes(e)))

    // collection =
    // let checkValidUser = query(props.collectionRef, where('id', '==', 'b97qjRbVqp7TaMiZFdTQ'));
    // console.log(checkValidUser.where("emails", "array-contains", "ccouto@g.hmc.edu"))
    // let [validUsers, loading, error] = useCollectionData(checkValidUser);
    // console.log(validUsers)
    let successful = false;

    return ( <Fragment >
        {(props.id === props.changeThis) && <div>
            <div id={"nameMessage"}> {props.isOwner? "Share" : "Shared With"} </div>
            {props.isOwner && <div>
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
            </div>}
            <div>Owned by: {props.owner}</div>
            <div id={"shareDiv"}>
        {((filteredEdit.length) > 0) && <div className={"sharedBoxes"}>
            <span className={"shareTitles"}> Editors </span>
            <ul className={"shareList"}>
        {filteredEdit.map((data) =>
            <li className={"user"} key={data}> {props.isOwner && <button id={"removeButton"} onClick={() => props.updateSharing(props.id, data, 'Editor')} className={"editPerm"}>X</button>} {data}</li>,

            )}
            </ul>
            </div>}
        {((filteredView.length) > 0) && <div className={"sharedBoxes"}>
            <span className={"shareTitles"}> Viewers</span>
            <ul className={"shareList"}>
        {filteredView.map((data) =>
            <li className={"user"} key={data}> {props.isOwner && <button id={"removeButton"} onClick={() => props.updateSharing(props.id, data, 'Viewer')}>X</button>} {data}</li>
            )}
            </ul>
            </div>}
            </div>
        </div>}</Fragment>)
}


export default SharedUsers;
