import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Task() {
    const [taskIndex, setTaskIndex] = useState([]);
    // const [sortOption, setSortOption] = useState('');
    const [id, setId] = useState();




    const fetchData = () => {
        fetch('http://localhost:3001/login?login_like=1')
            .then((response) => response.json())
            .then((loginData) => {
                // console.log(loginData)
                const loggedInUser = loginData.find((user) => user.id);

                if (loggedInUser) {
                    fetch(`http://localhost:3001/task?userID_like=${loggedInUser.id}`)
                        .then((response) => response.json())
                        .then((taskData) => {
                            console.log(taskData);
                            setTaskIndex(taskData);
                        })
                        .catch((error) => {
                            console.error('Error fetching task data:', error);
                        });
                } else {
                    console.error('Logged-in user not found');
                }
            })
            .catch((error) => {
                console.error('Error fetching login data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);


    function showEditStatus(id) {
        setId(id);
        fetch(`http://localhost:3001/task/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const currentStatus = data.status;
                Swal.fire({
                    title: 'Edit user',
                    customClass: {
                        popup: 'red-popup',
                    },
                    html:
                        '<form id="myform" class="is-validated">' +
                        '<div class="swal2-row">' +
                        '<input id="id" type="hidden" class="swal2-input">' +
                        '</div>' +
                        '<div class="swal2-row">' +
                        '<label for="status">status</label>' +
                        '<input id="completed" class="swal2-input" type="radio" placeholder="status" value="Completed" ' +
                        (currentStatus === 'Completed' ? 'checked' : '') +
                        '">Completed' +
                        '<input id="notCompleted" class="swal2-input" type="radio" placeholder="status" value="Notcompleted" ' +
                        (currentStatus === 'Notcompleted' ? 'checked' : '') +
                        '">Not Completed' +
                        '</div>',
                    showCancelButton: true,
                    preConfirm: async () => {
                        EditStatus(id);
                    },
                });
            });
    }

    const EditStatus = (id) => {
        const completedRadio = document.getElementById('completed');
        const notCompletedRadio = document.getElementById('notCompleted');
        const status = completedRadio.checked ? completedRadio.value : notCompletedRadio.value;

        fetch(`http://localhost:3001/task/${id}`)
            .then((response) => response.json())
            .then((task) => {
                const updatedTask = { ...task, status: status };

                fetch(`http://localhost:3001/task/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedTask),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        fetchData();
                    })
                    .catch((err) => console.error(err));
            });
    };



    return (
        <div>

            {taskIndex.map((task) => (
                <div className="col-md-6" key={task.userID}>
                    <Link to={`/Taskdisplay/${task.id}`} style={{ textDecoration: 'none' }}>
                        <div className="cards bg-black text-white pt-5 pb-5 mt-4 offset-5 col-md-12">
                            <div className="card-body text-center">{task.Assignment}</div>
                            <h6>{task.userID}</h6>
                            <h6>{task.username}</h6>
                            <h6>{task.Startdate}</h6>
                            <h6>{task.Enddate}</h6>
                            <h6>{task.status}</h6>
                        </div>
                    </Link>
                    <button
                        style={{ backgroundColor: ' #8CC327', border: 'none', color: 'white', fontWeight: '600', width: '220px', height: '35px', borderRadius: '20px' }}
                        type="button"
                        className="text-center offset-5 mt-3"
                        onClick={() => showEditStatus(task.id)}
                    >
                        Update your Status here...
                    </button>
                </div>
            ))}

        </div>
    );
}
