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
        let listId = generateUniqueID();
        setDoc(doc(props.db, props.collection, listId),
            {
                key: listId,
                name: listName
            }).then(() => {})
    }

    function handleListDeleted(listId) {
        deleteDoc(doc(props.db, props.collection, listId)).then(() => {});
    }

    if (loading) {
        return <div>Loading...
        </div>;
    }

    console.log("TEST")
    return (<div id="contained">
                <div id="titled">
                    <h1 className={"header"}> Notes </h1>
                </div>
                {/*<button onClick={(e) => props.onListView("Yo")}>Yo</button>*/}
                <div id="bottom-part">
                    {lists?.map((data) => <ListBox id = {data.key}
                                                   name = {data.name}
                                                   onListView = {props.onListView}
                                                   onListDelete = {handleListDeleted}
                    />)}
                </div>

                <div>
                    <button id="addnotebutton" onClick={(e) => handleListAdded(generateUniqueID())}><div>+</div></button>
                    <button id="settings">
                        <div>
                            <img src="https://icon-library.com/images/white-gear-icon-png/white-gear-icon-png-7.jpg" width="30" height="30"/>
                        </div>
                    </button>
                </div>
            </div>)
}

export default HomeView;