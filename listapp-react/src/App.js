import './App.css';
import './Lab1EmptyList.css';
import LineList from './LineList.js';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const initialData = [
    {
        key: 0,
        text: "Tap to Add Note",
        checkbox: false,
        checked: false,
        clicked: false,
        visible: true
    },
    {
        key: 1,
        text: "Tap to Add Note",
        checkbox: false,
        checked: false,
        clicked: false,
        visible: true
    }
]



function App() {
const [list, setList] = useState(initialData);
const [selected, setSelected] = useState(-1);
const [edited, setEdited] = useState(-1);
let showButton = (list.filter((item) => item.checked === true)).length > 0;

function handleLineEdited(lineID) {
    if (edited === list[list.length-1].key && list[list.length-1].text !== "Tap to Add Note") {
        handleItemAdded("Tap to Add Note");
    }
    setEdited(lineID)

}

function handleItemChanged(itemID, field, newValue) {
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
}

function handleDeleteChecks() {
    return (
    setList(list.filter((p) => p.checked === false))
    )
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
            checkbox: false,
            clicked: false,
            visible: true
        }]);
}

    return(
        <div id="container" onClick= {(e) => {handleLineEdited(-1)}}>
            <div id="button-div">
                <button className="back-button">&larr;</button>
            </div>
            <div id="title"><h2> TITLE OF LIST</h2></div>
            <LineList linelist={list}
                      listData={initialData}
                      showButton={showButton}
                      onItemChanged={handleItemChanged}
                      onItemDeleted={handleItemDeleted}
                      onDeleteChecks = {handleDeleteChecks}
                      onItemAdded={handleItemAdded}
                      onEdited={handleLineEdited}/>
        </div>
    );
}

export default App;
