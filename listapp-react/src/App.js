import './App.css';
import './Lab1EmptyList.css';
import LineList from './LineList.js';
function App(props) {
  return (
      <div id="container">
        <div id="button-div"><button class="back-button">&larr;</button></div>
        <div id="title"><h2>TITLE OF LIST</h2></div>
          <LineList listData = {props.initialData}/>

      {/*  <div class="all-lines" id="line1">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox1"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox1" value="Tap to Add Note"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line2">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox2"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox2" value="Buy Grisham book, John 2"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line3">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox3"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox3" value="Buy Grisham book, John 3"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line4">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox4"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox4" value="Buy Grisham book, John 4"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line5">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox5"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox5" value="Buy Grisham book, John 5"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line6">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox6"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox6" value="Buy Grisham book, John 6"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line7">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox7"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox7" value="Buy Grisham book, John 7"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line8">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox8"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox8" value="Buy Grisham book, John 8"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line9">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox9"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox9" value="Buy Grisham book, John 9"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line10">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox10"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox10" value="Buy Grisham book, John 10"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line11">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox11"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox11" value="Buy Grisham book, John 11"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line12">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox12"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox12" value="Buy Grisham book, John 12"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line13">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox13"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox13" value="Buy Grisham book, John 13"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line14">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox14"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox14" value="Buy Grisham book, John 14"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line15">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox15"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox15" value="Buy Grisham book, John 15"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line16">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox16"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox16" value="Buy Grisham book, John 16"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line17">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox17"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox17" value="Buy Grisham book, John 17"/><br/></div>*/}
      {/*  </div>*/}
      {/*  <div class="all-lines" id="line18">*/}
      {/*    <div class="checkboxes"><input type="checkbox" id="checkbox18"/></div>*/}
      {/*    <div><input type="text" class="textboxes" id="textbox18" value="Buy Grisham book, John 18"/><br/></div>*/}
      {/*  </div>*/}
      </div>
  );
}

export default App;
