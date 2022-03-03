import './App.css';
import './Lab1EmptyList.css';
import LineList from './LineList.js';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const initialData = [
    {
        key: 0,
        text: "Tap to Add Note",
        checked: false,
        check_visible: false,
        text_visible: true,
        select_visible: false
    }
]

function App() {
const [list, setList] = useState(initialData);
const [selected, setSelected] = useState([]);
const [edited, setEdited] = useState(-1);
const [hidden, setHidden] = useState(false);
let showHideButton = (list.filter((item) => item.checked === true)).length > 0;
let showDeleteButton = selected.length > 0;
let disableChecks = edited !== -1;

function handleLineEdited(lineID) {

    if (edited === list[list.length-1].key && list[list.length-1].text !== "Tap to Add Note") {
        if (list[list.length-1].text === "") {
            handleItemChanged(list[list.length-1].key, "text", "Tap to Add Note");
            // console.log("TtAN1 created")
        } else {
            list[list.length-1].check_visible = true;
            list[list.length-1].select_visible = true;
            handleItemAdded("Tap to Add Note");
            // console.log("TtAN2 created")
        }
    }
    if (lineID === list[list.length-1].key && edited !== lineID) {
        handleItemChanged(lineID, "text", "")
    }
    setEdited(lineID)
}

function handleItemChanged(itemID, field, newValue) {
    console.log('test')

    if (field === "text") {
        return (
            setList(list.map(
                p => p.key === itemID ? {...p, [field]:newValue} : p))
        );
    }
    if (field === "checkbox") {
        setList(list.map(
            p => p.key === itemID ? {...p, checked:(!p.checked)} : p))
    }
    if (field === 'Enter') {
        console.log("edited line:", edited)
        console.log("active element: ", document.activeElement)
        document.activeElement.blur();
        console.log("active element: ", document.activeElement)
    }
    if (field === 'Backspace') {
        if (newValue === "" && itemID !== list[list.length-1].key) {
            handleItemDeleted(itemID);
            if (selected.includes(itemID)) {
                handleToggleSelectedLines(itemID);
            }
            // return (handleToggleSelectedLines(itemID));
        }
    }}

function handleHideToggle() {
    console.log(!hidden)
    setHidden(!hidden);
}

function handleLineKeyPress(keyPress, text) {
    if (keyPress === 'Enter') {
        document.activeElement.blur();
        console.log("active element: ", document.activeElement)
    }
    if (keyPress === 'Backspace' && text === "") {

    }
}

function handleDelete() {
        setList(list.filter((p) => !selected.includes(p.key)));
        setSelected([]);
}

function handleToggleSelectedLines(lineID) {
    if (selected.includes(lineID)) {
        setSelected(selected.filter((p) => p !== lineID))
    } else {
        setSelected([...selected, lineID])
    }
}

function handleItemDeleted(itemID) {
    return(setList(list.filter((p) => p.key !== itemID)));
}

function handleItemAdded(textValue) {
    setList([...list,
        {
            key: generateUniqueID(),
            text: textValue,
            checked: false,
            check_visible: false,
            text_visible: true,
            select_visible: false
        }]);
}

    return(
        <div id="container" onClick= {(e) => {handleLineEdited(-1)}}>
            <div id="button-div">
                <button className="back-button">&larr;</button>
            </div>
            <div id="title"><h2> TITLE OF LIST</h2></div>
            <div id={"lineList"}>
                <LineList lineList={list}
                          listData={initialData}
                          selectedLines={selected}
                          hideChecks={hidden}
                          showDeleteButton={showDeleteButton}
                          showHideButton={showHideButton}
                          disableChecks={disableChecks}
                          onHideToggle={handleHideToggle}
                          onToggleSelected={handleToggleSelectedLines}
                          onItemChanged={handleItemChanged}
                          onItemDeleted={handleItemDeleted}
                          onDelete = {handleDelete}
                          onItemAdded={handleItemAdded}
                          onEdited={handleLineEdited}
                          />
            </div>
        </div>
    );
}

export default App;
