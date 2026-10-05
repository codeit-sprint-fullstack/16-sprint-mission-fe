const Banner = ({imgSrc, title, buttonText}) => {
    return (
        <div className="bg-[#CFE5FF] w-full content-end h-80">
            <div className="flex flex-row justify-center h-3/4">
                <div className="content-center">
                    <h1 className="text-[#374151] text-xl font-extrabold">{title}</h1>
                    {
                        buttonText && (
                            <button className="btn-primary h-10 rounded-full my-4 w-full">{buttonText}</button>
                        )
                    }
                </div>
                <img className="h-full" src={imgSrc} alt=""/>
            </div>
        </div>
    );
};

export default Banner;