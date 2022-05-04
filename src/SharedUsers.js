function SharedUsers(props){
    let filteredEdit = props.canEdit.filter((e) => (e !== props.owner));
    let filteredView = props.canView.filter((e) => (!props.canEdit.includes(e)))

    return (<Fragment >
        {(props.id === props.changeThis) && <div>Owned by: {props.owner}</div>}
        {(props.id === props.changeThis) && <div id={"shareDiv"}>
            { ((filteredEdit.length) > 0) && <div>
                <span className={"shareTitles"}> Editors </span>
                <ul className={"shareList"}>
                    {filteredEdit.map((data) =>
                        <li className={"user"} key={data}> {data} {props.isOwner && <button onClick={() => props.updateSharing(props.id, data, 'Editor')} className={"editPerm"}>X</button>}</li>,

                    )}
                </ul>
            </div>}
            { ((filteredView.length) > 0) && <div>
                <span className={"shareTitles"}> Viewers</span>
                <ul className={"shareList"}>
                    {filteredView.map((data) =>
                        <li className={"user"} key={data}> {data} {props.isOwner && <button onClick={() => props.updateSharing(props.id, data, 'Viewer')}>X</button>}</li>
                    )}
                </ul>
            </div> }
        </div>
        }
    </Fragment>)
}


export default SharedUsers;
