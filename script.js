const students=[];

const tableBody=document.querySelector("#studentsTable tbody");

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();

    const lastName=document.getElementById("lastName").value.trim();

    const grade=document.getElementById("grade").value.trim();
    
    const fecha=document.getElementById("fecha").value.trim();
    
    if (grade < 1 || grade > 7 || !name || !lastName || isNaN(grade)){
    alert("Error Datos incorrectos")
    return
    }

    //Guardar datos en el Array
    
    const student={name,lastName,grade,fecha};
    students.push(student);
    addStudentToTable(student)

   // console.log(students)

    this.reset();
});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.fecha}</td>`;
    tableBody.appendChild(row);
}