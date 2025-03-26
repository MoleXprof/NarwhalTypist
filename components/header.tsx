import Image from 'next/image';
import Link from 'next/link';
import { IoMdPerson } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { IoStatsChartSharp } from "react-icons/io5";

const Header = () => {
    return (
      <nav className="w-full flex py-4 justify-between items-center navbar">
        <Link href="/" passHref>
            <div className='flex flex-row'>
                <Image
                    src="/images/narwhal.jpg"
                    alt="NarwhalTypist logo"
                    width={60}
                    height={60}
                />
                <div>
                    <h2 className='font-extrabold tracking-tight text-2xl text-sky-200 mt-1.5 hidden md:block' id="top">
                        {"NarwhalTypist"}
                    </h2>
                    <h2 className='font-normal tracking-tight text-xs text-sky-200 -mt-1.5 hidden md:block'>
                        {"narwhals, narwhals typing in the ocean, causing a commotion"}
                    </h2>
                </div>
            </div>
        </Link>
        <ul className="list-none flex justify-end items-center gap-5">
            <li className="text-gray-400 hover:text-gray-500" key="info">
                <Link href="/info">
                    <IoInformationCircle className='h-6 w-6' />
                </Link>
            </li>
            <li className="text-gray-400 hover:text-gray-500" key="home">
                <Link href="/">
                    <FaKeyboard className='h-6 w-6' />
                </Link>
            </li>
        </ul>
      </nav>
    );
};

export default Header;