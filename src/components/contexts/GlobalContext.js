import { createContext, useEffect, useState } from "react"

export const GlobalContext = createContext()

export const GlobalProvider = (props) => {

  const initialState = {
    loading: true,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    products: [],
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    const getData = async () => {
      setState(prevState => ({ ...prevState, loading: false }))
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GlobalContext.Provider value={ [state, setState] }>
      { props.children }
    </GlobalContext.Provider>
  )
}
