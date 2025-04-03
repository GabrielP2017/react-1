import { useState } from "react";

export default function Mybutton() {
    /* return(
      <button>Button</button>
    ) */

      const [count, setCount] = useState(0);

      function handleClick(){
        //alert("sasdf");
        setCount(count + 1);
      }
    
      return(
        <button onClick={handleClick}>누른 횟수 : {count}</button>
        // {handleClick}에 소괄호가 없다. = 전달만 하면 되기 때문.
      )

      
  
  }