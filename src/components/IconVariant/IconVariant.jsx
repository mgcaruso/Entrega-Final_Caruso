import './iconVariant.css'
import { Tooltip } from 'flowbite-react';

const colorOptions = {
    //STICKERLESS COLORS
    yellow: "#edc91b",
    darkGreen: "#019a34",
    cyan: "#2dbbc4",
    orange: "#ff6600",
    red: "#fe0000",
    magenta: "#cc3399",
    blue: "#085a82",
    purple: "#663399",


    //VARIANTS OPTIONS
    black: "black",
    gold: "#e3bd70",
    silver: "#a9aaa5",
    
    //GENERIC (for filter)
    all: "white"

};

const IconVariant = ({ variant }) => {


    let squares = [];

    if (variant === "stickerless") {
        squares = [
            { name: "square1", color: colorOptions.yellow },
            { name: "square2", color: colorOptions.darkGreen },
            { name: "square3", color: colorOptions.cyan },
            { name: "square4", color: colorOptions.orange },
            { name: "square5", color: colorOptions.red },
            { name: "square6", color: colorOptions.magenta },
            { name: "square7", color: colorOptions.cyan },
            { name: "square8", color: colorOptions.blue },
            { name: "square9", color: colorOptions.purple },
        ];
    } else {
        squares = [
            { name: "square1", color: colorOptions[variant] || colorOptions.all },
            { name: "square2", color: colorOptions[variant] || colorOptions.all },
            { name: "square3", color: colorOptions[variant] || colorOptions.all },
            { name: "square4", color: colorOptions[variant] || colorOptions.all },
            { name: "square5", color: colorOptions[variant] || colorOptions.all },
            { name: "square6", color: colorOptions[variant] || colorOptions.all },
            { name: "square7", color: colorOptions[variant] || colorOptions.all },
            { name: "square8", color: colorOptions[variant] || colorOptions.all },
            { name: "square9", color: colorOptions[variant] || colorOptions.all },
        ];
    }


    return (
        <div className="flex justify-center items-center m-1">
            <Tooltip className='bg-primary-inverted text-primary' content={variant}>
                <div className="squares">
                    {squares.map((square, index) =>
                        <div key={index} style={{ backgroundColor: square.color, border: variant === "all" && ".5px solid black"}}
                            className={`square ${square.name}`}
                        ></div>
                    )}
                </div>
            </Tooltip>
        </div>
    )
}

export default IconVariant



// className={variant === "black" ? `sq-black ${square.name}` : `stickerless ${square.name}`}