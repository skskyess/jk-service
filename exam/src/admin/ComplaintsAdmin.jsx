import React, { useEffect, useState } from 'react';
import '../styles/Support.css';
import { useNavigate } from 'react-router-dom';
import img from '../assets/profile-circle.png';

const ComplaintsAdmin = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/complaints')
            .then(res => res.json())
            .then(setComplaints)
            .catch(err => console.error('Ошибка загрузки жалоб:', err));
    }, []);

    return (
        <div className="support-container">
            <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>

            <div className="support-list">
                {complaints.map((complaint) => (
                    <div
                        key={complaint.id}
                        className="support-item"
                        onClick={() => navigate(`/complaints-admin/${complaint.id}`, { state: { ...complaint, userEmail: complaint.email } })}
                    >
                        <img src={img} alt="avatar" className="support-avatar" />
                        <div className="support-info">
                            <h4>{complaint.name}</h4>
                            <p>{complaint.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComplaintsAdmin;
