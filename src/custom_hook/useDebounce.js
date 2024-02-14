import { useEffect, useState } from "react"

const useDebounce = (val) => {
    const [debounceVal, setDebounceVal] = useState(val)

    useEffect(() => {
        setTimeout(() => {
            setDebounceVal(val)
        }, 500)
        // return () => {
        //     clearTimeout(handler)
        // }
    }, [val])
    return debounceVal
}

export default useDebounce