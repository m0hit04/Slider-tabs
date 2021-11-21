import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let  slider = setInterval(()=>{
      setIndex(index+1);
    }, 3000);
    return ()=> clearInterval(slider);         //cleanup function: cleares all previous one
  }, [index]);


  useEffect(() => {
    const lastIndex = people.length-1;
    if(index<0){
      setIndex(lastIndex);
    }
    if(index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);      //it will only run when index or people array get changed

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((el, personIndex) => {
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (personIndex === index - 1 || (index===0 &&personIndex === people.length-1)) {
            position = "lastSlide";         //for backward sliding
          }
          return (
            <article className={position} key={personIndex}>
              <img className="person-img" src={el.image} alt={el.name} />
              <h4>{el.name}</h4>
              <p className="title">{el.title}</p>
              <p className="text">{el.quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={()=> setIndex(index-1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={()=> setIndex(index+1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
