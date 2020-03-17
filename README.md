# Range

## Usage

In the terminal:
```

% npm install @lost-types/range

```

Then in the module:
```
// JavaScript modules
import Range from '@lost-types/range';

// CommonJS
const Range = require('@lost-types/range');

const range = new Range(-1, 1, 0.01);

```

## Story behind Range

Range class is somewhat influenced by the function of the same name from Python. The important difference is that both start and end arguments **are inclusive**!
```

const range = new Range(1, 2);
range.toArray(); // [1, 2]

```
There is no particular reason behind it, I just wanted to humanize behavior.
Why do we need Range type? If you think deeply enough you will realize that we use ranges all the time. All the types and libraries from @lost-types series are exlusively created for my personal usage, Range in particular I've created as a helper type for another type in @lost-types series - Color, here are some usage examples:
```

const hueRange = new Range(359);
const percentRange = new Range(0, 1, 0.0001);

// Ensure hue value is always  in [0 ... 359] range
// (This is default browser behavior)
const hue = -45;
hueRange.mod(hue); // 315

// Ensure percentage value is clamped in [0 ... 1] range
const percentage = 1.25;
percentRange.clamp(percentage); // 1

```

Another useful case is just to generate array of numbers with provided step:
```

[...new Range(9)]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[...new Range(3, -1)]; // [3, 2, 1, 0, -1]
[...new Range(1, -1, 0.25)]; // [1, 0.75, 0.5, 0.25, 0, -0.25, -0.5, -0.75, -1]

```
More examples below in the API

## API