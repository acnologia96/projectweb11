import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const LoadingPage = () => {

  return (
    <div className='container'>
    <Box sx={{ display: 'flex', justifyContent:'center' }}>
      <CircularProgress color='inherit'  style={{width:50}} className="position-absolute top-50 start-50 translate-middle" />
    </Box>
    </div>
  )
}

export default LoadingPage
