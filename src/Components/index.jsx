import React, { Component } from 'react'
import Forms from './Forms/input';
import Views from './Views/Views';
import shortid from 'shortid';
import students from '../data';
import SearchAndFilter from './Search/search';
import Pagination from './Pagination';

//const MAX_ITEM_PER_LOAD = 5;
const MAX_ITEM_PER_PAGE = 5;

class StudentApp extends Component {
    state = { 
        students: students,
        isEdit: false,
        selectedStudent: null,
        searchTerm: '',
        filter: '',
        sort: {
            category: 'name',
            type: 'ascending'
        },
        loadedItem: 5,
        currentPageNum: 1
     };

     editHandler = (id) => {
         this.setState({
             isEdit: true,
             selectedStudent: id
         })
     }

     deleteHandler = (id) => {
        const students = this.state.students.filter(student => student.id !== id);
        this.setState({students})

        if(this.state.selectedStudent === id) {
            this.setState({
                isEdit: false,
                selectedStudent: null
            })
        }
     }

     createStudents = (student) => {
        student.id = shortid.generate();
        const newStd = [ ...this.state.students, student ];
        this.setState({
            students: newStd
        })
     }

     updateStudents = (data, id) => {
        const { students } = this.state;
        const student = students.find(student => student.id === id);
        student.name = data.name
        student.email = data.email
        student.dept = data.dept

        this.setState({students})
     }

     handleReset = () => {
         this.setState({
             isEdit: false,
             selectedStudent: null
         })
     }

    //  Search Elements
    handleSearchTerm = searchTerm => {
        this.setState({
            searchTerm
        })
    }

    operateSearch = (students = []) => {
        const { searchTerm } = this.state;
        return students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         student.dept.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter Elements

    handleFilter = filter => {
        this.setState({
            filter
        })
    }

    operateFilter = ( students = []) => {
        const {filter} = this.state;
        if(filter){
            return students.filter(student => student.dept === this.state.filter)
        }
        return students;
        
    }

    // Sorting Elements

    handleSort = e => {
        this.setState({
            sort: {
                 ...this.state.sort,
                [e.target.name] : e.target.value
            }
        })
    }

    operateSort = (students = []) => {
        const { sort: {category, type} } = this.state;

        const compaier = (dataA, dataB) => {
            if(dataA > dataB) {
                return 1
            } else if(dataA < dataB) {
                return -1
            } else {
                return 0
            }
        }



        return students.sort((studentA, studentB) => {
            if(type === 'ascending') {
                // if(studentA[category] > studentB[category]) {
                //     return 1;
                // } else if(studentA[category] < studentB[category]) {
                //     return -1;
                // } else {
                //     return 0;
                // }
                return compaier(studentA[category], studentB[category]);
            } else if (type === 'dscending') {
                // if(studentB[category] > studentA[category]) {
                //     return 1;
                // } else if(studentB[category] < studentA[category]) {
                //     return -1;
                // } else {
                //     return 0
                // }
                return compaier(studentB[category],studentA[category]);
            } else {
                return compaier(studentB[category],studentA[category]);
            }
        })
    }

            // Pagination

getTotalPage = () => {
    return this.state.students.length / MAX_ITEM_PER_PAGE;
 }
    
handlePrev = () => {
    const { currentPageNum } = this.state;

    if(currentPageNum > 1) {
        this.setState({
            currentPageNum: currentPageNum - 1
        })
    }
    // if(currentPageNum < totalPage) {
    //     this.setState(prev => ({
    //         currentPageNum: prev.currentPageNum - 1
    //     }))
    // }
 }
    
handleNext = () => {
    const totalPage = this.getTotalPage();
    const { currentPageNum } = this.state;

    if(currentPageNum < totalPage) {
        this.setState({
            currentPageNum: currentPageNum + 1
        })
    }

    // if(currentPageNum < totalPage) {
    //     this.setState(prev => ({
    //         currentPageNum: prev.currentPageNum + 1
    //     }))
    // }
    
 }

 prevDisabled = () => {
    const { currentPageNum } = this.state;
    return !(currentPageNum > 1)
 }

 nextDisabled = () => {
     const totalPage = this.getTotalPage();
    const { currentPageNum } = this.state;
    return !(currentPageNum < totalPage);
 }

 pagiNation = (students = []) => {
     const {currentPageNum} = this.state;
     const start = currentPageNum * MAX_ITEM_PER_PAGE - MAX_ITEM_PER_PAGE;
     const end = start + MAX_ITEM_PER_PAGE

     return students.slice(start, end);
 }

 handleJump = pageNumber => {
     this.setState({
         currentPageNum: pageNumber
     })
 }


    render() { 

        const { isEdit, selectedStudent, searchTerm, filter, sort, currentPageNum } = this.state;
        
        let students = this.operateSort(this.state.students)
        // students = students.slice(0, loadedItem)
        students = this.pagiNation(students)
        students = this.operateSearch(students)
        students = this.operateFilter(students)
        students = this.operateSort(students)

        let editableStudent = null
        if(isEdit) {
            editableStudent = students.find(student => student.id === selectedStudent)
        }
        // console.log(editableStudent)
        // console.log(this.operateSearch())
        // console.log(this.operateSort(this.state.students))

        return ( 
            <div>
                <Forms isEdit={this.state.isEdit}
                   editableStudent={editableStudent}
                   updateStudents={this.updateStudents}
                   createStudents={this.createStudents}
                   handleReset={this.handleReset}
                />
                <SearchAndFilter searchTerm={searchTerm}
                  handleSearchTerm={this.handleSearchTerm}
                  filter={filter} 
                  handleFilter={this.handleFilter}
                  sort={sort}
                  handleSort={this.handleSort}
                />
                <Views studentsInfo = {students}
                  editHandler={this.editHandler}
                  deleteHandler={this.deleteHandler}
                />

                <div>
                    {/* <button className="btn btn-dark btn-sm btn-block mt-3 mb-3"
                     onClick={() => {
                         const {loadedItem, students } = this.state
                         if(loadedItem < students.length) {
                             this.setState({
                                 loadedItem: loadedItem + MAX_ITEM_PER_LOAD
                             })
                         }
                    }}>
                        Load More
                    </button> */}
                    <Pagination
                       handlePrev={this.handlePrev}
                       handleNext={this.handleNext} 
                       prevDisabled={this.prevDisabled()} 
                       nextDisabled={this.nextDisabled()}
                       currentPageNum={currentPageNum}
                       handleJump={this.handleJump}
                       getTotalPage={this.getTotalPage}
                    />
                </div>
            </div>
         );
    }
}
 
export default StudentApp;