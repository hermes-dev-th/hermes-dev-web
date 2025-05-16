// นำเข้า jest-dom testing Library
import '@testing-library/jest-dom';

// Mock สำหรับ Next.js
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock ของ window.matchMedia สำหรับทดสอบ Responsive Design
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // เวอร์ชันเก่า
    removeListener: jest.fn(), // เวอร์ชันเก่า
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock สำหรับ IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock สำหรับ window.scrollTo
window.scrollTo = jest.fn();

// ล้าง mocks หลังแต่ละการทดสอบ
afterEach(() => {
  jest.clearAllMocks();
}); 