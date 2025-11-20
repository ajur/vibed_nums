
import { BoardDefinition, Orientation } from '../types';

export const BOARDS: BoardDefinition[] = [
  {
    id: 'classic_cross',
    name: 'Classic Cross',
    description: 'A symmetrical 11x11 cross. Balanced gameplay with strategic voids in the corners.',
    layout: [
      "   XXXXX   ", // Row 0
      "   XXXXX   ", // Row 1
      "   XXXXX   ", // Row 2
      "XXXXXXXXXXX", // Row 3
      "XXXXXXXXXXX", // Row 4
      "XXXXX XXXXX", // Row 5 (Center)
      "XXXXXXXXXXX", // Row 6
      "XXXXXXXXXXX", // Row 7
      "   XXXXX   ", // Row 8
      "   XXXXX   ", // Row 9
      "   XXXXX   "  // Row 10
    ],
    startOptions: [
      { 
        orientation: Orientation.HORIZONTAL, 
        indices: [3,4,6,7]
      },
      { 
        orientation: Orientation.VERTICAL, 
        indices: [3,4,6,7]
      }
    ]
  },
  {
    id: 'hollow_box',
    name: 'The Hollow Box',
    description: 'A 9x9 grid featuring a massive 3x3 void in the center. Forces players to navigate the perilous edges.',
    layout: [
      "XXXXXXXXX", // 0
      "XXXXXXXXX", // 1
      "XXXXXXXXX", // 2
      "XXX   XXX", // 3
      "XXX   XXX", // 4
      "XXX   XXX", // 5
      "XXXXXXXXX", // 6
      "XXXXXXXXX", // 7
      "XXXXXXXXX"  // 8
    ],
    startOptions: [
      { 
        orientation: Orientation.HORIZONTAL, 
        indices: [0, 1, 2] 
      },
      { 
        orientation: Orientation.VERTICAL, 
        indices: [0, 1, 2] 
      }
    ]
  },
  {
    id: 'the_arena',
    name: 'The Arena',
    description: 'A compact 7x7 square. Fast-paced and brutal.',
    layout: [
      "XXXXXXX",
      "XXXXXXX",
      "XXXXXXX",
      "XXXXXXX",
      "XXXXXXX",
      "XXXXXXX",
      "XXXXXXX"
    ],
    startOptions: [
      { 
        orientation: Orientation.HORIZONTAL, 
        indices: [3] 
      },
      { 
        orientation: Orientation.VERTICAL, 
        indices: [3] 
      }
    ]
  },
  {
    id: 'hourglass',
    name: 'The Hourglass',
    description: 'Time is running out. A converging layout that funnels players into a choke point in the center.',
    layout: [
      "XXXXXXXXXXX",
      "XXXXXXXXXXX",
      " XXXXXXXXX ",
      "  XXXXXXX  ",
      "   XXXXX   ",
      "    XXX    ",
      "   XXXXX   ",
      "  XXXXXXX  ",
      " XXXXXXXXX ",
      "XXXXXXXXXXX",
      "XXXXXXXXXXX"
    ],
    startOptions: [
        { orientation: Orientation.HORIZONTAL, indices: [0, 10] },
        { orientation: Orientation.VERTICAL, indices: [5] }
    ]
  },
  {
    id: 'the_stairs',
    name: 'The Stairs',
    description: 'A jagged ascent. The board opens up towards the bottom-right, leaving the top-left exposed.',
    layout: [
      "       XX",
      "      XXX",
      "     XXXX",
      "    XXXXX",
      "   XXXXXX",
      "  XXXXXXX",
      " XXXXXXXX",
      "XXXXXXXXX",
      "XXXXXXXXX"
    ],
    startOptions: [
        { orientation: Orientation.HORIZONTAL, indices: [8] },
        { orientation: Orientation.VERTICAL, indices: [8] }
    ]
  }
];
