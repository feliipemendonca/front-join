import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Button, CardActions, Link, TextField } from '@mui/material'
import { postCategory } from 'src/configs/api'
import { useRouter } from 'next/navigation'

const CategoryProductsCreate = () => {
    const [name, setName] = useState<string>('')
    const router = useRouter()

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name) {
            alert('Por favor, preencha todos os campos.')

            return
        }

        const formData = {
            name: name
        }

        try {
            const { data } = await postCategory(formData)
            if (data.status === 200) {
                alert(data.message)
                router.push('/category-products')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Erro ao cadastrar categoria de produtos:', error)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Create Category Product' />
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
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='contained' color='error'>
                            <Link href='/category-products'>Cancel</Link>
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

export default CategoryProductsCreate
