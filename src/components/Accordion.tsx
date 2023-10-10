import React, {useState} from "react";
import './Accordion.module.css';

export const Ran =React.memo(()=>{
    let [a,setA]=useState(0)
    console.log('coslo')
   let f1 =()=>{
        return setA(a+1)
   }
    return <div className='error1'>
        нажми сюда --- <button onClick={f1}>+</button><span>{a}</span>
    </div>
})