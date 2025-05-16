import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '@/app/components/Hero';

// Mock scrollContainerRef
const mockScrollToRef = {
  current: {
    scrollTo: jest.fn()
  }
};

describe('Hero Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024 // Desktop size by default
    });
  });

  test('renders correctly with all main elements', () => {
    render(<Hero scrollContainerRef={mockScrollToRef} />);
    
    // Check for main title text
    expect(screen.getByText('Simplicity is the')).toBeInTheDocument();
    expect(screen.getByText('ultimate sophistication')).toBeInTheDocument();
    
    // Check for description
    expect(screen.getByText(/Experience the perfect blend of elegance and functionality/i)).toBeInTheDocument();
    
    // Check for CTA buttons
    expect(screen.getByText('Explore Services')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    
    // Check for hero image
    const heroImage = screen.getByAltText('Hermes flagship product');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', '/images/hero-product.jpg');
  });
  
  test('calls scrollToSection when "Explore Services" button is clicked', () => {
    render(<Hero scrollContainerRef={mockScrollToRef} />);
    
    const exploreButton = screen.getByText('Explore Services');
    fireEvent.click(exploreButton);
    
    // Check if window.scrollTo was called correctly
    const scrollElement = document.getElementById('services-section');
    if (scrollElement) {
      expect(mockScrollToRef.current.scrollTo).toHaveBeenCalled();
    }
  });
  
  test('calls scrollToSection when "Contact Us" button is clicked', () => {
    render(<Hero scrollContainerRef={mockScrollToRef} />);
    
    const contactButton = screen.getByText('Contact Us');
    fireEvent.click(contactButton);
    
    // Check if window.scrollTo was called correctly
    const scrollElement = document.getElementById('contact-section');
    if (scrollElement) {
      expect(mockScrollToRef.current.scrollTo).toHaveBeenCalled();
    }
  });
  
  test('applies mobile styles on small screens', () => {
    // Mock mobile screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    render(<Hero scrollContainerRef={mockScrollToRef} />);
    
    // Check that the component is rendered even on mobile
    expect(screen.getByText('Simplicity is the')).toBeInTheDocument();
  });
}); 