import React from "react";

function List({ employees, handleDelete }) {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Country</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee._id}>
                <td>{i + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.country}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.age} </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="button muted-button"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
