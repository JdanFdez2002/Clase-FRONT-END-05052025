const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastname");
const gradeInput = document.getElementById("grade");
const dateInput = document.getElementById("date");
const submitButton = form.querySelector("button");

let editIndex = null; // Guardará el índice del estudiante a editar

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const grade = parseFloat(gradeInput.value.trim());
    const date = dateInput.value.trim();

    if (grade < 1 || grade > 7 || !name || !lastName || isNaN(grade)) {
        alert("Error: Datos Incorrectos");
        return;
    }

    const student = { name, lastName, grade, date };

    if (editIndex === null) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = null;
        submitButton.textContent = "Agregar Estudiante";
    }

    renderTable();
    form.reset();
    calcularPromedio();
});

function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.grade}</td>
            <td>${student.date}</td>
            <td>
                <button class="delete">Eliminar</button>
                <button class="edit">Editar</button>
            </td>
        `;

        row.querySelector(".delete").addEventListener("click", function () {
            deleteEstudiante(index);
        });

        row.querySelector(".edit").addEventListener("click", function () {
            editEstudiante(index);
        });

        tableBody.appendChild(row);
    });
}

function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio de Calificaciones: No Disponible";
        averageDiv.style.color = "black";
        return;
    }

    const suma = students.reduce((total, s) => total + s.grade, 0);
    const promedio = suma / students.length;
    averageDiv.textContent = `Promedio de Calificaciones: ${promedio.toFixed(2)}`;
    averageDiv.style.color = promedio >= 4 ? "green" : "red";
}

function deleteEstudiante(index) {
    students.splice(index, 1);
    renderTable();
    calcularPromedio();
}

function editEstudiante(index) {
    const student = students[index];
    nameInput.value = student.name;
    lastNameInput.value = student.lastName;
    gradeInput.value = student.grade;
    dateInput.value = student.date;
    editIndex = index;
    submitButton.textContent = "Guardar Cambios";
}
