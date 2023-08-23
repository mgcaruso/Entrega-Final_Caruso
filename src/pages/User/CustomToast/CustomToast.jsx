import { toast } from 'react-hot-toast'

const CustomToast = ({t, displayName, imgUrl, message}) => {
    return (
        <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-primary ring-opacity-5 dark:bg-primary-inverted dark:text-primary`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
             { imgUrl &&
              <img
                className="h-10 w-10 rounded-full"
                src={imgUrl}
                alt={"Image of " + displayName}
              />
            
            }
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-primary">
                {displayName}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-lighter">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-[#222]">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-key-color hover:text-key-color focus:outline-none focus:ring-2 focus:ring-key-color"
          >
            Close
          </button>
        </div>
      </div>
    )
}

export default CustomToast