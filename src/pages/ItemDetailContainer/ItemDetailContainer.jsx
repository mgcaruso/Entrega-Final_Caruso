import ItemDetail from "../../components/ItemDetail/ItemDetail";
import { useState, useEffect } from "react";
import Loader from '../../components/Loader/Loader';
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore'
import { db } from "../../database/firebase-config";
import NotFound from "../../components/NotFound/NotFound";

const ItemDetailContainer = () => {

    const { cubeId } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [wasProdFound, setWasProdFound] = useState(true);

    const getCube = async () => {
        const cubeRef = doc(db, 'cubes', cubeId);
        const docSnap = await getDoc(cubeRef);

        if (docSnap.exists()) {
            const cubeFound = { ...docSnap.data(), _id: docSnap.id };
            setProduct(cubeFound);
        } else {
            setWasProdFound(false);
        }
        setLoading(false);

    }

    useEffect(() => {

        getCube()

    }, [cubeId]);
    if (loading) {
        return <Loader message="Loading product..." />;
    }
    if (!loading && !wasProdFound) {
        return <NotFound />
    }
    return (
        <>
            {
                product &&
                <ItemDetail item={product} cubeId={cubeId} />
            }

        </>
    )
}

export default ItemDetailContainer;
