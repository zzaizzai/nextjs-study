'use client';

import { signIn } from 'next-auth/react'


export default function LoginBtn() {
    return (
        <button className='showPointer'  onClick={() => {
            signIn()
        }}  >Login</button>
    )
}
