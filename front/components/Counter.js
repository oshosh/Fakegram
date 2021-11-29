import React, { useState, useEffect, useCallback } from "react";

function Counter() {
    const [count, setCount] = useState(
        typeof window !== "undefined"
            ? JSON.parse(window.localStorage.getItem("count"))
            : null
    );

    useEffect(() => {
        if (typeof window !== 'undefined')
            window.localStorage.setItem("count", JSON.stringify(count));

    }, [count]);

    const handleClick = useCallback(() => setCount(count + 1), [count])

    return <button onClick={handleClick}>{count}</button>;
}
export default Counter;