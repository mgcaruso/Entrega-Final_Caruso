import { useContext, useEffect, useState } from "react"
import ItemList from "../../components/ItemList/ItemList";
import Filters from "../../components/Filters/Filters";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import { FiltersContext } from "../../components/Context/Filters/filters";

import { db } from "../../database/firebase-config";
import { collection, getDocs } from 'firebase/firestore'

const ItemListContainer = () => {

    //FIREBASE DATA
    const cubesCollectionsRef = collection(db, 'cubes')

    let { categoryId } = useParams();

    const options = ["minPrice", "variants", "nameSearch", "brands"];
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { filters, setFilters } = useContext(FiltersContext)


    useEffect(() => {
        const getCubes = async () => {
            const data = await getDocs(cubesCollectionsRef);
            let products = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id })); 
            setProducts(products)
            setLoading(false);
        }
        getCubes();
    }, [])


    //FUNCIÓN DE FILTRADO:
    const filterProducts = (data) => {
        return data.filter(p => {
            return (
                (p.price >= filters.minPrice) &&
                (p.brand.toLowerCase() === filters.brand.toLowerCase() || filters.brand === 'all') &&
                (
                    !categoryId ||
                    (categoryId === "all" && (filters.category === p.category || filters.category === "all")) ||
                    (p.category === categoryId)
                ) &&
                (p.name.toLowerCase().startsWith(filters.name.toLowerCase())) &&
                (p.variants.some(variant => variant.name === filters.variant) || filters.variant === 'all')
            );
        });
    }


    const filteredProducts = filterProducts(products);

    if (loading) return <Loader message={"Loading products..."} />

    return (
        <main className="flex-col dark:bg-primary-inverted-hover bg-neutral-ultra-light">
            <Filters filters={filters} setFilters={setFilters} products={products} options={options} />
            <section className="flex justify-center items-center">
                <ItemList products={filteredProducts} />
            </section>
        </main>
    )
}

export default ItemListContainer;
