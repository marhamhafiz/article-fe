import React, { useEffect, useState }from 'react'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CButton
} from '@coreui/react'

import axios from 'axios'

const PreviewPosts = () => {
  const [ListPosts, setListPosts] = useState([])
  function setList(){
    axios.get(`http://127.0.0.1:10000/api/article`)
    .then((response) => {
        setListPosts(response.data);
    })
  }

  useEffect(() => {
    setList()
  }, [])
  
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Preview
              </h4>
            </CCol>
          </CRow>
          <CRow>
        {ListPosts.map((data) => {
            if(data.status === "publish"){
                return (
                    <CCol sm={6} key={data.id}>
                      <CCard className='mt-2' sm={12}>
                          <CCardBody>
                              <CCardTitle>{data.title}</CCardTitle>
                              <CCardText>
                              Content: {data.content}
                              </CCardText>
                              <CCardText>
                              Category: {data.category}
                              </CCardText>
                              <CButton color="success">Publish</CButton>
                          </CCardBody>
                      </CCard>
                    </CCol>
                )
            }else{
                return(
                    ''
                )
            }
        })}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default PreviewPosts