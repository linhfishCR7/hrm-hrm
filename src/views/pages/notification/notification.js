// ** React Imports
import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import MuiMenu from '@mui/material/Menu'
import MuiAvatar from '@mui/material/Avatar'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Icons Imports
// import BellOutline from 'mdi-material-ui/BellOutline'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { Badge } from 'antd'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import Pool from '../../../utils/UserPool'

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '& .MuiMenu-list': {
    padding: 0,
  },
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0,
  },
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles,
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem',
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75),
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})
const user = Pool.getCurrentUser()

const NotificationDropdown = () => {
  const [data, setData] = useState([{}])
  const [total_unread, setTotalUnread] = useState(0)
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const ScrollWrapper = ({ children }) => {
    ScrollWrapper.propTypes = {
      children: PropTypes.func,
    }
    return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    // if (hidden) {
    //   return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    // } else {
    //   return (
    //     <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
    //       {children}
    //     </PerfectScrollbar>
    //   )
    // }
  }
  let navigate = useNavigate()

  useEffect(() => {
    API({ REGISTER_URL: '/hrm/notification/?no_pagination=true', ACTION: 'GET' })
      .then((results) => {
        setData(results.data.results)
        setTotalUnread(results.data.total_unread)
      })
      .catch(function (error) {
        console.log(error.response.data.message)
      })
  }, [])
  const handleReadOne = (noti_id) => {
    API({
      REGISTER_URL: '/hrm/notification/' + noti_id + '/read-one/' + user.username + '/',
      ACTION: 'PUT',
    }).then((res) => {
      API({ REGISTER_URL: '/hrm/notification/?no_pagination=true', ACTION: 'GET' })
        .then((results) => {
          setData(results.data.results)
          setTotalUnread(results.data.total_unread)
        })
        .catch(function (error) {
          console.log(error.response.data.message)
        })
    })
  }

  const handleReadAll = () => {
    API({
      REGISTER_URL: '/hrm/notification/read-all/' + user.username + '/',
      ACTION: 'PUT',
    }).then((res) => {
      API({ REGISTER_URL: '/hrm/notification/?no_pagination=true', ACTION: 'GET' })
        .then((results) => {
          setData(results.data.results)
          setTotalUnread(results.data.total_unread)
        })
        .catch(function (error) {
          console.log(error.response.data.message)
        })
    })
  }
  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        onClick={handleDropdownOpen}
        aria-controls="customized-menu"
      >
        <Badge count={total_unread}>
          <CIcon icon={cilBell} size="lg" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Thông Báo</Typography>
            <Chip
              size="small"
              label={total_unread}
              color="primary"
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {data.map((item) => (
            <MenuItem onClick={() => handleReadOne(item.id)} key={item.id}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Avatar
                  alt={item.first_name_data ? item.first_name_data : 'Image'}
                  src={item.user_image}
                />
                <Box
                  sx={{
                    mx: 4,
                    flex: '1 1',
                    display: 'flex',
                    overflow: 'hidden',
                    flexDirection: 'column',
                  }}
                >
                  <MenuItemTitle>{item.title}</MenuItemTitle>
                  <MenuItemSubtitle variant="body2">{item.body}</MenuItemSubtitle>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {item.created_at_data}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button fullWidth variant="contained" onClick={handleReadAll}>
            Đọc Tất Cả Thông Báo
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
