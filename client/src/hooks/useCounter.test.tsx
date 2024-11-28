import { describe, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCounter } from './useCounter.tsx';

describe('useCounter', () => {
  it('should return a default value', () => {
    const initialValue = 0;
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.value).toBe(initialValue);
  });

  it('should increment the initial value once', () => {
    const initialValue = 1;
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.value).toBe(initialValue);

    act(() => result.current.increment());

    expect(result.current.value).toEqual(2);
  });
});
