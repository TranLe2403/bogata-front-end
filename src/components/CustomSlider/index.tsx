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
  const [fromValue, setFromValue] = useState<number>(0);
  const [toValue, setToValue] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [trackState, setTrackState] = useState({
    startX: 0,
    endX: 0,
    pivotPercentage: 0,
    pivotValue: 0,
    topSide: true
  });

  useEffect(() => {
    setFromValue(min);
    setToValue(max);
    setStartAndEndValues();
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onMoveEnd);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onMoveEnd);
    };
  }, [dragging]);

  const fromThumbEl = useRef(null);
  const toThumbEl = useRef(null);

  const getOtherThumbEl = (target: HTMLDivElement): HTMLDivElement => {
    if (toThumbEl.current === null || fromThumbEl.current === null) return target;
    if (target !== toThumbEl.current) return toThumbEl.current;
    return fromThumbEl.current;
  };

  const setStartAndEndValues = () => {
    const trackSelector = document.querySelector('#track');
    if (trackSelector === null) return;
    const { width, left } = trackSelector.getBoundingClientRect();
    setTrackState({ ...trackState, startX: left, endX: width + left });
  };

  const valueBetweenMinMax = (value: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    if (toThumbEl === null || fromThumbEl === null || target === null) return;

    setStartAndEndValues();

    const { left: startThumbLeft } = target.getBoundingClientRect();
    const startPercentage = getXPercentage(startThumbLeft + 8);
    const otherThumb = getOtherThumbEl(target);
    const pivot =
      otherThumb !== e.target ? getXPercentage(otherThumb.getBoundingClientRect().left + 8) : 0;
    const topSide = startPercentage >= pivot;
    setTrackState({
      ...trackState,
      topSide,
      pivotValue: setValue(topSide),
      pivotPercentage: pivot
    });

    setDragging(true);
  };

  const getXPercentage = (x: number) => {
    const { startX, endX } = trackState;
    const value = (100 * (x - startX)) / (endX - startX);
    return valueBetweenMinMax(value);
  };

  const onMove = (e: MouseEvent) => {
    if (!dragging) return;
    const xMouseEventValue = e.x ?? e.clientX ?? 0;
    const percent = getXPercentage(xMouseEventValue);
    const value = getValueFromPercentage(percent);
    const { pivotValue, pivotPercentage } = trackState;
    const topSide = percent >= pivotPercentage;
    setToValue(topSide ? value : pivotValue);
    setFromValue(topSide ? pivotValue : value);
  };

  const getValueFromPercentage = (percent: number) => {
    const value = Math.abs(max - min) * (percent / 100) + min;
    return valueBetweenMinMax(value);
  };

  const onMoveEnd = () => {
    setDragging(false);
  };

  const setValue = (isFrom: boolean) => {
    return valueBetweenMinMax((isFrom ? fromValue : toValue) ?? min);
  };

  const getBarPercentage = (value: number) => {
    return (100 * (value - min)) / Math.abs(max - min);
  };

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (dragging) return;
    setStartAndEndValues();
    const value = getValueFromPercentage(getXPercentage(e.clientX ?? 0));
    const topSide = Math.abs(value - toValue) <= Math.abs(value - fromValue);
    setToValue(topSide ? value : toValue);
    setFromValue(topSide ? fromValue : value);
  };

  return (
    <SliderTrack id="track" onClick={onClickHandler}>
      <SliderBar
        style={{
          right: `${100 - getBarPercentage(setValue(false))}%`,
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
