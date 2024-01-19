import axios, { AxiosResponse, AxiosError } from 'axios'

const ApiConnect = axios.create({
    baseURL: 'http://localhost/api',
    responseType: 'json',
    timeout: 7000
})

interface Product {
    id: number
    name: string
}

interface Category {
    id: number
    name: string
}

export function getProducts(): Promise<AxiosResponse<Product[]>> {
    const URL = '/product/list'

    return ApiConnect.get<Product[]>(URL)
}

export function postProduct(data: any): Promise<AxiosResponse<Product[]>> {
    const URL = '/product/store'

    return ApiConnect.post<Product[]>(URL, data)
}

export function getCategorys(): Promise<AxiosResponse<Category[]>> {
    const URL = '/category/list'

    return ApiConnect.get<Category[]>(URL)
}
export function getCategory(data: any): Promise<AxiosResponse<Category[]>> {
    const URL = `/category/find/${data}`

    return ApiConnect.get<Category[]>(URL)
}

export function postCategory(data: any): Promise<AxiosResponse<Category[]>> {
    const URL = '/category/store'

    return ApiConnect.post<Category[]>(URL, data)
}

export function updateCategory(data: any): Promise<AxiosResponse<Category[]>> {
    const URL = `/category/update/${data.id}`

    return ApiConnect.put(URL, data)
}

export function deleteCategory(data: any): Promise<AxiosResponse<Category[]>> {
    const URL = `/category/destroy/${data}`

    return ApiConnect.delete<Category[]>(URL)
}

export function getProduct(data: any): Promise<AxiosResponse<Product[]>> {
    const URL = `/product/find/${data}`

    return ApiConnect.get<Product[]>(URL)
}

export function deleteProduct(data: any): Promise<AxiosResponse<Product[]>> {
    const URL = `/product/destroy/${data}`

    return ApiConnect.delete<Product[]>(URL)
}

export function updateProduct(data: any): Promise<AxiosResponse<Product[]>> {
    console.log(data)
    const URL = `/product/update/${data.id}`

    return ApiConnect.put(URL, data)
}

ApiConnect.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        console.error('Erro na requisição:', error)

        return Promise.reject(error)
    }
)

export default ApiConnect
