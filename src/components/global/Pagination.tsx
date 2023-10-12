import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IProps {
  total: number;
  callback: (num: number) => void;
}

const Pagination: React.FC<IProps> = ({ total, callback }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);

  const newArr = [...Array(total)].map((item, idx) => idx + 1);
  const navigate = useNavigate();

  const isActive = (index: number) => {
    if (index === page) return "active";
    return "";
  };

  const hdlPagination = (num: number) => {
    navigate(`?page=${num}`);
  };

  useEffect(() => {

    callback(page);
    //updaste data
  }, [page]);
  useEffect(() => {
    //after render chi tru gia tri cua useState va useRef duoc giu lai
    //con lai tat ca deu use deu tao moi

    let newPage = searchParams.get("page");
    if (newPage) {

      setPage(Number(newPage));
    }
  }, [searchParams]);

  return (
    <nav aria-label="Page navigation example">
      {page}
      <ul className="pagination">
        {page > 1 && (
          <li className="page-item" onClick={() => hdlPagination(page - 1)}>
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        )}

        {newArr.map((num) => {
          return (
            <li
              key={num}
              className={`page-item ${isActive(num)}`}
              onClick={() => hdlPagination(num)}
            >
              <span className="page-link">{num}</span>
            </li>
          );
        })}

        {page < total && (
          <li className="page-item" onClick={() => hdlPagination(page + 1)}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
