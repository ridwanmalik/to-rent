import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import DataGridTable from './components/DataGridTable'

function App() {

  const columns = [
    { field: 'code', headerName: 'Code' },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'type', headerName: 'Type' },
    { field: 'availability', headerName: 'Availability' },
    { field: 'needing_repair', headerName: 'Needing Repair' },
    { field: 'durability', headerName: 'Durability' },
    { field: 'max_durability', headerName: 'Max Durability' },
    { field: 'mileage', headerName: 'Mileage' },
    { field: 'price', headerName: 'Price' },
    { field: 'minimum_rent_period', headerName: 'MR Period', description: 'Minimum Rent Period' },
  ]

  return (
    <Box className="App">
      <Container>
        <Typography variant="h4" component="h1" sx={ { fontWeight: "bold", mt: 2 } } gutterBottom>
          To Rent
        </Typography>
        <DataGridTable title="products" columns={ columns } url="products" />
      </Container>
    </Box>
  )
}

export default App
