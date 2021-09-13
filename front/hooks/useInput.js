import { useState, useCallback } from "react";

export default (initalValue = null) => {
    const [value, setValue] = useState(initalValue)
    const handler = useCallback((e, emojiObject) => {
        if (emojiObject) {
            setValue(emojiObject.emoji)
            debugger
        } else {
            setValue(e.target.value)
        }

    }, [])

    return [value, handler, setValue]
}