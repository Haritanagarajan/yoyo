import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ProductUengage() {
  const [taskindex, settaskindex] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [id, setId] = useState('');

  const fetchData = () => {
    fetch('http://localhost:4000/task')
      .then((response) => response.json())
      .then((data) => {
        settaskindex(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function showUserCreateBox() {
    Swal.fire({
      title: "Create user",
      customClass: {
        popup: 'red-popup',
      },
      html:
        '<form id="myform" class="is-validated">' +
        '<div class="swal2-row">' +
        '<input id="id" type="hidden" class="swal2-input">' +
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
        '<label for="status">status</label>' +
        '<input id="status"  class="swal2-input" type="text" placeholder="status" ">' +
        "</div>",
      showCancelButton: true,
      preConfirm: async () => {
        createdata();
      },
    });
  }

  const createdata = () => {
    const Assignment = document.getElementById("Assignment").value;
    const Startdate = document.getElementById("Startdate").value;
    const Enddate = document.getElementById("Enddate").value;
    const status = document.getElementById("status").value;

    fetch('http://localhost:4000/task', {
      method: 'POST',
      body: JSON.stringify({
        Assignment: Assignment,
        Startdate: Startdate,
        Enddate: Enddate,
        status: status
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        fetchData();
      })
      .catch(err => console.error(err));
  };

  function showUserEditBox(id) {
    setId(id);
    fetch(`http://localhost:4000/task/${id}`)
      .then((response) => response.json())
      .then((data) => {
        settaskindex(data);
      });
    Swal.fire({
      title: "Edit user",
      customClass: {
        popup: 'red-popup',
      },
      html:
        '<form id="myform" class="is-validated">' +
        '<div class="swal2-row">' +
        '<input id="id" type="hidden" class="swal2-input">' +
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
        '<label for="status">status</label>' +
        '<input id="status"  class="swal2-input" type="text" placeholder="status" ">' +
        "</div>",

      showCancelButton: true,
      preConfirm: async () => {
        Editdata(id);
      },
    });
  }

  const Editdata = (id) => {
    const Assignment = document.getElementById("Assignment").value;
    const Startdate = document.getElementById("Startdate").value;
    const Enddate = document.getElementById("Enddate").value;
    const status = document.getElementById("status").value;

    fetch(`http://localhost:4000/task/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        Assignment: Assignment,
        Startdate: Startdate,
        Enddate: Enddate,
        status, status
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        fetchData();
      })
      .catch(err => console.error(err));
  };

  const deletedata = (id) => {
    fetch(`http://localhost:4000/task/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        fetchData();
      })
      .catch(err => console.error(err));
  };

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

  const sortedTasks = sortTasks(taskindex);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <div>
        <select className="mt-5 text-center" value={sortOption} onChange={handleSortChange} style={{ color: 'white', backgroundColor: '#8CC327', border: 'none', width: '220px', height: '40px', borderRadius: '20px', fontWeight: '600' }}>
          <option value="Enddate">Sort by Due Date</option>
          <option value="Startdate">Sort by Start Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>
      <button bg-white className='mt-5 ms-5' onClick={showUserCreateBox} style={{ backgroundColor: ' #8CC327', border: 'none', color: 'white', fontWeight: '600', width: '70px', height: '35px', borderRadius: '20px' }}>Create</button>
      {sortedTasks.map((task) => (
        <div className="col-md-6" key={task.id}>
          <Link to={`/Taskdisplay/${task.id}`} style={{ textDecoration: 'none' }}>
            <div className="cards bg-black text-white text-center mt-4 offset-5 col-md-12">
              <div className="card-body text-center">{task.Assignment}</div>
              <button bg-white style={{ backgroundColor: ' #8CC327', border: 'none', color: 'white', fontWeight: '600', width: '60px', height: '35px', borderRadius: '20px' }} onClick={() => deletedata(task.id)}>Delete</button>
              <button bg-white style={{ backgroundColor: ' #8CC327', border: 'none', color: 'white', fontWeight: '600', width: '60px', height: '35px', borderRadius: '20px' }} onClick={() => showUserEditBox(task.id)}>Edit</button>
              <noscript>{task.Startdate}</noscript>
              <noscript>{task.Enddate}</noscript>
              <noscript>{task.status}</noscript>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
