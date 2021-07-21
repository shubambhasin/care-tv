import React, { useEffect } from "react";

const Extra = () => {
  useEffect(() => {
    const notes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const notes2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newArr = notes.concat(notes2);

    const newArrr = notes.map((n) => n + 1);
    console.log(newArrr);
    const filterArr = newArrr.filter((n) => n % 2 == 0);
    const sortedArr = newArrr.sort((a, b) => a - b);
    });

    

    
    
    return (
        <div>
      <h1>Extra</h1>
            </div>
  );
};

export default Extra;
