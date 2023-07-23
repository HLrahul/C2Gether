
export default function Navbar() {
    return (
      <section className="h-20 w-full bg-transparent text-[#ededed] px-10 py-10 flex align-center justify-between">
        <p className=" font-extrabold ">Collab Study</p>

        <ul className="flex gap-10 text-[#a6a6a6]">
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

        <button className="flex align-center justify-center font-bold px-2 py-4 border border-solid border-white rounded">Login</button>
      </section>
    );
}

