type InfoProps = {
    title: string
    description: any
}

const InfoSection = ({ title, description }: InfoProps) => {
    return (
        <div>
            <h1 className='uppercase font-extrabold tracking-tight md:text-2xl text-lg text-sky-200'>
                {title}
            </h1>
            <div className="tracking-tight text-md text-gray-400">
                {description}
            </div>
        </div>
    );
};

export default InfoSection;