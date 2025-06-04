import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import 'antd/dist/antd.css';
import SearchForm from "@/components/Search/SearchForm";
import SearchResult from "@/components/Search/SearchResult";

const Search = () => {


    return (
        <AppLayout>
            <>
                <SearchForm />
            </>
        </AppLayout >
    );
}

export default Search;
