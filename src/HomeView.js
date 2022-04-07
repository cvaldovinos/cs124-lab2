import './HomeView.css'

import {initializeApp} from "firebase/app";
import { getFirestore, collection, query, setDoc, doc, updateDoc, deleteDoc, serverTimestamp, orderBy} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {Fragment} from "react";
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
    let [lists,loading,error] = useCollectionData(collection(props.db, props.collection));

    function handleListAdded(listName) {
        console.log("clicked");
        // let collId = generateUniqueID()
        // let subColl = collection(props.db, collId)
        // setDoc(subColl, {
        //     name: listName,
        //     id: collId
        // })
        let collId = generateUniqueID();
        setDoc(doc(props.db, props.collection, collId),
            {
                key: collId,
                name: listName
            }).then(() => {})
        props.db.collection(props.collection).doc(collId).set({
            password: "nothing"
        })
    }

    console.log("TEST")
    return (<Fragment>
        <div id="contained">
            <div id="titled">
                <h1 className={"header"}> Notes </h1>
            </div>
            {/*<button onClick={(e) => props.onListView("Yo")}>Yo</button>*/}
            <div id="bottom-part">
                <div class="notes" id="note1" onClick={(e) => props.onListView("Yo")}>
                    To Do
                </div>
                <div class="notes" id="note2" onClick={(e) => handleListAdded("something")}>
                    Life Goals and Hobbies
                </div>
                <div class="notes" id="note3">
                    Hopes, Dreams, and Precious Memories
                </div>
                <div class="notes" id="note4">
                    Social Security Number
                </div>
                <div class="notes" id="note5">
                    Passwords
                </div>
                <div class="notes" id="note6">
                    Contacts
                </div>
                <div class="notes" id="note7">
                    Untitled Note
                </div>
            </div>
            </div>
        <div>
            <button id="addnotebutton"><div>+</div></button>
            <button id="settings">
                <div>
                    <img src="https://icon-library.com/images/white-gear-icon-png/white-gear-icon-png-7.jpg" width="30" height="30"/>
                </div>
            </button>
        </div>
    </Fragment>)
}

export default HomeView;