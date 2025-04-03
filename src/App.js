import MyB from './Mybutton';
import { Button,Button2 } from './ButtonLib'; // named export로써 필요한것만 빼온다.
import AP from './AboutPage';
import Pf from './Profile';
import Dc from './datasharecompo';
import SL from "./ShoppingList"
import './App.css';

import { useState } from 'react';


/**
function Mybutton() {
    return(
      <button>Button</button>
    )
  
  }
 */
export default function App() {
  const [count, setCount] = useState(0);
  
  function handleClick(){
    setCount(count + 1);
  }

  return(
    //하나로 감싸주지 않으면 에러남.
  <div className="warpper">
      <div > 
        <h1>hello React</h1>
        <MyB/><br/>
        <Button/>
        <Button2/>
        <AP/>
        <Pf/>
        <SL/>
      </div>

      <div>
        <h1>Counters that update separately</h1>
        <Dc count={count} onClick={handleClick}/>
        <Dc count={count} onClick={handleClick}/>
        <Dc count={count} onClick={handleClick}/>
      </div>
  </div>
   
  )

}

