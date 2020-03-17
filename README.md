# Range

## Usage

In the terminal:
```

% npm install @lost-types/range

```

Then in the module:
```

import Range from '@lost-types/range';

const range = new Range(-1, 1, 0.01);

```

## Story behind Range

Range class is somewhat influenced by the function of the same name from Python. The important difference is that both start and end arguments *are inclusive*!
```

const range = new Range(1, 2);
range.toArray(); // [1, 2]

```
There is no particular reason behind it, I just wanted to humanize behavior.