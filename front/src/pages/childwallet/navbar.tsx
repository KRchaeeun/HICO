import React, { startTransition } from 'react'
import { Box, List, ListItem, Button } from '@mui/material'
import logoImage from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/api/member'

const NavbarDrawer: React.FC = () => {
  const navigate = useNavigate()
  // Logout function
  const handleLogout = () => {
    logout()
      .then(() => {
        localStorage.clear()
        navigate('/')
      })
      .catch((error) => {
        console.error('Logout failed:', error)
        // Handle logout error here
      })
  }

  const logoClick = () => {
    startTransition(() => {
      navigate('/mainchild/worldmap')
    })
  }

  return (
    <Box style={{ paddingTop: '10px' }}>
      <List sx={{ display: 'flex', paddingTop: '5px' }}>
        <ListItem>
          <img
            src={logoImage}
            alt="Logo"
            style={{
              height: '60px',
              marginTop: '-10px',
              marginLeft: '40px',
              cursor: 'pointer',
            }}
            onClick={logoClick}
          />
        </ListItem>
        <ListItem
          sx={{
            paddingTop: '10px',
            paddingBottom: '0px',
            width: '70%',
            paddingLeft: '180px',
          }}
        >
          <Button
            onClick={() => navigate('/mainchild/worldmap')}
            sx={{
              fontSize: '20px',
              color: '#40404A',
              fontWeight: 'bold',
              width: '100%',
              marginRight: '70px',
            }}
          >
            월드맵
          </Button>
        </ListItem>
        <ListItem
          sx={{ paddingTop: '10px', paddingBottom: '0px', width: '95%' }}
        >
          <Button
            onClick={
              () => navigate('/childwallet/point')
              /* 포인트/실시간 환율 이동 로직 */
            }
            sx={{
              fontSize: '20px',
              color: '#40404A',
              fontWeight: 'bold',
              width: '100%',
            }}
          >
            포인트/실시간 환율
          </Button>
        </ListItem>
        <ListItem sx={{ paddingTop: '10px', paddingBottom: '0px' }}>
          <Button
            onClick={
              () => navigate('/childwallet/account')
              /* 내 지갑 이동 로직 */
            }
            sx={{
              fontSize: '20px',
              color: '#40404A',
              fontWeight: 'bold',
              width: '100%',
              marginRight: '50px',
            }}
          >
            내 지갑
          </Button>
        </ListItem>
        <ListItem sx={{ paddingTop: '10px', paddingBottom: '0px' }}>
          <Button
            onClick={handleLogout}
            sx={{
              width: '120px', // 버튼의 가로 길이
              height: '45px', // 버튼의 세로 길이
              fontSize: '18px', // 폰트 사이즈
              backgroundColor: '#585865',
              color: 'white', // 기본 폰트 색상
              marginLeft: '100px',
              borderRadius: '10px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#202632', // 호버 상태에서의 배경색 변경
              },
            }}
          >
            로그아웃
          </Button>
        </ListItem>
      </List>
    </Box>
  )
}

export default NavbarDrawer
