import { useContext } from 'react'
import './form.css'
import { Link as LinkRouter } from 'react-router-dom'
import { CartContext } from "../../components/Context/Cart/cart";
import functions from '../../utilities/functions/random';
import { useState } from 'react';
import Select from 'react-select'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCountries } from '../../utilities/functions/fetchingFn';
import { ThemeContext } from '../../components/Context/Theme/theme'
import { toast } from 'react-hot-toast';
import { collection, addDoc, getFirestore, updateDoc, doc, getDocs } from 'firebase/firestore';
import { UserContext } from '../../components/Context/User/user';

const { calculateSubtotal } = functions;

const CheckoutForm = () => {


    const { cart, setCart } = useContext(CartContext);
    const db = getFirestore();

    const taxes = parseFloat(4.01);
    const subtotal = parseFloat(calculateSubtotal(cart));
    // const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [countries, setCountries] = useState([]);
    const [shippingDetails, setshippingDetails] = useState(null);
    const { theme } = useContext(ThemeContext);
    const inputStyle = "w-full px-3 py-2 mb-1 border border-gray-200 dark:border-neutral dark:bg-primary-inverted-hover rounded-md focus:outline-none focus:border-key-color transition-colors dark:text-primary-hover";
    const [stockError, setStockError] = useState(false);


    const orderCollection = collection(db, "order");
    const order = {
        shipping_details: shippingDetails,
        user: {
            displayName: user?.displayName,
            email: user?.email
        },
        purchase: cart,
        date: Date.now()
    }


    const selectStyles = {
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: theme === "light" ? "var(--primary)" : "var(--primary-inverted-hover)",
            borderColor: state.isFocused ? 'var(--key-color)' : "#cccbcb"

        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected && theme === "light" ? 'var(--primary)' : 'var(--primary-inverted)',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: theme === "light" ? "var(--primary-inverted)" : "var(--primary)",
        }),
    }


    const handleSubmitShipping = async (e) => {
        e.preventDefault();

        const { fullName, countryCode, city, postalCode, addressLine1 } = shippingDetails;
        if (!fullName || !countryCode || !city || !postalCode || !addressLine1) {
            toast.error("You need to complete all fields.");
        } else {

            const cartIds = cart.map(item => item._id);
            const cubesCollectionsRef = collection(db, 'cubes');

            //Obtener stock actual de la base de datos
            getDocs(cubesCollectionsRef)
                .then(({ docs }) => {

                    let stockArr = docs.map((doc) => ({ ...doc.data(), _id: doc.id })).filter((doc) => cartIds.includes(doc._id)).map(doc => doc.stock);
                    let itemsToRemove = [];

                    //UPDATE
                    let error = 0;
                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i].quantity > stockArr[i]) {
                            error = 1;
                            itemsToRemove.push(cart[i]._id);
                            navigate("/stock-error")
                        }
                    }
                    console.log(itemsToRemove)

                    let cartFiltered = cart.filter(item => !itemsToRemove.includes(item._id));
                    console.log(cartFiltered)


                    if (error === 1) {
                        setCart(cartFiltered); //elimino el item que no tiene stock del cart y lo actualizo.
                        localStorage.setItem("cart", JSON.stringify(cartFiltered));
                        setStockError(true);
                        navigate("/stock-error");
                        throw new Error("Not enough stock");
                    } else {

                        // Vacio el carrito y navego a la página de confirmación de la orden
                        order["purchase"] = cartFiltered;
                        addDoc(orderCollection, order)
                            .then(({ id }) => {
                                for (let i = 0; i < cart.length; i++) {
                                    const cubeDoc = doc(db, "cubes", cart[i]._id);
                                    const newStock = parseInt(stockArr[i]) - parseInt(cart[i].quantity);
                                    updateDoc(cubeDoc, { stock: newStock })
                                        .then(() => {
                                            setCart([]);
                                            localStorage.removeItem("cart");
                                            navigate(`/order-confirmed/${id}`);
                                        })
                                        .catch(err => console.log(err))


                                }
                            })
                            .catch( (err) => console.log(err))
                    }


                    if (stockError) throw new Error("Not enough stock");
                })
                .catch(err => {
                    console.log(err.message)
                })



        }
    }


    useEffect(() => {
        getCountries()
            .then(res => {
                setCountries(res);
            })
            .catch(err => console.log(err));

    }, [])

    const generateOptions = (data) => {
        return data.map(item => ({ value: item.name, label: item.code, flag: item.flag })).sort((a, b) => a.label.localeCompare(b.label))
    }
    const selectCountryOptions = generateOptions(countries);




    return (
        <div className="min-w-screen min-h-screen bg-primary-hover dark:bg-[#222] py-5 font-body ">

            <div className="px-5">
                <div className="mb-2">
                    <LinkRouter to="/cart" className="focus:outline-none hover:underline text-gray-500 dark:text-primary-hover text-sm">
                        Back
                    </LinkRouter>

                </div>
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-semibold text-gray-600 dark:text-primary-hover">Checkout.</h1>
                </div>
                <div className="mb-5 text-gray-400">
                    <LinkRouter to="/" className="focus:outline-none hover:underline text-gray-500 px-2 dark:text-primary-hover">
                        Home
                    </LinkRouter>
                    <span>/</span>
                    <LinkRouter to="/cart" className="focus:outline-none hover:underline text-gray-500 px-2 dark:text-primary-hover">
                        Cart
                    </LinkRouter>
                    <span>/</span>
                    <LinkRouter
                        to="/ckeck-out"
                        className="text-gray-600 px-2 dark:text-primary-hover"
                    >
                        Checkout
                    </LinkRouter>
                </div>
            </div>
            <div className="w-full bg-primary-hover dark:bg-[#222] border-t border-b border-gray-200 dark:border-[#444] px-5 py-10 text-primary-inverted-hover dark:text-primary-hover">
                <div className="w-full ">
                    <div className="-mx-3 md:flex items-start ">
                        <div className="px-3 md:w-7/12 lg:pr-10 ">
                            <div className="w-full mx-auto text-primary-inverted-hover dark:text-primary-hover font-light mb-6 border-b border-gray-200 dark:border-[#2222] pb-6 ">
                                <div className="w-full flex items-center flex-col gap-2">

                                    {
                                        cart.map((product) => {
                                            return (
                                                <div key={product._id} className='flex w-full'>
                                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200 ">
                                                        <img src={product.image} alt={product.name} />
                                                    </div>
                                                    <div className="flex-grow pl-3">
                                                        <h6 className="font-semisemibold uppercase text-gray-600 dark:text-primary-hover">{product.name}</h6>
                                                        <p className="text-gray-400 dark:text-primary-hover">x {product.quantity}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-semisemibold text-gray-600 dark:text-primary-hover text-xl">$ {product.price.toString().split(".")[0]}</span><span className="font-semisemibold text-gray-600 text-sm dark:text-primary-hover">.{product.price.toString().split(".")[1]}</span>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 text-primary-inverted-hover dark:text-primary-hover">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600 dark:text-primary-hover">Subtotal</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semisemibold">$ {calculateSubtotal(cart)}</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600 dark:text-primary-hover">Taxes (GST)</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semisemibold">${taxes}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b dark:text-primary-hover border-gray-200 md:border-none text-primary-inverted-hover text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600 dark:text-primary-hover">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semisemibold text-gray-400 text-sm">US</span> <span className="font-semisemibold">${(subtotal + taxes).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:w-5/12">
                            <div className="w-full mx-auto rounded-lg dark:bg-primary-inverted-hover bg-white border border-gray-200 dark:border-primary-inverted-hover p-3 text-gray-800 font-light mb-6 shadow-lg">

                                {/* ------------FORM SHIPPING DETAILS--------- */}

                                <form onSubmit={handleSubmitShipping} >
                                    <p className=' text-primary-inverted-hover dark:text-primary-hover text font-semisemibold text-md ml-1 mb-4'>SHIPPING DETAILS</p>

                                    <div className="mb-3">
                                        <label className="text-gray-600 dark:text-primary-hover font-semisemibold text-sm mb-2 ml-1">Full Name*</label>
                                        <div>
                                            <input
                                                onChange={(e) => setshippingDetails((pS) => ({
                                                    ...pS,
                                                    fullName: e.target.value
                                                }))}
                                                className="w-full px-3 py-2 mb-1 border border-gray-200 dark:border-neutral dark:bg-primary-inverted-hover rounded-md focus:outline-none focus:border-key-color transition-colors" placeholder="John Smith" type="text" required />
                                        </div>
                                    </div>

                                    <label htmlFor='country' className="text-gray-600 dark:text-primary-hover font-semisemibold text-sm mb-2 ml-1">Country*</label>
                                    <Select

                                        styles={selectStyles}
                                        name={"country"}
                                        options={selectCountryOptions}
                                        onChange={(e) => setshippingDetails((pS) => ({
                                            ...pS,
                                            countryCode: e.label
                                        }))}
                                        getOptionLabel={e => (
                                            <div
                                                style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={e.flag} className='rounded-sm' style={{ height: "20px", width: "30px", objectFit: "cover" }} alt={e.value} />
                                                <span style={{ marginLeft: 15 }}>{[e.label.split("")[0].toUpperCase(), ...e.label.slice(1)].join("")}</span>
                                            </div>
                                        )}
                                    ></Select>

                                    <div className="my-3">
                                        <label className="text-gray-600 dark:text-primary-hover font-semisemibold text-sm mb-2 ml-1">City*</label>
                                        <div>
                                            <input
                                                onChange={(e) => setshippingDetails((pS) => ({
                                                    ...pS,
                                                    city: e.target.value
                                                }))}
                                                className={inputStyle}
                                                placeholder="Buenos Aires" type="text" required />
                                        </div>
                                    </div>


                                    <div className="mb-3">
                                        <label className="text-gray-600 dark:text-primary-hover font-semisemibold text-sm mb-2 ml-1">Postal Code*</label>
                                        <div>
                                            <input
                                                onChange={(e) => setshippingDetails((pS) => ({
                                                    ...pS,
                                                    postalCode: e.target.value
                                                }))}
                                                className={inputStyle}
                                                placeholder="C1264" type="text" required />
                                        </div>
                                    </div>


                                    <div className="mb-3">
                                        <label className="text-gray-600 dark:text-primary-hover font-semisemibold text-sm mb-2 ml-1">Address Line 1:*</label>
                                        <div>
                                            <input
                                                onChange={(e) => setshippingDetails((pS) => ({
                                                    ...pS,
                                                    addressLine1: e.target.value
                                                }))}
                                                className={inputStyle}
                                                placeholder="Av. Caseros 2400"
                                                type="text"
                                                required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-gray-600 dark:text-primary-hover font-semisemibold text-sm mb-2 ml-1">Address Line 2:</label>
                                        <div>
                                            <input
                                                onChange={(e) => setshippingDetails((pS) => ({
                                                    ...pS,
                                                    addressLine2: e.target.value
                                                }))}
                                                className={inputStyle}
                                                placeholder="8vo B"
                                                type="text"
                                            //NO DEBE SER REQUIRED
                                            />
                                        </div>
                                    </div>


                                    <button type='submit' className="block w-full max-w-xs mx-auto bg-key-color hover:bg-key-color-hover focus:bg-key-color text-white rounded-lg px-3 py-2 font-semisemibold"> Submit</button>

                                </form>
                            </div>




                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CheckoutForm
