import * as React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import logoImage from '../../assets/logo.png'
import { logout } from '@/api/member'
import { useNavigate } from 'react-router-dom'
import { childIdState } from '@/state/Parentatoms'
import { useRecoilState } from 'recoil'

const pages = [
  { label: '자녀학습 현황', link: '/mainparent/childstatus' },
  { label: '마이 지갑', link: '/parentwallet' },
  { label: '실시간 환율', link: '/currency' },
]

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [childId, setChildId] = useRecoilState(childIdState)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const navigateToPage = (link: string) => {
    navigate(link)
    // 페이지 이동 후 새로고침
    window.location.reload()
  }

  const handleLogout = () => {
    logout()
      .then(() => {
        localStorage.clear()
        setChildId(0)
        navigate('/')
          window.location.reload()
      })
      .catch((error) => {
        console.error('Logout failed:', error)
        window.location.reload()
        // Handle logout error here
      })
  }

  return (
    <AppBar position="relative" sx={{ height: 70, backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'flex-start',
            paddingLeft: { md: '180px', xs: 0 },
            paddingRight: { md: '160px', xs: 0 },
          }}
        >
          {/* 큰 화면 로고 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link
              to="/mainparent"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img
                src={logoImage}
                alt="LOGO"
                style={{ height: '52px', marginBottom: 3.7 }}
              />
            </Link>
          </Box>

          {/* 큰 화면에서의 메뉴 버튼 */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{
                  marginTop: 1.7,
                  ml: 2,
                  color: '#585865',
                  display: 'block',
                  fontWeight: 600,
                  fontSize: 17,
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* 작은 화면 메뉴바 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon
                sx={{ color: '#585865', fontSize: 35, marginTop: 0.7 }}
              />
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
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center" sx={{ color: '#585865' }}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 작은 화면 로고 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link
              to="/mainparent"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img
                src={logoImage}
                alt="LOGO"
                style={{ height: '50px', marginBottom: 4.5 }}
              />
            </Link>
          </Box>

          {/* 로그아웃 버튼 */}
          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="contained"
              disableElevation
              onClick={handleLogout}
              sx={{
                marginLeft: 3,
                marginTop: 1.2,
                width: 110,
                height: '42px',
                fontSize: '17px',
                backgroundColor: '#0064FF',
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
