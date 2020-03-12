import React from 'react'

function ListView({studentsInfo, editHandler, deleteHandler}) {
    //console.log(studentsInfo)
    return (
        <div>
            <ul className="list-group mt-2">
            {studentsInfo.map((student, id) => (
                 <li key={id} className="list-group-item d-flex">
                     <div>
                        <h4>Name: {student.name}</h4><br/>
                        <p>Email: {student.email}</p><br/>
                        <p>Dept: {student.dept}</p><br/>
                        <p>ID: {student.id}</p>
                     </div>
                     <div className="ml-auto">
                        <button type="button" onClick={()=> deleteHandler(student.id)} className="btn btn-danger btn-sm ml-auto btn-block mb-2">Delete</button>
                        <button type="button" onClick={() => editHandler(student.id)} className="btn btn-info btn-sm btn-block">Edit</button>
                    </div>
                 </li>
            ))}
            
            </ul>
        </div>
    )
}
export default ListView;