import React from 'react';
import './App.css';
import ListItems from './ListItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faCheck, faTimes);

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      items:[],
      completedItems:[],
      currentItem:{
        text:'',
        keyValue: '',
        completed: false,
      },
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }
  handleInput(e){
    this.setState({
      currentItem:{
          text:e.target.value,
          key:Date.now(),
          completed: false,
        }
    });
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !== ""){
      const newItems = [...this.state.items, newItem];
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key:'',
          completed:false,
        }
      })
    }
  }

  deleteAllItems(deleteCompletedItems){
    if(deleteCompletedItems){
      this.setState({
        completedItems:[]
      })
    }
    else {
      this.setState({
        items:[]
      })
   }
  }

  deleteItem(key, isCompletedBefore){
    if(isCompletedBefore){
      const filteredItems = this.state.completedItems.filter(item =>
        item.key !== key);
        this.setState({
          completedItems:filteredItems
        })
    } else {
      const filteredItems = this.state.items.filter(item =>
        item.key !== key);
        this.setState({
          items:filteredItems
        })
    }
  
  }

  checkItem(key, isCompletedBefore){

    let checkedItem = '';
    if(isCompletedBefore){
        checkedItem = this.state.completedItems.find(item => item.key === key);
    }else {
        checkedItem = this.state.items.find(item => item.key === key);
    }

    if(checkedItem.completed === false){
      checkedItem.completed = true;
     const completedItemArr = [...this.state.completedItems, checkedItem];

      this.setState({
        completedItems:completedItemArr,
      })
      this.deleteItem(key);
    } else {
      checkedItem.completed = false;
     
      this.setState({
        items:[...this.state.items, checkedItem],
        completedItems: this.state.completedItems.filter(item => item.key !== key)
      })
    }
  }

  render(){
    return(
      <div className="container p-3">
      <h1 className="app-title" id="header">TODO LIST</h1>
      <div className="card">
          <div className="card-header">
              New Task 
          </div>
          <div className="card-body">
              <form id="addTaskForm" onSubmit={this.addItem}>
                  <div className="input-group mt-3">
                  <input type="text" id="txtTaskName" className="form-control" placeholder="Enter what you should do" 
                  onChange={this.handleInput} value={this.state.currentItem.text}/>
                    <button className="btn btn-primary" type="submit" id="btnAddNewTask">
                        <i className="fas fa-plus"></i> ADD
                     </button>
                  </div>
              </form>
          </div>
          <div className="card mt-3">
              <div className="card-header">
              Task List
              <a href="#" onClick={(e) => this.deleteAllItems(false)}  id="deleteAllTasks" className="btn btn-outline-danger btn-sm delete-all float-right">Delete All</a>
              </div>
              <ul id="task-list" className="list-group">
                <ListItems items = {this.state.items} deleteItem = {this.deleteItem} checkItem = {this.checkItem}></ListItems>
              </ul>
          </div>
          </div>

          <div className="card mt-3">
              <div className="card-header">
              Completed Task List
              <a href="#" onClick={(e) => this.deleteAllItems(true)}  id="deleteAllCompletedTasks" className="btn btn-outline-danger btn-sm delete-all float-right">Delete All</a>
              </div>
              <ul id="completed-task-list" className="list-group">

              <ListItems items = {this.state.completedItems} deleteItem = {this.deleteItem} checkItem = {this.checkItem}></ListItems>

              </ul>
          </div>
      </div>
    );
  }
}

export default App;
