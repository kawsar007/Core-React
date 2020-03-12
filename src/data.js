import faker from 'faker';

import shortid from 'shortid';

const students = [];
export const DEPT = ['CSE', 'EEE', 'BSC', 'BBA', 'MSC'];

for (let i = 0; i < 50; i++) {
    const student = {};
    student.id = shortid.generate();
    student.name = faker.name.findName();
    student.email = faker.internet.email();
    student.dept = DEPT[Math.floor(Math.random() * DEPT.length)];

    students.push(student);
}

export default students;