import SearchForm from "@components/SearchForm";
import React from "react";

const SearchPage = () => {
  return (
    <div className="container flex-col">
      <p className="text-2xl font-bold">Search</p>
      <div className="flex">
        <div className="flex-1">
          <SearchForm />
        </div>
        <div className="flex-[3]">Results</div>
      </div>
    </div>
  );
};

export default SearchPage;
