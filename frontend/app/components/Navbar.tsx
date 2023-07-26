export default function Navbar() {

  return (
    <section className="h-16 w-full bg-transparent text-[#ededed] px-10 py-10 flex items-center justify-between">
      <p className="text-xl font-extrabold">Collab Study</p>

      <div className="absolute min-h-[30vh] top-16 right-10 md:bg-transparent bg-[#44444c] px-10 py-5 border border-solid border-gray">
        <ul className="flex md:flex-row flex-col md:gap-10 gap-5 text-[#a6a6a6]">
          <li className="cursor-pointer hover:text-[#ededed] duration-300">
            Intro
          </li>
          <li className="cursor-pointer hover:text-[#ededed] duration-300">
            About
          </li>
          <li className="cursor-pointer hover:text-[#ededed] duration-300">
            Contact
          </li>
        </ul>
     </div>

        <div className="cursor-pointer h-16 flex flex-col items-center justify-center gap-1">
          <span className="block w-7 h-1 bg-slate-100 rounded"></span>
          <span className="block w-7 h-1 bg-slate-100 rounded"></span>
          <span className="block w-7 h-1 bg-slate-100 rounded"></span>
        </div>
      
    </section>
  );
}
