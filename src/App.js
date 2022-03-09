import './App.css';
import LineList from './LineList.js';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, setDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlfim9PmxloCfyskIlZd6xt2RxlWem-kw",
    authDomain: "cs124-lab3-fe950.firebaseapp.com",
    projectId: "cs124-lab3-fe950",
    storageBucket: "cs124-lab3-fe950.appspot.com",
    messagingSenderId: "331313494047",
    appId: "1:331313494047:web:cab4818df13adc8c9cfd2a"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const collectionName = "cs124-lab3-fe950";


function App() {

    // Each list item is initialized with the fields shown below
    const initialData = [
        {
            key: 0,
            // text is the value displayed in the textbox
            text: "Tap to Add Note",
            // checked is whether the checkbox is checked or not
            checked: false,
            // these fields determine whether the checkbox, textbox, and select button are each visible
            check_visible: false,
            text_visible: true,
            select_visible: false
        }
    ]

    const q = query(collection(db, collectionName));
    const [list, loading, error] = useCollectionData(q);

    // state data to be used later
    // const [list, setList] = useState(initialData);
    const [selected, setSelected] = useState([]);
    const [edited, setEdited] = useState(-1);
    const [hidden, setHidden] = useState(false);
    const [showWarning, setWarning] = useState(false);

    // stores data on what to display
    // const showHideButton = (list.filter((item) => item.checked)).length > 0;
    const showDeleteButton = selected.length > 0;
    const disableChecks = (edited !== -1);

    // update the edited state with the line key if we've currently clicked onto a line, -1 otherwise
    function handleLineEdited(lineID) {

        // if we're editing the bottommost 'Tap to Add Note' line and the text has changed, update our data/state
        if (edited === list[list.length-1].key && list[list.length-1].text !== "Tap to Add Note") {
            if (list[list.length-1].text === "") {
                handleItemChanged(list[list.length-1].key, "text", "Tap to Add Note");

            } else {
                // display check and select box for added note, create tap line
                list[list.length-1].check_visible = true;
                list[list.length-1].select_visible = true;
                handleItemAdded("Tap to Add Note");

            }
        }
        if (lineID === list[list.length-1].key && edited !== lineID) {
            handleItemChanged(lineID, "text", "")
        }

        setEdited(lineID) // update edited line state
    }

    // changes line data for textboxes, checkboxes, or special key presses
    function handleItemChanged(itemID, field, newValue) {

        if (field === "text") {
            // return (
            //     setList(list.map(
            //         p => p.key === itemID ? {...p, [field]:newValue} : p))
            // );
        }
        if (field === "checkbox") {
            // setList(list.map(
            //     p => p.key === itemID ? {...p, checked:(!p.checked)} : p))
        }

        // changes the active/"clicked on" element to body when enter is pressed
        if (field === 'Enter') {
            document.activeElement.blur();
        }

        // deletes line if backspace is pressed while line is empty
        if (field === 'Backspace') {
            if (newValue === "" && itemID !== list[list.length-1].key) {
                handleItemDeleted(itemID);
                if (selected.includes(itemID)) {
                    handleToggleSelectedLines(itemID);
                }
            }
        }}

    // controls whether the hide button should be showing
    function handleHideToggle() {
        setHidden(!hidden);
    }

    // deletes data from the list by filtering out selected keys
    function handleDelete() {
        // setList(list.filter((p) => !selected.includes(p.key)));
        setSelected([]); // no selected items remain, so update that
        setWarning(false);
    }


    function handleWarning() {
        setWarning(true);
    }

    // changes display of selected lines by filtering selected lines
    function handleToggleSelectedLines(lineID) {
        if (selected.includes(lineID)) {
            setSelected(selected.filter((p) => p !== lineID))
        } else {
            setSelected([...selected, lineID])
        }
    }

    // deletes an item by filtering it out from the data
    function handleItemDeleted(itemID) {
        // return(setList(list.filter((p) => p.key !== itemID)));
    }

    // adds an item by generating an id and using the passing in text
    function handleItemAdded(textValue) {
        // setList([...list,
        //     {
        //         key: generateUniqueID(),
        //         text: textValue,
        //         checked: false,
        //         check_visible: false,
        //         text_visible: true,
        //         select_visible: false
        //     }]);
    }

    return(
        <div id="container" onClick= {(e) => {handleLineEdited(-1)}}>
            <div id="button-div">
                <button className="back-button">&larr;</button>
            </div>
            <div id="title"><h2> My List</h2></div>
            <div id={"lineList"}>
                <LineList lineList={list}
                          listData={initialData}
                          selectedLines={selected}
                          hideChecks={hidden}
                          showDeleteButton={showDeleteButton}
                          // showHideButton={showHideButton}
                          disableChecks={disableChecks}
                          onHideToggle={handleHideToggle}
                          onToggleSelected={handleToggleSelectedLines}
                          onItemChanged={handleItemChanged}
                          onItemDeleted={handleItemDeleted}
                          onTrash={handleWarning}
                          onItemAdded={handleItemAdded}
                          onEdited={handleLineEdited}
                          />
            </div>
            {showWarning && <div>
                <div>
                    <div id={"back"} onClick={() => setWarning(false)}/>
                    <div id={"warning"} >
                        <div>
                            The selected items will be <span id={"deleteText"}>permanently deleted</span>.
                            Are you sure you want to delete these items?
                        </div>
                        <div id={"warningButtons"}>


                            <div id={"no"} onClick={() => setWarning(false)}>No, Go Back</div>
                            <div id={"yes"} onClick={handleDelete}>Yes, Delete</div>

                        </div>

                    </div>
                </div>
            </div>}
        </div>
    );
}

export default App;
