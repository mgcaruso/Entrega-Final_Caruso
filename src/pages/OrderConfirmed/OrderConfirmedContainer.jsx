import { getDoc, getFirestore, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import OrderConfirmed from "./OrderConfirmed";
import { useContext } from "react";
import { UserContext } from "../../components/Context/User/user";
import NotFound from "../../components/NotFound/NotFound";

const OrderConfirmedContainer = () => {

    const { orderId } = useParams();
    const { user } = useContext(UserContext);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const db = getFirestore();

    const getOrderDetails = async () => {
        const orderRef = doc(db, 'order', orderId);
        const docSnap = await getDoc(orderRef);

        if (docSnap.exists()) {
            const orderFound = { ...docSnap.data(), _id: docSnap.id };

            //check if the user logged in the same as the one that placed the order for safety
            if (user) {
                if (user?.email === orderFound.user.email) {
                    setOrder(orderFound);
                } else {
                    setNotFound(true);
                }
            } else {
                setNotFound(true);
            }
        } else {
            setOrder(null);
        }
        setLoading(false);

    }

    useEffect(() => {
        getOrderDetails();
    }, [orderId])

    if(notFound) return <NotFound />
    if (loading) return <Loader message={"Loading order summary..."} />
    if (!loading && !order) return <main className="main-secondary-pages flex items-center justify-center"> Order Not Found </main>

    return (
        <OrderConfirmed details={order} />
    )
}

export default OrderConfirmedContainer;