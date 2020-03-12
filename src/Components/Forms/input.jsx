import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import {DEPT} from '../../data';

class Forms extends Component {
    

    render() { 
        const {isEdit, editableStudent} = this.props;

        const initialValues = {
            name: '',
            email: '',
            dept: ''
        }
        if(isEdit) {
            initialValues.name = editableStudent.name
            initialValues.email = editableStudent.email
            initialValues.dept = editableStudent.dept
        }

        return ( 
            <div>
                {isEdit ? <h3>Update Student</h3> : <h3>Create Student</h3>}
                <Formik
               initialValues={initialValues}
               enableReinitialize = {true}
               onSubmit={(values, formikBag) => {
                   if(isEdit) {
                       this.props.updateStudents(values, editableStudent.id)
                   } else {
                       this.props.createStudents(values)
                       formikBag.resetForm()
                   }
               }}
            >
             {() => (
                 <Form>
                     <Field name="name" placeholder="Enter Your Name" className="form-control mb-2"/>
                     <Field name="email" placeholder="Enter Your Email" className="form-control mb-2"/>
                     <Field name="dept" as="select" placeholder="Enter Your Dept" className="form-control mb-2">
                         <option>Select Dept</option>
                         {DEPT.map((dept, i) => {
                            return <option key={i} value={dept}>{dept}</option>
                         })}
                     </Field>
                     <button type="submit" className="btn btn-primary btn-sm mb-3">{isEdit ? 'Update' : 'Create'}</button>
                     <button onClick={this.props.handleReset} type="reset" className="btn btn-danger btn-sm mb-3 ml-3">Reset</button>
                 </Form>         
             )}
            </Formik>
            </div>    
        );
    }
}
 
export default Forms;