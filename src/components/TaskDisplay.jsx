import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Taskdisplay component
const Taskdisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskindex, settaskindex] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/task/${id}`)
      .then((response) => response.json())
      .then((data) => settaskindex(data));
  }, [id]);

  if (!taskindex) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate('/Task');
  };

  return (
    <div>
      <div className="row bg-black text-white mt-5 text-center">
        <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>Start Date</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>End Date</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>Assignment</th>
              <th style={{ backgroundColor: ' #8CC327', color: 'white', padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ backgroundColor: 'black', padding: '30px' }} onClick={handleGoBack}>{taskindex.Startdate}</td>
              <td style={{ backgroundColor: 'black',padding: '10px'  }}>{taskindex.Enddate}</td>
              <td style={{ backgroundColor: 'black', padding: '10px' }}>{taskindex.Assignment}</td>
              <td style={{ backgroundColor: 'black', padding: '10px' }}>{taskindex.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Taskdisplay;


