import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./pagination.scss";

export default function Pagination({ count, page }) {
  let history = useHistory();
  const [pages, setpages] = useState([]);
  useEffect(() => {
    const countPages = [];
    for (let i = 0; i < count / 30; i++) {
      countPages.push(i + 1);
    }
    setpages(countPages);
  }, [count]);

  const handleChange = (input) => {
    history.push(`?page=${input}`);
  };

  return (
    <div className="pagination">
      <div>
        <Link
          to={`?page=${1}`}
          className={page === 1 ? `disabled-link` : ""}
        >{`<<`}</Link>
      </div>
      <div>
        <Link
          to={`?page=${page - 1}`}
          className={page === 1 ? `disabled-link` : ""}
        >{`<`}</Link>
      </div>
      <select
        value={page}
        onChange={(e) => handleChange(e.target.value)}
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
        >{`>`}</Link>
      </div>
      <div>
        <Link
          to={`?page=${pages.length}`}
          className={page === pages.length ? `disabled-link` : ""}
        >{`>>`}</Link>
      </div>
    </div>
  );
}
