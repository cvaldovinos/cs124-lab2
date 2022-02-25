import './LineList.css';
import Line from './Line.js';

function LineList(props) {
    return(
        <div className={"all-lines"}>
        {props.listData.map(data =>
        <Line key={data.key}
              value={data.value}/>)}
        </div>
    )

}




export default LineList;