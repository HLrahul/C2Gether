export default function Navbar() {
  return (
    <section className="h-16 w-full bg-transparent text-[#ededed] px-10 py-10 flex items-center justify-between">
      <p className="text-xl font-extrabold">Collab Study</p>

      <div className="absolute min-h-[30vh]">
        <ul className="flex md:flex-row flex-col gap-10 text-[#a6a6a6]">
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

      <div className="flex gap-5">
        <button className="flex items-center justify-center font-bold px-4 py-2 border border-solid border-white rounded-3xl">
          Login
        </button>

        <div className="hidden rounded w-12 md-flex flex-col items-center justify-center gap-1 cursor-pointer">
          <span className="block w-8 h-1 bg-slate-100 rounded"></span>
          <span className="block w-8 h-1 bg-slate-100 rounded"></span>
          <span className="block w-8 h-1 bg-slate-100 rounded"></span>
        </div>
      </div>
    </section>
  );
}
