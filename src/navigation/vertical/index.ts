// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
    return [
        {
            title: 'Home',
            path: '/home',
            icon: 'bx:home-circle'
        },
        {
            title: 'Category Products',
            path: '/category-products',
            icon: 'bx:category-alt'
        },
        {
            title: 'Products',
            path: '/products',
            icon: 'bx:store-alt'
        }
    ]
}

export default navigation
