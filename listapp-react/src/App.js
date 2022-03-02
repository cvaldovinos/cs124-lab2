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
        text_visible: true
    }
]



function App() {
const [list, setList] = useState(initialData);
const [selected, setSelected] = useState([]);
const [edited, setEdited] = useState(-1);
let showButton = (list.filter((item) => item.checked === true)).length > 0;
let disableChecks = edited !== -1;

function handleLineEdited(lineID) {

    if (edited === list[list.length-1].key && list[list.length-1].text !== "Tap to Add Note") {
        if (list[list.length-1].text === "") {
            handleItemChanged(list[list.length-1].key, "text", "Tap to Add Note");
        } else {
            list[list.length-1].check_visible = true;
            handleItemAdded("Tap to Add Note");
        }
    }
    if (lineID === list[list.length-1].key && edited !== lineID) {
        handleItemChanged(lineID, "text", "")
    }
    setEdited(lineID)
    console.log(lineID)
}

function handleItemChanged(itemID, field, newValue) {

    // if (edited === list[list.length-1].key && list[list.length-1].text !== "Tap to Add Note") {
    //     if (list[list.length-1].text === "") {
    //         handleItemChanged(list[list.length-1].key, "text", "Tap to Add Note");
    //     } else {
    //         list[list.length-1].check_visible = true;
    //         handleItemAdded("Tap to Add Note");
    //     }
    // }
    // if (lineID === list[list.length-1].key && edited !== lineID) {
    //     handleItemChanged(lineID, "text", "")
    // }
    // setEdited(lineID)
    // console.log(lineID)

    if (field === "text") {
        if (newValue === "" && itemID !== list[list.length-1].key) {
            return (handleItemDeleted(itemID));
        }
        return (
            setList(list.map(
                p => p.key === itemID ? {...p, [field]:newValue} : p))
        );
    }
    if (field === "checkbox") {
        setList(list.map(
            p => p.key === itemID ? {...p, checked:(!p.checked)} : p))
    }
}

function handleDeleteChecks() {
    return (
    setList(list.filter((p) => p.checked === false))
    )
}

function handleToggleSelectedLines(lineID) {
    if (selected.includes(lineID)) {
        setSelected(selected.filter((p) => p.key === lineID))
    } else {
        setSelected([...selected, lineID])
    }
}

function handleHideChecks() {
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
            text_visible: true
        }]);
}

    return(
        <div id="container" onClick= {(e) => {handleLineEdited(-1)}}>
            <div id="button-div">
                <button className="back-button">&larr;</button>
            </div>
            <div id="title"><h2> TITLE OF LIST</h2></div>
            <div id={"yo"}>
                <LineList linelist={list}
                          listData={initialData}
                          showButton={showButton}
                          disableChecks={disableChecks}
                          onItemChanged={handleItemChanged}
                          onItemDeleted={handleItemDeleted}
                          onDeleteChecks = {handleDeleteChecks}
                          onItemAdded={handleItemAdded}
                          onEdited={handleLineEdited}
                          />
            </div>
        </div>
    );
}

export default App;
