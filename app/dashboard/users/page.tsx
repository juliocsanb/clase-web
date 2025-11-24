import Link from 'next/link'
import React from 'react'

export default function Users() {
  return (
    <div>
        <h1>LISTA DE USUARIOS</h1>
        <ul>
            <li><Link href={"/dashboard/users/1"}>User 1</Link></li>
            <li><Link href={"/dashboard/users/2"}>User 2</Link></li>
            <li><Link href={"/dashboard/users/3"}>User 3</Link></li> 
        </ul>
    </div>
  )
}
