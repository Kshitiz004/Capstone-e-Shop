export default function OrderSummary({address, product, quantity}) {
    return(
        <div className="order-summary-section">
                    <div className="product-summary">
                        <div className="product-title">
                            <h1 className="product-name">{product.name}</h1>
                        </div>
                        <div className="product-quantity">
                            Quantity : {quantity}
                        </div>
                        <div className="product-category">
                            <span>Category: <b>{product.category}</b></span>
                        </div>
                        <div className="product-description">
                            <span>{product.description}</span>
                        </div>
                        <div className="product-price">
                            <span> TotalPrice:  &#8377;  {quantity*product.price}</span>
                        </div>
                    </div>
                    <div className="address-summary">
                        <div>
                            <h1>Address Details</h1>
                        </div>
                        <div className="address-name">
                            {address.firstName + ' ' + address.lastName}
                        </div>
                        <div className="address-contact">
                            {address.contactNumber}
                        </div>
                        <div className="address-street">
                            {address.street},
                        </div>
                        <div className="address-city">
                            {address.city},
                        </div>
                        <div className="address-state">
                            {address.state} - {address.zip}
                        </div>
                    </div>
                </div>
    );
}