// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { CategoryProduct } from './type'
import { Button, Link } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useCallback, useEffect, useState } from 'react'
import { deleteCategory, getCategorys } from 'src/configs/api'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'

const columns = ['ID', 'Name', 'Options']

const CategoryProducts = () => {
    const [rows, setRows] = useState<CategoryProduct[]>([])
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)
    const router = useRouter()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleEdit = useCallback(
        (id: number) => () => {
            router.push(`/category-products/${id}/edit`)
        },
        [router]
    )

    const handleDelete = useCallback(
        (id: number) => async () => {
            try {
                const response = await deleteCategory(id)
                if (response.status === 200) {
                    alert(response.message)
                    setAnchorEl(null)
                    const updatedRows = rows.filter(item => item.id !== id)
                    setRows(updatedRows)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                console.error('Erro ao excluir categoria:', error)
            }
        },
        [rows]
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategorys()
                setRows(response.data)
            } catch (error) {
                console.error('Erro ao obter categorias:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={9}>
                            <CardHeader title='List category products'></CardHeader>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Button variant='outlined' color='primary' style={{ marginTop: '1.4rem' }}>
                                <Link href='/category-products/create'>Create Category</Link>
                            </Button>
                        </Grid>
                    </Grid>
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((item, key) => {
                                            return (
                                                <TableCell key={key} align='left'>
                                                    {item}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((item, key) => (
                                        <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component='th' scope='row'>
                                                {item.id}
                                            </TableCell>
                                            <TableCell align='left'>{item.name}</TableCell>
                                            <TableCell align='left'>
                                                <Button
                                                    id='basic-button'
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup='true'
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                >
                                                    Options
                                                </Button>
                                                <Menu
                                                    id='basic-menu'
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button'
                                                    }}
                                                >
                                                    <MenuItem onClick={handleEdit(item.id)}>Edit</MenuItem>
                                                    <MenuItem onClick={handleDelete(item.id)}>Delete</MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default CategoryProducts
