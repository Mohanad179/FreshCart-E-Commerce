import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function loading() {
  return (
    <div className='h-screen flex justify-center items-center'>
    <Oval
        visible={true}
        height="50"
        width="50"
        color="#16a34a"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
    </div>
  )
}
