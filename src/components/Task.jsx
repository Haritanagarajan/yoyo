import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Task() {
    const [taskIndex, setTaskIndex] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [id, setId] = useState();

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
                        fetchData(); // Fetch updated task list
                    })
                    .catch((err) => console.error(err));
            });
    };

    const sortTasks = (task) => {
        const sortedTasks = [...task];
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

    const sortedTasks = sortTasks(taskIndex);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div>
            <div>
                <select
                    className="mt-5 text-center"
                    value={sortOption}
                    onChange={handleSortChange}
                    style={{
                        color: 'white',
                        backgroundColor: '#8CC327',
                        border: 'none',
                        width: '220px',
                        height: '40px',
                        borderRadius: '20px',
                        fontWeight: '600',
                    }}
                >
                    <option value="Enddate">Sort by Due Date</option>
                    <option value="Startdate">Sort by Start Date</option>
                    <option value="status">Sort by Status</option>
                </select>
            </div>
            {sortedTasks.length > 0 ? (
                sortedTasks.map((task) => (
                    <div className="col-md-6" key={task.id}>
                        <Link to={`/Taskdisplay/${task.id}`} style={{ textDecoration: 'none' }}>
                            <div className="cards bg-black text-white pt-5 pb-5 mt-4 offset-5 col-md-12">
                                <div className="card-body text-center">{task.Assignment}</div>
                                <noscript>{task.Startdate}</noscript>
                                <noscript>{task.Enddate}</noscript>
                                <noscript>{task.status}</noscript>
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
                ))
            ) : (
                <div>No tasks found.</div>
            )}
        </div>
    );
}
