"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../components/AddButton";
import Heading from "../components/Heading";
import EditBtn from "../components/EditBtn";
import DeleteBtn from "../components/DeleteBtn";

const Department = () => {
  const addDepartment = useRef(null);
  const editDepartment = useRef(null);

  const [department, setDepartment] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [editDepartmentData, setEditDepartmentData] = useState({
    id: null,
    name: "",
  });
  const [isInsertedNewData, setIsInsertedNewData] = useState(false);


  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:8000/department");
        setDepartment(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllDepartments();

    if (isInsertedNewData) {
      setIsInsertedNewData(false); // Reset the state after data is re-fetched
    }
  }, [isInsertedNewData, department]); // Re-fetch when a new department is added

  // Add department
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!newDepartmentName.trim()) {
      alert("Department name cannot be empty");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/department", {
        DepartmentName: newDepartmentName,
      });

      setDepartment((prev) => [...prev, res.data]);
      setNewDepartmentName("");
      setIsInsertedNewData(true); // Set the state to true after a successful POST
      addDepartment.current?.close();
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  // Delete department
  const handleDeleteDepartment = async (id) => {
    console.log("Attempting to delete department with ID:", id);

    try {
      const response = await axios.delete(`http://localhost:8000/department/${id}`);
      console.log("Delete Response:", response.data);
      if (response.data === "Department Deleted Successfully") {
        setDepartment((prev) => prev.filter((dept) => dept.DepartmentID !== id));
      } else {
        console.log("Failed to delete department in backend:", response.data);
      }
    } catch (err) {
      console.error("Failed to delete department:", err.response ? err.response.data : err);
    }
  };

  // Edit department
  const handleEditDepartment = async (e) => {
    e.preventDefault();
    if (!editDepartmentData.name.trim()) {
      alert("Department name cannot be empty");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/department/${editDepartmentData.id}`,
        {
          DepartmentName: editDepartmentData.name,
        }
      );
      setDepartment((prev) =>
        prev.map((dept) =>
          dept.DepartmentID === editDepartmentData.id
            ? { ...dept, DepartmentName: editDepartmentData.name }
            : dept
        )
      );
      setEditDepartmentData({ id: null, name: "" });
      editDepartment.current?.close();
    } catch (err) {
      console.error("Failed to edit department:", err);
    }
  };

  return (
    <>
      {/* Add Department Dialog */}
      <dialog
        className="border border-BorderBlue w-1/4 h-72 focus:outline-none rounded-xl"
        ref={addDepartment}
      >
        <div className="flex justify-between px-4">
          <p className="py-4 font-normal text-xl text-white">Add Department</p>
          <button className="focus:outline-none" onClick={() => addDepartment.current?.close()}>
            <img
              className="mr-2 bg-transparent"
              src="/images/IM-Icons/closeBtn.png"
              alt="Close"
            />
          </button>
        </div>
        <hr className="border-t-1 border-BorderBlue" />
        <div className="px-4">
          <form onSubmit={handleAddDepartment}>
            <div className="">
              <label
                htmlFor="departmentName"
                className="block py-4 font-normal text-xl text-white"
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                name="DepartmentName"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className=" mt-2 px-4 py-3 w-full h-12 font-medium text-Blue bg-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Edit Department Dialog */}
      <dialog
        className="border border-BorderBlue w-1/4 h-72 focus:outline-none rounded-xl"
        ref={editDepartment}
      >
        <div className="flex justify-between px-4">
          <p className="py-4 font-normal text-xl text-white">Edit Department</p>
          <button className="focus:outline-none" onClick={() => editDepartment.current?.close()}>
            <img
              className="mr-2 bg-transparent"
              src="/images/IM-Icons/closeBtn.png"
              alt="Close"
            />
          </button>
        </div>
        <hr className="border-t-1 border-BorderBlue" />
        <div className="px-4">
          <form onSubmit={handleEditDepartment}>
            <div className="">
              <label
                htmlFor="editDepartmentName"
                className="block py-4 font-normal text-xl text-white"
              >
                Department Name
              </label>
              <input
                type="text"
                id="editDepartmentName"
                value={editDepartmentData.name}
                onChange={(e) =>
                  setEditDepartmentData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className=" mt-2 px-4 py-3 w-full h-12 font-medium text-Blue bg-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Main Content */}
      <div className="px-[260px]">
        <div className="w-full h-32 inline-flex justify-between items-center">
          <Heading title={"Department"} />
          <Button
            onClick={() => addDepartment.current?.showModal()}
            title="Add Department"
          />
        </div>
        <div className="w-full h-full border border-BorderBlue rounded-xl overflow-hidden">
          <div className="h-[600px] overflow-y-auto scrollbar-thin scrollbar-webkit">
            <table className="w-full border-collapse">
              <thead className="border-b border-BorderBlue bg-gray-800">
                <tr className="text-left text-gray-300">
                  <th className="pl-4 pr-1 py-4 border-r border-BorderBlue font-normal text-xl sticky top-0">
                    Department ID
                  </th>
                  <th className="px-4 py-4 border-r border-BorderBlue font-normal text-xl sticky top-0">
                    Department Name
                  </th>
                  <th className="pl-4 pr-14 py-2 font-normal text-xl sticky top-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {department.length!=0 && department.map ((dept) => (
                  <tr key={dept.DepartmentID} className="text-white">
                    <td className="pl-4 pr-1 py-7 text-xl w-1/3">
                      {dept.DepartmentID}
                    </td>
                    <td className="px-4 py-4 text-xl w-1/3">
                      {dept.DepartmentName}
                    </td>
                    <td className="flex items-center space-x-2">
                      <EditBtn
                        onClick={() => {
                          setEditDepartmentData({
                            id: dept.DepartmentID,
                            name: dept.DepartmentName,
                          });
                          editDepartment.current?.showModal();
                        }}
                      />
                      <DeleteBtn
                        onClick={() => {
                          handleDeleteDepartment(dept.DepartmentID);                          
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
