import React from 'react';

function Pagination({ handlePrev, handleNext, prevDisabled, nextDisabled, currentPageNum, handleJump }) {

    const paginationNumber = () => {
        const pageNumbers = [];
        for(let i = 1; i < 11; i++) {
           const li = (
               <li key={i} className={`page-item ${currentPageNum === i ? 'active' : ''}`}>
                   <a href="#" className="page-link" onClick={() => handleJump(i)}>{i}</a>
               </li>
           );
           pageNumbers.push(li)
        }
        return pageNumbers;
    }

    return (
        <div className="mt-4 mb-3 d-flex justify-content-between">
            <div>
                <button onClick={handlePrev} className="btn btn-primary d-inline-block" disabled={prevDisabled} >Prev</button>
            </div>

            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {paginationNumber()}
                    </ul>
                </nav>
            </div>

            <div>
                <button onClick={handleNext} className="btn btn-primary d-inline-block ml-auto" disabled={nextDisabled} >Next</button>
            </div>

        </div>
    )
}

export default Pagination;