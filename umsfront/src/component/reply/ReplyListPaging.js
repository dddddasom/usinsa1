import React, { useEffect, useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import { Pagination } from 'react-bootstrap';

function ReplyListPaging(props) {
    const [pageStart, setPageStart] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const id = props.id;

    function onClickHandler(pageNum) {
        fetchFn(
            "GET",
            `http://localhost:9007/api/reply/bid?bid=${id}&pageNum=${pageNum - 1}`
        ).then((data) => {
            props.setFn(data.result.content);
            setCurrentPage(data.result.number);
            setTotalPages(data.result.totalPages);
        });
    }

    let pagingArr = [];
    if (totalPages !== undefined) {
        for (let i = pageStart; i < pageStart + 10 && i <= totalPages; i++) {
            pagingArr.push(i);
        }
    }


    function plusPaging() {
        if (pageStart + 10 < totalPages) {
            setPageStart(pageStart + 10);
        }
    }

    function minusPaging() {
        if (pageStart !== 1) {
            setPageStart(pageStart - 10);
        }
    }

    function getPageNumInfo() {
        fetchFn(
            "GET",
            `http://localhost:9007/api/reply/bid?bid=${id}&pageNum=0`
        ).then((data) => {
            setTotalPages(data.result.totalPages);
        });
    }
    useEffect(getPageNumInfo, [id]);

  return (
    <div className="d-flex justify-content-center">
    {totalPages !== undefined && (
      <Pagination>
        <Pagination.Prev disabled={currentPage === 0} onClick={() => onClickHandler(currentPage)} />
        
        {pagingArr.map((pageNum) => (
          <Pagination.Item key={pageNum} active={currentPage + 1 === pageNum} onClick={() => onClickHandler(pageNum)}>
            {pageNum}
          </Pagination.Item>
        ))}
        
        <Pagination.Next disabled={currentPage + 1 === totalPages} onClick={() => onClickHandler(currentPage + 2)} />
      </Pagination>
    )}
  </div>

    // <div>
    //         {totalPages !== undefined && (
    //             <>
    //                 <button onClick={minusPaging} className="btn-paging">
    //                     [뒤로]
    //                 </button>

    //                 {pagingArr.map((pageNum) => (
    //                     <button
    //                         className="btn-paging"
    //                         key={pageNum}
    //                         onClick={() => {
    //                             onClickHandler(pageNum);
    //                         }}
    //                         disabled={currentPage + 1 === pageNum}
    //                     >
    //                         {pageNum}
    //                     </button>
    //                 ))}

    //                 <button onClick={plusPaging} className="btn-paging">
    //                     [다음]
    //                 </button>
    //             </>
    //         )}
    //     </div>
  )
}

export default ReplyListPaging