import { DropdownAddContext, DropdownOptionsContext } from "./context/DropdownContext";
import { useState } from "react";

export default function TopBar({children}) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    return(<>
        <DropdownAddContext value={{isAddOpen, setIsAddOpen}}>
            <DropdownOptionsContext value={{isOptionsOpen, setIsOptionsOpen}}>
                
            </DropdownOptionsContext>
        </DropdownAddContext>
    </>)
}