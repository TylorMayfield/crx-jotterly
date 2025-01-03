/* eslint-disable react/prop-types */
import { Box, Pagination } from "@mantine/core";

const PaginationControls = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <Box p="md" pt="xs" style={{ borderTop: "1px solid #eee" }}>
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={setCurrentPage}
          size="sm"
          withEdges
        />
      )}
    </Box>
  );
};

export default PaginationControls;
