import React, {useEffect, useState} from "react";
import usr_icon from './../../assets/usr_icon.png';

interface creatorToDesplay {
     creatorId: number;
     creatorName: string;
     jokeCount: number;
}

const CreatorBubble: React.FC = () => {
    const [data, setData] = useState<creatorToDesplay[]>([]);

    useEffect(() => {
        fetch('http://localhost:65451/api/xxx') //need creator request api call to work
            .then(response => response.json())
            .then((resalt: creatorToDesplay[]) => setData(resalt));
    }, []);

    return (
        <>
            {data.map((creatorToDesplay) =>(
            <div key={creatorToDesplay.creatorId}>
                <img src={usr_icon} alt="usr_icon" />
                <p>{creatorToDesplay.creatorName}</p>
                <p>{creatorToDesplay.jokeCount}</p>
            </div>
            ))}
        </>
    )
}

export default CreatorBubble;