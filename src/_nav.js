import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem} from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Posts',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Posts',
        to: '/allposts',
      },
      {
        component: CNavItem,
        name: 'Add New Post',
        to: '/addpost',
      },
      {
        component: CNavItem,
        name: 'Preview',
        to: '/previewposts',
      },
    ],
  },
]

export default _nav
