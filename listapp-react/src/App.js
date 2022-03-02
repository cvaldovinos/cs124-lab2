import './App.css';
import './Lab1EmptyList.css';
import LineList from './LineList.js';
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const initialData = [
    {
        key: 0,
        field: "Tap to Add Note",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 1,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 2,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 3,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 4,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 5,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 6,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 7,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 8,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 9,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 10,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 11,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 12,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 13,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 14,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 15,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 16,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 17,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 18,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 19,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 20,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 21,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 22,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 23,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    },
    {
        key: 24,
        field: "",
        checked: false,
        checkbox: false,
        clicked: false,
        visible: true
    }
];



function App() {
    const [list, setList] = useState(initialData);
    const [tapLine, setTapLine] = useState(0);
    let showButton = (list.filter((item) => item.checked === true)).length > 0;
    // console.log((list.filter((item) => item.checked === true)));


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
        // console.log(list);
        setList(list.map(
            p => p.key === lineId ? {...p, checked:(!p.checked)} : p))
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

    //Checked is about an iteration behind, seems like the list is lagging back a step
    // function handleShowButton(lineId, value) {
    //     console.log(list.filter((p) => p.checked === true));
    //     if ((list.filter((p) => p.checked === true).length>0)){
    //         setShowButton(true);
    //     } else {
    //         setShowButton(false);
    //     }
    // }

    //ID's don't seem to be being added
    function handleAddLine() {
        setList([...list,
            {
                key: generateUniqueID(),
                field: "",
                checked: false,
                checkbox: false,
                clicked: false,
                visible: true
            }]);
    }

    function handleAddLine2(p) {
        p.push(
            {
                key: generateUniqueID(),
                field: "",
                checked: false,
                checkbox: false,
                clicked: false,
                visible: true
            });
    }

    function handleDeletedLine(lineID) {
        console.log("Before delete:", list)
        return(setList(list.filter((p) => p.key !== lineID)));

    }
    function handleDeleteChecks() {
        let deletedCount = (list.filter((p) => p.checked === true)).length;
        let unchecked = []
        for (let i = 0; i < list.length; i++) {
            // if (list[i].checked === true) {
            //     console.log("key", list[i].key)
            //     handleDeletedLine(list[i].key);
            // }
            if (list[i].checked === false) {
                unchecked.push(list[i])
            }
        }
        console.log("copy list:", unchecked)

        for (let i = 0; i < deletedCount; i++) {
            // handleAddLine();
            handleAddLine2(unchecked)
        }
        console.log("copy list post-adding lines", unchecked)

        setList(unchecked)
        handleTapLine(tapLine-deletedCount);

    }

  return (
      <div id="container">
        <div id="button-div"><button class="back-button" >&larr;</button></div>
        <div id="title"><h2></h2></div>
          <LineList linelist={list}
                    listData={initialData}
                    tapLine={tapLine}
                    onLineChangeField={handleLineChange}
                    onTapLine={handleTapLine}
                    onClickLine={handleClick}
                    onCheck={handleCheckbox}
                    onMoveTapLine={handleMoveTapLine}
                    showButton={showButton}
                    onDelete={handleDeleteChecks}/>
      </div>
  );
}

export default App;
