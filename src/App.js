    import './App.css';
import LineList from './LineList.js';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, setDoc, doc, updateDoc, deleteDoc, serverTimestamp, orderBy} from "firebase/firestore";
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

    // state data to be used later
    const [selected, setSelected] = useState([]);
    const [edited, setEdited] = useState(-1);
    const [hidden, setHidden] = useState(false);
    const [showWarning, setWarning] = useState(false);
    const [showPriorities, setPriorities] = useState(false);
    const [showSort, setSort] = useState("");
    const [showSortOptions, setSortOptions] = useState(false);
    let showDeleteButton = selected.length > 0;
    let disableChecks = (edited !== -1);

    // const q = query(collection(db, collectionName), where("created", "!=", "0"), orderBy("created", "desc"));
    // const q = query(collection(db, collectionName));
    // const [list, loading] = useCollectionData(q); // bring back error later

    const qCreationAsc = query(collection(db, collectionName));
    const qCreationDesc = query(collection(db, collectionName), orderBy("created", "desc"));
    const qTextAsc = query(collection(db, collectionName), orderBy("select_visible", "desc"), orderBy("text", "asc"));
    const qTextDesc = query(collection(db, collectionName), orderBy("select_visible", "desc"), orderBy("text", "desc"));
    const qPriorityAsc = query(collection(db, collectionName), orderBy("select_visible", "desc"), orderBy("priority", "asc"));
    const qPriorityDesc = query(collection(db, collectionName), orderBy("priority", "desc"));

    function collectionSelector() {
        if (showSort === "creationDesc") {
            return (qCreationDesc)
        } else if (showSort === "textAsc") {
            return (qTextAsc)
        } else if (showSort === "textDesc") {
            return (qTextDesc)
        } else if (showSort === "priorityAsc") {
            return (qPriorityAsc)
        } else if (showSort === "priorityDesc") {
            return (qPriorityDesc)
        } else{
            return(qCreationAsc)
        }
    }
    const [list,loading] = useCollectionData(collectionSelector());

    let showHideButton = false;
    if (!loading) {
        showHideButton = list.filter(p => p.checked).length > 0;
    }


    // update the edited state with the line key if we've currently clicked onto a line, -1 otherwise
    function handleLineEdited(lineID) {
        // if we're editing the bottommost 'Tap to Add Note' line and the text has changed, update our data/state
        if (edited === list[list.length - 1].key && list[list.length - 1].text !== "Tap to Add Note") {
            if (list[list.length - 1].text === "") {
                handleItemChanged(list[list.length - 1].key, "text", "Tap to Add Note");
            } else {
                // display check and select box for added note, create new tap line
                handleItemChanged(list[list.length - 1].key, "check_visible", true);
                handleItemChanged(list[list.length - 1].key, "select_visible", true);
                handleItemChanged(list[list.length - 1].key, "priority", 0);
                handleItemChanged(list[list.length - 1].key, "created", serverTimestamp());
                handleItemAdded("Tap to Add Note");
            }
        }
        if (lineID === list[list.length - 1].key && edited !== lineID) {
            handleItemChanged(lineID, "text", "")
        }

        setEdited(lineID) // update edited line state
    }

    // changes line data for textboxes, checkboxes, or special key presses
    function handleItemChanged(itemID, field, newValue) {
        // const x = doc(db, collectionName, itemID);
        if (["text", "check_visible", "select_visible", "checked", "priority", "created"].includes(field)) {
            updateDoc(doc(db, collectionName, itemID),
                {
                    [field]: newValue,
                })
        }
        // changes the active/"clicked on" element to body when enter is pressed
        if (field === 'Enter') {
            document.activeElement.blur();
        }
        // deletes line if backspace is pressed while line is empty
        if (field === 'Backspace') {
            if (newValue === "" && itemID !== list[list.length - 1].key) {
                handleItemDeleted(itemID);
                if (selected.includes(itemID)) {
                    handleToggleSelectedLines(itemID);
                }
            }
        }
    }

    // controls whether the hide button should be showing
    function handleHideToggle() {
        setHidden(!hidden);
    }

    // deletes data from the list by filtering out selected keys
    function handleDelete() {
        // setList(list.filter((p) => !selected.includes(p.key)));
        selected.forEach(id => deleteDoc(doc(db, collectionName, id)));
        setSelected([]); // no selected items remain, so update that
        setWarning(false);
    }

    function handlePrioritySet(priority) {
        selected.forEach(id => updateDoc(doc(db, collectionName, id),{priority:priority}))
        setPriorities(false);
    }

    function changeSortOption(sortType) {
        setSort(sortType);
        setSortOptions(false);
    }

    function handleWarning() {
        setWarning(true);
    }

    function handlePriority() {
        setPriorities(true);
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
        deleteDoc(doc(db, collectionName, itemID));
        // return(setList(list.filter((p) => p.key !== itemID)));
    }

    // adds an item by generating an id and using the passing in text
    function handleItemAdded(textValue) {
        const listId = generateUniqueID();
        setDoc(doc(db, collectionName, listId),
            {
                key: listId,
                text: textValue,
                checked: false,
                created: 0,
                priority: -1,
                check_visible: false,
                text_visible: true,
                select_visible: false
            })
    }



    //
    // function sortSet(sort) {
    //     setSortOptions(false);
    //     setSort(sort)
    // }

    if (loading) {
        return <div id={"loadingScreen"}>
            {console.log("Your data is loading...")}
        </div>;
    }
    // this line is being displayed twice, one is italicized
    if (list.length === 0){
        handleItemAdded("Tap to Add Note")
    }
    return (
        <div id="container" onClick={(e) => {
            handleLineEdited(-1)
        }}>
            <div id="button-div">
                <button className="back-button">&larr;</button>
            </div>
                <button className="sort-button"
                        onClick={() => setSortOptions(true)}>&darr;</button>
            <div id="title"><h2> My List</h2></div>
            <div id={"lineList"}>
                <LineList lineList={list}
                          selectedLines={selected}
                          hideChecks={hidden}
                          showDeleteButton={showDeleteButton}
                          showHideButton={showHideButton}
                          disableChecks={disableChecks}
                          onHideToggle={handleHideToggle}
                          onToggleSelected={handleToggleSelectedLines}
                          onItemChanged={handleItemChanged}
                          onItemDeleted={handleItemDeleted}
                          onTrash={handleWarning}
                          onPriority={handlePriority}
                          onItemAdded={handleItemAdded}
                          onEdited={handleLineEdited}
                />
            </div>
            {showWarning && <div>
                <div>
                    <div id={"back"} onClick={() => setWarning(false)}/>
                    <div id={"warning"}>
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
            {showPriorities && <div>
                <div>
                    <div id={"back"} onClick={() => setPriorities(false)}/>
                    <div id={"warning"}>
                        <div id={"priorityButtons"}>
                            <div id={"priorityZero"} onClick={() => handlePrioritySet(0)}>Remove Priority</div>
                            <div id={"priorityOne"} onClick={() => handlePrioritySet(1)}>1</div>
                            <div id={"priorityTwo"} onClick={() => handlePrioritySet(2)}>2</div>
                            <div id={"priorityThree"} onClick={() => handlePrioritySet(3)}>3</div>

                        </div>
                    </div>
                </div>
            </div>}
            {showSortOptions && <div>
                <div>
                    <div id={"back"} onClick={() => setSortOptions(false)}/>
                    <div id={"warning"}>
                        <div id={"sortOptions"}>
                            <div id={"creationDescButton"} onClick={() => changeSortOption("creationDesc")}> Creation Date (Old to New)</div>
                            <div id={"creationAscButton"} onClick={() => changeSortOption("creationAsc")}>Creation Date (New to Old)</div>
                            <div id={"textAscButton"} onClick={() => changeSortOption("textAsc")}>Text (Alphabetical)</div>
                            <div id={"textDescButton"} onClick={() => changeSortOption("textDesc")}>Text (Rev. Alphabetical)</div>
                            <div id={"priorityDescButton"} onClick={() => changeSortOption("priorityAsc")}>Priority (Low to High)</div>
                            <div id={"priorityAscButton"} onClick={() => changeSortOption("priorityDesc")}>Priority (High to Low)</div>
                        </div>
                    </div>
                </div>
            </div>}
       </div>
    );
}

export default App;
