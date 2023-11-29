import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-white shadow-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-2">
            <span className="sr-only">logo</span>
            <Image
              className="h-12 w-auto"
              src="/logo.webp"
              width={42}
              height={42}
              alt="logo (A cat using a pirate hat)"
            />
          </a>
        </div>

        <div className="ml-4">
          <span className="text-xl font-bold">Welcome to my contacts list</span>
        </div>
      </nav>
    </header>
  );
};
