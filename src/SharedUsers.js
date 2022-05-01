function SharedUsers(props){
    return (<div key={props.id}>
        {(props.id === props.changeThis) && <div key={props.id}>
            <ul className={"shareList"}>
                {props.canView.map((data) =>
                    <li key={data}> {data} </li>)}
            </ul>
            <ul className={"shareList"}>
                {props.canEdit.map((data) =>
                    <li key={data}> {data} </li>
                )}
            </ul>
        </div>
        }
    </div>)
}


export default SharedUsers;
