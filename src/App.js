import MyB from './Mybutton';
import { Button,Button2 } from './ButtonLib'; // named export로써 필요한것만 빼온다.
import AP from './AboutPage';
import Pf from './Profile';
import './App.css';
import SL from "./ShoppingList"

/**
function Mybutton() {
    return(
      <button>Button</button>
    )
  
  }
 */
export default function App() {
      
  return(
    //하나로 감싸주지 않으면 에러남.
    <div className="App"> 
      <h1>hello React</h1>
      <MyB/><br/>
      <Button/>
      <Button2/>
      <AP/>
      <Pf/>
      <SL/>

    </div>
  )

}

