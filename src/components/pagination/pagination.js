import React, { useEffect, useState } from "react";
import "./pagination.scss";

export default function Pagination({ count, setPage, page }) {
  const [pages, setpages] = useState([]);
  useEffect(() => {
    const countPages = [];
    for (let i = 0; i < count / 30; i++) {
      countPages.push(i);
    }
    setpages(countPages);
  }, [count]);

  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => setPage(0)}>{`<<`}</button>
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >{`<`}</button>
      <select
        value={page}
        onChange={(e) => setPage(e.target.value)}
        className="pagination-select"
      >
        {pages.map((val) => (
          <option value={val} key={val}>
            Page :{val + 1}
          </option>
        ))}
      </select>
      <button
        disabled={page === pages[pages.length - 1]}
        onClick={() => setPage(page + 1)}
      >{`>`}</button>
      <button
        disabled={page === pages[pages.length - 1]}
        onClick={() => setPage(pages[pages.length - 1])}
      >{`>>`}</button>
    </div>
  );
}
