import React, {useEffect, useState} from "react";
import usr_icon from './../../assets/usr_icon.png';
import './CreatorBubble.css';

interface creatorToDesplay {
     userId: number;
     userName: string;
     jokesCount: number;
}

const CreatorBubble: React.FC = () => {
    const [data, setData] = useState<creatorToDesplay[]>([]);

    useEffect(() => {
        fetch('http://localhost:65451/api/Users') //need creator request api call to work
            .then(response => response.json())
            .then((resalt: creatorToDesplay[]) => setData(resalt));
    }, []);
    console.log(data)

    return (
        <>
            {data.map((creatorToDesplay) =>(
            <div className="creator-bubble" key={creatorToDesplay.userId}>
                <img src={usr_icon} alt="usr_icon" />
                <p>{creatorToDesplay.userName}</p>
                <p>Creator's jokes: {creatorToDesplay.jokesCount}</p>
            </div>
            ))}
        </>
    )
}

export default CreatorBubble;