import React, { useState, useEffect } from 'react';
import usr_icon from './../../assets/usr_icon.png';
import './JokeBubble.css'

import {convertStringFromInput} from "./../Auxiliary/AuxiliaryFunctions.ts";

interface Joke {
    jokeId: number;
    jokeContent: string;
    rating: string;
    authorName: string;
}

interface RatingUpdateDto {
    jokeId: number;
    rating: number;
}


    const JokeBuble: React.FC = () => {
    const [data, setData] = useState<Joke[]>([]);
    const [activeJokeId, setActiveJokeId] = useState<number | null>(null);

    const [ratingInput, setRatingInput] = useState<string>("");

    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:65451/api/Jokes')
            .then(response => response.json())
            .then((resalt: Joke[]) => setData(resalt));
    }, []);


    const toggleForm = (id: number) => {
        if (activeJokeId === id) {
            setActiveJokeId(null);
        } else {
            setActiveJokeId(id);
        }
    }

        const updateRating = (e: React.FormEvent, jokeId: number) => {
         e.preventDefault();



         const jokeToUpdate: RatingUpdateDto = {
             jokeId: jokeId,
             rating: convertStringFromInput(ratingInput),
         }

         fetch(`http://localhost:65451/api/Jokes/${jokeId}/rating`, {
             method: 'PUT',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(jokeToUpdate)
         }).then(response => {
                if (!response.ok) {
                    console.log(response, "nic není ok")
                } else{
                    window.location.reload();
                    console.log(response, "Vše OK")
                }
            })
        .catch(error => console.log(error));




    }

    /*Function that deletes specific joke*/
    async function deleteJoke(id: number) {
        const res = await fetch(`http://localhost:65451/api/Jokes/${id}`, {
            method: 'DELETE',
        });

        if (res.status === 404) {
            throw new Error("Tento vtip neexistuje (404).")
        }

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || `Chyba při mazání (${res.status}).`);
        }


    }
    /*Function that runs when the button is clicked*/
    async function onDelete(id: number) {
        if (!window.confirm("Do you really want to delete the joke?")) return;

        setMessage(null);
        setError(null);


        try {
            await deleteJoke(id);

            setData(prev => prev.filter(j => j.jokeId !== id));

            setMessage("Joke was deleted successfully.");
            /*window.location.reload();*/
        }
        catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            else {
                setError("Unable to delete the joke.");
            }
        }



    }






    return (
       <>
           {message && <p>{message}</p>}
           {error && <p>{error}</p>}

           {data.map((Joke) =>(
        <div className="bubbleBox" key={Joke.jokeId}>

            <div className="userInfoBox">
                <img src={usr_icon} alt=""/>
                <p>{Joke.authorName}</p>
            </div>
            <p>{Joke.jokeContent}</p>
            <div className="ourFlex">
                <div className="jokeInfoBox">
                    <p id="rating" onClick={() => toggleForm(Joke.jokeId)}>Rating: {Joke.rating}/10</p>
                    <p className="info_notif">click on 'Rating' to change</p>
                </div>
                <div className={activeJokeId === Joke.jokeId ? "hid active" : "hid"}>
                    <form className="ourFlex" onSubmit={(e) => updateRating(e, Joke.jokeId)}>
                    <input min="1" max="10" id="ratingChange" value={ratingInput} onChange={(e) => setRatingInput(e.target.value)} type="number"></input>
                    <button type="submit" id="submitRate">Change rating</button>
                    </form>
                </div>
            </div>

            <button className="delete_btn" onClick={() => onDelete(Joke.jokeId)}>
                Delete joke
            </button>
        </div>
           ))}
       </>
    )
}
export default JokeBuble;