import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser,changeRole } from '../../utils';
import Header from '../../layouts/header/Header';
import "./Gestor_usuarios.css"

const Gestor_usuarios = () => {
  const [users, setUsers] = useState([]);



  // Mover fetchUsers fuera del useEffect
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error al obtener usuarios: ", err.message);
    }
  };

  const chRole = async (id,role) => {
    if (!id) {
      console.error("ID inválido para modificar usuario");
      return;
    }
    try {
      const resp = confirm("Seguro que desea cambiar el rol al usuario?");
      if (resp) {
        await changeRole(id,role);
        // Volver a obtener la lista de usuarios
        fetchUsers();
      } else {
        return;
      }
    } catch (err) {
      console.error("No se pudo eliminar: ", err);
    }
  };

  const delUser = async (id) => {
    if (!id) {
      console.error("ID inválido para eliminar usuario");
      return;
    }
    try {
      const resp = confirm("Seguro que desea eliminar al usuario?");
      if (resp) {
        await deleteUser(id);
        // Volver a obtener la lista de usuarios
        fetchUsers();
      } else {
        return;
      }
    } catch (err) {
      console.error("No se pudo eliminar: ", err);
    }
  };

  useEffect(() => {
    fetchUsers(); // Llamar a fetchUsers al montar el componente
  }, []);

  return (
    <div className='gestor'>
    <Header/>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Rol</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Dirección</th>
          <th scope="col">Eliminar</th>
          <th scope="col">Cambiar de rol</th>
        </tr>
      </thead>
      <tbody>
  {users.map((user, index) => (
    <tr key={user.id}>
      <th scope="row">{index + 1}</th>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.role}</td>
      <td>{user.phone}</td>
      <td>{user.address}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => delUser(user.id)}
        >
          Eliminar
        </button>
      </td>
      <td>
        <select
          className="form-select"
          value={user.role}
          onChange={(e) => chRole(user.id, e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="user">User</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>
    </table>
    </div>
  );
};

export default Gestor_usuarios;