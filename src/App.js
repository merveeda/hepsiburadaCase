import React from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import List from './components/List';
import AlertModal from './components/AlertModal';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { connect } from 'react-redux';
import { fetchProducts, sortProducts } from './actions/productActions';
import Pagination from './components/Pagination';

class App extends React.Component {

    state = {
        products: undefined,
        currentPage: 1,
        perPage: 12,
        isActive: false,
        activeSortType: '',
        activeDropdownText: 'Sıralama',
        basketItems: [],
        modalStatus: false,
        requestBasketID: null,
        searchQuery: ''
    }

    componentDidMount = () => {
        this.props.fetchProducts()
    }

    componentDidUpdate = () => {
        if(this.state.products === undefined) {
            this.setState({
                products : this.props.products,
            });
        }
    }

    filterHandler = (value, text) => {
        this.props.sortProducts(this.props.filteredProducts, value);
        this.setState({activeSortType : value, activeDropdownText : text})
    }

    basketHandler = item => {
        this.setState({basketItems : [...this.state.basketItems, item]});
    }

    removeBasketHandler = () => {
        const list = this.state.basketItems;
        const newItems = list.filter(item => item.id !== this.state.requestBasketID);
        this.setState({basketItems : newItems});
        this.closeModalHandler();
    }

    getRemoveBasketID = id => {
        this.setState({modalStatus : true, requestBasketID : id });
    }

    closeModalHandler = () => {
        this.setState({modalStatus : false});
    }

    searchHandler = query => {
        this.setState({searchQuery: query});
    }

    getPagination = (paginate, nextPage, prevPage, currentProducts) => {
        const { currentPage, perPage, products, searchQuery } = this.state;
        
        if(searchQuery.length > 1) {
            if(currentProducts.length > 12) {
                return (
                    <Pagination currentPage={currentPage} paginate={paginate} perPage={perPage} totalCount={products.length} nextPage={nextPage} prevPage={prevPage}/>
                )
            }
        } else if (this.props.filteredProducts && products !== undefined && this.props.filteredProducts.length > 12) {
            return (
                <Pagination currentPage={currentPage} paginate={paginate} perPage={perPage} totalCount={products.length} nextPage={nextPage} prevPage={prevPage}/>
            )
        }
    }

    render() {
        const { currentPage, perPage, products, activeSortType, activeDropdownText, basketItems, modalStatus, searchQuery } = this.state;

        const indexOfLastProduct = currentPage * perPage;
        const indexOfFirstProduct = indexOfLastProduct - perPage;

        let currentProducts = [];

        if(products !== undefined) {
            currentProducts = this.props.filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
            
            if (searchQuery.length > 1) {
                currentProducts = this.props.filteredProducts.filter( item => { return item.title.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) !== -1})
            } else {
                currentProducts = this.props.filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)              
            }
        }

        const paginate = pageNum =>  this.setState({currentPage : pageNum});
        const nextPage = () =>  this.setState({currentPage : currentPage + 1});
        const prevPage = () =>  this.setState({currentPage : currentPage - 1});
       
        
        return (
        
            <div>
                <Header items={basketItems} removeBasket={this.getRemoveBasketID} searchHandler={this.searchHandler}/>
                <section className="info-head">
                    <div className="container">
                        <div className="row d-flex justify-content-between">
                            <div className="col-sm-5 col-6">
                                <h1 className="title">Cep Telefonu</h1>
                                <div className="desc">
                                   Aranan Kelime: <span data-testid="searchedWord" className="highlight-text">{searchQuery}</span>
                                </div>
                            </div>
                            <div className="col-sm-2 col-6 d-flex justify-content-end align-items-center">
                                <Dropdown className="order-dropdown">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-default" data-testid="btnSort">
                                        {activeDropdownText}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className={activeSortType === "lowest" ? 'active' : ''} onClick={(e) => { this.filterHandler("lowest", e.target.innerText)}}>En Düşük Fiyat</Dropdown.Item>
                                        <Dropdown.Item className={activeSortType === "highest" ? 'active' : ''} onClick={(e) => { this.filterHandler("highest", e.target.innerText)}}>En Yüksek Fiyat</Dropdown.Item>
                                        <Dropdown.Item className={activeSortType === "latest" ? 'active' : ''} onClick={(e) => { this.filterHandler("latest", e.target.innerText)}}>En Yeniler (A&gt;Z)</Dropdown.Item>
                                        <Dropdown.Item className={activeSortType === "latestOpposite" ? 'active' : ''} onClick={(e) => { this.filterHandler("latestOpposite", e.target.innerText)}}>En Yeniler (Z&gt;A)</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="general-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Filter activeSortType={activeSortType} filterHandler={this.filterHandler}/>
                            </div>
                            <div className="col-md-9">
                               {(products !== undefined) ? <List basketItems={basketItems} data={currentProducts} basketHandler={this.basketHandler}/> : "" }
                               {this.getPagination(paginate, nextPage, prevPage, currentProducts)}
                            </div>
                        </div>
                       
                    </div>
                </section>

                <AlertModal modalStatus={modalStatus} removeHandler={this.removeBasketHandler} closeModal={this.closeModalHandler}/>
            </div>
        )
    }
}

export default connect((state) => ({
    products: state.products.filteredItems,
    sort: state.products.sort,
    filteredProducts: state.products.filteredItems
}), {
    fetchProducts,
    sortProducts,
})(App);