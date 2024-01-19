import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'

import { getCategory, updateCategory } from 'src/configs/api'
import { CardActions } from '@mui/material'

const EditProduct = () => {
    const router = useRouter()
    const { id } = router.query

    const [category, setCategory] = useState({
        id: id,
        name: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCategory = await getCategory(id)
                setCategory(responseCategory.data)
            } catch (error) {
                console.error('Error fetching category:', error)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    const handleChange = e => {
        const { name, value } = e.target
        setCategory(prevCategory => ({
            ...prevCategory,
            [name]: value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await updateCategory(category)
            console.log(response)
            if (response.data.status === 200) {
                alert(response.data.message)
                router.push('/category-products')
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error('Error updating category:', error)
            alert('Error updating Category. Please try again later.')
        }
    }

    console.log(category)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Edit Category' />
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
                                        value={category.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button
                            size='small'
                            variant='contained'
                            color='error'
                            onClick={() => router.push('/category-products')}
                        >
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
