import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
    const {
        data: { numOfPages, currentPage },
    } = useAllJobsContext();

    // In this line we are accessing the undefined in the array and simply grabbing the index.
    const pages = Array.from({ length:numOfPages}, (_, index) => { return index + 1});

    const { search, pathname } = useLocation();
    const navigate = useNavigate();

    // Send a request each time the user clicks on a new page.
    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);

        // EX: /dashboard/all-jobs + ?search=&jobStatus=interview&jobType=all&sort=newest
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    const addPageButton = ({ pageNumber, activeClass }) => {
        return (
            <button
                className={`btn page-btn ${activeClass && 'active'}`}
                key={pageNumber}
                onClick={() => {handlePageChange(pageNumber)}}
            >
                {pageNumber}
            </button>
        );
    };

    const renderPageButtons = () => {
        const pageButtons = [];

        // First page
        pageButtons.push(
            addPageButton({ 
                pageNumber: 1, 
                activeClass: currentPage === 1,
            })
        );

        if (currentPage > 3) {
            pageButtons.push(
                <span className='page-btn dots' key='dots-1'>
                    ...
                </span>
            );
        }
        
        // One before current page.
        if (currentPage !== 1 && currentPage !== 2) {
            pageButtons.push(
                addPageButton({ 
                    pageNumber: currentPage - 1, 
                    activeClass: false,
                })
            );
        }

        // Current page
        if (currentPage !== 1 && currentPage !== numOfPages) {
            pageButtons.push(
                addPageButton({ pageNumber: currentPage, 
                    activeClass: true,
                })
            );
    
        }

        // One after current page.
        if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
            pageButtons.push(
                addPageButton({ 
                    pageNumber: currentPage + 1, 
                    activeClass: false,
                })
            );
        }

        if (currentPage < numOfPages - 2) {
            pageButtons.push(
                <span className='page-btn dots' key='dots-1'>
                    ...
                </span>
            );
        }

        // Last page
        pageButtons.push(
            addPageButton({ pageNumber: numOfPages, activeClass: currentPage === numOfPages})
        );

        return pageButtons;
    }; 
    return (
        <Wrapper>
            <button 
                className='btn prev-btn' 
                onClick={() => {
                    let prevPage = currentPage - 1;
                    if(prevPage < 1) prevPage = numOfPages;
                    handlePageChange(prevPage);
                }}
            >
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className='btn-container'>
                {renderPageButtons()}
            </div>
            <button 
                className='btn prev-btn'
                onClick={() => {
                    let nextPage = currentPage + 1;
                    if (nextPage > numOfPages) nextPage = 1;
                    handlePageChange(nextPage);
                }}
                >
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
}

export default PageBtnContainer;