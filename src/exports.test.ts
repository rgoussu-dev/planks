import { describe, it, expect } from 'vitest';
import * as planks from './index';

// The README documents `import type { Box, Stack } from '@rgoussu.dev/planks'`.
// Star re-exports skip default exports, so each component index must re-export
// its class under a name for it to reach the package root — this guards that.
const expected = [
    'Box', 'Center', 'Cluster', 'Container', 'Cover', 'Frame', 'Grid', 'Icon',
    'Imposter', 'Reel', 'Sidebar', 'Stack', 'Switcher', 'Typography', 'LayoutElementPk',
] as const;

describe('package root exports', () => {
    it.each(expected)('exports %s', name => {
        expect(planks[name]).toBeTypeOf('function');
    });
});
