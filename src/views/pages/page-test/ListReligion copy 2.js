import { CContainer, CForm } from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import '../../../assets/index.css'

import API from '../../../utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

const defaultUrl = 'https://hrm-s3.s3.amazonaws.com/Invoice_12341231.pdf'

const Addmoreinput = ({ src = defaultUrl }) => {
  Addmoreinput.propTypes = {
    src: PropTypes.string,
  }
  // const [data, setData] = useState('')
  // const fetchTestAPI = () => {
  //   API({
  //     REGISTER_URL: '/user/salary/',
  //     ACTION: 'GET',
  //   })
  //     .then((res) => {
  //       const data = res.data
  //       setData(data)
  //     })
  //     .catch((error) => {})
  // }

  // useEffect(() => {
  //   fetchTestAPI()
  // }, [])
  const [pdf, setPDF] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [scale, setScale] = useState(1)
  const [numPages, setNumPages] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const canvasRef = useRef()

  const renderPage = useCallback(async ({ pdfDoc, pageNum, scale }) => {
    const page = await pdfDoc.getPage(pageNum)

    const ctx = canvasRef.current.getContext('2d')

    const viewport = page.getViewport({ scale })

    canvasRef.current.width = viewport.width
    canvasRef.current.height = viewport.height

    page.render({
      canvasContext: ctx,
      viewport: viewport,
    })
  }, [])

  const prevPage = () => {
    if (currentPage > 1) {
      renderPage({ pdfDoc: pdf, pageNum: currentPage - 1, scale })
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage < numPages) {
      renderPage({ pdfDoc: pdf, pageNum: currentPage + 1, scale })
      setCurrentPage(currentPage + 1)
    }
  }

  const zoomOut = () => {
    renderPage({ pdfDoc: pdf, pageNum: currentPage, scale: scale - 0.1 })
    setScale(scale - 0.1)
  }

  const zoomIn = () => {
    renderPage({ pdfDoc: pdf, pageNum: currentPage, scale: scale + 0.1 })
    setScale(scale + 0.1)
  }

  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjs.getDocument(src)

      const pdfDoc = await loadingTask.promise

      setPDF(pdfDoc)

      setNumPages(pdfDoc._pdfInfo.numPages)

      renderPage({ pdfDoc, pageNum: 1, scale: 1 })

      setLoaded(true)
    }

    fetchPdf()
  }, [renderPage, src])
  return (
    <CContainer className="content">
      <div className="row">
        <div className="col-sm-12">
          <h5 className="mt-3 mb-4 fw-bold">Dynamically add/remove inputs fields reactjs </h5>
          <div className="container">
            {loaded ? (
              <div className="menu-bar">
                <div className="title">Eloquent JavaScript</div>
                <button>
                  <i className="gg-play-track-prev" onClick={prevPage}></i>
                </button>
                <button>
                  <i className="gg-play-track-next" onClick={nextPage}></i>
                </button>
                <div className="pagination">
                  Trang {currentPage} / {numPages}
                </div>
                <i className="gg-zoom-in" onClick={zoomIn} />
                <i className="gg-zoom-out" onClick={zoomOut} />
              </div>
            ) : (
              <h2 style={{ color: '#fff', textAlign: 'center', fontSize: '40px' }}>Loading...</h2>
            )}
            <div className="canvas-container">
              <div>
                <canvas ref={canvasRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CContainer>
  )
}
export default Addmoreinput
