import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import "./App.css";
// import { throws } from 'assert';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: "",
      newItem: ""
    };
  }

  componentDidMount() {
    this.getToDoList();
  }

  async getToDoList() {
    try {
      let apiResult = await axios({
        method: "get",
        url: "http://localhost:9001/"
      });
      this.setState({ toDoList: apiResult.data });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  //Take newItemNumber and add 1 everytime
  //only add the proper 1 after seeing the itemNumber change in the map
  //and subtract 1 everytime a todo is deleted

  async addToList(e) {
    // write code here to add to list
    e.preventDefault();
    let currentKeys = Object.keys(this.state.toDoList);
    let finalIndex = currentKeys.length - 1;
    let lastNum = currentKeys[finalIndex];
    try {
      await axios({
        method: "put",
        url: `http://localhost:9001/list/${Number(lastNum) + 1}`,
        data: {
          newItem: this.state.newItem
        }
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
    //Retrieve updated todo list
    try {
      await this.getToDoList();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateList(itemNumber, e) {
    e.preventDefault();
    console.log(itemNumber, this.state.editedValue);
    // write code here to update list
    this.setState({ currentlyEditing: "" });
  }

  async deleteFromList(itemNumber, e) {
    // write code here to delete from list
    e.preventDefault();
    console.log(itemNumber);
    try {
      await axios({
        method: "delete",
        url: `http://localhost:9001/list/${itemNumber}`
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
    //Retrieve updated todo list
    try {
      await this.getToDoList();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  handleEdit(itemNumber, e) {
    e.preventDefault();
    console.log(itemNumber);
  }

  handleEditChange(e) {
    this.setState({ editedValue: e.target.value });
  }

  handleTaskChange(e){
    this.setState({
      newItem: e.target.value
    })
  }

  renderList = () => {
    return (
      <ol>
        {Object.keys(this.state.toDoList).map(itemNumber => (
          <li key={itemNumber}>
            <div>
              {this.state.toDoList[itemNumber]}
              <button onClick={e => this.handleEdit(itemNumber, e)}>
                Edit
              </button>
              <button onClick={e => this.deleteFromList(itemNumber, e)}>
                Deleto
              </button>
            </div>
          </li>
        ))}
      </ol>
    );
  };

  render() {
    return (
      <div className="App">
        <h2>HELLOW WORLD</h2>
        <form onSubmit={e => this.addToList(e)}>
          <input
            placeholder="enter task"
            onChange={e => this.handleTaskChange(e)}
          />
          <Button>Add to List</Button>
        </form>
        {this.renderList()}
      </div>
    );
  }
}

export default App;
