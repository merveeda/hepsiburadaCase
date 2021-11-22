import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

class Header extends React.Component {

    state = {
        basketCount: 0
    }

    getBasketList = () => {
        if(this.props.items.length > 0) {
           return this.props.items.map(item => {
                return (
                    <div className="item-card" key={item.id}>
                        <img src={item.imgPath} alt="" />
                        <div className="article-content">
                            <span className="title">{item.title}</span>
                            <Button className="btn-remove" onClick={() => {this.props.removeBasket(item.id)}} data-testid="basketRemove">Kaldır</Button>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        return (<div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <img src="./logo.png" alt="" className="logo" />
                    </div>
                    <div className="col-lg-7 col-12 d-flex align-items-center justify-content-end">
                        <div className="search-wrapper">
                            <img src="./search.png" alt="" className="search-icon" />
                            <input data-testid="searchInput" onChange={(e) => this.props.searchHandler(e.target.value)} type="text" className="search-input" placeholder="25 milyon' dan fazla ürün içerisinde ara" />
                        </div>
                    </div>
                    <div className="col-lg-2 col-12 d-flex align-items-center justify-content-end">

                        <Dropdown className="order-dropdown type-basket">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-default">
                                Sepetim {this.props.items.length > 0 ? <span className="count">{this.props.items.length}</span> : ''}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                               {this.getBasketList()}
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>
            </div>
        </div>
        );
    }

}

export default Header;