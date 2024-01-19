import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Button, CardActions, Link, TextField } from '@mui/material'
import { getCategorys, postProduct } from 'src/configs/api'
import { useRouter } from 'next/navigation'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const ProductsCreate = () => {
    const [name, setName] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [category, setCategory] = useState<string | null>(null)
    const [categorys, setCategorys] = useState<CategoryProduct[]>([])

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategorys()
                setCategorys(response.data)
            } catch (error) {
                console.error('Erro ao obter categorias:', error)
            }
        }

        fetchData()
    }, [])

    const router = useRouter()

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !amount || !category) {
            alert('Por favor, preencha todos os campos.')

            return
        }

        const formData = {
            name,
            amount,
            category_product_id: category
        }

        try {
            const { data } = await postProduct(formData)
            if (data.status === 200) {
                alert(data.message)
                router.push('/products')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Erro ao cadastrar produtos:', error)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Create Product' />
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
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        id='outlined-required'
                                        label='Value'
                                        onChange={e => setAmount(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id='demo-simple-select-label'>Category Product</InputLabel>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            label='Category Product'
                                            value={category || ''}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value=''>
                                                <em>Selecione uma categoria</em>
                                            </MenuItem>
                                            {categorys.map((item, key) => (
                                                <MenuItem key={key} value={item.id}>
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
                        <Button size='small' variant='contained' color='error'>
                            <Link href='/products'>Cancel</Link>
                        </Button>
                        <Button size='small' type='submit' variant='contained' color='primary' onClick={submitForm}>
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item></Grid>
        </Grid>
    )
}

export default ProductsCreate
