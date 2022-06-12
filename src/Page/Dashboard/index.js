import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Header from "./Header";
import List from "./List";
import Add from "./Add";
import SweetPagination from "sweetpagination";
const employeesData = [
  {
    id: 1,
    name: "Lorem",
    country: "Ipsum",
    email: "lorem@ipsum.com",
    age: "11",
    dob: "2019-04-11",
  },
];
function Dashboard() {
  const [employees, setEmployees] = useState(employeesData);
  const [currentPageData, setCurrentPageData] = useState(employees);
  const [isAdding, setIsAdding] = useState(false);
  const updateEmployees = () => {
    axios
      .get("https://mockrestapi.herokuapp.com/api/employee")
      .then(response => {
        setEmployees(response.data.data);
        console.log(response.data.data);
      });
  };
  useEffect(() => {
    updateEmployees();
  }, []);

  const handleDelete = _id => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(result => {
      if (result.value) {
        const [employee] = employees.filter(employee => employee._id === _id);
        axios
          .delete(`https://mockrestapi.herokuapp.com/api/employee/${_id}`)
          .then(response => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: `${employee.name}'s data has been deleted.`,
              showConfirmButton: false,
              timer: 1500,
            });

            setEmployees(employees.filter(employee => employee._id !== _id));
          });
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List employees={currentPageData} handleDelete={handleDelete} />
        </>
      )}
      <SweetPagination
        currentPageData={setCurrentPageData}
        dataPerPage={5}
        getData={employees}
        navigation={true}
      />
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
    </div>
  );
}

export default Dashboard;
