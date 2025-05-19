const students=[];

const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();


    const name = document.getElementById("name").value.trim();

    const lastName = document.getElementById("lastname").value.trim();

    const grade = document.getElementById("grade").value.trim();

    const date = document.getElementById("date").value.trim();

    if(grade <1 || grade>7 || !name || !lastName || isNaN(grade) ){
        alert("Error Datos Incorrectos")
        return
    }

    //guardar datos en el Array nuevo

    const student ={name,lastName,grade: parseFloat(grade),date};
    students.push(student);
     addStudentToTable(student)
   // console.log(students)

    this.reset();
    calcularPromedio()

});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name} </td>
    <td>${student.lastName} </td>
    <td>${student.grade} </td>
    <td>${student.date} </td>`
    ;
    tableBody.appendChild(row);
}

function calcularPromedio(){
    if (students.length ===0){
        averageDiv.textContent="Promedio de Calificaciones: No Disponible";
        averageDiv.style.color = "black";
        return;
    }

    const notas = students.map(estudiante => estudiante.grade)
    const suma = notas.reduce((acumulador, valorActual) => acumulador + valorActual,0);

    let promedio = suma/students.length
    averageDiv.textContent=`Promedio de Calificaciones: ${promedio.toFixed(2)}`;

    if (promedio >= 4){
        averageDiv.style.color = "green";
    } else {
        averageDiv.style.color = "red";
    }
}
