import React from 'react'
import  {InputBase } from '@mui/material'
import { fontGrid } from '@mui/material/styles/cssUtils'

const Form = () => {
  return (
    <div >
      <div><input type="email"  placeholder='Your email'/></div> 
    <div><input type="password"  placeholder='password'/></div>
    
    </div>
   
  )
}

export default Form
