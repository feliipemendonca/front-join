import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { getProduct, updateProduct, getCategory } from 'src/configs/api'
import { CardActions } from '@mui/material'

const EditProduct = () => {
    const router = useRouter()
    const { id } = router.query

    const [product, setProduct] = useState({
        id: id,
        name: '',
        category_product_id: '',
        amount: ''
    })

    const [category_product_id, setCategory] = useState('')
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProduct = await getProduct(id)
                setProduct(responseProduct.data)

                const responseCategory = await getCategory()
                setCategoryList(responseCategory.data)
            } catch (error) {
                console.error('Error fetching product:', error)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    const handleChange = e => {
        const { name, value } = e.target
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await updateProduct(product)
            console.log(response)
            if (response.data.status === 200) {
                alert(response.data.message)
                router.push('/products')
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error('Error updating product:', error)
            alert('Error updating product. Please try again later.')
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Edit Product' />
                    <CardContent>
                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' }
                            }}
                            noValidate
                            autoComplete='off'
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        id='outlined-required'
                                        label='Name'
                                        name='name'
                                        value={product.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        id='outlined-required'
                                        label='Value'
                                        name='amount'
                                        value={product.amount}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id='demo-simple-select-label'>Category Product</InputLabel>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            label='Category Product'
                                            name='category_product_id'
                                            value={product.category_product_id || ''}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value=''>
                                                <em>Select a category</em>
                                            </MenuItem>
                                            {categoryList.map(item => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='contained' color='error' onClick={() => router.push('/products')}>
                            Cancel
                        </Button>
                        <Button size='small' type='submit' variant='contained' color='primary' onClick={handleSubmit}>
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item></Grid>
        </Grid>
    )
}

export default EditProduct
