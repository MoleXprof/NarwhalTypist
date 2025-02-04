import Head from 'next/head'
import Header from '../header'
import Footer from '../footer'
import { useRouter } from "next/router"
import { howTo } from '../constants/constants'
import InfoSection from '../../components/infoSection'
import { FaRegPaperPlane } from "react-icons/fa";

const InfoPage = () => {
//   const router = useRouter();
//   const domain = router.route.split("/");

  return (
    <div className='bg-sky-50 h-screen w-full px-20 flex flex-col justify-between'>
        <Head>
            <title>{"Info | NarwhalTypist"}</title>
            <meta name="title" content="About | NarwhalTypist" />
            <meta
            name="description"
            content="Description about NarwhalTypist and how it got created"
            />
            <link rel="shortcut icon" href="/images/narwhal.jpg" />
        </Head>

        <Header />
        <InfoSection
            title='about'
            description={"NarwhalTypist was made to verify the user's typing speed under different circumstances and gamemodes. Test yourself in various modes, track your progress and improve your speed. By default, this website uses the most common 200 words in the English language to generate its tests. You can sign up or log in to keep track of your statistics."}
        />

        <InfoSection
            title='how to play'
            description={
                <div>
                    {howTo.map((step, index) => (
                        <p key={index}>
                            {index+1}. {step}
                        </p>
                    ))}
                </div>
            }
        />

        <InfoSection
            title='stats'
            description={
                <div>
                    <p> {"wpm - total number of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds."} </p>
                    <p> {"raw wpm - wpm, but also includes incorrect words."} </p>
                    <p> {"acc - percentage of correctly pressed keys."} </p>
                    <p> {"char - correct characters / incorrect characters. Calculated after the test has ended."} </p>
                </div>
            }
        />

        <InfoSection
            title='contact'
            description={
                <p>
                    {"If you encounter a bug, or have a feature request, please contact "}
                    <a href="mailto:kkhc99@gmail.com" className="hyperlink font-medium">
                        {"kkhc99@gmail.com"}
                    </a>
                    {". I strive to respond within one to two business days. Additionally, feel free to connect with me through my social channels listed below."}
                </p>
            }
        />

        <div className='flex justify-center'>
            <div className="border border-gray-500 my-16 bg-gray-400 text-sky-50 py-1.5 md:py-2.5 font-bold px-3 md:px-5 rounded-md hover:bg-bluegrey-600 text-xs md:text-base items-center flex w-fit gap-1 cursor-pointer">
                <FaRegPaperPlane />
                <a href="mailto:kkhc99@gmail.com">
                    {"Contact"}
                </a>
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default InfoPage;