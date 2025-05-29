import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../utils'

const Users_gestor = () => {
  
  const [users, setUsers] = useState([])

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch (err) {
        console.error("Error al obtener usuarios: ", err.message)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username || JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  )
}

export default Users_gestor
