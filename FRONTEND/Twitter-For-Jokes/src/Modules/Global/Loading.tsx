import loadingGif from "../../assets/LoadingGif.gif";
import "./Loading.css"


function Loading() {
    return (
        <div id="loading">
            <img id="loading-img" src={loadingGif} alt="loading..."/>
            <p id="loading-p">Loading..</p>
        </div>
    )
}

export default Loading;