'use client';

import { signOut } from 'next-auth/react'


export default function LoginBtn() {
    return (
        <button className='showPointer' onClick={() => {
            signOut()
        }}  >LogOut</button>
    )
}
