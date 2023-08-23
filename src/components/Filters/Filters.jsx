import { useId } from "react";
import { useContext } from "react";
import { FiltersContext } from '../Context/Filters/filters';
import CustomSelect from "./CustomSelect";
import { HiCube } from "react-icons/hi2";
import { ThemeContext } from "../../components/Context/Theme/theme"

const Filters = ({ products, options }) => {
    const { theme } = useContext(ThemeContext)
    const { setFilters } = useContext(FiltersContext)
    const searchByNameId = useId();
    const minPriceId = useId();
    const brandSelectId = useId();
    const variantsSelectId = useId();

    const generateVariantsOptions = (data) => {
        let result = [...new Set(data.map(cube => cube.variants.map(varArr => varArr.name)).flat())]

        result = result.map(el => ({
            value: el,
            label: el
        }));
        return [{ value: 'all', label: 'All' }, ...result];
    }

    const variantOptions = generateVariantsOptions(products);

    const generateBrandOptions = (prodArr) => {
        let result = prodArr.map(prod => prod.brand);
        let resultSet = new Set(result);
        let finalArr = [...resultSet];
        finalArr = finalArr.map(option => ({
            value: option,
            label: option
        }))
        return [{ value: "all", label: "All brands" }, ...finalArr]
    }
    const brandOptions = generateBrandOptions(products);

    const handleSearchByName = (e) => {
        setFilters(prevSt => ({
            ...prevSt,
            name: e.target.value
        }))
    }

    const handleMinPrice = (e) => {
        if (e.target.value) {
            setFilters(prevSt => ({
                ...prevSt,
                minPrice: parseInt(e.target.value)
            }))
        }
    }

    const handleSelectVariant = (e) => {
        setFilters(prevSt => ({
            ...prevSt,
            variant: e.value
        }))
    }

    const handleSelectBrand = (e) => {
        setFilters(prevSt => ({
            ...prevSt,
            brand: e.value
        }))
    }



    return (
        <div className='flex justify-between sm:px-10 px-3 pt-8 bg-neutral-ultra-light flex-col md:flex-row sm:flex-row pb-2 flex-wrap gap-3 items-center dark:bg-primary-inverted-hover'>

            <div className="column-1 flex flex-1 flex-col lg:flex-row md:flex-row sm:flex-row gap-2 w-full">
                {
                    options.includes("nameSearch") &&
                    <label className="flex flex-1 min-w-[200px] items-center justify-center" >
                        <input
                            id={searchByNameId}
                            onChange={handleSearchByName}
                            className="rounded-[5px] focus:ring-1 focus:ring-key-color font-body w-full border-max  border-1
                    border-[#cccbcb] h-full dark:bg-inherit dark:placeholder:text-neutral-lighter dark:text-primary text-thin"
                            type="text"
                            placeholder='Filter by name...' />
                    </label>

                }

                {
                    options.includes("minPrice") &&


                    <label className="flex flex-1 min-w-[200px] items-center justify-center w-full" >
                        <input
                            id={minPriceId}
                            onChange={handleMinPrice}
                            className="rounded-[5px] focus:ring-1 focus:ring-key-color font-body w-full border-max  border-1
                    border-[#cccbcb] h-full dark:bg-inherit dark:placeholder:text-neutral-lighter dark:text-primary text-thin"
                            type="number"
                            placeholder='Filter by min price...' />
                    </label>
                }


            </div>


            <div className="column-2 flex flex-1 flex-col lg:flex-row md:flex-row sm:flex-row gap-2 justify-center w-full">



                {
                    options.includes("variants") &&
                    <CustomSelect
                        
                        id={variantsSelectId}
                        onChangeFn={handleSelectVariant}
                        options={variantOptions}
                        iconImg={"iconVariant"}
                        placeholder={"Variant..."}
                        theme={theme}
                    />

                }
                {
                    options.includes("brands") &&

                    <CustomSelect
                        id={brandSelectId}
                        onChangeFn={handleSelectBrand}
                        options={brandOptions}
                        iconImg={<HiCube fontSize={20} />}
                        placeholder={"Brand..."}
                        theme={theme}
                    />

                }

            </div>
        </div>
    )
}

export default Filters
