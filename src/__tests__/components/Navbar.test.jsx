import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/app/components/Navbar';

// Mock สำหรับ props ที่จำเป็น
const mockScrollToSection = jest.fn();
const mockProps = {
  activeSection: 'hero-section',
  scrollToSection: mockScrollToSection
};

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset mockScrollToSection ก่อนแต่ละการทดสอบ
    mockScrollToSection.mockReset();
    
    // Mock window.innerWidth เพื่อสลับระหว่าง desktop และ mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024 // เริ่มต้นด้วยขนาดหน้าจอ desktop
    });
  });

  test('renders correctly in desktop mode', () => {
    render(<Navbar {...mockProps} />);
    
    // ตรวจสอบว่า logo แสดงอยู่
    expect(screen.getByAltText('Hermes Logo')).toBeInTheDocument();
    
    // ตรวจสอบว่าปุ่มเมนูทั้งหมดแสดงอยู่
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // ตรวจสอบว่าปุ่ม Get in Touch แสดงอยู่
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    
    // ตรวจสอบว่าไม่มีปุ่มสำหรับเมนูมือถือแสดงอยู่
    expect(screen.queryByLabelText(/Open menu/i)).not.toBeInTheDocument();
  });
  
  test('renders correctly in mobile mode', () => {
    // เปลี่ยนขนาดหน้าจอเป็น mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 640
    });
    
    // จำลองเหตุการณ์ resize เพื่อให้ component รับทราบการเปลี่ยนแปลง
    window.dispatchEvent(new Event('resize'));
    
    render(<Navbar {...mockProps} />);
    
    // ตรวจสอบว่า logo แสดงอยู่
    expect(screen.getByAltText('Hermes Logo')).toBeInTheDocument();
    
    // ตรวจสอบว่าปุ่มเมนูมือถือแสดงอยู่
    expect(screen.getByLabelText(/Open menu/i)).toBeInTheDocument();
    
    // ตรวจสอบว่าไม่มีเมนูบน desktop แสดงอยู่
    const desktopMenuItems = screen.queryByText('Home');
    expect(desktopMenuItems).toBe(null);
  });
  
  test('toggles mobile menu when menu button is clicked', () => {
    // เปลี่ยนขนาดหน้าจอเป็น mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 640
    });
    
    // จำลองเหตุการณ์ resize
    window.dispatchEvent(new Event('resize'));
    
    render(<Navbar {...mockProps} />);
    
    // คลิกปุ่มเมนู
    const menuButton = screen.getByLabelText(/Open menu/i);
    fireEvent.click(menuButton);
    
    // ตรวจสอบว่าตอนนี้เมนูมือถือแสดงออกมาแล้ว
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // ตรวจสอบว่าปุ่มเปลี่ยนเป็น Close menu
    expect(screen.getByLabelText(/Close menu/i)).toBeInTheDocument();
  });
  
  test('calls scrollToSection when menu item is clicked', () => {
    render(<Navbar {...mockProps} />);
    
    // คลิกที่เมนู Services
    const servicesButton = screen.getByText('Services');
    fireEvent.click(servicesButton);
    
    // ตรวจสอบว่า mockScrollToSection ถูกเรียกด้วยค่าที่ถูกต้อง
    expect(mockScrollToSection).toHaveBeenCalledWith('services-section');
  });
  
  test('applies active styles to the current active section', () => {
    render(<Navbar {...mockProps} />);
    
    // ดึงเอลิเมนต์ของ active menu item
    const homeMenuItem = screen.getByText('Home').closest('button');
    
    // ตรวจสอบว่า มีคลาส text-black
    expect(homeMenuItem).toBeDefined();
    if (homeMenuItem) {
      expect(homeMenuItem.querySelector('span')).toHaveClass('text-black');
    }
    
    // ตรวจสอบว่าเมนูรายการอื่นไม่มีคลาส text-black
    const servicesMenuItem = screen.getByText('Services').closest('button');
    if (servicesMenuItem) {
      expect(servicesMenuItem.querySelector('span')).not.toHaveClass('text-black');
    }
  });
}); 