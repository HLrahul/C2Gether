import { Link } from "@nextui-org/react";

export default function BottomBar() {
  return (
    <section className="h-[10vh] w-full  flex items-center justify-between px-5 lg:px-0 mt-10">
      <div className="w-[100%] lg:w-[70%] m-auto flex justify-between">
        <p>
          Crafted by{" "}
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/HLrahul"
            target="_blank"
          >
            <u>@HLrahul</u>
          </Link>
        </p>

        <p>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/HLrahul/CollabStudy"
            target="_blank"
          >
            <u>Go to Repo</u>
          </Link>
        </p>
      </div>
    </section>
  );
}
