import './ListView.css';
import LineList from './LineList.js';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { collection, query, setDoc, doc, updateDoc, deleteDoc, orderBy} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";


function ListView(props) {

    // state data to be used later
    const [selected, setSelected] = useState([]);
    const [edited, setEdited] = useState(-1);
    const [hidden, setHidden] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showPriorities, setShowPriorities] = useState(false);
    const [sort, setSort] = useState("creationAsc");
    const [sortOptions, setSortOptions] = useState(false);
    let showDeleteButton = selected.length > 0;
    let disableChecks = (edited !== -1);

    const qCreationAsc = query(collection(props.db, props.collection, props.listId, "Notes"));
    const qCreationDesc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("created", "desc"));
    const qTextAsc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("text", "asc"));
    const qTextDesc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("text", "desc"));
    const qPriorityAsc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("priority", "asc"));
    const qPriorityDesc = query(collection(props.db, props.collection, props.listId, "Notes"), orderBy("priority", "desc"));

    console.log(selected)
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


    if (!loading) {
        showHideButton = list.filter(p => p.checked).length > 0;
        showSortButton = list.length > 1;
    }

    function handleLineEdited(lineID) {
        // if we're editing the bottommost 'Tap to Add Note' line and the text has changed, update our data/state
        if (lineID !== -2 && document.getElementById('tempTapLine').value!=="") {
                handleItemAdded2(document.getElementById('tempTapLine').value);
            document.getElementById('tempTapLine').value=""
        }
        setEdited(lineID) // update edited line state
    }

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


    function tapLineType(e) {
        // handleLineEdited(-2)
        if (e.key=== 'Enter') {
            handleItemAdded2(document.getElementById('tempTapLine').value);
            document.getElementById('tempTapLine').value="";
            document.activeElement.blur();
            setEdited(-1);
        }
    }

    return (
        <div id="container">
            <div id={"top"} onClick={() => {handleLineEdited(-1)}}>
                <div id={"button-div"}>
                    <button className="back-button" aria-label={"return to home"}
                            tabIndex={(showWarning || showPriorities || sortOptions) ? -1 : 0}
                            onClick={(e) => (props.onListView(""))}>&larr;</button>
                    {showSortButton && <button className="sort-button"
                                               aria-label={"sort"}
                                               tabIndex={(showWarning || showPriorities || sortOptions) ? -1 : 0}
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

            <div id={"title"} ><h2 onClick={() => {handleLineEdited(-1)}}>{props.title}</h2></div>
            <div id={"lineList"} onClick={() => {handleLineEdited(-1)}}>
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
                          warning={(showWarning || showPriorities || sortOptions)}
                />
            </div>
            {/*<div className={"line"}><div id={"textboxDiv"}><input type={"text"}className={"textboxes"}/></div></div>*/}
            {showWarning && <div className={"popup"}>
                    <div id={"back"} onClick={() => setShowWarning(false)}/>
                    <div id={"warning"}>
                        <div>
                            The selected items will be <font color={"red"}>permanently deleted</font>.
                            Are you sure you want to delete these items?
                        </div>
                        <div id={"warningButtons"}>

                            <div id={"no"} tabIndex={0} onClick={() => setShowWarning(false)}>No, Go Back</div>
                            <div id={"yes"} tabIndex={0} onClick={handleDelete}>Yes, Delete</div>

                        </div>
                    </div>
                </div>}
            {showPriorities && <div className={"popup"}>
                    <div id={"back"} onClick={() => setShowPriorities(false)}/>
                    <div id={"warning"}>
                        <div id={"priorityMessage"}> Set priority value for selected items.</div>
                        <div id={"priorityButtons"}>
                            <div id={"priorityZero"} tabIndex={0} onClick={() => handlePrioritySet(0)}>Remove Priority</div>
                            <div id={"priorityOne"} tabIndex={0} onClick={() => handlePrioritySet(1)}>1</div>
                            <div id={"priorityTwo"} tabIndex={0} onClick={() => handlePrioritySet(2)}>2</div>
                            <div id={"priorityThree"} tabIndex={0} onClick={() => handlePrioritySet(3)}>3</div>

                        </div>
                    </div>
            </div>}
            {sortOptions && <div className={"popup"}>
                    <div id={"back"} onClick={() => setSortOptions(false)}/>
                    <div id={"warning"}>
                        <div id={"priorityMessage"}> Choose a sorting option.</div>
                        <div id={"sortOptions"}>
                            <div id={"creationAscButton"} tabIndex={0} onClick={() => changeSortOption("creationAsc")}> Oldest to Newest</div>
                            <div id={"creationDescButton"} tabIndex={0} onClick={() => changeSortOption("creationDesc")}>Newest to Oldest</div>
                            <div id={"textAscButton"} tabIndex={0} onClick={() => changeSortOption("textAsc")}>Alphabetical</div>
                            <div id={"textDescButton"} tabIndex={0} onClick={() => changeSortOption("textDesc")}>Rev. Alphabetical</div>
                            <div id={"priorityDescButton"} tabIndex={0} onClick={() => changeSortOption("priorityAsc")}>Priority (Low to High)</div>
                            <div id={"priorityAscButton"} tabIndex={0} onClick={() => changeSortOption("priorityDesc")}>Priority (High to Low)</div>
                        </div>
                    </div>
            </div>}
            <ul id={"endList"} tabIndex={-1} aria-label={"Tap to Add Note Line"}>
                <li id={"tapLine"} tabIndex={-1}>
                    <input id={"tempTapLine"}
                           className={"tempTapClass"}
                           type={"text"}
                           autoComplete={"off"}
                           aria-label={"Type to Add Note line"}
                           tabIndex={(showWarning || showPriorities || sortOptions) ? -1 : 0}
                           onClick={() => setEdited(-2)}
                           onChange={() => setEdited(-2)}
                           onKeyDown={(e) => tapLineType(e)}
                           defaultValue={""}
                    />
                    <div className={document.activeElement.id!=='tempTapLine' ? "inactiveText": "activeText"} tabIndex={-1}>Tap to Add Note</div>
                </li>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>
                <li className={"empty"} onClick={(e) => handleLineEdited(-1)}/>

            </ul>
            <div id={"bottom"} onClick={() => {handleLineEdited(-1)}}></div>
       </div>
    );
}

export default ListView;
