import React, { useState } from "react";
// logic for custom hooks is to replace functions that would normally exists inside components with a Hook instead that replaces the function logic. 
//Where you normally would call the function, you would instead setHook(params)
function useToggle(initialVal = false) {
    const [state, setState] = useState(initialVal)
    const toggle = () =>{
        setState(!state);
    }
    return [state,toggle]
}

export default useToggle