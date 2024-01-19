import React, { useCallback, useEffect, useState } from 'react'
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Product } from './type'
import { deleteProduct, getProducts } from 'src/configs/api'
import { useRouter } from 'next/router'

const columns = ['ID', 'Name', 'Category', 'Amount', 'Options']

const Products = () => {
    const [rows, setRows] = useState<Product[]>([])
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const router = useRouter()

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleEdit = useCallback(
        (id: number) => () => {
            router.push(`/products/${id}/edit`)
        },
        [router]
    )

    const handleDelete = useCallback(
        (id: number) => async () => {
            try {
                const response = await deleteProduct(id)
                const updatedRows = rows.filter(item => item.id !== id)
                setRows(updatedRows)
                alert(response.data.message)
            } catch (error) {
                console.error('Erro ao excluir produto:', error)
                alert('Erro ao excluir produto. Tente novamente mais tarde.')
            } finally {
                setAnchorEl(null)
            }
        },
        [rows]
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProducts()
                setRows(response.data)
            } catch (error) {
                console.error('Erro ao obter produtos:', error)
                alert('Erro ao obter produtos. Tente novamente mais tarde.')
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
                            <CardHeader title='List products' />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Button variant='outlined' color='primary' style={{ marginTop: '1.4rem' }}>
                                <Link href='/products/create'>Create Product</Link>
                            </Button>
                        </Grid>
                    </Grid>
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        {columns.map(item => (
                                            <TableCell key={item} align='left'>
                                                {item}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(item => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component='th' scope='row'>
                                                {item.id}
                                            </TableCell>
                                            <TableCell align='left'>{item.name}</TableCell>
                                            <TableCell align='left'>{item.category?.name}</TableCell>
                                            <TableCell align='left'>$ {item.amount}</TableCell>
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

export default Products
