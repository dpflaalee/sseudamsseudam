import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import 'antd/dist/antd.css';
import SearchForm from "@/components/search/SearchForm";

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
