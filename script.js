const students = [];

const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");
const form = document.getElementById("studentForm");
const submitButton = form.querySelector("button[type='submit']");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const date = document.getElementById("date").value.trim();

    if (grade < 1 || grade > 7 || !name || !lastName || isNaN(grade)) {
        alert("Error Datos Incorrectos");
        return;
    }

    const isEditing = this.dataset.editing === "true";
    const student = { name, lastName, grade: parseFloat(grade), date };

    if (isEditing) {
        const index = parseInt(this.dataset.index);
        students[index] = student;
        updateTable();
        delete this.dataset.editing;
        delete this.dataset.index;
        submitButton.textContent = "Agregar Estudiante";
    } else {
        students.push(student);
        addStudentToTable(student);
    }

    this.reset();
    calcularPromedio();
});

function addStudentToTable(student) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>${student.date}</td>
        <td><button class="delete">Eliminar</button></td>
        <td><button class="edit">Actualizar</button></td>
    `;

    row.querySelector(".delete").addEventListener("click", function() {
        deleteEstudiante(student, row);
    });

    row.querySelector(".edit").addEventListener("click", function () {
        document.getElementById("name").value = student.name;
        document.getElementById("lastname").value = student.lastName;
        document.getElementById("grade").value = student.grade;
        document.getElementById("date").value = student.date;

        form.dataset.editing = "true";
        form.dataset.index = students.indexOf(student);
        submitButton.textContent = "Actualizar Estudiante";
    });

    tableBody.appendChild(row);
}

function deleteEstudiante(student, row) {
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
        row.remove();
        calcularPromedio();
    }
}

// - -- - - - -- --  - - --  -- -- - - -- -- -- - -- - - -- -- -  - -- - - -- -- - -- - ---- 

function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio de Calificaciones: No Disponible";
        averageDiv.style.color = "black";
        return;
    }

    const notas = students.map(estudiante => estudiante.grade)//.map recorre el array y crea un array nuevo el resultado de aplicar una func a cada elemento//
    const suma = notas.reduce((acumulador, valorActual) => acumulador + valorActual, 0);

    let promedio = suma / students.length;
    averageDiv.textContent = `Promedio de Calificaciones: ${promedio.toFixed(2)}`;

    if (promedio >= 4) {
        averageDiv.style.color = "green";
    } else {
        averageDiv.style.color = "red";
    }
}

function updateTable() {
    tableBody.innerHTML = "";
    students.forEach(student => {
        addStudentToTable(student);
    });
}