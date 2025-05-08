
import '@testing-library/jest-dom';

// Import Jest globals directly 
import { describe, it, expect } from '@jest/globals';

// Make the imported functions available to the global scope
// without redeclaring them as variables
Object.assign(global, { describe, it, expect });

// This approach avoids the TypeScript redeclaration errors
// by modifying the global object directly, rather than using
// the 'declare global' syntax which was causing conflicts
