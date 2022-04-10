import './HomeView.css'
import ListBox from "./ListBox";
import {initializeApp} from "firebase/app";
import { getFirestore, collection, query, setDoc, doc, updateDoc, deleteDoc, serverTimestamp, orderBy} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {Fragment, useState} from "react";

import {useCollectionData} from "react-firebase-hooks/firestore";


// const firebaseConfig = {
//     apiKey: "AIzaSyDlfim9PmxloCfyskIlZd6xt2RxlWem-kw",
//     authDomain: "cs124-lab3-fe950.firebaseapp.com",
//     projectId: "cs124-lab3-fe950",
//     storageBucket: "cs124-lab3-fe950.appspot.com",
//     messagingSenderId: "331313494047",
//     appId: "1:331313494047:web:cab4818df13adc8c9cfd2a"
// };
//
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
//



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
        // setName("")
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
        // setRename("")
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
                    <h1 className={"header"}> Notes </h1>
                </div>
                {/*<button onClick={(e) => props.onListView("Yo")}>Yo</button>*/}
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
                        />)}
                    </div>
                </div>
                <button id="addnotebutton" onClick={(e) => setShowName(!showName)}><div>+</div></button>
                <button id="settings">
                        <div>
                            <img src="https://icon-library.com/images/white-gear-icon-png/white-gear-icon-png-7.jpg" width="30" height="30"/>
                        </div>
                    </button>
                {showDelete && <div>
                    <div>
                        <div id={"back"} onClick={() => {
                            setShowDelete(false);
                            setChangeThis("");
                        }}/>
                        <div id={"warning"}>
                            <div>
                                This note will be <span id={"deleteText"}>permanently deleted</span>.
                                Are you sure you want to do this?
                            </div>
                            <div id={"warningButtons"}>

                                <div id={"no"} tabIndex={"0"} onClick={(e) => {
                                    setShowDelete(false);
                                    setChangeThis("");
                                    }}>No, Go Back</div>
                                <div id={"yes"} tabIndex={"0"} onClick={(e) => handleListDeleted(changeThis)}>Yes, Delete</div>

                            </div>
                        </div>
                    </div>
                </div>}
                {showName && <div>
                    <div>
                        <div id={"back"} onClick={() => setShowName(false)}/>
                        <div id={"warning"}>
                            <div id={"nameMessage"}> Name your note and press 'Enter' to confirm. <br/> (Max. 25 characters)</div>
                            <input id={"createNoteBox"}
                                   type={"text"}
                                   maxLength={25}
                                   autoComplete={"off"}
                                   // onChange ={(e) => {setName(e.target.value)}}
                                   onKeyDown={(e) => {if (e.key === 'Enter') {
                                        handleListAdded(document.getElementById('createNoteBox').value)
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
                            <div id={"nameMessage"}> Rename the selected note and press 'Enter' to confirm. <br/> (Max. 25 characters)</div>
                            <input id={"renameNote"}
                                   type={"text"}
                                   maxLength={25}
                                   autoComplete={"off"}
                                   // onChange ={(e) => {setRename(e.target.value)}}
                                   onKeyDown={(e) => {if (e.key === 'Enter') {
                                       handleListRenamed(changeThis, document.getElementById('renameNote').value)
                                   }
                                   }}></input>

                        </div>
                    </div>
                </div>}
        </div>)
    }

export default HomeView;