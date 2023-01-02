/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Circle } from 'rc-progress';

function Spinner({ timer, loadData, setLoading }) {
  const [percent, setPercent] = useState(0);
  const [innerPercent, setInnerPercent] = useState(102);

  const changeIncrease = () => {
    if (percent <= 98) {
      setTimeout(() => {
        setPercent((prevState) => prevState + 1);
      }, timer);
    }
  };

  useEffect(() => {
    if (percent === 99 && loadData) {
      setTimeout(() => {
        setPercent((prevState) => prevState + 1);
      }, 200);
    }
  }, [percent, loadData]);

  useEffect(() => {
    if (percent === 100 && loadData) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [percent, loadData]);

  const changeDecrease = () => {
    if (innerPercent >= -3) {
      setTimeout(() => {
        setInnerPercent((prevState) => prevState - 1);
      }, timer);
    }
  };

  useEffect(() => {
    changeIncrease();
  }, [percent]);

  useEffect(() => {
    changeDecrease();
  }, [innerPercent]);

  return (
    <div className="spinner_container">
      <div className="spinner_wrapper">
        <Circle
          className="spinner"
          trailColor="#000"
          trailWidth={7}
          percent={percent}
          strokeWidth={7}
          strokeColor="#fff"
        />
        <div className="spinner_inner_container">
          <Circle
            className={`spinner_inner ${percent >= 100 && 'inner_path_completed'}`}
            trailColor="#fff"
            trailWidth={2}
            percent={innerPercent}
            strokeWidth={3}
            strokeColor="#000"
          />
          <div className="spinner_percent">{`${percent}%`}</div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
