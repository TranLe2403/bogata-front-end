import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SliderTrack = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex: 1;
  border-radius: 1px;
  height: 2px;
  margin: 0 8px;
  background: #c1c1c1;
`;

const SliderBar = styled.div`
  position: absolute;
  inset: 0;
  background-color: #000000;
`;

const SliderThumb = styled.div`
  position: absolute;
  cursor: pointer;
  transform: translate(-8px, -6px);
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #000000;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
`;

const ValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16px;
  min-width: 32px;
`;

const CustomSlider = ({ min, max }: { min: number; max: number }) => {
  const [fromValue, setFromValue] = useState<number>(0);
  const [toValue, setToValue] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [trackState, setTrackState] = useState({
    startX: 0,
    endX: 0,
    pivotPercentage: 0,
    pivotValue: 0
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
  const trackEl = useRef(null);

  const getOtherThumbEl = (target: HTMLDivElement): HTMLDivElement => {
    if (toThumbEl.current === null || fromThumbEl.current === null) return target;
    if (target !== toThumbEl.current) return toThumbEl.current;
    return fromThumbEl.current;
  };

  const setStartAndEndValues = () => {
    if (trackEl.current === null) return;
    const { width, left } = (trackEl.current as HTMLDivElement).getBoundingClientRect();
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
    const { left: otherThumbLeft } = otherThumb.getBoundingClientRect();
    const pivot = otherThumb !== target ? getXPercentage(otherThumbLeft + 8) : 0;
    const topSide = startPercentage >= pivot;
    setTrackState({
      ...trackState,
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

  const renderValues = (value: number) => <ValueWrapper>{value.toFixed()}</ValueWrapper>;

  return (
    <SliderContainer>
      {renderValues(fromValue)}
      <SliderTrack id="track" ref={trackEl} onClick={onClickHandler}>
        <SliderBar
          style={{
            right: `${100 - getBarPercentage(setValue(false))}%`,
            left: `${getBarPercentage(setValue(true))}%`
          }}
        ></SliderBar>
        <SliderThumb
          data-testid="slider-selector"
          ref={toThumbEl}
          style={{ left: `${getBarPercentage(setValue(false))}%` }}
          onMouseDown={startDrag}
        />
        <SliderThumb
          data-testid="slider-selector"
          ref={fromThumbEl}
          style={{ left: `${getBarPercentage(setValue(true))}%` }}
          onMouseDown={startDrag}
        />
      </SliderTrack>
      {renderValues(toValue)}
    </SliderContainer>
  );
};

export default CustomSlider;
