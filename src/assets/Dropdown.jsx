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
      function close(event){
        if(!dropdownRef.current.contains(event.target)){
          setOpen(false)
        }

      }
      if(open){
        window.addEventListener('click', close)
      }
      return () => {
        window.removeEventListener('click', close)
      }
    },[open])
    
    return(
        <DropdownContext  value={{open, setOpen}}>
            <div ref={dropdownRef} className="relative">{children}</div>
        </DropdownContext>
    );
};



function DropdownButton({children, classes, ...props}) {
  const { open, setOpen } = useContext(DropdownContext)

  function toggleOpen() {
      setOpen(!open);
  }

  return(
      <button onClick={toggleOpen} className= {("px-4 py-2 text-4xl text-white bg-gray-500 flex items-center font-bold cursor-pointer hover:shadow hover:shadow-amber-500 ") + `${ open ? "rounded-t-xl " : "rounded-xl "} duration-100`} {...props}>
          {children}
      </button>
  )
}

function DropdownContent({ children }) {
  const { open } = useContext(DropdownContext);
  
  return (
    <div className={`absolute z-20 rounded-b-2xl rounded-tr-2xl bg-stone-300 overflow-hidden w-max overflow-y-auto ${ open ? "shadow-md" : "hidden"}`}>
      { children }
    </div>
  );
};

function DropdownList({ children, ...props }) {
  
  return (
    <ul className="divide-y divide-gray-500 text-gray-700" {...props}>
      { children }  
    </ul>
  );
};

function DropdownItem({click = () => console.log('nthng'), children, ...props }) {
  return (
    <li>
      <button onClick={() => click()} className="py-3 px-5 whitespace-nowrap hover:underline" {...props}>{ children }</button> 
    </li>
  );
};

function DropdownSwitch({label='Option Label', name = 'Option', enabled = false, toggle = () => console.log('toggle' + name), options, ...props}) {
    return (
      <li>
        <div className="flex items-center justify-between py-3 px-5">
          <label className="mr-3 text-xl hover:underline" htmlFor={name}>{label}</label>
          <input type="checkbox" checked={options[name]} id={name} onChange={() => toggle(name)} className="h-5 w-5" {...props}/>
        </div>
      </li>
    )
  };

Dropdown.List = DropdownList;
Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Switch = DropdownSwitch;