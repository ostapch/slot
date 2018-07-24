import { schema } from 'normalizr';
import { flatten } from '../utils';

export const cell = new schema.Entity('cell', {}, {
  idAttribute: value => `${value.row}-${value.reel}`,
  processStrategy: (value, parent) => ({
    ...value,
    lineId: parent.id,
  }),
  mergeStrategy: (cellA, cellB) => ({
    ...cellA,
    ...cellB,
    lineId: flatten([cellA.lineId, cellB.lineId]),
  })
});

export const line = new schema.Entity(
  'line',
  { cells: new schema.Array(cell) }
);

export const configuration = new schema.Object({ lines: new schema.Array(line) });

export const lineResult = new schema.Entity('lineResult', {}, {
  idAttribute: 'lineId',
  processStrategy: value => value.win ? value.lineId : null,
});

export const slotState = new schema.Object({ lineResults: new schema.Array(lineResult) })
