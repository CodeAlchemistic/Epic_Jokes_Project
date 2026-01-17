import React, { useState, useEffect } from 'react';
import usr_icon from './../../assets/usr_icon.png';
import './JokeBubble.css'

interface Joke {
    jokeId: number;
    jokeContent: string;
    rating: string;
    authorName: string;
}

const JokeBuble: React.FC = () => {
    const [data, setData] = useState<Joke[]>([]);

    useEffect(() => {
        fetch('http://localhost:65451/api/Jokes')
            .then(response => response.json())
            .then((resalt: Joke[]) => setData(resalt));
    }, []);

    return (
       <>
           {data.map((Joke) =>(
        <div className="bubbleBox" key={Joke.jokeId}>

            <div className="userInfoBox">
                <img src={usr_icon} alt=""/>
                <p>{Joke.authorName}</p>
            </div>
            <div className="jokeInfoBox">
                <p>{Joke.jokeContent}</p>
                <p id={"rating"}>Rating: {Joke.rating}/10</p>
            </div>

        </div>
           ))}
       </>
    )
}
export default JokeBuble;