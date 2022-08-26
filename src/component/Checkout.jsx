import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios';
const Checkout = () => {
    const state = useSelector((state) => state.handleCart)
    var total = 0;
    var total1 = 0;
    
    const url = "http://localhost:4000/checkout";
    const [data, setData] = useState({
        id:'',
        fullName: '',
        userName: '',
        email: '',
        address: '',
    });
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    };

    function submit(e) {
        e.preventDefaul();
        Axios.post(url, {
            id:data.id,
            fullName: data.fullName,
            userName: data.userName,
            email: data.email,
            address: data.address
        })
            .then(res => {
                console.log(res.data);
            })
    }

    const productList = (product) => {
        total = total + (product.price * product.qty);
        total1 = product.price * product.qty;
        return (
            <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 className="my-0">{product.title}  <br /> SL : {product.qty} </h6>
                </div>
                <span className="text-muted">${total1}</span>
            </li>
        );
    }
    return (
        <>
            <div className="container my-5">
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill">{state.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {state.map(productList)}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${total}</strong>
                            </li>
                        </ul>
                        <form className="card p-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" novalidate="" onSubmit={(e) => submit(e)}>
                            <div className="row g-3">
                            <div className="col-sm-12">
                                    <label htmlFor="id" className="form-label">ID</label>
                                    <input type="text" className="form-control" id="id" onChange={(e) => handle(e)} value={data.id} placeholder="" required="" disabled/>
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="firstName" className="form-label">Full name</label>
                                    <input type="text" className="form-control" id="fullName" onChange={(e) => handle(e)} value={data.fullName} placeholder="" required="" />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">@</span>
                                        <input type="text" className="form-control" id="userName" onChange={(e) => handle(e)} value={data.userName} placeholder="Username" required="" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                    <input type="email" className="form-control" id="email" onChange={(e) => handle(e)} value={data.email} placeholder="you@example.com" />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" onChange={(e) => handle(e)} value={data.address} placeholder="1234 Main St" required="" />
                                </div>
                            </div>
                            <hr className="my-4" />

                            <h4 className="mb-3">Payment</h4>

                            {/* <div className="my-3">
                                <div className="form-check">
                                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked="" required="" />
                                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                </div>
                            </div> */}

                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type="submit" >Continue to checkout</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;