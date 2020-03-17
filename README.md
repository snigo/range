# Range

## Usage

In the terminal:
```

% npm install @lost-types/range

```

Then in the module:
```js
// JavaScript modules
import Range from '@lost-types/range';

// CommonJS
const Range = require('@lost-types/range');

const range = new Range(-1, 1, 0.01);

```

## Story behind Range

Range class is somewhat influenced by the function of the same name from Python. The important difference is that both start and end arguments **are inclusive**!
```js

const range = new Range(1, 2);
range.toArray(); // [1, 2]

```
There is no particular reason behind it, I just wanted to humanize behavior.

Why do we need Range type? If you think deeply enough you will realize that we use ranges all the time. All the types and libraries from @lost-types series are exlusively created for my personal usage, Range in particular I've created as a helper type for another type in @lost-types series - Color, here are some usage examples:
```js

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
```js

[...new Range(9)]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[...new Range(3, -1)]; // [3, 2, 1, 0, -1]
[...new Range(1, -1, 0.25)]; // [1, 0.75, 0.5, 0.25, 0, -0.25, -0.5, -0.75, -1]

```
More examples below in the API section.

## API

### Constructor

Creates new Range instance.
Parameters:
| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `rangeStart`  | `number` |         0         | Defaults to zero if only one argument provided |
| `rangeEnd`    | `number` |                   | rangeEnd is inclusive in the range             |
| `step`        | `number` |         1         | Cannot be less or equal than 0                 |

```js

new Range(-1, 1, 0.01); // Range{ from: -1, to: 1, step: 0.01 }
new Range(-1, 1); // Range{ from: -1, to: 1, step: 1 }
new Range(100); // Range{ from: 0, to: 100, step: 1 }
new Range(); // Range{}

```

### Properties

* `Range.length`

Returns total number of numbers in the range, if range will be converted to the array
```js

const range = new Range(0, 100, 0.01);
range.length; // 10001

const array = [...range];
array.length; // 10001

```
It is useful to check the length prior to converting range into array:
```js

const range = new Range(Infinity);
range.length; // Infinity

[...range]; // Throws error: Cannot iterate through infinite range

```

* `Range.from`
* `Range.to`
* `Range.step`

Return initial values used to create the range:
```js

const range = new Range(0, 100, 0.01);
range.from; // 0
range.to; // 100
range.step; // 0.01

```

* `Range.max`
* `Range.min`
* `Range.center`

Return the number from the range with the greatest value, the least value and the center of the range
```js

const range = new Range(5, -5);
range.min; // -5
range.max; // 5
range.center; // 0

```

### Methods

* `Range.from()`

Static method on Range to generate range from array or any other iterable type. Returns new Range instance.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `iterable`    | `any`    |                   | Any iterable type, like Array, Set, String...  |

```js

const arr = [7, 6, 5, 42, 16, 9];
Range.from(arr); // Range{ from: 5, to: 42, step: 1 }

const str = '420';
// By no way I encourage you to do this! :)
Range.from(str); // Range{ from: 0, to: 4, step: 1 }

Range.from([]); // Range{}

```

* `Range.prototype.clamp()`

Similarly to [_.clamp()](https://lodash.com/docs/4.17.15#clamp), ensures resulting number is in the range. Returns clamped number.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `number`      | `number` |                   |                                                |

```js

const range = new Range(99);
range.clamp(100); // 99
range.clamp(-42); // 0
range.clamp(15); // 15
range.clamp(); // NaN

```

* `Range.prototype.forEach()`

Executes provided function on every element of the range with provided step. If no step provided initial this.step will be used. Similarly to forEach in `Array`, following arguments will be passed to the callback:
  * currentValue
  * index
  * range

Will try to account for precision errors between numbers in the range. Always returns `undefined`.

| **Parameter** | **Type**  | **Default value** | **Notes**                                      |
|---------------|-----------|-------------------|------------------------------------------------|
| `fn`          |`function` |                   | To be invoked as fn(number, index, range)      |
| `step`        |`number`   | Range.step        | forEach() can be invoked with custom step      |

```js

const range = new Range(-1, 1);
range.forEach((number) => {
  console.log(number);
}, 0.5);
// -1
// -0.5
// 0
// 0.5
// 1

```

* `Range.prototype.forEachReverse()`

Similarly to `Range.prototype.forEach()`, executes provided function on every element of the range with provided step in reversed manner. If no step provided initial this.step will be used. Similarly to forEach in `Array`, following arguments will be passed to the callback:
  * currentValue
  * index
  * range

Will try to account for precision errors between numbers in the range. Always returns `undefined`.

| **Parameter** | **Type**  | **Default value** | **Notes**                                        |
|---------------|-----------|-------------------|--------------------------------------------------|
| `fn`          |`function` |                   | To be invoked as fn(number, index, range)        |
| `step`        |`number`   | Range.step        | forEachReverse() can be invoked with custom step |

```js

const range = new Range(-1, 1);
range.forEachReverse((number) => {
  console.log(number);
}, 0.5);
// 1
// 0.5
// 0
// -0.5
// -1

```