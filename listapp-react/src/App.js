import './App.css';
import './Lab1EmptyList.css';
import LineList from './LineList.js';
import {useState} from 'react';

let initialData = [
    {
        key: 0,
        value: "hello",
        checked: "false",
    },
    {
        key: 1,
        value: "world",
        checked: "false",
    },
    {
        key: 2,
        value: "nice",
        checked: "false",
    },
    {
        key: 3,
        value: "",
        checked: "false",
    },
    {
        key: 4,
        value: "",
        checked: "false",
    },
    {
        key: 5,
        value: "",
        checked: "false",
    },
    {
        key: 6,
        value: "",
        checked: "false",
    },
    {
        key: 7,
        value: "",
        checked: "false",
    },
    {
        key: 8,
        value: "",
        checked: "false",
    },
    {
        key: 9,
        value: "",
        checked: "false",
    },
    {
        key: 10,
        value: "",
        checked: "false",
    },
    {
        key: 11,
        value: "",
        checked: "false",
    },
    {
        key: 12,
        value: "",
        checked: "false",
    },
    {
        key: 13,
        value: "",
        checked: "false",
    },
    {
        key: 14,
        value: "",
        checked: "false",
    },
    {
        key: 15,
        value: "",
        checked: "false",
    },
    {
        key: 16,
        value: "",
        checked: "false",
    },
    {
        key: 17,
        value: "",
        checked: "false",
    },
    {
        key: 18,
        value: "",
        checked: "false",
    },
    {
        key: 19,
        value: "",
        checked: "false",
    },
    {
        key: 20,
        value: "",
        checked: "false",
    },
    {
        key: 21,
        value: "",
        checked: "false",
    },
    {
        key: 22,
        value: "",
        checked: "false",
    },
    {
        key: 23,
        value: "",
        checked: "false",
    },
    {
        key: 24,
        value: "",
        checked: "false",
    },


];

function App() {
    const [list, setList] = useState(initialData);
    function handleLineChange(lineId,value){
        return (
            setList(list.map(
                p => p.key === lineId ? {...p, value:value} : p))
                // p => p.key === lineId ? console.log('test') : p))
        );
    }
  return (
      <div id="container">
        <div id="button-div"><button class="back-button">&larr;</button></div>
        <div id="title"><h2>TITLE OF LIST</h2></div>
          <LineList listData = {initialData}
                     onLineChangeField={handleLineChange}/>
      </div>
  );
}

export default App;
