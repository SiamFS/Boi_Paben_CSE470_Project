import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaBarsStaggered, FaBookOpen, FaXmark } from 'react-icons/fa6';
import { AuthContext } from '../contexts/AuthProvider';

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const { user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`);
        }
    };

    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'About', path: '/about' },
        { link: 'Shop', path: '/shop' },
        { link: 'Sell your book', path: '/admin/dashboard' },
        { link: 'Blog', path: '/blog' },
    ];

    return (
        <header className={`fixed w-full z-50 ${isSticky ? 'bg-white shadow-md' : ''} transition duration-300`}>
            <nav className="container mx-auto">
                <div className="flex justify-between items-center px-4 py-3">
                    <Link to='/' className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                        <FaBookOpen className='inline-block' /> Boi Paben
                    </Link>
                    <ul className="hidden md:flex space-x-12 mx-auto">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className="block text-base font-bold text-black uppercase cursor-pointer hover:text-orange-400">{item.link}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <Link to='/profile' className='text-black uppercase font-bold'>Profile</Link>
                        ) : (
                            <Link to='/login' className='text-black uppercase font-bold'>Login</Link>
                        )}
                        <Link to='/add_to_payment' className='text-black uppercase font-bold'>Cart</Link>
                    </div>
                    <div className="lg:hidden md:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            {isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />}
                        </button>
                    </div>
                </div>
                <div className={`space-y-4 px-4 mt-12 py-7 bg-orange-400 ${isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'}`}>
                    {navItems.map(({ link, path }) => (
                        <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>
                    ))}
                </div>
            </nav>
            <div className="bg-transparent py-2">
                <div className="container mx-auto">
                    <div className="relative w-full max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search books"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-0 top-0 mt-2 mr-4 text-orange-400"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;