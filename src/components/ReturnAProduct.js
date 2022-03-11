import { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { GlobalContext } from './contexts/GlobalContext'
import { fetchData } from '../helper'

const ReturnAProduct = () => {
  const messages = {
    success: 'The product is successfully returned!',
    error: 'Something went wrong! please try again later.',
  }
  const [state, setState] = useContext(GlobalContext)
  const [openReturn, setOpenReturn] = useState(false)
  const [product, setProduct] = useState('')
  const [alertBox, setAlertBox] = useState(false)
  const [alertMessage, setAlertMessage] = useState(messages.error)
  const [alertType, setAlertType] = useState("error")
  const [errors, setErrors] = useState({
    product: false,
  })

  const handleProductChange = (event) => {
    setErrors({ ...errors, product: false })
    setProduct(event.target.value)
  }

  const handleReturnClose = () => {
    setOpenReturn(false)
  }

  const handleReturnOpen = () => {
    setOpenReturn(true)
  }

  const handleReturnSubmit = async () => {
    var requestHeaders = new Headers()
    requestHeaders.append("Content-Type", "application/json")


    var raw = JSON.stringify({
      "availability": true
    })

    var requestOptions = {
      method: 'PATCH',
      headers: requestHeaders,
      body: raw,
      redirect: 'follow'
    }
    const data = await fetchData(`products/${product}`, requestOptions)
    if (data.code) {
      setAlertType("success")
      setAlertMessage(messages.success)
      setState(prevState => ({ ...prevState, fetch: state.fetch + 1 }))
    } else {
      setAlertType("error")
      setAlertMessage(messages.error)
    }

    setOpenReturn(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertBox(false)
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={ handleReturnOpen }>Return</Button>
      <Dialog open={ openReturn } onClose={ handleReturnClose }>
        <DialogTitle>Return a product</DialogTitle>
        <DialogContent>
          <DialogContentText sx={ { mb: 2.5 } }>
            To book a product, please fill the form below.
          </DialogContentText>
          <FormControl fullWidth sx={ { mb: 4 } } error={ errors.product }>
            <InputLabel id="product-label">Select Product</InputLabel>
            <Select
              labelId="product-label"
              id="product"
              value={ product }
              label="Select Product"
              onChange={ handleProductChange }
            >
              { state.products.filter(product => !product.availability).map(product => (
                <MenuItem key={ product.code } value={ product.code }>{ product.name }</MenuItem>
              )) }
            </Select>
            { errors.product && <FormHelperText>Please select a product</FormHelperText> }
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleReturnClose }>Cancel</Button>
          <Button variant="contained" onClick={ handleReturnSubmit }>Return</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={ alertBox } onClose={ handleClose } autoHideDuration={ 6000 }>
        <Alert onClose={ handleClose } severity={ alertType } sx={ { width: '100%' } }>
          { alertMessage }
        </Alert>
      </Snackbar>
    </>
  )
}

export default ReturnAProduct
