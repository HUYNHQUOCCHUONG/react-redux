// Theme vao gio hang
export const addCart = (product) =>{
    return{
        type : "ADDITEM",
        payload : product
    }
}
// xoa khoi gio hang
export const delCart = (product) =>{
    return{
        type : "DELITEM",
        payload : product
    }
}