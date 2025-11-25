import { useEffect, useState } from "react"
import '../styles/style.scss'
import { ToastContainer } from "react-toastify"
import Loading from "../components/Loading"
import { APP_ID, SERVER_URL } from "../../config"

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)
  const [hAlert, setHAlert] = useState(true)

  // Initialise Moralis only in the browser to avoid localStorage errors during SSR/build
  useEffect(() => {
    let isMounted = true

    const initMoralis = async () => {
      try {
        const { default: Moralis } = await import('moralis')
        if (!isMounted) return
        Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID })
      } catch (e) {
        // Swallow errors during build/SSR; they will surface in the browser console if relevant
        console.error('Failed to initialize Moralis', e)
      }
    }

    initMoralis()

    return () => {
      isMounted = false
    }
  }, [])
  return (
    <>
      <Component {...pageProps}
        startLoading={() => setPageLoading(true)}
        closeLoading={() => setPageLoading(false)}
        headerAlert={hAlert}
        closeAlert={() => setHAlert(false)}
      />
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </>
  )
}

export default MyApp
