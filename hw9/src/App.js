import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
//import { isButtonElement } from 'react-router-dom/dist/dom'
import {auth} from './initialize'
function App() {
  const googleProvider = new GoogleAuthProvider()
  const GoogleLogin = async () => {
    try{
      const result = await signInWithPopup(auth, googleProvider)
      console.log(result.user)
    } catch(error){
      console.log(error)
    }
  }
  return (
  <div>
    <button onClick={GoogleLogin}></button> 
    <div>Home</div>
  </div>
  );
}

export default App;
