import { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import moment from "moment"
import { GlobalContext } from './contexts/GlobalContext'
import { fetchData } from '../helper'

const BookAProduct = () => {
  const messages = {
    success: 'The product is successfully booked!',
    error: 'Something went wrong! please try again later.',
  }
  const [state, setState] = useContext(GlobalContext)
  const [openBooking, setOpenBooking] = useState(false)
  const [alertBox, setAlertBox] = useState(false)
  const [alertMessage, setAlertMessage] = useState(messages.error)
  const [alertType, setAlertType] = useState("error")
  const [openCalculation, setOpenCalculation] = useState(false)
  const [product, setProduct] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productMileage, setProductMileage] = useState(0)
  const [productDurability, setProductDurability] = useState(0)
  const today = moment()
  const tomorrow = moment().add(1, 'days')
  const [fromDate, setFromDate] = useState(today)
  const [toDate, setToDate] = useState(tomorrow)
  const [errors, setErrors] = useState({
    product: false,
  })

  const handleProductChange = (event) => {
    setErrors({ ...errors, product: false })
    const selectedProduct = state.products.find(productData => productData.code === event.target.value)
    const selectedProductMinimumRentPeriod = selectedProduct.minimum_rent_period
    const toDate = moment(fromDate).add(selectedProductMinimumRentPeriod, 'days')
    setToDate(toDate)
    setProduct(event.target.value)
  }

  const handleFromDateChange = (date) => {
    setErrors({ ...errors, fromDate: false, toDate: false })
    setFromDate(date)
  }

  const handleToDateChange = (date) => {
    setErrors({ ...errors, fromDate: false, toDate: false })
    setToDate(date)
  }

  const handleBookingOpen = () => {
    setProduct('')
    setFromDate(today)
    setToDate(tomorrow)
    setProductPrice(0)
    setProductMileage(0)
    setProductDurability(0)
    setOpenBooking(true)
  }

  const handleBookingClose = () => {
    setOpenBooking(false)
  }

  const handleBookingSubmit = () => {
    if (product === '') {
      setErrors({ ...errors, product: true })
      return
    }
    if (moment(fromDate).isAfter(toDate)) {
      setErrors({ ...errors, fromDate: true, toDate: true })
      return
    }

    const selectedProduct = state.products.find(productData => productData.code === product)
    const bookingDays = moment(toDate).diff(moment(fromDate), 'days')
    const bookingPrice = selectedProduct.price * bookingDays

    switch (selectedProduct.type) {
      case "plain":
        setProductDurability(selectedProduct.durability - bookingDays)
        break
      case "meter":
        const bookingMileage = selectedProduct.mileage + (10 * bookingDays)
        setProductMileage(bookingMileage)
        setProductDurability(selectedProduct.durability - (bookingDays * 4))
        break
      default:
        break
    }
    setOpenCalculation(true)
    setProductPrice(bookingPrice)
    handleBookingClose()
  }


  const handleCalculateClose = () => {
    setOpenCalculation(false)
  }

  const handleCalculationClose = () => {
    setOpenCalculation(false)
    setProductPrice(0)
    setProductMileage(0)
    setProductDurability(0)
  }

  const handleCalculationSubmit = async () => {
    const selectedProduct = state.products.find(productData => productData.code === product)

    var requestHeaders = new Headers()
    requestHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({
      "mileage": selectedProduct.type === "meter" ? productMileage : undefined,
      "durability": productDurability,
      "availability": false
    })

    var requestOptions = {
      method: 'PATCH',
      headers: requestHeaders,
      body: raw,
      redirect: 'follow'
    }

    const data = await fetchData(`products/${selectedProduct.code}`, requestOptions)
    if (data.code) {
      setAlertType("success")
      setAlertMessage(messages.success)
      setState(prevState => ({ ...prevState, fetch: state.fetch + 1 }))
    } else {
      setAlertType("error")
      setAlertMessage(messages.error)
    }
    setAlertBox(true)
    handleCalculationClose()
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertBox(false)
  }


  return (
    <>
      <Button variant="contained" onClick={ handleBookingOpen }>Book</Button>
      <Dialog open={ openBooking } onClose={ handleBookingClose }>
        <DialogTitle>Book a product</DialogTitle>
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
              { state.products.map(product => (
                <MenuItem key={ product.code } value={ product.code }>{ product.name }</MenuItem>
              )) }
            </Select>
            { errors.product && <FormHelperText>Please select a product</FormHelperText> }
          </FormControl>
          <Box sx={ { mb: 2.5, display: "flex", gap: 2.5 } }>
            <FormControl error={ errors.fromDate }>
              <MobileDatePicker
                label="From Date"
                value={ fromDate }
                onChange={ handleFromDateChange }
                renderInput={ (params) => <TextField { ...params } error={ errors.fromDate } /> }
                showDaysOutsideCurrentMonth
                minDate={ today }
              />
              { errors.fromDate && errors.toDate && <FormHelperText>Please select a valid date range</FormHelperText> }
            </FormControl>
            <FormControl error={ errors.fromDate }>
              <MobileDatePicker
                label="To Date"
                value={ toDate }
                onChange={ handleToDateChange }
                renderInput={ (params) => <TextField { ...params } error={ errors.toDate } /> }
                showDaysOutsideCurrentMonth
                minDate={ toDate }
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleBookingClose }>Cancel</Button>
          <Button variant="contained" onClick={ handleBookingSubmit }>Book</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={ openCalculation } onClose={ handleCalculateClose }>
        <DialogTitle>Book a product</DialogTitle>
        <DialogContent>
          <DialogContentText sx={ { mb: 2.5 } }>
            Your estimated price is ${ productPrice }
            <br />
            Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleCalculationClose }>No</Button>
          <Button variant="contained" onClick={ handleCalculationSubmit }>Yes</Button>
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

export default BookAProduct
