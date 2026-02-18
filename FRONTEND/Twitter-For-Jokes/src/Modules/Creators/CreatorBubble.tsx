import React, {useEffect, useState} from "react";
import usr_icon from './../../assets/usr_icon.png';
import './CreatorBubble.css';
import Loading from "../Global/Loading.tsx";

interface creatorToDesplay {
     userId: number;
     userName: string;
     jokesCount: number;
}

const CreatorBubble: React.FC = () => {
    const [data, setData] = useState<creatorToDesplay[]>([]);
    const [loading, setLoading] = useState(true);
    /*
    useEffect(() => {
        fetch('http://localhost:65451/api/Users') //need creator request api call to work
            .then(response => response.json())
            .then((resalt: creatorToDesplay[]) => setData(resalt))
    }, []);
*/

    useEffect(() => {
        fetch('http://localhost:65451/api/Users', {
            method: 'GET',
            headers: {'Accept': 'application/json'}
        })
            .then(res => {
                if (res.ok){
                    setLoading(false);
                    return res.json();
                }
            })
            .then((resalt: creatorToDesplay[]) =>{
                setData(resalt);
            })
    }, []);

    console.log(data);

        if (loading) {
           return <Loading />;
        }else {
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
}

export default CreatorBubble;