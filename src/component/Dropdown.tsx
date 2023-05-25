import { useEffect, useState } from "react";
import { PageLinks } from "./PageLinks";
import { AuthenticationButtons } from "./AuthenticationButtons";

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // close the menu when the screen width is more than or equal to Tailwind's 'md' breakpoint (default: 768px)
  useEffect(() => {
    const handleResize = () => {
      // check if the screen width is more than or equal to Tailwind's 'md' breakpoint (default: 768px)
      if (window.matchMedia("(min-width: 768px)").matches) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // cleanup function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="container cursor-pointer" onClick={toggleMenu}>
        Menu
      </div>
      <div
        className={`container absolute right-[-1rem] top-10 z-10 flex w-[10rem] flex-col rounded bg-gray-900 p-4 shadow-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col items-center gap-4">
          <PageLinks />
        </ul>
        <ul className="mt-4 flex flex-col items-center gap-4">
          <AuthenticationButtons />
        </ul>
      </div>
    </>
  );
}
