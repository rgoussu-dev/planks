// @vitest-environment node
import { describe, it, expect } from 'vitest';

describe('server-side import', () => {
    it('importing the package without a DOM does not throw', async () => {
        expect(typeof window).toBe('undefined');
        const mod = await import('./index');
        expect(mod).toBeDefined();
    });
});
