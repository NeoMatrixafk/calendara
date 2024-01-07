import React from "react";

import CategoriesSidebar from "../Components/Categories/CategoriesSidebar";
import CategoriesMainContent from "../Components/Categories/CategoriesMainContent";

const Categories = (props) => {
    return (
        <>
            <div className="categories d-flex my-5">
                <CategoriesSidebar mode={props.mode} />
                <CategoriesMainContent mode={props.mode} />
            </div>
        </>
    );
};

export default Categories;
