import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const SliderTrack = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex: 1;
  border-radius: 2px;
  height: 4px;
  margin: 0 8px;
  background: #cccccc;
`;

const SliderBar = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 2px;
  background-color: #0a8cfa;
`;

const SliderThumb = styled.div`
  position: absolute;
  cursor: pointer;
  transform: translate(-8px, -6px);
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: red;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
`;

const CustomSlider = ({ min, max }: { min: number; max: number }) => {
  const [trackState, setTrackState] = useState({
    startX: 0,
    endX: 0,
    pivotPercentage: 0,
    pivotValue: 0,
    topSide: true
  });
  const [fromValue, setFromValue] = useState<number>(0);
  const [toValue, setToValue] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  useEffect(() => {
    setFromValue(min);
  }, [min]);

  useEffect(() => {
    setToValue(max);
  }, [max]);

  const fromThumbEl = useRef(null);
  const toThumbEl = useRef(null);

  const getOtherThumbEl = (target: HTMLDivElement): HTMLDivElement => {
    if (toThumbEl.current === null || fromThumbEl.current === null) return target;
    if (target !== toThumbEl.current) return toThumbEl.current;
    return fromThumbEl.current;
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    
    if (toThumbEl === null || fromThumbEl === null || target === null) return;    
    const trackSelector = document.querySelector('#track');
    if (trackSelector === null) return;
    const { width, left } = trackSelector.getBoundingClientRect();
    const { left: startThumbLeft } = target.getBoundingClientRect();
    const startPercentage = getXPercentage(startThumbLeft + 8);
    const otherThumb = getOtherThumbEl(target);
    console.log(target, otherThumb);
    
    const pivot =
    otherThumb !== e.target ? getXPercentage(otherThumb.getBoundingClientRect().left + 8) : 0;
    const topSide = startPercentage >= pivot;    
    setTrackState({
      startX: left,
      endX: width + left,
      topSide,
      pivotValue: setValue(topSide),
      pivotPercentage: pivot
    });
    
    setDragging(true);
  };

  const getXPercentage = (x: number) => {
    const { startX, endX } = trackState;    
    const value = (100 * (x - startX)) / (endX - startX)
    return Math.min(Math.max(value,0), 100);
  };

  const onMove = (e: MouseEvent) => {    
    if (!dragging) return;    
    const xMouseEventValue = e.x ?? e.clientX ?? 0;
    const percent = getXPercentage(xMouseEventValue);
    const value = getValueFromPercentage(percent);
    const topSide = percent >= trackState.pivotPercentage;
    const to = topSide ? value : trackState.pivotValue;
    const from = !topSide ? value : trackState.pivotValue;
    setToValue(to);
    setFromValue(from);
  };

  const getValueFromPercentage = (percent: number) => {
    const value = Math.abs(max - min) * (percent / 100) + min;
    return Math.min(Math.max(value, min), max);
  };

  const onMoveEnd = () => {
    setDragging(false);
  };

  useEffect(() => {    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onMoveEnd);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onMoveEnd);
    };
  }, [dragging]);

  const setValue = (isFrom: boolean) => {
    return Math.min(Math.max((isFrom ? fromValue:toValue) ?? min, min), max);
  }

  // const getFromValue = () => {    
  // };

  // const getToValue = () => {    
  //   return Math.min(Math.max(toValue ?? min, min), max);
  // };

  const getBarPercentage = (value: number) => {
    return (100 * (value - min)) / Math.abs(max - min);
  };

  return (
    <SliderTrack id="track">
      <SliderBar
        style={{
          right: `${100- getBarPercentage(setValue(false))}%`,
          left: `${getBarPercentage(setValue(true))}%`
        }}
      ></SliderBar>
      <SliderThumb
        ref={toThumbEl}
        style={{ left: `${getBarPercentage(setValue(false))}%` }}
        onMouseDown={startDrag}
      />
      <SliderThumb
        ref={fromThumbEl}
        style={{ left: `${getBarPercentage(setValue(true))}%` }}
        onMouseDown={startDrag}
      />
    </SliderTrack>
  );
};

export default CustomSlider;
