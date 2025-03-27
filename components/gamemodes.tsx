import { gamemodes } from './constants/constants';

interface Props {
    readonly gamemode: number
    readonly setGamemode: (arg: number) => void
}

const Gamemodes = ({ gamemode, setGamemode }: Props) => {
    return (
        <div className='bg-sky-100 py-2 px-2 rounded-xl'>
            <ul className='flex flex-row text-gray-400'>
                {gamemodes.map((mode, index) => (
                    <li key={index} className={`md:text-md text-sm mx-4 ${gamemode === mode ? "font-bold text-sky-400 hover:text-sky-300" : "hover:text-gray-500"}`} onClick={() => {setGamemode(mode)}}>
                        <button>
                            {mode} seconds
                        </button>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default Gamemodes