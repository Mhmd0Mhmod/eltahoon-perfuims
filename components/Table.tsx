import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Column } from "@/types";
import type { ComponentProps, ReactNode } from "react";

interface IProps<T> extends ComponentProps<typeof TableComponent> {
  columns: Column<T>[];
  rows: T[];
}

function Table<T>({ columns, rows, ...props }: IProps<T>) {
  const renderCell = (row: T, column: Column<T>): ReactNode => {
    if (column.render) {
      return column.render(row);
    }

    if (column.valueFormatter) {
      return column.valueFormatter(row);
    }

    if (column.header) {
      const value = row[column.header];

      if (value === null || value === undefined) {
        return "-";
      }

      return String(value);
    }

    return "-";
  };

  return (
    <TableComponent {...props} className={cn("min-w-200", props.className)}>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={column.id ?? `column-${index}`}
              className="whitespace-nowrap text-right"
            >
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={getRowKey(row, rowIndex)}>
            {columns.map((column, columnIndex) => (
              <TableCell
                key={column.id ?? `column-${columnIndex}`}
                className="whitespace-nowrap text-right"
              >
                {renderCell(row, column)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableComponent>
  );
}

function getRowKey<T>(row: T, index: number): string | number {
  if (
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    (typeof row.id === "string" || typeof row.id === "number")
  ) {
    return row.id;
  }

  return index;
}

export default Table;
