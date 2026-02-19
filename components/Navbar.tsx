import Link from "next/link";
import LogoIcon from "./icons/LogoIcon";

const Navbar = () => {
  return (
    <>
      <nav className="border-b">
        <div className="flex justify-between items-center px-8 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black p-2 rounded-lg">
              <LogoIcon size={20} className="text-white" />
            </div>
            <span className="text-xl font-extrabold">ResumeBoost</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              className="text-slate-700 font-semibold px-4 hover:bg-blue-500 hover:text-white rounded-lg transition py-2 "
              href="/login"
            >
              Log In
            </Link>
            <Link
              className="bg-black text-white rounded-full px-6 py-2 font-bold"
              href="/register"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
