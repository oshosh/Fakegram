import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const Portal = ({ children }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])


    return mounted
        ? createPortal(children,
            document.querySelector("#ModoalPortal"))
            ? createPortal(children,
                document.querySelector("#LoadingPortal"))
            : null
        : null
}

export default Portal