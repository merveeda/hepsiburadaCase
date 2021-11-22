import React, { Component } from 'react';

export class Pagination extends Component {


    render () {
        const { perPage, totalCount, paginate, nextPage, prevPage, currentPage } = this.props;

        const pageNumbers = [];

        for(let i = 1; i <= Math.ceil(totalCount / perPage); i++) {
            pageNumbers.push(i);
        }

        return (<ul className="pagination primary-pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => currentPage !== 1 ? prevPage() : ""}>
              <span className="page-link"> &lt; </span>
            </li>

            {pageNumbers.map(num => (
                <li onClick={() => paginate(num)} className="page-item" key={num}>
                    <span className="page-link">{num}</span>
                </li>
            ))}

            <li className={`page-item ${currentPage === 3 ? 'disabled' : ''}`} onClick={() => currentPage !== 3 ? nextPage() : ""}>
              <span className="page-link"> &gt; </span>
            </li>
                
            </ul>
        )
    }
    
}

export default Pagination;