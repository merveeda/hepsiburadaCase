import React from 'react';
import { connect } from 'react-redux';
import { filterByColorProducts, sortProducts, filterByBrandProducts } from '../actions/productActions';

class Filter extends React.Component {

    state = {
        isActive: false,
        colors: ['Siyah', 'Sarı', 'Beyaz', 'Lacivert', 'Yeşil'],
        brands: ['Apple', 'Samsung', 'Nokia', 'LG', 'Huawei', 'Xiaomi'],
        activeColor: '',
        activeBrand: ''
    }

    componentDidMount = () => {

    }

    brandAction = (item) => {
        if(this.state.activeBrand.length > 0 ) {
            this.setState({activeColor : ''})
        }
        
        this.setState({activeBrand : item }, () => { this.filterHandler("brand", item)});
    }

    getColorsCount = (color) => {
        if (this.props.products) {
            const number = this.props.products.filter(item => item.color === color);
            return number.length;
        }
    }

    getBrandsCount = (brand) => {
        if (this.props.products) {
            const number = this.props.products.filter(item => item.brand === brand);
            return number.length;
        }
    }

    getColors = () => {

        return this.state.colors.map( (item, index) => {
            return (
                <li name="color" key={index} className={this.state.activeColor === item ? 'item-color active' : ''} onClick={() => { this.setState({activeColor : item, activeBrand: '' }, () => { this.filterHandler("color", item)})}}>{item} ({this.getColorsCount(item)})</li>
            )
        })
    }

    getBrands = () => {
        return this.state.brands.map( (item, index) => {
            return (
                <li key={index} className={this.state.activeBrand === item ? 'active' : ''} onClick={() => { this.brandAction(item)}}>{item} ({this.getBrandsCount(item)})</li>
            )
        })
    }

    filterHandler = (type, value) => {
        if(type === "color") {
            this.props.filterByColorProducts(this.props.products, value)
            this.setState({isActive : true});
        } else if (type === "brand") {
            this.props.filterByBrandProducts((this.state.isActive) ? this.props.filteredProducts : this.props.products, value)
            this.setState({isActive : false});
        }
    }

    render() {
        return (
            <section className="filter-section">
                <div className="filter-list-content">
                    <span className="title">Renk</span>
                    <ul className="filter-list">
                        {this.getColors()}
                    </ul>
                </div>

                <div className="filter-list-content">
                    <span className="title">Sıralama</span>
                    <ul className="filter-list">
                        <li className={this.props.activeSortType === "lowest" ? 'active' : ''} onClick={(e) => { this.props.filterHandler("lowest", e.target.innerText) }}>En Düşük Fiyat</li>
                        <li className={this.props.activeSortType === "highest" ? 'active' : ''} onClick={(e) => { this.props.filterHandler("highest", e.target.innerText) }}>En Yüksek Fiyat</li>
                        <li className={this.props.activeSortType === "latest" ? 'active' : ''} onClick={(e) => { this.props.filterHandler("latest", e.target.innerText) }}>En Yeniler (A&gt;Z)</li>
                        <li className={this.props.activeSortType === "latestOpposite" ? 'active' : ''} onClick={(e) => { this.props.filterHandler("latestOpposite", e.target.innerText) }}>En Yeniler (Z&gt;A)</li>
                    </ul>
                </div>

                <div className="filter-list-content">
                    <span className="title">Marka</span>
                    <ul className="filter-list">
                        {this.getBrands()}
                    </ul>
                </div>

            </section>
        );
    }

}

export default connect((state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
}), {
    filterByColorProducts, 
    filterByBrandProducts,
    sortProducts
})(Filter); 