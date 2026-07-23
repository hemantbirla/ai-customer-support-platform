import React from "react";
import "./Table.css";
import Spinner from "../Spinner";
import EmptyState from "../EmptyState";

const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found",
  className = "",
}) => {
  if (loading) {
    return (
      <div className="table-loading">
        <Spinner size="md" />
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return <EmptyState title="No Data" description={emptyMessage} />;
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                style={{ textAlign: column.align || "left" }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  style={{ textAlign: column.align || "left" }}
                >
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);
