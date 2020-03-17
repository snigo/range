import Range from '../src/range';

test('correctly creates instance of Range class', () => {
  const centRange = new Range(1, 100);

  expect(centRange).toBeInstanceOf(Range);
  expect(centRange.from).toBe(1);
  expect(centRange.to).toBe(100);
  expect(centRange.step).toBe(1);
  expect(typeof centRange.clamp).toBe('function');
  expect(typeof centRange.forEach).toBe('function');
  expect(typeof centRange.forEachReverse).toBe('function');
  expect(typeof centRange.getFraction).toBe('function');
  expect(typeof centRange.fromFraction).toBe('function');
  expect(typeof centRange.toArray).toBe('function');
  expect(typeof centRange.mod).toBe('function');
  expect(typeof centRange.slice).toBe('function');
  expect(typeof Range.from).toBe('function');
});

test('length and step properties', () => {
  const rangeWithDefaultStep = new Range(9);
  expect(rangeWithDefaultStep.step).toBe(1);
  expect(rangeWithDefaultStep.length).toBe(10);

  const rangeWithCustomStep = new Range(0, 9, 0.5);
  expect(rangeWithCustomStep.step).toBe(0.5);
  expect(rangeWithCustomStep.length).toBe(20);
});

test('min, max and center properties', () => {
  const range = new Range(3, -7);
  expect(range.min).toBe(-7);
  expect(range.max).toBe(3);
  expect(range.center).toBe(-2);
});

test('conversion to the array and back', () => {
  const range = new Range(5);
  expect([...range]).toEqual([0, 1, 2, 3, 4, 5]);
  expect(range.toArray()).toEqual([0, 1, 2, 3, 4, 5]);

  const arr = [7, 6, 5, 42, 16, 9];
  const rangeFromArray = Range.from(arr);
  expect(rangeFromArray.from).toBe(5);
  expect(rangeFromArray.to).toBe(42);
});
