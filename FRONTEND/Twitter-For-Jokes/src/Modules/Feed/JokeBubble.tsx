import React, {useEffect, useState} from 'react';
import usr_icon from './../../assets/usr_icon.png';
import './JokeBubble.css'
import {Link} from "react-router-dom";
import './JokeBubble.css';
import { convertStringFromInput } from "../Auxiliary/AuxiliaryFunctions.tsx";
import { useAuth } from "../Contexts/AuthContext.tsx";
import toast from "react-hot-toast";


interface Joke {
    jokeId: number;
    jokeContent: string;
    rating: string;
    authorName: string;
}

interface JokeRatingForUser {
    userId: number;
    jokeId: number;
    rating: number;
}


interface JokeBubbleProps {
    jokes: Joke[];
    refreshJokes: () => void;
}
interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}


const ConfirmModal = ({message, onConfirm, onCancel }: ConfirmModalProps) => {
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-box">
                    <p>{message}</p>

                    <div className="modal-buttons">
                        <button id="first-button" onClick={onCancel}>Cancel</button>
                        <button id="second-button" onClick={onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}



const JokeBuble: React.FC<JokeBubbleProps> = ({ jokes, refreshJokes }) => {



    const user = useAuth();

    const [activeJokeId, setActiveJokeId] = useState<number | null>(null);
    const [ratingInput, setRatingInput] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [personallRattings, setPersonallRatings] = useState<JokeRatingForUser[]>([]);



    //variables for confirmation modal
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedJokeId, setSelectedJokeId] = useState<number | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");

    useEffect(() => {
        fetch(`http://localhost:65451/api/UsersJokes`, {
            method: "GET",
            headers: {'Accept': 'application/json'},
            credentials: 'include',
        })
            .then(res => {
                if (res.ok){
                    //setLoading(false);
                    return res.json();
                }
            })
            .then((resalt: JokeRatingForUser[]) =>{
                setPersonallRatings(resalt);
            })
    }, []);

    console.log(personallRattings);

    const filteredJokes = [...jokes]
        .filter((joke) =>
            joke.authorName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy.toLowerCase()) {
                case "desc":
                    return parseFloat(b.rating) - parseFloat(a.rating);
                case "asc":
                    return parseFloat(a.rating) - parseFloat(b.rating);
                default:
                    return 0;
            }
        });



    const toggleForm = (id: number) => {
        setActiveJokeId(activeJokeId === id ? null : id);
        setRatingInput("");
    };


    const updateRating = (e: React.FormEvent, jokeId: number) => {
        e.preventDefault();


        const jokeToUpdate = {
            jokeId: jokeId,
            rating: parseInt(ratingInput),
        }
        console.log(jokeToUpdate);

        fetch(`http://localhost:65451/api/UsersJokes`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jokeToUpdate)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Rating aktualizován");
                    setActiveJokeId(null);
                    toast.success("Rating was successfully changed");
                    refreshJokes();
                } else {
                    console.log(response);
                    console.error("There was an error while rating this joke");
                    toast.error("There was an error while rating this joke");
                }
            })
            .catch(err => console.error(err));
    };


    const onDelete = async (id: number) => {

        setMessage(null);
        setError(null);

        try {
            const res = await fetch(`http://localhost:65451/api/Jokes/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setMessage("Joke was deleted successfully.");
                refreshJokes();
                toast.success("Your joke was successfully deleted!");
            } else {
                const text = await res.text();
                setError(text || "Unable to delete the joke.");
                toast.error("there was en error while deleting the joke.");
            }
        } catch {
            setError("Network error occurred while deleting.");
        }
    }

    const confirmDelete = async () => {
        if (!selectedJokeId) return;

        await onDelete(selectedJokeId);
        setIsConfirmOpen(false);
        setSelectedJokeId(null);
    };

    if (user.user?.isAuthenticated === true) {
        return (
            <>
            {isConfirmOpen && (
                <ConfirmModal
                    message="Do you really want to delete this joke?"
                    onConfirm={confirmDelete}
                    onCancel={() => setIsConfirmOpen(false)}
                />
            )}
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

                <input type="text" placeholder="Serch for author..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="none">Default order</option>
                    <option value="desc">Best rating (10 - 1)</option>
                    <option value="asc">Worst rating (1 - 10)</option>
                </select>

                {filteredJokes.map((Joke) =>(
                    <div className="bubbleBox" key={Joke.jokeId}>
                        <div className="userInfoBox">
                            <img src={usr_icon} alt=""/>
                            <p>{Joke.authorName}</p>
                        </div>
                        <p>{Joke.jokeContent}</p>
                        <div className="ourFlex">
                            <div className="jokeInfoBox">
                                <p id="rating" onClick={() => toggleForm(Joke.jokeId)}>Rating: {Joke.rating}/10</p>
                                <p className="info_notif">click on 'Rating' to change your personal rating. Your personal rating will effect its average</p>
                            </div>
                            <div className={activeJokeId === Joke.jokeId ? "hid active" : "hid"}>
                                <form className="ourFlex" onSubmit={(e) => updateRating(e, Joke.jokeId)}>
                                    <input min="1" max="10" id="ratingChange" value={ratingInput} onChange={(e) => setRatingInput(e.target.value)} type="number"></input>
                                    <button type="submit" id="submitRate">Change your Personal rating</button>
                                </form>
                            </div>
                        </div>
                        <div className="lower-flex">
                            {user.user?.userName === Joke.authorName?
                            <button className="delete_btn" onClick={() => {
                                setSelectedJokeId(Joke.jokeId)
                                setIsConfirmOpen(true);
                            }}>Delete joke</button>:<></>}

                            <div className="see-comments-box">
                                    <Link to={`/jokes/${Joke.jokeId}`} className="comment-link">See all comments</Link>
                            </div>
                        </div>
                        <div>
                            <div>
                                {personallRattings.map((r) => (
                                    r.jokeId === Joke.jokeId ? <span>{r.rating}</span> : <span>XDDDDDDDDDDD</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </>
        )
    }
    else {
        return (
            <>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

                <input type="text" placeholder="Serch for author..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="none">Default order</option>
                    <option value="desc">Best rating (10 - 1)</option>
                    <option value="asc">Worst rating (1 - 10)</option>
                </select>

                {filteredJokes.map((Joke) =>(
                    <div className="bubbleBox" key={Joke.jokeId}>

                        <div className="userInfoBox">
                            <img src={usr_icon} alt=""/>
                            <p>{Joke.authorName}</p>
                        </div>
                        <p>{Joke.jokeContent}</p>
                        <div className="ourFlex">
                            <div className="jokeInfoBox">
                                <p id="rating" onClick={() => toggleForm(Joke.jokeId)} style={{cursor: "default"}}>Rating: {Joke.rating}/10</p>
                                <p className="info_notif">Login to change rating</p>
                            </div>
                        </div>

                        <div className="see-comments-box">
                                <Link to={`/jokes/${Joke.jokeId}`} className="comment-link">See all comments</Link>
                        </div>
                    </div>
                ))}
            </>
        )
    }

}
export default JokeBuble;
