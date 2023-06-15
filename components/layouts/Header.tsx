import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link legacyBehavior href="/">
          <a id="link" className="text-xl font-bold">TODO</a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link legacyBehavior href="/about">
              <a id="link">About</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/contact">
              <a id="link">Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
