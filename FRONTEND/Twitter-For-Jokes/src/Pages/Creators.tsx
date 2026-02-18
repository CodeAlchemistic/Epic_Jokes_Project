import CreatorBubble from "../Modules/Creators/CreatorBubble.tsx";
import './creators.css'



function Creators() {

    return (
       <>
        <h1 id="creator-heading">Creators</h1>
       <div className="container">
           <CreatorBubble />
       </div>
       </>
    )
}

export default Creators;