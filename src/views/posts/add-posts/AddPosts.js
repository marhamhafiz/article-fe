import React, { useState } from 'react';
import  { useNavigate } from 'react-router-dom'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton
} from '@coreui/react'

import axios from 'axios'

const AddPosts = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const baseURL = 'http://127.0.0.1:10000/api/article'

  const navigate = useNavigate();

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
      .post(baseURL, {
        "title" : title,
        "content" : content,
        "category" : category,
        "status" : status
      })
      .then(() => {
        navigate('/allposts');
      });
  }

  return (
    <CCard className="mb-4">
    <CCardBody>
        <CRow>
        <CCol sm={12}>
        <CForm>
        <div className="mb-3">
            <CFormLabel htmlFor="titleFrom">Title</CFormLabel>
            <CFormInput type="text" id="titleFrom" placeholder="Your post title" onChange={handleTitleChange}/>
        </div>
        <div className="mb-3">
            <CFormLabel htmlFor="contentForm">Content</CFormLabel>
            <CFormTextarea type="text" id="contentForm" rows="3" onChange={handleContentChange}></CFormTextarea>
        </div>
        <div className="mb-3">
            <CFormLabel htmlFor="categoryForm">Category</CFormLabel>
            <CFormInput type="text" id="categoryForm" placeholder="Your post category" onChange={handleCategoryChange}/>
        </div>
        <div className="mb-3">
            <CButton type="submit" className='mb-1 me-1' color="success" variant="outline" onClick={() => handleForm('publish')}>
                Publish
            </CButton>
            <CButton type='button' className='mb-1 me-1' color="danger" variant="outline" onClick={() => handleForm('draft')} role="button">Draft</CButton>
        </div>
        </CForm>
        </CCol>
        </CRow>
    </CCardBody>
    </CCard>
  )
}

export default AddPosts