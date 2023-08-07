import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Register from './Register'
import Login from './Login';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="d-flex justify-content-center">
    <div className="form-login border">
      <TabContext   value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList   onChange={handleChange} centered={true} >
            <Tab label="Sign In" value="1" className=' border-end' />
            <Tab label="Sign Up" value="2" className=' border-start'/>
            
          </TabList>
        </Box> 
        <TabPanel value="1" ><Login/></TabPanel>
        <TabPanel value="2" ><Register /></TabPanel>
      </TabContext>
 
    </div></div>
  );
}