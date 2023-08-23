import loader from '../../assets/animated/loader.gif'

const Loader = ({ message }) => {
    return (
        <div className="loader min-h-[80vh] flex flex-col justify-center items-center bg-neutral-lighter dark:bg-primary-inverted-hover">
            <img src={loader} alt="Rubik's Cube Loader Image" />
            <h3 className='text-primary-inverted font-body text-xl dark:text-primary-hover'>{message}</h3>
        </div>
    )
}

export default Loader
