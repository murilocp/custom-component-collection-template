import React, { useCallback, useRef, useState, useEffect } from 'react'
import * as PDFJS from 'pdfjs-dist'
import type {
  PDFDocumentProxy,
  RenderParameters
} from 'pdfjs-dist/types/src/display/api'

import styles from './styles.module.scss'

interface Props {
  src: string
}

PDFJS.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.mjs`

export default function PdfViewer({ src }: Props) {
  const [hasError, setHasError] = useState(false)
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  let renderTask: PDFJS.RenderTask

  const renderPage = useCallback(
    (pageNum: number, pdf = pdfDoc) => {
      const canvas = canvasRef.current
      if (!canvas || !pdf) return
      canvas.height = 0
      canvas.width = 0

      pdf
        .getPage(pageNum)
        .then((page) => {
          const viewport = page.getViewport({ scale: 0.5 })
          canvas.height = viewport.height
          canvas.width = viewport.width

          canvas.style.width = '100%'

          const renderContext: RenderParameters = {
            canvasContext: canvas.getContext('2d')!,
            viewport: viewport
          }
          try {
            if (renderTask) {
              renderTask.cancel()
            }
            renderTask = page.render(renderContext)
            return renderTask.promise
          } catch (error) {}
        })
        .catch((error) => console.error(error))
    },
    [pdfDoc]
  )

  useEffect(() => {
    renderPage(1, pdfDoc)
  }, [pdfDoc, renderPage])

  useEffect(() => {
    const loadingTask = PDFJS.getDocument(src)
    loadingTask.promise.then(
      (loadedDoc) => {
        setPdfDoc(loadedDoc)
      },
      (error) => {
        setHasError(true)
        console.error(error)
      }
    )
  }, [src])

  return !hasError ? (
    <div className={styles.pdfPreviewWrapper}>
      <canvas ref={canvasRef} />
    </div>
  ) : (
    <></>
  )
}
