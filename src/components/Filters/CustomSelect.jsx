import Select from 'react-select'
import IconVariant from '../IconVariant/IconVariant'
// import { useContext } from 'react'
// import { ThemeContext } from '../Context/Theme/theme'

const CustomSelect = ({ id, onChangeFn, options, iconImg, placeholder, theme }) => {

    // const { theme } = useContext(ThemeContext);  


    return (
        <Select
            menuPortalTarget={document.body}
            styles={{
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
            }}
            getOptionLabel={e => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {iconImg === "iconVariant" ?
                        <IconVariant style={{ height: "20px" }} variant={e.value} />
                        :
                        iconImg
                    }
                    <span style={{ marginLeft: 15 }}>{[e.label.split("")[0].toUpperCase(), ...e.label.slice(1)].join("")}</span>
                </div>
            )}
            placeholder={placeholder}
            id={id}
            className="z-90 flex-1 w-full"
            onChange={onChangeFn} options={options}
        />
    )
}

export default CustomSelect
