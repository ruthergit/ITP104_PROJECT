"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../components/AddButton";
import Heading from "../components/Heading";
import EditBtn from "../components/EditBtn";
import DeleteBtn from "../components/DeleteBtn";
import ViewTaskBtn from "../components/ViewTaskBtn";

const Project = () => {
  const addProject = useRef(null);
  const editProject = useRef(null);
  const viewTask = useRef(null);

  const [project, setProject] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isInsertedNewData, setIsInsertedNewData] = useState(false);

  const [assignedToUserID, setAssignedToUserID] = useState(null); 
  const [taskName, setTaskName] = useState(""); 
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState(null); 



  // Fetch all projects
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get("http://localhost:8000/project");
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchAllProjects();

    if (isInsertedNewData) {
      setIsInsertedNewData(false);
    }
  }, [isInsertedNewData]);

  // Fetch tasks for a project
  const fetchTasks = async (projectId) => {
    try {
      const res = await axios.get(`http://localhost:8000/task?projectId=${projectId}`);
      setTasks(res.data);
      setSelectedProject(project.find((p) => p.ProjectID === projectId));
      viewTask.current?.showModal();
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Handle Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectName || !projectDate || !projectEndDate) {
      alert("All fields are required.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/project", {
        ProjectName: projectName,
        StartDate: projectDate,
        EndDate: projectEndDate,
      });
      setIsInsertedNewData(true);
      addProject.current.close();
      resetFields();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  // Handle Edit Project
  const handleEditProject = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    if (!projectName || !projectDate || !projectEndDate) {
      alert("All fields are required.");
      return;
    }
    try {
      await axios.put(`http://localhost:8000/project/${selectedProject.ProjectID}`, {
        ProjectName: projectName,
        StartDate: projectDate,
        EndDate: projectEndDate,
      });
      setIsInsertedNewData(true);
      editProject.current.close();
      resetFields();
    } catch (err) {
      console.error("Error editing project:", err);
    }
  };
  // Delete Project
  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/project/${id}`);
      setIsInsertedNewData(true);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };
  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName) {
      alert("Task name is required.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/task", {
        TaskName: taskName,
        ProjectID: selectedProject?.ProjectID,
      });
      fetchTasks(selectedProject?.ProjectID);
      setTaskName("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit Task
  const handleEditTask = async (e) => {
    e.preventDefault();
    
    // Check for selectedTask and taskName validity
    if (!selectedTask) return;
    if (!taskName) {
      alert("Task name is required.");
      return;
    }
    
    try {
      // Ensure assignedToUserID has a value or is set to null if undefined
      const assignedTo = assignedToUserID || null;
  
      // Make the API request
      await axios.put(`http://localhost:8000/task/${selectedTask.TaskID}`, {
        TaskName: taskName,
        ProjectID: selectedProject?.ProjectID,
        AssignedTo: assignedTo,
      });
      
      // Fetch tasks and reset form states
      fetchTasks(selectedProject?.ProjectID);
      setSelectedTask(null);
      setTaskName("");
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };
  

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/task/${taskId}`);
      fetchTasks(selectedProject.ProjectID);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const openEditDialog = (proj) => {
    setSelectedProject(proj);
    setProjectName(proj.ProjectName);
    setProjectDate(proj.StartDate);
    setProjectEndDate(proj.EndDate);
    editProject.current?.showModal();
  };

  const openEditTaskDialog = (task) => {
    setSelectedTask(task);
    setTaskName(task.TaskName);
  };

  const resetFields = () => {
    setProjectName("");
    setProjectDate("");
    setProjectEndDate("");
    setSelectedProject(null);
    setTaskName("");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {/* Add Project Dialog */}
      <dialog
        className="border border-BorderBlue w-1/4 h-2/4 focus:outline-none rounded-xl"
        ref={addProject}
      >
        <div className="flex justify-between px-4">
          <p className="py-4 font-normal text-xl text-white">Add Project</p>
          <button onClick={() => addProject.current?.close()}>
            <img
              className="mr-2 bg-transparent"
              src="/images/IM-Icons/closeBtn.png"
              alt="Close"
            />
          </button>
        </div>
        <hr className="border-t-1 border-BorderBlue" />
        <form onSubmit={handleAddProject}>
          <div className="px-4">
            <label htmlFor="projectName" className="block py-4 font-normal text-xl text-white">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
            />
          </div>
          <div className="px-4 mt-2">
            <label htmlFor="startDate" className="block py-2 font-normal text-xl text-white">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
              className="w-full px-3 py-2 text-white bg-transparent border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
            />
          </div>
          <div className="px-4 mt-4">
            <label htmlFor="endDate" className="block py-2 font-normal text-xl text-white">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={projectEndDate}
              onChange={(e) => setProjectEndDate(e.target.value)}
              className="w-full px-3 py-2 text-white bg-transparent border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
            />
          </div>
          <div className="pt-5 px-4">
            <button
              type="submit"
              className="mt-2 px-4 py-3 w-full h-12 font-medium text-Blue bg-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
            >
              Save
            </button>
          </div>
        </form>
      </dialog>

      {/* Edit Project Dialog */}
      <dialog
        className="border border-BorderBlue w-1/4 h-2/4 focus:outline-none rounded-xl"
        ref={editProject}
      >
        <div className="flex justify-between px-4">
          <p className="py-4 font-normal text-xl text-white">Edit Project</p>
          <button onClick={() => editProject.current?.close()}>
            <img
              className="mr-2 bg-transparent"
              src="/images/IM-Icons/closeBtn.png"
              alt="Close"
            />
          </button>
        </div>
        <hr className="border-t-1 border-BorderBlue" />
        <form onSubmit={handleEditProject}>
          <div className="px-4">
            <label htmlFor="projectName" className="block py-4 font-normal text-xl text-white">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
            />
          </div>
          <div className="px-4 mt-2">
            <label htmlFor="startDate" className="block py-2 font-normal text-xl text-white">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
              className="w-full px-3 py-2 text-white bg-transparent border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
            />
          </div>
          <div className="px-4 mt-4">
            <label htmlFor="endDate" className="block py-2 font-normal text-xl text-white">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={projectEndDate}
              onChange={(e) => setProjectEndDate(e.target.value)}
              className="w-full px-3 py-2 text-white bg-transparent border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
            />
          </div>
          <div className="pt-5 px-4">
            <button
              type="submit"
              className="mt-2 px-4 py-3 w-full h-12 font-medium text-Blue bg-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
      {/* Task Management Dialog */}
      <dialog
      className="border border-BorderBlue w-2/5 h-3/4 focus:outline-none rounded-xl"
      ref={viewTask}
      aria-labelledby="task-dialog-title"
      aria-describedby="task-dialog-description"
    >
      <div className="flex justify-between px-4">
        <p
          id="task-dialog-title"
          className="py-4 font-normal text-xl text-white"
        >
          Tasks for {selectedProject?.ProjectName}
        </p>
        <button
          aria-label="Close dialog"
          onClick={() => viewTask.current?.close()}
          className="bg-transparent"
        >
          <img
            className="mr-2 bg-transparent"
            src="/images/IM-Icons/closeBtn.png"
            alt="Close"
          />
        </button>
      </div>
      <hr className="border-t-1 border-BorderBlue" />

      <div id="task-dialog-description" className="px-4">
        <table className="w-full border border-BorderBlue rounded-xl overflow-hidden">
          <thead className="border-b border-BorderBlue">
            <tr className="text-left text-gray-300">
              <th className="pl-4 pr-1 py-4 font-normal text-xl">Task ID</th>
              <th className="px-4 py-4 font-normal text-xl">Task Name</th>
              <th className="pl-4 pr-14 py-2 font-normal text-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length!=0 && tasks.map((task) => (
              <tr key={task.TaskID} className="text-white">
                <td className="pl-4 pr-1 py-7 text-xl">{task.TaskID}</td>
                <td className="px-4 py-4 text-xl">{task.TaskName}</td>
                <td className="pl-5 py-4 text-xl flex items-center">
                  <button
                    aria-label="Edit Task"
                    onClick={() => openEditTaskDialog(task)}
                  >
                    <img
                      className="mr-2 bg-transparent"
                      src="/images/IM-Icons/editIconForTask.png"
                      alt="Edit"
                    />
                  </button>
                  <button
                    aria-label="Delete Task"
                    onClick={() => handleDeleteTask(task.TaskID)}
                  >
                    <img
                      className="ml-2 bg-transparent"
                      src="/images/IM-Icons/deleteIconForTask.png"
                      alt="Delete"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form
  onSubmit={selectedTask ? handleEditTask : handleAddTask}
  className="px-4"
>
  <label
    htmlFor="taskName"
    className="block py-4 font-normal text-xl text-white"
  >
    {selectedTask ? "Edit Task Name" : "Add Task Name"}
  </label>
  <input
    type="text"
    id="taskName"
    value={taskName}
    onChange={(e) => setTaskName(e.target.value)}
    className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
  />

  

  <div className="pt-5">
    <button
      type="submit"
      className="mt-2 px-4 py-3 w-full h-12 font-medium text-Blue bg-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
    >
      {selectedTask ? "Update Task" : "Add Task"}
    </button>
  </div>
</form>
    </dialog>


      {/* Project List */}
      <div className="px-[260px] w-full h-32 inline-flex justify-between items-center">
        <Heading title={"Project"} />
        <Button
          onClick={() => addProject.current?.showModal()}
          title="Add Project"
        />
      </div>
      <div className="w-full h-[670px] px-64">
        <div className="w-full h-full border border-BorderBlue rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-BorderBlue">
              <tr className="text-left text-gray-300">
                <th className="pl-4 pr-1 py-4 border-r border-BorderBlue font-normal text-xl">
                  Project ID
                </th>
                <th className="px-4 py-4 border-r border-BorderBlue font-normal text-xl">
                  Project Name
                </th>
                <th className="px-4 py-4 border-r border-BorderBlue font-normal text-xl">
                  Start Date
                </th>
                <th className="px-4 py-4 border-r border-BorderBlue font-normal text-xl">
                  End Date
                </th>
                <th className="pl-4 pr-14 py-2 font-normal text-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              { project.length!=0 && project.map((proj) => (
                <tr key={proj.ProjectID} className="text-white">
                  <td className="pl-4 pr-1 py-7 text-xl">{proj.ProjectID}</td>
                  <td className="px-4 py-4 text-xl">{proj.ProjectName}</td>
                  <td className="px-4 py-4 text-xl">{formatDate(proj.StartDate)}</td>
                  <td className="px-4 py-4 text-xl">{formatDate(proj.EndDate)}</td>
                  <td className="flex">
                    <EditBtn onClick={() => openEditDialog(proj)} />
                    <DeleteBtn onClick={() => handleDeleteProject(proj.ProjectID)} />
                    <ViewTaskBtn
                      onClick={() => {
                        fetchTasks(proj.ProjectID);
                        viewTask.current?.showModal();
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Project;
