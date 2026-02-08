import './../Feed/JokePostBubble.tsx'
import {useEffect, useState} from 'react'

export function convertStringFromInput(value: string) {
    const n = Number( value );
    return n;
}


export function getLoginStatus(){
    const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

        fetch('http://localhost:65451/api/Authentication/Ask',{
        method: 'GET',
        headers: {'content-type': 'application/json'},
        credentials: 'include',
    }).then(response => response.json())
    .then(json => setIsLoggedIn(json))


    return isLoggedIn;

}