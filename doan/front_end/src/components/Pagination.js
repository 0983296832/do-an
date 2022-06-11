import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../assets/css/pagination.css";

export default function BasicPagination({ page, setPage, count }) {
  return (
    <div className="pagination">
      <Stack spacing={2}>
        <Pagination
          count={count}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}
