import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./pagination.scss";

export default function Pagination({ count, setPage, page }) {
  const [pages, setpages] = useState([]);
  useEffect(() => {
    const countPages = [];
    for (let i = 0; i < count / 30; i++) {
      countPages.push(i + 1);
    }
    setpages(countPages);
  }, [count]);

  return (
    <div className="pagination">
      <div>
        <Link
          to={`?page=${1}`}
          className={page === 1 ? `disabled-link` : ""}
          // onClick={() => setPage(0)}
        >{`<<`}</Link>
      </div>
      <div>
        <Link
          to={`?page=${page - 1}`}
          className={page === 1 ? `disabled-link` : ""}
          // onClick={() => setPage(page - 1)}
        >{`<`}</Link>
      </div>
      <select
        value={page}
        onChange={(e) => setPage(e.target.value)}
        className="pagination-select"
      >
        {pages.map((val) => (
          <option value={val} key={val}>
            Page :{val}
          </option>
        ))}
      </select>
      <div>
        <Link
          to={`?page=${page + 1}`}
          className={page === pages.length ? `disabled-link` : ""}
          // onClick={() => setPage(page + 1)}
        >{`>`}</Link>
      </div>
      <div>
        <Link
          to={`?page=${pages.length}`}
          className={page === pages.length ? `disabled-link` : ""}
          // onClick={() => setPage(pages[pages.length - 1])}
        >{`>>`}</Link>
      </div>
    </div>
  );
}
