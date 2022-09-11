import React, { useEffect, useState }from 'react'
import { NavLink } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CTooltip,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CNav,
  CNavItem,
  CNavLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilTrash,
  cilClipboard,
} from '@coreui/icons'

import axios from 'axios'

const AllPosts = () => {
  const [ListPosts, setListPosts] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleT, setVisibleT] = useState(false)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const baseURL = 'http://127.0.0.1:10000/api/article'

//   const navigate = useNavigate();

  function setList(){
    axios.get(`http://127.0.0.1:10000/api/article`)
    .then((response) => {
        setListPosts(response.data);
        // console.log('data', response.data)
    })
  }

  useEffect(() => {
    setList()
  }, [])

  function openEditForm(id){
    setVisible(!visible)
    setId(id)
    const post = ListPosts.find(i => i.id === id)
    setTitle(post.title)
    setContent(post.content)
    setCategory(post.category)
  }

  function setPostTrash(id){
    setId(id)
    const post = ListPosts.find(i => i.id === id)
    setTitle(post.title)
    setContent(post.content)
    setCategory(post.category)
    setVisibleT(!visibleT)
  }

  function updatePostTrash(){
    axios
      .patch(baseURL+"/"+id, {
        "title" : title,
        "content" : content,
        "category" : category,
        "status" : "trash"
      })
      .then(() => {
        setList()
        setVisibleT(!visibleT)
      });
  }

  function handleTitleChange(e){
    setTitle(e.target.value)
  }

  function handleContentChange(e){
    setContent(e.target.value)
  }

  function handleCategoryChange(e){
    setCategory(e.target.value)
  }

  function handleForm(status){
    axios
      .patch(baseURL+"/"+id, {
        "title" : title,
        "content" : content,
        "category" : category,
        "status" : status
      })
      .then(() => {
        setVisible(!visible);
        setList()
      });
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CNav className='mb-2' variant="tabs">
            <CNavItem>
                <NavLink exact to="/allposts">
                    <CNavLink active>All</CNavLink>
                </NavLink>
            </CNavItem>
            <CNavItem>
                <NavLink exact to="/allposts/publish">
                    <CNavLink>Publish</CNavLink>
                </NavLink>
            </CNavItem>
            <CNavItem>
                <NavLink exact to="/allposts/draft">
                    <CNavLink>Draft</CNavLink>
                </NavLink>
            </CNavItem>
            <CNavItem>
                <NavLink exact to="/allposts/trash">
                    <CNavLink>Trash</CNavLink>
                </NavLink>
            </CNavItem>
          </CNav>
          <CRow>
            <CCol sm={12}>
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                        <CTableRow>
                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {ListPosts.map((data) => {
                        return (
                        <CTableRow key={data.id}>
                        <CTableDataCell>{data.title}</CTableDataCell>
                        <CTableDataCell>{data.category}</CTableDataCell>
                        <CTableDataCell>
                            <CTooltip
                                content="Edit"
                                placement="top"
                            >
                                <CButton className='mb-1 me-1' color="success" variant="outline" onClick={() => openEditForm(data.id)} ><CIcon icon={cilClipboard}/></CButton>
                            </CTooltip>

                            <CTooltip
                                content="Trash"
                                placement="top"
                            >
                                <CButton className='mb-1 me-1' color="danger" variant="outline" onClick={() => setPostTrash(data.id)}><CIcon icon={cilTrash}/></CButton>
                            </CTooltip>
                        </CTableDataCell>
                        </CTableRow>
                    )})}
                    </CTableBody>
                </CTable>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
            <CModalTitle>Edit Post</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm>
            <div className="mb-3">
                <CFormLabel htmlFor="titleFrom">Title</CFormLabel>
                <CFormInput type="text" id="titleFrom" placeholder="Your post title" value={title} onChange={handleTitleChange}/>
            </div>
            <div className="mb-3">
                <CFormLabel htmlFor="contentForm">Content</CFormLabel>
                <CFormTextarea type="text" id="contentForm" rows="3" value={content} onChange={handleContentChange}></CFormTextarea>
            </div>
            <div className="mb-3">
                <CFormLabel htmlFor="categoryForm">Category</CFormLabel>
                <CFormInput type="text" id="categoryForm" placeholder="Your post category" value={category} onChange={handleCategoryChange}/>
            </div>
            </CForm>
        </CModalBody>
        <CModalFooter>
            <CButton type="submit" className='mb-1 me-1' color="success" variant="outline" onClick={() => handleForm('publish')}>
                Publish
            </CButton>
            <CButton type='button' className='mb-1 me-1' color="danger" variant="outline" onClick={() => handleForm('draft')} role="button">Draft</CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={visibleT} onClose={() => setVisibleT(false)}>
      <CModalHeader onClose={() => setVisibleT(false)}>
        <CModalTitle>Set Post Trash</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure to set this post as trash?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleT(false)}>
          Cancel
        </CButton>
        <CButton color="danger" onClick={() => updatePostTrash()}>Yes, Sure</CButton>
      </CModalFooter>
    </CModal>
    </>
  )
}

export default AllPosts