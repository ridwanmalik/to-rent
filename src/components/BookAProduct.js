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
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import { GlobalContext } from './contexts/GlobalContext'
import Box from '@mui/material/Box'
import moment from "moment"
import FormHelperText from '@mui/material/FormHelperText'

const BookAProduct = () => {
  const [state] = useContext(GlobalContext)
  const [openBooking, setOpenBooking] = useState(false)
  const [openCalculation, setOpenCalculation] = useState(false)
  const [product, setProduct] = useState('')
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
    setOpenBooking(true)
  }

  const handleBookingClose = () => {
    setProduct('')
    setFromDate(today)
    setToDate(tomorrow)
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
    const bookingDays = moment(toDate).diff(moment(fromDate), 'days') + 1
    const bookingPrice = selectedProduct.price * bookingDays

    console.log(`Log | file: BookAProduct.js | line 71 | bookingDays`, bookingDays)
    console.log(`Log | file: BookAProduct.js | line 71 | bookingPrice`, bookingPrice)

    // state.bookProduct(product, fromDate, toDate)
    handleBookingClose()
  }

  const handleCalculateClose = () => {
    setOpenCalculation(false)
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
                minDate={ tomorrow }
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
            To book a product, please fill the form below.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BookAProduct
