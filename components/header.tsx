import Image from 'next/image';
import Link from 'next/link';
import { FaKeyboard } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { Status } from '../components/constants/constants';
import Theme from './theme';
import { useState, useEffect, use } from 'react';
import { useTheme } from 'next-themes';

type Props = {
    readonly status?: Status
}

const Header = ({ status = Status.WAITING }: Props) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const { theme } = useTheme();
    const [imageSrc, setImageSrc] = useState('/images/narwhal.jpg');

    useEffect(() => {
        if (theme === 'dark' || theme === 'system') {
            setImageSrc('/images/narwhal-dark.jpeg');
        } else {
            setImageSrc('/images/narwhal.jpg');
        }
    }, [theme]);

    return (
      <nav className="w-full flex py-4 justify-between items-center navbar">
        <Link href="/" passHref>
            <div className='flex flex-row'>
                <Image
                    src={imageSrc}
                    alt="NarwhalTypist logo"
                    width={60}
                    height={60}
                />
                <div>
                    <h2 className='font-extrabold tracking-tight text-2xl text-sky-200 dark:text-dark-highlight mt-1.5 hidden md:block' id="top">
                        {"NarwhalTypist"}
                    </h2>
                    <h2 className='font-normal tracking-tight text-xs text-gray-400 -mt-1.5 hidden md:block dark:text-dark-text-highlight'>
                        {"narwhals, narwhals, typing in the ocean, causing a commotion"}
                    </h2>
                </div>
            </div>
        </Link>

        { status !== Status.STARTED ?
            <ul className="list-none flex justify-end items-center gap-5">
                <li key="mode">
                    {mounted ? <Theme /> : null}
                </li>
                <li className="text-gray-400 hover:text-gray-500 dark:text-dark-text dark:hover:text-dark-text-highlight" key="info">
                    <Link href="/info">
                        <IoInformationCircle className='h-6 w-6' />
                    </Link>
                </li>
                <li className="text-gray-400 hover:text-gray-500 dark:text-dark-text dark:hover:text-dark-text-highlight" key="home">
                    <Link href="/">
                        <FaKeyboard className='h-6 w-6' />
                    </Link>
                </li>
            </ul> : null
        }
      </nav>
    );
};

export default Header;