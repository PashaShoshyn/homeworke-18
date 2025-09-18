
const API_URL = "http://localhost:3000/students"; 

const getStudentsBtn = document.getElementById("get-students-btn");
const studentsTableBody = document.querySelector("#students-table tbody");
const addStudentForm = document.getElementById("add-student-form");


async function getStudents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Помилка завантаження студентів");
    const data = await response.json();
    renderStudents(data);
  } catch (error) {
    console.error(error);
  }
}


function renderStudents(students) {
  studentsTableBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "Записаний" : "Не записаний"}</td>
      <td>
        <button onclick="updateStudent(${student.id})">Оновити</button>
        <button onclick="deleteStudent(${student.id})">Видалити</button>
      </td>
    `;

    studentsTableBody.appendChild(row);
  });
}


async function addStudent(e) {
  e.preventDefault();

  const newStudent = {
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });

    if (!response.ok) throw new Error("Не вдалося додати студента");

    addStudentForm.reset();
    getStudents();
  } catch (error) {
    console.error(error);
  }
}


async function updateStudent(id) {
  const newName = prompt("Введіть нове ім'я для студента:");
  if (!newName) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (!response.ok) throw new Error("Помилка оновлення студента");

    getStudents();
  } catch (error) {
    console.error(error);
  }
}


async function deleteStudent(id) {
  if (!confirm("Ви дійсно хочете видалити цього студента?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Помилка видалення");

    getStudents();
  } catch (error) {
    console.error(error);
  }
}


getStudentsBtn.addEventListener("click", getStudents);
addStudentForm.addEventListener("submit", addStudent);