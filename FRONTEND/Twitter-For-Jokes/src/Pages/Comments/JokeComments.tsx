import "./JokeComments.css"
import {useState, useEffect} from "react";



interface Comment {
    commentId: number;
    usrId: number;
    jokeId: number;
    commentContent: string;
}


export async function getComments() {

    const res = await fetch("http://localhost:65451/api/comments");

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const data = await res.json();
    return data as Comment[];


}
export default getComments;