// Define the array of students
const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];
  
  // displaying array on the UI and to search student by name,email,degree
  function displayStudentList(search = "") {
    const studentListDiv = document.getElementById('studentList');
    studentListDiv.innerHTML = '';
  
    const table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Grade</th>
        <th>Degree</th>
        <th>Email</th>
      </tr>
    `;
  
    const filteredStudents = students.filter(student => {
      const { name, email, degree } = student;
      const searchTerm = search.toLowerCase();
      return name.toLowerCase().includes(searchTerm) ||
             email.toLowerCase().includes(searchTerm) ||
             degree.toLowerCase().includes(searchTerm);
    });
  
    filteredStudents.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email} <i class="material-icons" class="editButton" onclick="editStudent(${student.ID})">edit_square</i> <i class="material-icons" class="deleteButton" onclick="deleteStudent(${student.ID})">delete</i></td>
        
      `;
      table.appendChild(row);
    });
  
    studentListDiv.appendChild(table);
  }

  displayStudentList();


  const searchInput = document.getElementById('search');
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const searchValue = searchInput.value;
    displayStudentList(searchValue);
  }
});

  



// Function to add a new student
const submit = document.getElementById("submitButton");
submit.addEventListener("click",addStudent)

function addStudent(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const grade = document.getElementById('grade').value;
  const degree = document.getElementById('degree').value;
  const email = document.getElementById('email').value;

  const newStudent = {
    ID: students.length + 1,
    name,
    age,
    grade,
    degree,
    email
  };

  // Add the new student to the existing students array
  students.push(newStudent);

  // Call the function to display the updated student list
  displayStudentList();

  // Reset the form fields
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
  document.getElementById('grade').value = '';
  document.getElementById('degree').value = '';
  document.getElementById('email').value = '';
}



// Function to edit a student
function editStudent(ID) {
  // Find the student in the array based on the ID
  const student = students.find(student => student.ID === ID);

  // If the student is found, fill the form fields with the student's data
  if (student) {
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.getElementById('degree').value = student.degree;
    document.getElementById('email').value = student.email;

    // Change the submit button to an edit button
    const addButton = document.getElementById('submitButton');
    addButton.style.backgroundColor='black';
    addButton.style.color='white';
    addButton.innerHTML = 'Edit Student';
    addButton.removeEventListener('click', addStudent);
    addButton.addEventListener('click', function() {
      updateStudent(ID);
    });
  }
}

// Function to update a student
function updateStudent(ID) {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const grade = document.getElementById('grade').value;
  const degree = document.getElementById('degree').value;
  const email = document.getElementById('email').value;

  // Find the student in the array based on the ID
  const student = students.find(student => student.ID === ID);

  // If the student is found, update the student's data
  if (student) {
    student.name = name;
    student.age = age;
    student.grade = grade;
    student.degree = degree;
    student.email = email;

    // Call the function to display the updated student list
    displayStudentList();

    // Reset the form fields and change the button back to add
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('degree').value = '';
    document.getElementById('email').value = '';
    const addButton = document.getElementById('submitButton');
    addButton.innerHTML = 'Add Student';
    addButton.style.backgroundColor='white';
    addButton.style.color='black';
    addButton.removeEventListener('click', updateStudent);
    addButton.addEventListener('click', addStudent);
  }
}



// Function to delete a student
function deleteStudent(ID) {
  // Find the index of the student in the array based on the ID
  const index = students.findIndex(student => student.ID === ID);

  // If the student is found, remove the student from the array
  if (index !== -1) {
    students.splice(index, 1);

    // Call the function to display the updated student list
    displayStudentList();
  }
}













