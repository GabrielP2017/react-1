import MyB from './Mybutton';

export default function App() {
      
  return(
    //하나로 감싸주지 않으면 에러남.
    <div>
      <h1>hello React</h1>
      <MyB/>
    </div>
  )

}

