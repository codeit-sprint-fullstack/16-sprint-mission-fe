import React from 'react';

const IntroCard = ({imgSrc, tag, title, text, reverse}) => {
    return (
        <div className="flex flex-row items-center gap-6">
            {
                (reverse) ?
                    (<>
                        <div className="flex flex-col items-end gap-4">
                            <p className="text-end text-brand font-bold text-sm">{tag}</p>
                            <h1 className="text-end text-lg font-bold">{title}</h1>
                            <p className="text-end">{text}</p>
                        </div>
                        <img src={imgSrc} alt={tag} className="w-1/2"/>
                    </>)
                    :
                    (<>
                        <img src={imgSrc} alt={tag} className="w-1/2"/>
                        <div className="flex flex-col items-start gap-4">
                            <p className="text-brand font-bold text-sm">{tag}</p>
                            <h1 className="text-start text-lg font-bold">{title}</h1>
                            <p>{text}</p>
                        </div>
                    </>)
            }
        </div>
    );
};

export default IntroCard;