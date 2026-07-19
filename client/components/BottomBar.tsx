import { Link } from '@nextui-org/react';

export default function BottomBar() {
  return (
    <section className="h-[10vh] w-full flex items-center justify-center px-5 lg:px-0 mt-10">
      <p className="text-center text-gray-500">
        Crafted by{' '}
        <Link
          isExternal
          href="https://github.com/HLrahul"
          target="_blank"
          className="text-foreground mx-1"
        >
          <u>@HLrahul</u>
        </Link>
        {' | '}
        <Link
          isExternal
          href="https://github.com/HLrahul/CollabStudy"
          target="_blank"
          className="text-foreground ml-1"
        >
          <u>Go to Repo</u>
        </Link>
      </p>
    </section>
  );
}
