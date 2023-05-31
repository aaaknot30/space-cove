'use client';
 
import { createContext, useContext, useState } from 'react';
 
const SidebarContext = createContext();
 
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = ()=> {
    setIsOpen(!isOpen)
  }
 
  return (
    <SidebarContext.Provider value={{ isOpen }}>
      <SidebarNav handleClick={handleClick} />
    </SidebarContext.Provider>
  );
}
 
function SidebarNav({handleClick}) {
  let { isOpen } = useContext(SidebarContext);
 
  return (
    <div>
      <p>Home</p>
 
      {isOpen && <h2>Yes, SURF!!</h2>}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}