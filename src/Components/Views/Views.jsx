import React, { Component } from 'react'
import ListView from './listView';
import TableView from './tableView';

class Views extends Component {
    state = { 
        isViewList: true,
        view: 'list'
     }

     generateFunc = () => {
         const {studentsInfo, editHandler, deleteHandler} = this.props;
         if(this.state.isViewList) {
             return <ListView studentsInfo = {studentsInfo} editHandler={editHandler} deleteHandler={deleteHandler}/>
         } else {
             return <TableView studentsInfo = {studentsInfo} editHandler={editHandler} deleteHandler={deleteHandler}/>
         }
     }

     handleViewChange = (e) => {
        this.setState({
            isViewList: e.target.value === 'list',
            view: e.target.value
        })
     }

    render() { 
        return ( 
            <div>
                <div>
                    <input type="radio" name="view" 
                     checked={this.state.view === 'list'}
                     value="list" onChange={this.handleViewChange}
                    /> List View
                    <input type="radio"
                    className="ml-2"
                     name="view" 
                     checked={this.state.view === 'table'}
                     value="table"
                      onChange={this.handleViewChange}
                    /> Table View
                </div>
                {this.generateFunc()}
            </div>
         );
    }
}
 
export default Views;