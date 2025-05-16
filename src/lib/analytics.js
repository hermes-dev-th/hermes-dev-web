import { onCLS, onFID, onLCP, onTTFB, onINP } from 'web-vitals';

// Function สำหรับส่งข้อมูล metrics ไปยัง analytics endpoint
const sendToAnalytics = (metric) => {
  const body = JSON.stringify(metric);
  const url = '/api/analytics'; // เปลี่ยนเป็น URL จริงเมื่อมีการใช้งานจริง

  // Use Navigator.sendBeacon() if available
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    // Fallback to fetch
    fetch(url, {
      body,
      method: 'POST',
      keepalive: true,
    }).catch((error) => {
      console.error('Error sending web-vitals data:', error);
    });
  }
};

// Export function เพื่อใช้เรียกจาก app
export function reportWebVitals() {
  try {
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics);
    console.log('Web Vitals reporting initialized');
  } catch (err) {
    console.error('Failed to initialize web-vitals reporting:', err);
  }
} 