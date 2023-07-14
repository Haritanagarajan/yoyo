import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductUengage() {
  const [taskindex, settaskindex] = useState([]);
  const [sortOption, setSortOption] = useState('Enddate');

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
    const [day, month, year] = dateString.split('/');
    return new Date(`${month}/${day}/${year}`);
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
      {sortedTasks.map((task) => (
        <div className="col-md-6" key={task.id}>
          <Link to={`/Taskdisplay/${task.id}`} style={{ textDecoration: 'none' }}>
            <div className="cards bg-black text-white pt-5 pb-5 mt-4 offset-5 col-md-12">
              <div className="card-body text-center">{task.Assignment}</div>
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
