import './ListView.css';
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

let tapData = {
    text: "Tap to Add Note"
}

function ListView(props) {

    // state data to be used later
    const [selected, setSelected] = useState([]);
    const [edited, setEdited] = useState(-1);
    const [hidden, setHidden] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showPriorities, setShowPriorities] = useState(false);
    const [sort, setSort] = useState("creationAsc");
    const [sortOptions, setSortOptions] = useState(false);
    const [tapLine, setTapLine] = useState(tapData)
    const [tapLineActive, setTapLineActive] = useState(false);

    let showDeleteButton = selected.length > 0;
    let disableChecks = (edited !== -1);

    const qCreationAsc = query(collection(props.db, props.collection, props.listId, "Notes"));
    const qCreationDesc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("created", "desc"));
    const qTextAsc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("text", "asc"));
    const qTextDesc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("text", "desc"));
    const qPriorityAsc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("priority", "asc"));
    const qPriorityDesc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("priority", "desc"));

    console.log(edited)
    function collectionSelector() {
        if (sort === "creationDesc") {
            return (qCreationDesc)
        } else if (sort === "textAsc") {
            return (qTextAsc)
        } else if (sort === "textDesc") {
            return (qTextDesc)
        } else if (sort === "priorityAsc") {
            return (qPriorityAsc)
        } else if (sort === "priorityDesc") {
            return (qPriorityDesc)
        } else{
            return(qCreationAsc)
        }
    }
    let [list,loading,error] = useCollectionData(collectionSelector());

    if (error) {
        console.log("ERROR: List data failed to load from Firestore")
    }

    let showHideButton = false;
    let showSortButton = false;

    // let createTapLine = false;


    if (!loading) {
        showHideButton = list.filter(p => p.checked).length > 0;
        showSortButton = list.length > 1;
        // document.getElementById('tempTapLine').value="Tap to Add Note"
        //
        // console.log("list: ", list);
        // console.log("test")
        // let newList = list;
        // if(createTapLine===false){
        //     newList.push(
        //         {key: generateUniqueID(),
        //             text: "Tap to Add Note",
        //             checked: false,
        //             created: 0,
        //             priority: -1,
        //             check_visible: false,
        //             text_visible: true,
        //             select_visible: false}
        //     )
        //     createTapLine = true;
        // }
        //
        // list = newList;
    }


    // // update the edited state with the line key if we've currently clicked onto a line, -1 otherwise
    // function oldhandleLineEdited(lineID) {
    //     // if we're editing the bottommost 'Tap to Add Note' line and the text has changed, update our data/state
    //     if (edited === list[list.length - 1].key && list[list.length - 1].text !== "Tap to Add Note") {
    //         if (list[list.length - 1].text === "") {
    //             handleItemChanged(list[list.length - 1].key, "text", "Tap to Add Note");
    //         } else {
    //             // display check and select box for added note, create new tap line
    //             handleItemChanged(list[list.length - 1].key, "check_visible", true);
    //             handleItemChanged(list[list.length - 1].key, "select_visible", true);
    //             handleItemChanged(list[list.length - 1].key, "priority", 0);
    //             handleItemChanged(list[list.length - 1].key, "created", serverTimestamp());
    //             handleItemAdded("Tap to Add Note");
    //         }
    //     }
    //     if (lineID === list[list.length - 1].key && edited !== lineID) {
    //         handleItemChanged(lineID, "text", "")
    //     }
    //
    //     setEdited(lineID) // update edited line state
    // }

    function handleLineEdited(lineID) {
        // if we're editing the bottommost 'Tap to Add Note' line and the text has changed, update our data/state
        if (lineID !== -2 && document.getElementById('tempTapLine').value!=="") {
                handleItemAdded2(document.getElementById('tempTapLine').value);
            document.getElementById('tempTapLine').value=""
        }
        setEdited(lineID) // update edited line state
    }




    // function handleTapEdited(newValue) {
    //     if (edited === -2 && tapLine.text !== "Tap to Add Note") {
    //         if (tapLine.text === "") {
    //             handleTapChanged(newValue);
    //         } else {
    //             // display check and select box for added note, create new tap line
    //             handleItemAdded(newValue);
    //             setTapLine({
    //                 text: "Tap to Add Note"
    //             })
    //         }
    //     }
    //     console.log("here")
    //     setEdited(-2);
    // }

    // function handleTapChanged(key, newValue) {
    //     setTapLine({
    //         text: newValue
    //     })
    //     if (key === "Enter") {
    //         document.activeElement.blur();
    //     }
    // }

    // changes line data for textboxes, checkboxes, or special key presses
    function handleItemChanged(itemID, field, newValue) {
        if (["text", "check_visible", "select_visible", "checked", "priority", "created"].includes(field)) {
            updateDoc(doc(props.db, props.collection, props.listId, "Notes", itemID),
                {
                    [field]: newValue,
                }).then(() => {})
        }
        // changes the active/"clicked on" element to body when enter is pressed
        if (field === 'Enter') {
            document.activeElement.blur();
        }
        // deletes line if backspace is pressed while line is empty
        if (field === 'Backspace') {
            if (newValue === "") {
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
        selected.forEach(id => deleteDoc(doc(props.db, props.collection, props.listId, "Notes", id)));
        setSelected([]); // no selected items remain, so update that
        setShowWarning(false);
    }

    function handlePrioritySet(priority) {
        selected.forEach(id => updateDoc(doc(props.db, props.collection, props.listId, "Notes", id),{priority:priority}))
        setShowPriorities(false);
    }

    function changeSortOption(sortType) {
        setSort(sortType);
        setSortOptions(false);
    }

    function handleWarning() {
        setShowWarning(true);
    }

    function handlePriority() {
        setShowPriorities(true);
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
        deleteDoc(doc(props.db, props.collection, props.listId, "Notes", itemID)).then(() => {});
    }

    // adds an item by generating an id and using the passing in text
    function handleItemAdded(textValue) {
        const lineId = generateUniqueID();
        setDoc(doc(props.db, props.collection, props.listId, "Notes", lineId),
            {
                key: lineId,
                text: textValue,
                checked: false,
                created: 0,
                priority: -1,
                check_visible: false,
                text_visible: true,
                select_visible: false
            }).then(() => {})
    }

    function handleItemAdded2(textValue) {
        const lineId = generateUniqueID();
        setDoc(doc(props.db, props.collection, props.listId, "Notes", lineId),
            {
                key: lineId,
                text: textValue,
                checked: false,
                created: 0,
                priority: 0,
                check_visible: true,
                text_visible: true,
                select_visible: true
            }).then(() => {})
    }

    if (loading) {
        return <div id={"loadingScreen"}>Loading...
        </div>;
    }

    // this line is being displayed twice, one is italicized



   // if ('tempTapLine' === document.activeElement.id) {
   //          console.log("hooray");
   //          // document.activeElement.blur();
   // }



    function tapLineClick() {
        setEdited(-2)
    }

    function tapLineType(e) {
        // handleLineEdited(-2)
        if (e.key=== 'Enter') {
            handleItemAdded2(document.getElementById('tempTapLine').value);
            document.getElementById('tempTapLine').value="";
            document.activeElement.blur();
            setEdited(-1);
        }
    }

    // function offTapLine() {
    //     if (onTapLine){
    //         console.log("im here")
    //         if(document.activeElement.id !== "temptapLine")
    //             document.getElementById('tempTapLine').value="Tap to Add Note"
    //         onTapLine=false
    //         console.log("onTapLine2")
    //     }
    // }




    return (
        <div id="container">
            <div id={"top"} onClick={() => {handleLineEdited(-1)}}>
                <div id={"button-div"}>
                    <button className="back-button" onClick={(e) => (props.onListView(""))}>&larr;</button>
                    {showSortButton && <button className="sort-button"
                                               onClick={() => setSortOptions(true)}>

                        {(sort === "textAsc") && <div className={"sort-button-display"}><div id={"sortArrow"}>&darr;</div><div id={"sortText"}>A Z</div></div>}
                        {(sort === "textDesc") && <div className={"sort-button-display"}><div id={"sortArrow"}>&darr;</div><div id={"sortText"}>Z A</div></div>}
                        {(sort === "creationAsc") && <div className={"sort-button-display"}><div id={"sortArrow"}>&darr;</div><div id={"sortDate"}><div id={"date1"}>JAN</div><div id={"date2"}>DEC</div></div></div>}
                        {(sort === "creationDesc") && <div className={"sort-button-display"}><div id={"sortArrow"}>&darr;</div><div id={"sortDate"}><div id={"date1"}>DEC</div><div id={"date2"}>JAN</div></div></div>}
                        {(sort === "priorityAsc") && <div className={"sort-button-display"}><div id={"sortArrow"}>&darr;</div><div id={"sortText"}>1 3</div></div>}
                        {(sort === "priorityDesc") && <div className={"sort-button-display"}><div id={"sortArrow"}>&darr;</div><div id={"sortText"}>3 1</div></div>}
                    </button>}
                </div>
            </div>
            <div id={"tapLine"}>
                <input id={"tempTapLine"}
                       className={"tempTapClass"}
                       type={"text"}
                       autoComplete={"off"}
                       onClick={() => tapLineClick()}
                       onKeyDown={(e) => tapLineType(e)}
                       defaultValue={""}
                />
                <div className={document.activeElement.id==='tempTapLine' ? "activeText": "inactiveText"}>Tap to Add Note</div>
            </div>

            <div id="title" ><h2 onClick={() => {handleLineEdited(-1)}}>{props.title}</h2></div>
            <div id={"lineList"} onClick={() => {handleLineEdited(-1)}}>
                <LineList lineList={list}
                          tap={tapLine}
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
            {/*<div className={"line"}><div id={"textboxDiv"}><input type={"text"}className={"textboxes"}/></div></div>*/}
            {showWarning && <div className={"popup"}>
                    <div id={"back"} onClick={() => setShowWarning(false)}/>
                    <div id={"warning"}>
                        <div>
                            The selected items will be <span id={"deleteText"}>permanently deleted</span>.
                            Are you sure you want to delete these items?
                        </div>
                        <div id={"warningButtons"}>

                            <div id={"no"} onClick={() => setShowWarning(false)}>No, Go Back</div>
                            <div id={"yes"} onClick={handleDelete}>Yes, Delete</div>

                        </div>
                    </div>
                </div>}
            {showPriorities && <div className={"popup"}>
                    <div id={"back"} onClick={() => setShowPriorities(false)}/>
                    <div id={"warning"}>
                        <div id={"priorityMessage"}> Set priority value for selected items.</div>
                        <div id={"priorityButtons"}>
                            <div id={"priorityZero"} onClick={() => handlePrioritySet(0)}>Remove Priority</div>
                            <div id={"priorityOne"} onClick={() => handlePrioritySet(1)}>1</div>
                            <div id={"priorityTwo"} onClick={() => handlePrioritySet(2)}>2</div>
                            <div id={"priorityThree"} onClick={() => handlePrioritySet(3)}>3</div>

                        </div>
                    </div>
            </div>}
            {sortOptions && <div className={"popup"}>
                    <div id={"back"} onClick={() => setSortOptions(false)}/>
                    <div id={"warning"}>
                        <div id={"priorityMessage"}> Choose a sorting option.</div>
                        <div id={"sortOptions"}>
                            <div id={"creationAscButton"} onClick={() => changeSortOption("creationAsc")}> Oldest to Newest</div>
                            <div id={"creationDescButton"} onClick={() => changeSortOption("creationDesc")}>Newest to Oldest</div>
                            <div id={"textAscButton"} onClick={() => changeSortOption("textAsc")}>Alphabetical</div>
                            <div id={"textDescButton"} onClick={() => changeSortOption("textDesc")}>Rev. Alphabetical</div>
                            <div id={"priorityDescButton"} onClick={() => changeSortOption("priorityAsc")}>Priority (Low to High)</div>
                            <div id={"priorityAscButton"} onClick={() => changeSortOption("priorityDesc")}>Priority (High to Low)</div>
                        </div>
                    </div>
            </div>}
       </div>
    );
}

export default ListView;
