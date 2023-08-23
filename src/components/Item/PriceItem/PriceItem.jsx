

const PriceItem = ({cube}) => {
    return (
        <h2 className="text-2xl font-medium font-body text-primary-inverted dark:text-primary"><span className="text-[18px]">$</span>
            {cube.price.toString().split(".")[0]}
            <span className="text-sm absolute">{cube.price.toString().split(".")[1]}</span>
        </h2>
    )
}

export default PriceItem
