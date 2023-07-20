import React from "react";
import { Navbar, Collapse, Typography, Button, IconButton } from "@material-tailwind/react";
import { useRouter, usePathname } from "next/navigation";
 
export default function Example() {
  const [openNav, setOpenNav] = React.useState(false);
  const router = useRouter()
  const pathname = usePathname()
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-md tracking-widest"
      >
        <p onClick={() => router.push('/embed')} className={`flex items-center cursor-pointer p-1 hover:text-teal-500 ${pathname.startsWith('/embed') && "text-teal-500 underline underline-offset-8 "}`} >
          Embed
        </p>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-md tracking-widest"
      >
        <p onClick={() => router.push('/search')} className={`flex items-center cursor-pointer p-1 hover:text-teal-500 ${pathname.startsWith('/search') && "text-teal-500 underline underline-offset-8 "}`} >
          Search
        </p>
      </Typography>
    </ul>
  );
 
  return (
    <>
      <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-transparent">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            className="mr-4 cursor-pointer py-1.5 font-bold text-lg"
            onClick={() => router.push('/')}
          >
            Lawyer Bot
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Button
              color="red"
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block tracking-widest"
            >
              <span>Logout</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Logout</span>
          </Button>
        </Collapse>
      </Navbar>
    </>
  );
}