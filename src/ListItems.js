import React from 'react';
import './ListItems.css';
import FlipMove from 'react-flip-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ListItems(props){
    const items = props.items;
    const listItems = items.map(item => {
        return <li className="list-group-item" key={item.key}>
                 <span className={"checkIcon " + (item.completed ? "crossIcon" : "")} onClick={ () => props.checkItem(item.key, item.completed)}>
                      <FontAwesomeIcon className="faicons" icon={item.completed ? "times" : "check"}/>
                </span>

                <span className={'itemSpan ' + (item.completed ? "done" : "")}>
                    {item.text}
                </span>
                <span className="deleteIcon" onClick={ () => props.deleteItem(item.key, item.completed) }>
                    <FontAwesomeIcon className="faicons" icon="trash"/>
                </span>
        </li>
    })
  
    return(
        <div> 
            <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
            {listItems} 
            </FlipMove>
        </div>
    )
    
}
export default ListItems;