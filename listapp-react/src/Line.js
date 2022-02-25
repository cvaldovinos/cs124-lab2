import "./Line.css";
import "./Lab1EmptyList.css";

function Line(props) {
return (
    <div>
        <div><input className={"checkboxes"} type={"checkbox"}></input></div>
        <div><input className={"textboxes"} type={"text"} value={props.value}></input><br/></div>
    </div>
)
}

export default Line;