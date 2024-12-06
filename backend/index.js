import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Integrated_Information_Management_System",
});

app.use(express.json());
app.use(cors());


app.get("/department", (req, res) => {
  const q = "SELECT * FROM department";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


app.post("/department", (req, res) => {
  const q = "INSERT INTO Department (DepartmentName) VALUES (?)";
  const value = [req.body.DepartmentName];

  db.query(q, [value], (err, data) => {
    if (err) return res.json(err);
    return res.json("Department Created");
  });
});

// Add this PUT route for editing departments
app.put("/department/:id", (req, res) => {
  const { id } = req.params;
  const q = "UPDATE Department SET DepartmentName = ? WHERE DepartmentID = ?";
  const values = [req.body.DepartmentName, id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    return res.json("Department Updated Successfully");
  });
});

app.delete("/department/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM Department WHERE DepartmentID = ?";
    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: "Department not found" });
      }
      return res.json("Department Deleted Successfully");
    });
  });
  

app.get("/employee", (req, res) => {
    const q = "SELECT * FROM employee";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  
  // POST endpoint for adding a new employee
app.post("/employee", (req, res) => {
  const q = "INSERT INTO Employee (FirstName, LastName, DepartmentID) VALUES (?, ?, ?)";
  const values = [req.body.FirstName, req.body.LastName, req.body.DepartmentID];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Employee Added Successfully");
  });
});

// PUT endpoint for updating an employee
app.put("/employee/:id", (req, res) => {
  const { id } = req.params;
  const q = "UPDATE Employee SET FirstName = ?, LastName = ?, DepartmentID = ? WHERE EmployeeID = ?";
  const values = [req.body.FirstName, req.body.LastName, req.body.DepartmentID, id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.json("Employee Updated Successfully");
  });
});

// DELETE endpoint for removing an employee
app.delete("/employee/:id", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM Employee WHERE EmployeeID = ?";
  
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.json("Employee Deleted Successfully");
  });
});

// GET all projects
app.get("/project", (req, res) => {
  const q = "SELECT * FROM Project";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// POST a new project
app.post("/project", (req, res) => {
  const q = "INSERT INTO Project (ProjectName, StartDate, EndDate) VALUES (?, ?, ?)";
  const values = [req.body.ProjectName, req.body.StartDate, req.body.EndDate];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Project Added Successfully");
  });
});

// PUT to update a project
app.put("/project/:id", (req, res) => {
  const { id } = req.params;
  const q = "UPDATE Project SET ProjectName = ?, StartDate = ?, EndDate = ? WHERE ProjectID = ?";
  const values = [req.body.ProjectName, req.body.StartDate, req.body.EndDate, id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.json("Project Updated Successfully");
  });
});

// DELETE a project
app.delete("/project/:id", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM Project WHERE ProjectID = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.json("Project Deleted Successfully");
  });
});

// GET all tasks
app.get("/task", (req, res) => {
  const { projectId } = req.query;
  const q = projectId
    ? "SELECT * FROM Task WHERE ProjectID = ?"
    : "SELECT * FROM Task";
  const values = projectId ? [projectId] : [];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// POST a new task
app.post("/task", (req, res) => {
  const q = "INSERT INTO Task (TaskName, ProjectID) VALUES (?, ?)";
  const values = [req.body.TaskName, req.body.ProjectID];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Task Added Successfully");
  });
});

// PUT to update a task
app.put("/task/:id", (req, res) => {
  const { id } = req.params;
  const { TaskName, ProjectID, AssignedTo } = req.body; // Destructure AssignedTo from the request body

  const q = `
    UPDATE Task
    SET TaskName = ?, ProjectID = ?, AssignedTo = ?
    WHERE TaskID = ?;
  `;

  const values = [TaskName, ProjectID, AssignedTo, id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json("Task Updated Successfully");
  });
});


// DELETE a task
app.delete("/task/:id", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM Task WHERE TaskID = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json("Task Deleted Successfully");
  });
});




// Listening on port 8000
app.listen(8000, () => {
  console.log("Connected to backend");
});
