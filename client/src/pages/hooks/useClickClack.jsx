import { useState } from "react";

const useClickClack = () => {
    const [checked,setChecked] = useState(false);

    const onClick=()=>{
        console.log("Custom Hook clck");
        setChecked(!checked);

    };


    return [checked, onClick];
};

export default useClickClack;