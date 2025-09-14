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
      <button onClick={toggleOpen} className= {("px-4 py-2 text-xl text-white bg-gray-500 flex items-center font-bold cursor-pointer hover:shadow hover:shadow-amber-500 lg:text-3xl ") + `${ open ? "rounded-t-xl " : "rounded-xl "} duration-100`} {...props}>
          {children}
      </button>
  )
}

function DropdownContent({ children }) {
  const { open } = useContext(DropdownContext);
  
  return (
    <div className={`fixed z-20 left-0 w-full sm:w-sm sm:absolute sm:-left-6 rounded-2xl rounded-b-2xl rounded-tr-2xl bg-stone-300 overflow-hidden overflow-y-auto xl:w-max ${ open ? "shadow-md" : "hidden"}`}>
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

function DropdownItem({click = () => console.log('nothng'), children, ...props }) {
  return (
    <li className="flex flex-row justify-center">
      <button onClick={() => click()} className="w-full py-3 px-5 whitespace-nowrap hover:underline text-xl" {...props}>{ children }</button> 
    </li>
  );
};

function DropdownSwitch({label='Option Label', name = 'Option', enabled = false, toggle = () => console.log('toggle' + name), options, ...props}) {
    return (
      <li>
        <div className="flex items-center justify-between py-3 px-5">
          <label className="mr-3 text-xl hover:underline" htmlFor={name}>{label}</label>
          <input type="checkbox" checked={options[name]} id={name} onChange={() => toggle(name)} className="size-[10px]" {...props}/>
        </div>
      </li>
    )
  };

Dropdown.List = DropdownList;
Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Switch = DropdownSwitch;