import React from 'react';
import { DEPT } from '../../data';

 const SearchAndFilter = ({searchTerm, handleSearchTerm, filter, handleFilter, sort, handleSort}) => {
    return (
        <div>
            <h3>Search And Filter</h3>
            <input type="text"
             className="form-control"
             value={searchTerm}
             onChange={(e) => handleSearchTerm(e.target.value)}
             placeholder="Enter Search Term"
            />

            <select className="form-control mt-3 mb-2" value={filter} onChange={(e) => handleFilter(e.target.value)}>
                <option value="">Select Department</option>
                {DEPT.map(dept => {
                    return <option key={dept} value={dept}>{dept}</option>
                })}
            </select>
            
            {/* Sorting Elements */}
            <div className="mt-3 d-flex">
                <select name="category" className="form-control mr-2" value={sort.category} onChange={handleSort}>
                    <option value="name">Name</option>
                    <option value="dept">Department</option>
                </select>

                <select name="type" className="form-control" value={sort.type} onChange={handleSort}>
                    <option value="ascending">Ascending</option>
                    <option value="dscending">Descending</option>
                </select>
            </div>
        </div>
    )
}

export default SearchAndFilter;