import { useEffect, useState } from "react"

export default function useIsBrowser() {

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect( () => {
        const hasWindow = typeof window === 'undefined'
        setIsBrowser(!hasWindow)
    })

    return {
        isBrowser
    }
}