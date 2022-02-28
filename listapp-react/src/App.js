import './App.css';
import './Lab1EmptyList.css';
import LineList from './LineList.js';
import {useState} from 'react';

const initialData = [
    {
        key: 0,
        field: "Tap to Add Note",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 1,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 2,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 3,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 4,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 5,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 6,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 7,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 8,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 9,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 10,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 11,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 12,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 13,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 14,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 15,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 16,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 17,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 18,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 19,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 20,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 21,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 22,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 23,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    },
    {
        key: 24,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false
    }
];



function App() {
    const [list, setList] = useState(initialData);
    const [tapLine, setTapLine] = useState(0);


    function handleTapLine(position) {
        setTapLine(position);
    }

    function handleMoveTapLine(tap) {
        if (list[tap].field === "") {
            return (setList(list.map(
                (p, index) => index === tapLine ? {...p, field: "Tap to Add Note"} : p)))
        }
        if (list[tap].field !== "Tap to Add Note") {
            handleTapLine(tap+1);
            return (setList(list.map(
                (p, index) => index === tapLine+1 ? {...p, field: "Tap to Add Note"} : p)))
        }
        }

    function handleCheckbox(lineId) {
        return(setList(list.map(
            p => p.key === lineId ? {...p, checked:(!p.checked)} : p))
        );
    }

    function handleLineChange(lineId,field){
        return (
            setList(list.map(
                p => p.key === lineId ? {...p, field:field} : p))
        );
    }

    function handleClick(lineId){
        return(
            setList(list.map(
                p => p.key === lineId ? {...p, clicked:true} : {...p, clicked:false}))
        );
    }

  return (
      <div id="container">
        <div id="button-div"><button class="back-button">&larr;</button></div>
        <div id="title"><h2>TITLE OF LIST</h2></div>
          <LineList linelist={list}
                    listData={initialData}
                    tapLine={tapLine}
                    onLineChangeField={handleLineChange}
                    onTapLine={handleTapLine}
                    onClickLine={handleClick}
                    onCheck={handleCheckbox}
                    onMoveTapLine={handleMoveTapLine}/>
      </div>
  );
}

export default App;
