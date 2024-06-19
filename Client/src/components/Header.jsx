import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-5 border-b">
      <Link to="/" className="flex items-center">
        <img width={80} src="/logo.png" alt="" />
        <span className="font-bold text-2xl max-sm:hidden">Moviesss</span>
      </Link>

      <Link
        to="/create"
        className="border rounded-full py-1 px-5 hover:bg-black hover:text-white transition"
      >
        Create Movie
      </Link>
    </header>
  );
};

export default Header;
