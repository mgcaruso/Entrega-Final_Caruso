/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import Item from "../../components/Item/Item";
import NotFound from "../NotFound/NotFound";

const ItemList = ({ products }) => {


    return (
        <section className="flex items-center font-body flex-row flex-wrap bg-neutral-ultra-light py-5 gap-9 sm:justify-around justify-center w-full sm:px-10 px-3 dark:bg-primary-inverted-hover">
            {
                products.length > 0 ?
                products.map((cube, index) =>
                    <Item products={products} key={index} cube={cube} />)
                :
                <NotFound />
            }

        </section>
    )
}

export default React.memo(ItemList);
