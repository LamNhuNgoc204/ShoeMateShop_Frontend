import AxiosInstance from "../../helpers/AxiosInstance"

export const getProductOfCategoryAction = async (catId) => {
    try {
        const response = await AxiosInstance().get('/categories/get-product-of-cate/' + catId)
        if(response.status) {
            return response.data
        } else {
            throw new Error('Failed to get products of category')
        }
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
        
    }
}