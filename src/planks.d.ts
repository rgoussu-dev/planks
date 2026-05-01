// Consolidated global lib type definitions for @rgoussu.dev/planks.
//
// Side-effect importing the package (`import '@rgoussu.dev/planks'`) registers
// every custom element and augments `HTMLElementTagNameMap` so that
// `document.createElement('box-pk')` and `document.querySelector('stack-pk')`
// return the proper component instance type.
//
// Per-component classes are also re-exported as named types from the package
// root for consumers that prefer explicit imports:
//
//   import type { Box, Stack } from '@rgoussu.dev/planks';

import type Box from './components/box/box';
import type Center from './components/center/center';
import type Cluster from './components/cluster/cluster';
import type Container from './components/container/container';
import type Cover from './components/cover/cover';
import type Frame from './components/frame/frame';
import type Grid from './components/grid/grid';
import type Icon from './components/icon/icon';
import type Imposter from './components/imposter/imposter';
import type Reel from './components/reel/reel';
import type Sidebar from './components/sidebar/sidebar';
import type Stack from './components/stack/stack';
import type Switcher from './components/switcher/switcher';
import type Typography from './components/typography/typography';

declare global {
    interface HTMLElementTagNameMap {
        'box-pk': Box;
        'center-pk': Center;
        'cluster-pk': Cluster;
        'container-pk': Container;
        'cover-pk': Cover;
        'frame-pk': Frame;
        'grid-pk': Grid;
        'icon-pk': Icon;
        'imposter-pk': Imposter;
        'reel-pk': Reel;
        'sidebar-pk': Sidebar;
        'stack-pk': Stack;
        'switcher-pk': Switcher;
        'typography-pk': Typography;
    }
}

export {};
