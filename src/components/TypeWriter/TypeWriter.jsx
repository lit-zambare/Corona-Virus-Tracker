import React, { useState, useEffect } from "react";
import Typist from "react-typist";
import styles from './TypeWriter.module.css';

const TypeWriter = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return (
    <div>
      {count ? (
        <Typist className={styles.typist} avgTypingDelay={50} onTypingDone={() => setCount(0)}>
          <span>Covid-19 Live Tracker</span>
          <Typist.Backspace count={21} delay={800} />
          <span>Stay Home</span>
          <Typist.Backspace count={4} delay={800} />
          <span>Safe</span>
          <Typist.Backspace count={9} delay={800} />
          <span>Jaan Hai Toh Jahan Hai!</span>
          <Typist.Backspace count={23} delay={800} />
          <span></span>
        </Typist>
      ) : (
        ""
      )}
    </div>
  );
}

export default TypeWriter;
