import "./index.css";
import { useState } from "react"
import UserCard from "../UserCard"
import Payment from "../Payment";

function Users() {
  const [qty, setQty] = useState(0);

  const handleChange = (evento) => {
    setQty(evento.target.value);
  }

  const rows = [];
  for (let i = 0; i < qty; i++) {
    rows.push(< UserCard key={i} />)
  }

  return (
    <>
      <div className='usersCard' >
        <h4 className="amountTitle">¿Cuántas personas son?</h4>
        <input className="quantity" onChange={handleChange} type="number" />
        <div>{rows}</div>
      </div>

      <Payment />
    </>

  );
}

export default Users;
