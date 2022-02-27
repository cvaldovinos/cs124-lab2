import './App.css';
import './Lab1EmptyList.css';
import LineList from './LineList.js';
import {useState} from 'react';

const initialData = [
    {
        key: 0,
        field: "Tap to Add Note",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 1,
        field: "dvsdv",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 2,
        field: "sdsdsd",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 3,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 4,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 5,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 6,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 7,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 8,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 9,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 10,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 11,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 12,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 13,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 14,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 15,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 16,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 17,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 18,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 19,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 20,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 21,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 22,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 23,
        field: "",
        checked: "false",
        checkbox: "false"
    },
    {
        key: 24,
        field: "",
        checked: "false",
        checkbox: "false"
    }
];



function App() {
    const [list, setList] = useState(initialData);
    const [tapLine, setTapLine] = useState(0);


    function handleTapLine(line) {
        setTapLine(line.position);
    }

    function handleLineChange(lineId,field){
        return (
            setList(list.map(
                p => p.key === lineId ? {...p, field:field} : p))
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
                    onTapLine={handleTapLine}/>
          {console.log(tapLine)}
      </div>
  );
}

export default App;
