
import { useState } from "react";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Aarav Sharma", email: "aarav@gmail.com", marks: 85, status: "Active" },
  { id: 2, name: "Priya Patel", email: "priya@gmail.com", marks: 92, status: "Active" },
  { id: 3, name: "Rahul Verma", email: "rahul@gmail.com", marks: 65, status: "Inactive" },
  { id: 4, name: "Sneha Gupta", email: "sneha@gmail.com", marks: 78, status: "Active" },
  { id: 5, name: "Aditya Singh", email: "aditya@gmail.com", marks: 55, status: "Inactive" },
  { id: 6, name: "Neha Kumari", email: "neha@gmail.com", marks: 88, status: "Active" }
];

function App() {

  // 1. Student data state
  const [students, setStudents] = useState(initialStudents);

  // 2. Search state
  const [search, setSearch] = useState("");

  // 3. Status filter state
  const [statusFilter, setStatusFilter] = useState("All");

  // 4. Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    marks: ""
  });

  // 5. Dashboard statistics
  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  // 6. Search and filter students
  const filteredStudents = students.filter((student) => {

    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 7. Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 8. Add new student
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check duplicate email using find()
    const existingStudent = students.find(
      (student) =>
        student.email.toLowerCase() ===
        formData.email.trim().toLowerCase()
    );

    if (existingStudent) {
      alert("Student already exists!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      marks: Number(formData.marks),
      status: "Active"
    };

    // Update student array
    setStudents([...students, newStudent]);

    // Clear form
    setFormData({
      name: "",
      email: "",
      marks: ""
    });

    alert("Student added successfully!");
  };

  return (
    <div className="app">

      <h1>Student Directory</h1>

      {/* Dashboard */}
      <div className="dashboard">

        <div className="card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div className="card">
          <h3>Active Students</h3>
          <p>{activeStudents}</p>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="filters">

        <input
          type="text"
          placeholder="Search student by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Students</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      {/* Student List */}
      <h2>All Students</h2>

      <div className="student-list">

        {filteredStudents.length > 0 ? (

          filteredStudents.map((student) => (

            <div className="student-card" key={student.id}>

              <h3>{student.name}</h3>

              <p>Email: {student.email}</p>

              <p>Marks: {student.marks}</p>

              <p>Status: {student.status}</p>

            </div>

          ))

        ) : (

          <p>No students found.</p>

        )}

      </div>

      {/* Add Student Form */}
      <h2>Add New Student</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Student Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="marks"
          placeholder="Student Marks"
          value={formData.marks}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />

        <button type="submit">Add Student</button>

      </form>

    </div>
  );
}

export default App;
