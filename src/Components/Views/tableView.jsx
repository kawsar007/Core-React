import React from 'react'

function TableView ({studentsInfo, editHandler, deleteHandler}) {
    return (
        <div>
            <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Dept</th>
                    <th>ID</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {studentsInfo.map((student, id) => (
                    <tr key={id}>
                        <th>{student.name}</th>
                        <th>{student.email}</th>
                        <th>{student.dept}</th>
                        <th>{student.id}</th>
                        <td>
                            <button type="button" onClick={() => deleteHandler(student.id)} className="btn btn-danger btn-sm mr-2">Delete</button>
                            <button type="button" onClick={() => editHandler(student.id)} className="btn btn-info btn-sm">Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}
export default TableView;