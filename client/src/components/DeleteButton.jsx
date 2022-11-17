import React from 'react'
import axios from 'axios'

const DeleteButton = (props) => {
    const { id, successfulCallback } = props

    const deleteProduct = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`, {withCredentials: true})
            .then(res => {
                successfulCallback(id)
            })
            .catch(err => console.error(err));


    }
    return (
            <button className='p-1 bg-red-300 rounded' onClick={deleteProduct}>Delete</button>
    )
}

export default DeleteButton