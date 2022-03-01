import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <Box className="App">
      <Container>
        <Typography variant="h4" component="h1" sx={ { fontWeight: "bold", mt: 2 } } gutterBottom>
          To Rent
        </Typography>
      </Container>
    </Box>
  )
}

export default App
