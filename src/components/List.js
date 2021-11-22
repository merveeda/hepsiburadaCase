import Button from 'react-bootstrap/Button';
import React from 'react';

class List extends React.Component {

    componentDidMount = () => {
        
    }

    getButton = uniqId => {
        if(this.props.basketItems) {
            const aa = this.props.basketItems.filter(item => item.id === uniqId);
            if(aa.length > 0) {
                return false;
            }
            return true;
        }
    }

    getCard = () => {

        if(this.props.data.length) {

            return this.props.data.map(item => {
                return (
                    <div className="col-md-3" key={item.id}>
                    <div className="product-card">
                        <figure className="media-content">
                            <img src={item.imgPath} alt=""/>
                        </figure>
                        <div className="card-body">
                            <span className="title">{item.title}</span>

                            <div className="info-area">
                                <ul className="property-list">
                                    <li><span className="sub-title">Renk:</span> {item.color} </li> 
                                    <li><span className="sub-title">Marka:</span> {item.brand} </li>
                                </ul>

                                <div className="bottom-content">
                                    <span className="price">{item.price}</span>
                                    <div><span className="price old">{item.oldPrice}</span><span className="discount">{item.discount}%</span></div>
                                </div>
                            </div>
                            {(!this.getButton(item.id)) ?  <span className="warning-disable">Bu ürünü sepete ekleyemezsiniz</span> : <Button className="btn-primary" onClick={ () => {this.props.basketHandler(item)}}>Sepete Ekle</Button>}
                            
                        </div>
                    </div>
                </div>
                )
            })
        }
    }

    render() {
        return ( 
            <section className="list-section">
                <div className="container">
                    <div className="row">
                        {this.getCard()}
                    </div>
    
                </div>
            </section> 
        );
    
    }
   
}
export default List;