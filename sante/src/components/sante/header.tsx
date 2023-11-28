import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-white shadow-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">logo</span>
            <Image
              className="h-16 w-auto"
              src="/logo.webp"
              width={42}
              height={42}
              alt=""
            />
          </a>
        </div>
      </nav>
    </header>
  );
};
