import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <a
                    href="https://github.com/MoleXprof"
                    className="hyperlink text-sm md:text-base"
                    target="_blank"
                    rel="noreferrer"
                >
                    <IoLogoGithub className="text-sky-200 h-4 w-4 md:h-6 md:w-6 hover:text-sky-300"/>
                </a>
            
                <a
                    href="https://www.linkedin.com/in/kyle-chin-527959231/"
                    className="hyperlink text-sm md:text-base"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaLinkedin className="text-sky-200 h-4 w-4 md:h-6 md:w-6 hover:text-sky-300"/>
                </a>
            </div>

            <p className="text-right text-sky-200 font-bold uppercase text-sm md:text-xl font-header">
                {"Built by Kyle Chin"}
            </p>
        </div>
    );
};

export default Footer;
