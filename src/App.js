import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import DataGridTable from './components/DataGridTable'
import BookAProduct from './components/BookAProduct'
import ReturnAProduct from './components/ReturnAProduct'


function App() {

  const columns = [
    { field: 'code', headerName: 'Code', type: 'string' },
    { field: 'name', headerName: 'Name', type: 'string', width: 200 },
    { field: 'type', headerName: 'Type', type: 'string' },
    { field: 'availability', headerName: 'Availability', type: 'boolean' },
    { field: 'needing_repair', headerName: 'Needing Repair', type: 'boolean' },
    { field: 'durability', headerName: 'Durability', type: 'number' },
    { field: 'max_durability', headerName: 'Max Durability', type: 'number' },
    { field: 'mileage', headerName: 'Mileage', type: 'number' },
    { field: 'price', headerName: 'Price', type: 'number' },
    { field: 'minimum_rent_period', headerName: 'MR Period', description: 'Minimum Rent Period', type: 'number' },
  ]

  return (
    <Box className="App">
      <Container sx={ { my: 5 } }>
        <Typography variant="h4" component="h1" sx={ { fontWeight: "bold" } } gutterBottom>
          To Rent
        </Typography>
        <DataGridTable title="products" columns={ columns } url="products" />
        <Box sx={ { display: "flex", justifyContent: "flex-end", gap: 2.5 } }>
          <BookAProduct />
          <ReturnAProduct />
        </Box>

      </Container>
    </Box>
  )
}

export default App
