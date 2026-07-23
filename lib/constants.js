export const DEFAULT_CATEGORIES = ['أساور', 'خواتم', 'أطقم', 'سلاسل'];

export const SEED_PRODUCTS = [
  { id: 'p1', name: 'سوار لؤلؤ كلاسيك', price: 250, category: 'أساور', stock: 8, image: '', description: 'سوار أنيق بلمسة لؤلؤ، مناسب للسهرات والإطلالة اليومية. مطلي ضد الاسوداد.' },
  { id: 'p2', name: 'سوار سلسلة ذهبي', price: 180, category: 'أساور', stock: 0, image: '', description: 'سوار سلسلة رفيع بلمعة ذهبية، خفيف ومريح للاستخدام اليومي.' },
  { id: 'p3', name: 'طقم أساور مينيمال (3 قطع)', price: 320, category: 'أطقم', stock: 5, image: '', description: 'ثلاث أساور رفيعة تلبس مع بعض، تصميم بسيط وعصري.' },
  { id: 'p4', name: 'خاتم ورد فضي', price: 140, category: 'خواتم', stock: 12, image: '', description: 'خاتم بتصميم وردة صغيرة، مطلي فضة، مقاس قابل للتعديل.' },
  { id: 'p5', name: 'سلسلة رقبة دقيقة', price: 210, category: 'سلاسل', stock: 9, image: '', description: 'سلسلة رفيعة للرقبة، تلبس لوحدها أو مع قلادة صغيرة.' },
];

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201041921899';
export const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || '1234';
export const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY || '';
