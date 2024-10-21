import React, { useState } from "react";
import ReusableTable from "../components/ReusableTable";

const Table = () => {
  const [globalSearchValue, setGlobalSearchValue] = useState("");
  const [columnSearchValues, setColumnSearchValues] = useState({});
  const [sortConfig, setSortConfig] = useState({
    accessor: null,
    direction: null,
  });

  const data = [
    { name: "wk", age: 28, email: "wk@example.com" },
    { name: "sam", age: 22, email: "sam@example.com" },
    { name: "Alex", age: 28, email: "alex@example.com" },
    { name: "Scott", age: 22, email: "Scott@example.com" },
    { name: "Trump", age: 28, email: "Trump@example.com" },
    { name: "Ali", age: 22, email: "ali@example.com" },
  ];

  const columns = [
    { Header: "Name", accessor: "name", searchable: true, sortable: true },
    { Header: "Age", accessor: "age", searchable: true, sortable: true },
    { Header: "Email", accessor: "email", searchable: true, sortable: false },
  ];

  return (
    <div className="flex flex-col gap-10 justify-start items-center mt-6">
      <h1 className="text-center text-2xl">Data Table</h1>
      <div className="flex justify-start items-center">
        <ReusableTable
          data={data}
          columns={columns}
          globalSearchValue={globalSearchValue}
          setGlobalSearchValue={setGlobalSearchValue}
          columnSearchValues={columnSearchValues}
          setColumnSearchValues={setColumnSearchValues}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
      </div>
    </div>
  );
};

export default Table;
