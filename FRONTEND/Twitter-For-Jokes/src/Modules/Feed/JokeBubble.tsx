import React, { useState, useEffect } from 'react';
import DeffUsrPic from  './../../assets/DeffUsrPic.jpg'
import './JokeBubble.css'

interface Joke {
    jokeId: number;
    jokeContent: string;
    rating: string;
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
        <div key={Joke.jokeId}>
             <img src={DeffUsrPic} alt=""/>
             <figcaption></figcaption>
             <p>{Joke.jokeContent}</p>
             <p>{Joke.rating}</p>
        </div>
           ))}
       </>
    )
}
export default JokeBuble;