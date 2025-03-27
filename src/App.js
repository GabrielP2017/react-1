import MyB from './Mybutton';
import { Button,Button2 } from './ButtonLib'; // named export로써 필요한것만 빼온다.
import AP from './AboutPage';

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
    <div>
      <h1>hello React</h1>
      <MyB/><br/>
      <Button/>
      <Button2/>
      <AP/>
    </div>
  )

}

