import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// react-icons
import { FaBarsStaggered, FaBookOpen, FaXmark } from 'react-icons/fa6';

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);

    // toggle menu
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
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

    // navItems
    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'About', path: '/about' },
        { link: 'Shop', path: '/shop' },
        { link: 'Sell your book', path: '/admin/dashboard' },
        { link: 'Blog', path: '/blog' },
    ];

    return (
        <header>
            <nav className={`fixed w-full z-50 ${isSticky ? 'bg-white shadow-md' : 'bg-transparent'} transition duration-300`}>
                <div className="flex justify-between items-center px-4 py-3">
                    {/* logo */}
                    <Link to='/' className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                        <FaBookOpen className='inline-block'/>Books
                    </Link>
                    {/* nav bar items for large device */}
                    <ul className="hidden md:flex space-x-12 mx-auto">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className="block text-base font-bold text-black uppercase cursor-pointer hover:text-orange-400">{item.link}</Link>
                            </li>
                        ))}
                    </ul>
                    {/* toggle button for small devices */}
                    <div className="lg:hidden md:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            {
                                isMenuOpen ? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered className='h-5 w-5 text-black'/>
                            }
                        </button>
                    </div>
                </div>
                {/* nav bar items for small device */}
                <div className={`space-y-4 px-4 mt-12 py-7 bg-orange-400 ${isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'}`}>
                    {
                        navItems.map(({link, path}) => (
                            <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>
                        ))
                    }
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
