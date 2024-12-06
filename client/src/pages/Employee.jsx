"use client";
``
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../components/AddButton";
import Heading from "../components/Heading";
import EditBtn from "../components/EditBtn";
import DeleteBtn from "../components/DeleteBtn";

const Employee = () => {
  const addEmployee = useRef(null);
  const editEmployee = useRef(null);

  const [employee, setEmployee] = useState([]);
  const [department, setDepartment] = useState([]);
  const [newEmployeeFirstName, setNewEmployeeFirstName] = useState("");
  const [newEmployeeLastName, setNewEmployeeLastName] = useState("");
  const [newEmployeeDepartment, setNewEmployeeDepartment] = useState("");
  const [editEmployeeData, setEditEmployeeData] = useState({
    EmployeeID: null,
    FirstName: "",
    LastName: "",
    DepartmentID: "",
  });
  const [isInsertedNewData, setIsInsertedNewData] = useState(false);
  console.log(employee)

  // Fetch employees and departments
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8000/employee");
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:8000/department");
        setDepartment(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllEmployees();
    fetchDepartments();

    if (isInsertedNewData) {
      setIsInsertedNewData(false);
    }
  }, [isInsertedNewData]);

  // Add Employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/employee", {
        FirstName: newEmployeeFirstName,
        LastName: newEmployeeLastName,
        DepartmentID: newEmployeeDepartment,
      });
      setIsInsertedNewData(true);
      addEmployee.current.close();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Employee
  const handleEditEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/employee/${editEmployeeData.EmployeeID}`,
        {
          FirstName: editEmployeeData.FirstName,
          LastName: editEmployeeData.LastName,
          DepartmentID: editEmployeeData.DepartmentID,
        }
      );
      setIsInsertedNewData(true);
      editEmployee.current.close();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employee/${id}`);
      setIsInsertedNewData(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Add Employee Dialog */}
      <dialog
        className="border border-BorderBlue w-1/4 h-1/2 focus:outline-none rounded-xl"
        ref={addEmployee}
      >
        <div className="flex justify-between px-4">
          <p className="py-4 font-normal text-xl text-white">Add Employee</p>
          <button onClick={() => addEmployee.current?.close()}>
            <img
              className="mr-2 bg-transparent"
              src="/images/IM-Icons/closeBtn.png"
              alt="Close"
            />
          </button>
        </div>
        <hr className="border-t-1 border-BorderBlue" />
        <div className="px-4">
          <form onSubmit={handleAddEmployee}>
            <div>
              <label
                htmlFor="firstName"
                className="block py-4 font-normal text-xl text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={newEmployeeFirstName}
                onChange={(e) => setNewEmployeeFirstName(e.target.value)}
                className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block py-4 font-normal text-xl text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={newEmployeeLastName}
                onChange={(e) => setNewEmployeeLastName(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="department"
                className="block font-normal text-xl text-white"
              >
                Select Department
              </label>
              <select
                id="department"
                name="department"
                value={newEmployeeDepartment}
                onChange={(e) => setNewEmployeeDepartment(e.target.value)}
                className="w-full px-3 py-2 mt-4 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
              >
                <option value="" disabled>
                  Select Department
                </option>
                {department.length!=0 && department.map((dept) => (
                  <option key={dept.DepartmentID} value={dept.DepartmentID}>
                    {dept.DepartmentName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-2 px-4 py-3 w-full h-12 font-medium text-Blue bg-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog
  className="border border-BorderBlue w-1/4 h-1/2 focus:outline-none rounded-xl"
  ref={editEmployee}
>
  <div className="flex justify-between px-4">
    <p className="py-4 font-normal text-xl text-white">Edit Employee</p>
    <button onClick={() => editEmployee.current?.close()}>
      <img
        className="mr-2 bg-transparent"
        src="/images/IM-Icons/closeBtn.png"
        alt="Close"
      />
    </button>
  </div>
  <hr className="border-t-1 border-BorderBlue" />
  <div className="px-4">
    <form onSubmit={handleEditEmployee}>
      <div>
        <label
          htmlFor="firstName"
          className="block py-4 font-normal text-xl text-white"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={editEmployeeData.FirstName}
          onChange={(e) =>
            setEditEmployeeData({
              ...editEmployeeData,
              FirstName: e.target.value,
            })
          }
          className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block py-4 font-normal text-xl text-white"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={editEmployeeData.LastName}
          onChange={(e) =>
            setEditEmployeeData({
              ...editEmployeeData,
              LastName: e.target.value,
            })
          }
          className="w-full px-3 py-2 mt-1 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="department"
          className="block font-normal text-xl text-white"
        >
          Select Department
        </label>
        <select
          id="department"
          name="department"
          value={editEmployeeData.DepartmentID}
          onChange={(e) =>
            setEditEmployeeData({
              ...editEmployeeData,
              DepartmentID: e.target.value,
            })
          }
          className="w-full px-3 py-2 mt-4 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
        >
          <option value="" disabled>
            Select Department
          </option>
          {department.length!=0 && department.map((dept) => (
            <option key={dept.DepartmentID} value={dept.DepartmentID}>
              {dept.DepartmentName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-2 px-4 py-3 w-full h-12 font-medium text-Blue bg-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</dialog>


      <div className="px-[260px] w-full h-32 inline-flex justify-between items-center">
        <Heading title={"Employee"} />
        <Button
          onClick={() => {
            addEmployee.current?.showModal();
          }}
          title="Add Employee"
        />
      </div>
      <div className="w-full h-[670px] px-64">
        <div className="w-full h-full border border-BorderBlue rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-BorderBlue">
              <tr className="text-left text-gray-300">
                <th className="pl-4 pr-1 py-4 border-r border-BorderBlue font-normal text-xl">
                  Emp ID
                </th>
                <th className="px-4 py-4 border-r border-BorderBlue font-normal text-xl">
                  First Name
                </th>
                <th className="px-4 py-4 border-r border-BorderBlue font-normal text-xl">
                  Last Name
                </th>
                <th className="px-4 py-4 border-r border-BorderBlue font-normal text-xl">
                  Department
                </th>
                <th className="pl-4 pr-14 py-2 font-normal text-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee.length!=0 &&employee.map((emp) => (
                <tr key={emp.EmployeeID} className="text-white">
                  <td className="pl-4 pr-1 py-7 text-xl">{emp.EmployeeID}</td>
                  <td className="px-4 py-4 text-xl">{emp.FirstName}</td>
                  <td className="px-4 py-4 text-xl">{emp.LastName}</td>
                  <td className="px-4 py-4 text-xl">
                    {department.find(
                      (dept) => dept.DepartmentID === emp.DepartmentID
                    )?.DepartmentName || "Unknown"}
                  </td>
                  <td className="flex">
                    <EditBtn
                      onClick={() => {
                        setEditEmployeeData(emp);
                        editEmployee.current?.showModal();
                      }}
                    />
                    <DeleteBtn onClick={() => handleDeleteEmployee(emp.EmployeeID)} />
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

export default Employee;
