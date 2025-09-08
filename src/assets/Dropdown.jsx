import { useContext } from "react"
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const DropdownContext = createContext({open: false, setOpen: () => {}})

export function Dropdown({children, ...props}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    useEffect(() => {
      function close(e) {
        console.log(dropdownRef.current)
        if (!dropdownRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      if (open) {
        window.addEventListener("click", close);
      }
      return function removeListener() {
        window.removeEventListener("click", close);
      }
    }, [open]);

    
    return(
        <DropdownContext  value={{open, setOpen}}>
            <div ref={dropdownRef} className="relative">{children}</div>
        </DropdownContext>
    );
};



function DropdownButton({children, ...props}) {
    const { open, setOpen } = useContext(DropdownContext)

    function toggleOpen() {
        setOpen(!open);
    }

    return(
        <button onClick={toggleOpen} className="rounded px-4 py-2 font-bold text-white bg-gray-800 flex items-center">
            {children}
        </button>
    )
}

function DropdownContent({ children }) {
  const { open } = useContext(DropdownContext);
  
  return (
    <div className={`absolute z-20 rounded border border-gray-300 bg-white overflow-hidden my-1 overflow-y-auto ${ open ? "shadow-md" : "hidden"}`}>
      { children }
    </div>
  );
};

function DropdownList({ children, ...props }) {
  const { setOpen } = useContext(DropdownContext); // get the context
  
  return (
    <ul onClick={() => setOpen(false)} className="divide-y divide-gray-200 text-gray-700" {...props}>
      { children }  
    </ul>
  );
};

function DropdownItem({ children, ...props }) {
  return (
    <li>
      <button className="py-3 px-5 whitespace-nowrap hover:underline" {...props}>{ children }</button> 
    </li>
  );
};

Dropdown.List = DropdownList;
Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;