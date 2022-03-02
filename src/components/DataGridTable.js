import { useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from './contexts/GlobalContext'
import Box from '@mui/material/Box'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import moment from "moment"
import { isWeekend, isFriday, fetchDataByUrl, makeKeywordSearch } from '../helper'
import Search from './Search'

const DataGridTable = ({ title, columns, url }) => {
  const today = moment()
  const [state, setState] = useContext(GlobalContext)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, SetTotal] = useState(0)
  const [query, setQuery] = useState('')
  const [sortModel, setSortModel] = useState([])
  const [filterModel, setFilterModel] = useState([])

  const onFilterModelChange = useCallback((filterModel) => {
    setFilterModel(filterModel.items)
  }, [])

  useEffect(() => {
    const getData = async () => {
      setState(prevState => ({ ...prevState, loading: true }))
      const totalData = await fetchDataByUrl(url)
      SetTotal(totalData.length)
      let queryUrl = `${url}?_page=${page}&_limit=${pageSize}`
      if (query) {
        queryUrl += `&q=${makeKeywordSearch(query)}`
      }
      sortModel.map(item => {
        queryUrl += `&_sort=${item.field}&_order=${item.sort}`
      })
      if (filterModel.length > 0) {
        filterModel.map(item => {
          if (((
            item.operatorValue === "contains" ||
            item.operatorValue === "equals" ||
            item.operatorValue === "startsWith" ||
            item.operatorValue === "endsWith" ||
            item.operatorValue === "isAnyOf"
          ) &&
            item.value === undefined
          )) {
            return
          }
          if (item.operatorValue === "contains") {
            queryUrl += `&${item.columnField}_like=${makeKeywordSearch(item.value)}`
          } else if (item.operatorValue === "equals") {
            queryUrl += `&${item.columnField}=${makeKeywordSearch(item.value)}`
          } else if (item.operatorValue === "startsWith") {
            queryUrl += `&${item.columnField}_like=${makeKeywordSearch(item.value)}`
          } else if (item.operatorValue === "endsWith") {
            queryUrl += `&${item.columnField}_like=${makeKeywordSearch(item.value)}`
          } else if (item.operatorValue === "isAnyOf") {
            item.value.map(value => {
              queryUrl += `&${item.columnField}=${makeKeywordSearch(value)}`
            })
          }
        })
      }
      const data = await fetchDataByUrl(queryUrl)
      if (data) {
        setState(prevState => ({ ...prevState, [title]: data, loading: false }))
      }
    }
    getData()
  }, [pageSize, page, sortModel, filterModel, query])

  return (
    <Box>
      <Box sx={ { mb: 2.5, display: "flex", justifyContent: "flex-end", gap: 2.5 } }>
        <Search query={ query } setQuery={ setQuery } />
      </Box>
      <Box sx={ { width: '100%', pb: 2.5 } }>
        <DataGrid
          rows={ state[title] ? state[title] : [] }
          getRowId={ row => row.code }
          rowCount={ total }
          componentsProps={ { toolbar: { csvOptions: { fileName: `${url}-${today.format('YYYY-MM-DD')}` } } } }
          loading={ state.loading }
          columns={ columns }
          autoHeight
          components={ { Toolbar: GridToolbar } }
          pageSize={ pageSize }
          pagination
          rowsPerPageOptions={ state.rowsPerPageOptions }
          paginationMode="server"
          onPageChange={ page => setPage(++page) }
          onPageSizeChange={ (newPage) => setPageSize(newPage) }
          sortingMode="server"
          sortModel={ sortModel }
          onSortModelChange={ newSortModel => setSortModel(newSortModel) }
          filterMode="server"
          onFilterModelChange={ onFilterModelChange }
        />
      </Box>
    </Box>
  )
}

export default DataGridTable
