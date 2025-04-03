export default function datacompo({count, onClick}) {

      return(
        <button onClick={onClick}>누른 횟수 : {count}</button>
      )
  
  }