const Banner = ({imgSrc, text, buttonText}) => {
    return (
        <div className="bg-[#CFE5FF] w-full content-end h-80">
            <div className="flex flex-row justify-center h-3/4">
                <div className="content-center">
                    <h1>{text}</h1>
                    {
                        buttonText && (
                            <button className="btn-primary">{buttonText}</button>
                        )
                    }
                </div>
                <img className="h-full" src={imgSrc} alt=""/>
            </div>
        </div>
    );
};

export default Banner;