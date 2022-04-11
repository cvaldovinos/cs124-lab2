import './HomeView.css'
import ListBox from "./ListBox";
import { collection, setDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useState} from "react";

import {useCollectionData} from "react-firebase-hooks/firestore";


function HomeView(props) {
    const [showName, setShowName] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [changeThis, setChangeThis] = useState("")
    const [showRename, setShowRename] = useState(false)

    let [lists,loading,error] = useCollectionData(collection(props.db, props.collection));
    if (error) {
        console.log("ERROR: List data failed to load from Firestore")
    }

    function handleListAdded(listName) {
        console.log("add")
        let listId = generateUniqueID();
        setShowName(false)
        setDoc(doc(props.db, props.collection, listId),
            {
                key: listId,
                name: listName
            }).then(() => {})
    }


    function handleListDeleted(listId) {
        console.log("delete")
        setChangeThis("");
        setShowDelete(!showDelete)
        deleteDoc(doc(props.db, props.collection, listId)).then(() => {});
    }

    function handleListRenamed(listId, newName) {
        setChangeThis("")
        setShowRename(!showRename)
        updateDoc(doc(props.db, props.collection, listId),
            {
                name: newName,
            }).then(() => {})
    }

    function handleDeleteToggle() {
        setShowDelete(!showDelete);
    }

    function handleRenameToggle() {
        setShowRename(!showRename)
    }
    
    function handleChangeThisUpdate(listId) {
        setChangeThis(listId)
    }

    if (loading) {
        return <div className={"homeLoading"}>Loading...
        </div>;
    }

    return (<div id="homepage">
                <div id="titled">
                    <button id="settings"
                            tabIndex={(showName || showDelete || showRename) ? -1 : 0}
                            aria-label={"settings"}>
                        <div>
                            <img    id={"cogwheel"}
                                    src="https://icon-library.com/images/white-gear-icon-png/white-gear-icon-png-7.jpg"
                                    tabIndex={-1}
                                    alt={"cog"}/>
                        </div>
                    </button>
                    <h1 tabIndex={(showName || showDelete || showRename) ? -1 : 0} className={"header"}> Notes </h1>
                </div>
                <div id={"bottom-part"} onClick={() => {
                    console.log("parentclicked")
                }}>
                    <div id="bottom-flex" >

                        {lists?.map((data) =>
                            <ListBox key = {data.key}
                                     id = {data.key}
                                     name = {data.name}
                                     onListView = {props.onListView}
                                     changeThis = {changeThis}
                                     showDelete = {showDelete}
                                     showRename = {showRename}
                                     onDeleteToggle = {handleDeleteToggle}
                                     onRenameToggle = {handleRenameToggle}
                                     onChangeThisUpdate = {handleChangeThisUpdate}
                                     popup={(showName || showDelete || showRename)}
                        />)}
                    </div>
                </div>
                <button id="addnotebutton"
                        tabIndex={(showName || showDelete || showRename) ? -1 : 0}
                        aria-label={"add note"} onClick={(e) => setShowName(!showName)}><div>+</div></button>
                {showDelete && <div>
                    <div>
                        <div id={"back"} onClick={() => {
                            setShowDelete(false);
                            setChangeThis("");
                        }}/>
                        <div id={"warning"}>
                            <div>
                                This note will be <font color={"red"}>permanently deleted</font>.
                                Are you sure you want to do this?
                            </div>
                            <div id={"warningButtons"}>

                                <button id={"no"} className={"warningOption"} tabIndex={0} onClick={(e) => {
                                    setShowDelete(false);
                                    setChangeThis("");
                                    }}>No, Go Back</button>
                                <button id={"yes"} className={"warningOption"} tabIndex={0} onClick={(e) => handleListDeleted(changeThis)}>Yes, Delete</button>

                            </div>
                        </div>
                    </div>
                </div>}
                {showName && <div>
                    <div>
                        <div id={"back"} onClick={() => setShowName(false)}/>
                        <div id={"warning"}>
                            <div id={"nameMessage"}> Name your note and press 'Enter' to confirm. </div>
                            <div>(Max. 25 characters)</div>
                            <input id={"createNoteBox"}
                                   className={"notebox"}
                                   type={"text"}
                                   maxLength={25}
                                   autoComplete={"off"}
                                   onKeyDown={(e) => {
                                       if (e.key === 'Enter') {
                                            handleListAdded(document.getElementById('createNoteBox').value)
                                        }
                                       if (e.key === 'Escape') {
                                           setShowName(false);
                                           setChangeThis("");
                                       }
                                   }}></input>

                            </div>
                        </div>
                    </div>}
                {showRename && <div>
                    <div>
                        <div id={"back"} onClick={() => {
                            setShowRename(false);
                            setChangeThis("");
                        }}/>
                        <div id={"warning"}>
                            <div id={"nameMessage"}> Rename the selected note and press 'Enter' to confirm.</div>
                            <div>(Max. 25 characters)</div>
                            <input id={"renameNote"}
                                   className={"notebox"}
                                   type={"text"}
                                   maxLength={25}
                                   autoComplete={"off"}
                                   onKeyDown={(e) => {if (e.key === 'Enter') {
                                       handleListRenamed(changeThis, document.getElementById('renameNote').value)
                                   }if (e.key === 'Escape') {
                                       setShowRename(false);
                                       setChangeThis("");
                                   }
                                   }}></input>

                        </div>
                    </div>
                </div>}
        </div>)
    }

export default HomeView;