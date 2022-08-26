import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom';


const Product = () => {
    const { id } = useParams();
    const [shoes, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }
        getProduct();
    }, []);

    

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={shoes.image} alt={shoes.title} height="400px" height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {shoes.category}
                    </h4>
                    <h1 className="display-5">{shoes.title}</h1>
                    <p className="lead"> Rating {shoes.rating && shoes.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>

                    <h3 className="display-6 fw-bold my-4">
                        ${shoes.price}
                    </h3>
                    <p className="lead"> {shoes.description}</p>
                    <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct(shoes)} >
                        Add to Cart
                    </button>

                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                        Go to Cart
                    </NavLink>
                </div>

            </>
        );
    };
    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                     <ShowProduct />
                </div>
            </div>
        </div>
    );
};
export default Product;