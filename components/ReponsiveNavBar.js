import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';

import { createTheme , ThemeProvider} from '@mui/material/styles';
import Theme from './theme'

import Image from 'next/image'
import Link from 'next/link'
import User from './User'
import { useRouter } from 'next/router'

const pages = [
  {
    title: 'LÌ XÌ TẾT',
    link: 'https://tdcueh.tech/'
  },
  {
    title: 'DANH SÁCH HOẠT ĐỘNG',
    link: '/danh-sach-hoat-dong#view'
  }, 
  {
    title: 'TẾT 4.0 CÙNG UEHERS',
    link: '/tet-4-0-cung-uehers#view'
  }, 
  {
    title: 'ALBUM TẾT MỚI TRONG TIM',
    link: '/tet-moi-trong-tim#view'
  }, 
  {
    title: 'CHÚC LỜI YÊU THƯƠNG',
    link: '/chuc-loi-yeu-thuong#view'
  }, 
  {
    title: 'TRANG CHỦ',
    link: '/'
  }
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#990000',
    },
    secondary: {
      main: '#ff9933',
    },
    typography: {
      fontFamily: [
        'Montserrat'
      ].join(','),
    },
  },
});

const ResponsiveNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changePage = (link) =>{
        router.replace(link)
  }

  const reloadPage = () => {
    router.reload()
  }

  const logo = (
    <div id="brand" >
        <Box sx={{display: 'inline-flex'}}>
        <div style={{paddingRight: "10px"}} ><Image src ="/log1.png" width="77px" height="40px"/></div>
        <div style={{paddingRight: "10px"}} ><Image src ="/log3.png" width="40px" height="40px"/></div>
        <div><Image src ="/log4.png" width="40px" height="40px"/></div>
        </Box>
    </div>
  )

  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar sx = {{height: 80}} disableGutters>
          <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            {logo}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                <Link key={i} href={page.link}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {logo}
          </Box>

          <Box
            id="scroll"
             sx={{ 
              flexGrow: 1, 
              flexDirection: 'row-reverse', 
              display: { xs: 'none', md: 'flex' }
              }}
            >
            
            {pages.map((page, i) => (
              <Link key={i} href={page.link}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' , fontWeight: 'bold', fontSize: '12px' }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <User
            changePage = {changePage}
            reloadPage = {reloadPage}
          />
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    </React.Fragment>
  );
};
export default ResponsiveNavBar
