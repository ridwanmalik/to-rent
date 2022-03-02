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
import { GlobalContext } from './contexts/GlobalContext'

const BookAProduct = () => {
  const [state] = useContext(GlobalContext)
  const [openBook, setOpenBook] = useState(false)
  const [product, setProduct] = useState('')

  const handleProductChange = (event) => {
    setProduct(event.target.value)
  }

  const handleBookOpen = () => {
    setOpenBook(true)
  }

  const handleBookClose = () => {
    setOpenBook(false)
  }

  return (
    <>
      <Button variant="contained" onClick={ handleBookOpen }>Book</Button>
      <Dialog open={ openBook } onClose={ handleBookClose }>
        <DialogTitle>Book a product</DialogTitle>
        <DialogContent>
          <DialogContentText sx={ { mb: 2.5 } }>
            To book a product, please fill the form below.
          </DialogContentText>
          <FormControl fullWidth>
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
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={ handleBookClose }>Cancel</Button>
          <Button variant="contained" onClick={ handleBookClose }>Book</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BookAProduct
