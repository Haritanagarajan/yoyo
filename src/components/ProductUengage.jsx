//import libraries
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../styles/ProductUengage.css'
export default function ProductUengage() {
  const [taskindex, setTaskIndex] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [taskuser, setTaskUser] = useState([]);
  const [id, setId] = useState('');

  const fetchData = () => {
    fetch('http://localhost:3001/task')
      .then((response) => response.json())
      .then((data) => {
        setTaskIndex(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData1 = () => {
    fetch('http://localhost:3001/login')
      .then((response) => response.json())
      .then((data) => {
        setTaskUser(data);
      });
  };

  useEffect(() => {
    fetchData1();
  }, []);

  //CREATE
  const fetchLoginDataCREATE = async () => {
    const response = await fetch("http://localhost:3001/login");
    const loginData = await response.json();
    console.log(loginData);
    return loginData;
  };

  function showUserCreateBox() {
    fetchLoginDataCREATE()
      .then((loginData) => {
        const dropdownOptions = loginData.map((user) => {
          return '<option value="' + user.id + '">' + user.fname + '</option>';
        }).join('');

        Swal.fire({
          title: "Create user",
          customClass: {
            popup: "red-popup",
          },
          html:
            '<form id="myform" class="is-validated">' +
            '<div class="swal2-row">' +
            '<input id="id" type="hidden" class="swal2-input">' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="username">Username</label>' +
            '<select id="username" class="swal2-input">' +
            dropdownOptions +
            '</select>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="Assignment">Assignment</label>' +
            '<input id="Assignment" name="Assignment" class="swal2-input" placeholder="Assignment" pattern="[a-zA-Z]+" required>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="Startdate">Startdate</label>' +
            '<input id="Startdate" class="swal2-input" type="date" placeholder="Startdate" required>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="Enddate">Enddate</label>' +
            '<input id="Enddate" class="swal2-input" type="date" placeholder="Enddate" required>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="status">Status</label>' +
            '<select id="status" class="swal2-input">' +
            '<option value="assigned">Assigned</option>' +
            '</select>' +
            '</div>' +

            '</form>',
          showCancelButton: true,
          preConfirm: async () => {
            createdata();
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }


  const createdata = () => {
    const usernameElement = document.getElementById("username");
    const selectedOption = usernameElement.options[usernameElement.selectedIndex];
    const username = selectedOption.text;
    const userID = selectedOption.value;
    const Assignment = document.getElementById("Assignment").value;
    const Startdate = document.getElementById("Startdate").value;
    const Enddate = document.getElementById("Enddate").value;
    const status = document.getElementById("status").value;

    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        userID: userID,
        Assignment: Assignment,
        Startdate: Startdate,
        Enddate: Enddate,
        status: status,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        fetchData();
      })
      .catch((err) => console.error(err));
  };



  //EDIT

  const fetchLoginDataEDIT = async () => {
    const response = await fetch("http://localhost:3001/login");
    const loginData = await response.json();
    return loginData;
  };

  function showUserEditBox(id) {
    setId(id);
    fetch(`http://localhost:3001/task/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTaskIndex(data);
      });
    fetchLoginDataEDIT()
      .then((loginData) => {
        const dropdownOptions = loginData.map((user) => {
          return '<option value="' + user.id + '">' + user.fname + '</option>';
        }).join('');

        Swal.fire({
          title: "Edit user",
          customClass: {
            popup: "red-popup",
            content: "red-popup",
            title: "red-popup",
            actions: "red-popup",
          },
          html:
            '<form id="myform" class="is-validated">' +
            '<div class="swal2-row">' +
            '<input id="id" type="hidden" class="swal2-input">' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="username">Username</label>' +
            '<select id="username" class="swal2-input" value="${task.username}">' +
            dropdownOptions +
            '</select>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="Assignment">Assignment</label>' +
            '<textarea id="Assignment" name="Assignment" class="swal2-input" placeholder="Assignment" value="Assignment" required ></textarea>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="Startdate">Startdate</label>' +
            '<input id="Startdate" class="swal2-input" type="date" placeholder="Startdate" value="Startdate" required>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="Enddate">Enddate</label>' +
            '<input id="Enddate" class="swal2-input" type="date" placeholder="Enddate" value="Enddate" required>' +
            '</div>' +

            '<div class="swal2-row">' +
            '<label for="status">Status</label>' +
            '<select id="status" class="swal2-input" value="status">' +
            '<option value="assigned">Assigned</option>' +
            '</select>' +
            '</div>' +

            '</form>',

          showCancelButton: true,
          preConfirm: async () => {
            Editdata(id);
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }



  const Editdata = (id) => {
    const usernameElement = document.getElementById("username");
    const selectedOption = usernameElement.options[usernameElement.selectedIndex];
    const username = selectedOption.text;
    const userID = selectedOption.value;
    const Assignment = document.getElementById("Assignment").value;
    const Startdate = document.getElementById("Startdate").value;
    const Enddate = document.getElementById("Enddate").value;
    const status = document.getElementById("status").value;

    fetch(`http://localhost:3001/task/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        username: username,
        userID: userID,
        Assignment: Assignment,
        Startdate: Startdate,
        Enddate: Enddate,
        status: status,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        fetchData();
      })
      .catch((err) => console.error(err));
  };


  //DELETE

  const deletedata = (id) => {
    fetch(`http://localhost:3001/task/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        fetchData();
      })
      .catch(err => console.error(err));
  };

  //sorting
  const sortTasks = (tasks) => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      switch (sortOption) {
        case 'Enddate':
          const dueDateA = parseDate(a.Enddate);
          const dueDateB = parseDate(b.Enddate);
          return dueDateA - dueDateB;
        case 'Startdate':
          const startDateA = parseDate(a.Startdate);
          const startDateB = parseDate(b.Startdate);
          return startDateA - startDateB;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
    return sortedTasks;
  };



  const parseDate = (dateString) => {
    if (!dateString) {
      return null;
    }

    const [day, month, year] = dateString.split('/');
    const parsedDate = new Date(`${year}-${month}-${day}`);
    return parsedDate;
  };

  const sortedTasks = Array.isArray(taskindex) ? sortTasks(taskindex) : [];

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      {/* Sort dropdown */}
      <div>
        <select className="mt-5 text-center" value={sortOption} onChange={handleSortChange} style={{ color: 'white', backgroundColor: '#8CC327', border: 'none', width: '220px', height: '40px', borderRadius: '20px', fontWeight: '600' }}>
          <option value="Enddate">Sort by Due Date</option>
          <option value="Startdate">Sort by Start Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Create button */}
      <button className='mt-5 ms-5' onClick={showUserCreateBox} style={{ backgroundColor: ' #8CC327', border: 'none', color: 'white', fontWeight: '600', width: '70px', height: '35px', borderRadius: '20px' }}>Create</button>

      {/* Task and user details */}
      <div className="row bg-black text-white mt-5 text-center">
        <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>id</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>username</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>Start Date</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>End Date</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>Assignment</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>Status</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>Edit</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td style={{ backgroundColor: 'black', padding: '30px' }}>{task.userID}</td>
                  <td style={{ backgroundColor: 'black', padding: '30px' }}>{task.username}</td>
                  <td style={{ backgroundColor: 'black', padding: '30px' }}>{task.Startdate}</td>
                  <td style={{ backgroundColor: 'black', padding: '10px' }}>{task.Enddate}</td>
                  <td style={{ backgroundColor: 'black', padding: '10px' }}>{task.Assignment}</td>
                  <td style={{ backgroundColor: 'black', padding: '10px' }}>{task.status}</td>
                  <td><button bg-white style={{ backgroundColor: ' #8CC327', border: 'none', color: 'white', fontWeight: '600', width: '60px', height: '35px', borderRadius: '20px' }} onClick={() => showUserEditBox(task.id)}><i class="fa-solid fa-pen-to-square"></i></button> </td>
                  <td><button bg-white style={{ backgroundColor: ' #8CC327', border: 'none', color: 'white', fontWeight: '600', width: '60px', height: '35px', borderRadius: '20px' }} onClick={() => deletedata(task.id)}><i class="fa-sharp fa-solid fa-trash"></i></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}




