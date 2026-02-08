import './Footer.css'
import UselessText from "../Auxiliary/UslesText.tsx";




function Footer() {
    return (
       <>
          <footer>
              <p>Twitter-For-Jokes</p>
            <div>
                <ul>
                    <li>tel: +420 111 222 333</li>
                    <li>email: example@tfjokes.cz</li>
                    <li>headquarters: Prague, Prosek</li>
                </ul>
               <UselessText></UselessText>
            </div>
          </footer>

       </>

    )
}

export default Footer;