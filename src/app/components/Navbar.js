export default function Navbar() {
  return (
    <>
      <nav className="w-screen bg-red-500 overflow-hidden display: fixed ">
        <div className="py-4 lg:px-8 px-4 max-w-[1280px] h-16 m-auto text-white flex items-center justify-between">
          <div>
            <h1 className="lg:text-2xl text-xl uppercase tracking-wider cursor-pointer font-bold">
              Document
            </h1>
          </div>
          <div
            className="flex lg:gap-8 gap-6 uppercase tracking-wider cursor-pointer text-lg items-center"
            id="navItems"
          >
            <span className="group">
              List by Image
              <div className="w-0 group-hover:w-full h-0.5 bg-white ease-in-out duration-500"></div>
            </span>
            <span className="group">
              About
              <div className="w-0 group-hover:w-full h-0.5 bg-white ease-in-out duration-500"></div>
            </span>
            <span className="group">
              Contact
              <div className="w-0 group-hover:w-full h-0.5 bg-white ease-in-out duration-500"></div>
            </span>
          </div>
          <div
            id="hamburger"
            className="fa fa-bars flex items-center text-xl display:none"
          ></div>
          <div
            id="mobileNav"
            className="fixed flex flex-col gap-8 pt-16 px-4 text-xl uppercase bg-teal-500 h-full inset-0 top-16 w-[70%] left-[-70%] ease-in-out duration-500 cursor-pointer"
          >
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
      </nav>
    </>
  );
}
