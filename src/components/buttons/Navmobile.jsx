import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Nav_items from './Nav_items/Nav_items';


export default function Navmobile({list}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, background:"var(--color-bg)" }} role="presentation" onClick={toggleDrawer(false)}>
      
      <List>
        
        {list.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
        <div className="items" style={{position:"absolute", bottom:"0", width:"100%", padding:"10px 20px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Nav_items/>
          <Divider />
        </div>
    </Box>
  );

  return (
    <div className='navmobile'>
      
      <Button variant="outlined" sx={{color:"var(--color-text-dark)", outline:"1px solid var(--color-text-dark)"}} onClick={toggleDrawer(true)}>
        <i class="ri-menu-line"></i>
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
