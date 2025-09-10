import React from 'react';
import '../styles/MyHome.css';
import img from "../assets/Group.png";
import img2 from "../assets/phone_outline.png";
import img3 from "../assets/user.png";

const AdminMyHome = () => {
  const managers = [
    { id: 1, name: 'Идрисова Мерей Алихановна', phone: '+77001234567' },
    { id: 2, name: 'Идрисова Мерей Алихановна', phone: '+77001234567' },
    { id: 3, name: 'Идрисова Мерей Алихановна', phone: '+77001234567' },
    { id: 4, name: 'Идрисова Мерей Алихановна', phone: '+77001234567' }
  ];

  return (
    <div className="my-home">
      <div className="apartment-box">
        <div className="icon"> <img src={img} alt="" /> </div>
        <div className="info">
          <p>ЖК: Arman City</p>
          <strong>Квартира №301</strong>
        </div>
      </div>

      <div className="managers">
        {managers.map((manager) => (
          <div key={manager.id} className="manager-card">
            <div className="left">
              <div className="avatar">
                <img src={img3} alt="" />
              </div>
              <div className="text">
                <p className="label">Менеджер объекта</p>
                <p className="name">{manager.name}</p>
              </div>
            </div>
            <a className="call-btn" href={`tel:${manager.phone}`}>
              <img src={img2} alt="" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMyHome;
