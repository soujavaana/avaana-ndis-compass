import '@testing-library/jest-dom';

// Mock console methods to reduce noise in tests
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

beforeEach(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
  console.log = jest.fn();
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
  console.log = originalLog;
});

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation((callback, options) => ({
  root: null,
  rootMargin: '0px',
  thresholds: [0],
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(() => []),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock fetch globally
global.fetch = jest.fn();

// Reset fetch mock before each test
beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
});
