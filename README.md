# متجر SIWAR — Next.js

متجر إلكتروني كامل لبراند إكسسوارات (أساور، خواتم، سلاسل، أطقم) مبني بـ Next.js، مع:

- واجهة متجر عربي/إنجليزي وقابلة للتبديل، وضع ليلي/نهاري
- سلة شراء وطلب دفع عند الاستلام (COD)
- زرار واتساب عائم
- فلاتر: قسم، سعر، ترتيب (الأحدث / الأكثر مبيعًا / السعر)
- لوحة تحكم على `/admin` (مش متلينكة من أي مكان في المتجر، ومحمية برقم سري)
- إدارة منتجات (إضافة/تعديل/حذف/رفع صور)، إدارة طلبات، إحصائيات
- تخزين البيانات على Supabase (مجاني بالكامل بدون كارت ائتمان)

## التشغيل محليًا

```bash
npm install
npm run dev
```

افتحي `http://localhost:3000` للمتجر، و `http://localhost:3000/admin` للوحة التحكم.

## الإعداد (خطوة لازمة قبل التشغيل الحقيقي)

1. انسخي ملف `.env.local.example` وسميه `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. اعملي مشروع مجاني على [supabase.com](https://supabase.com) (بدون كارت ائتمان أبدًا)، وفي **SQL Editor** شغّلي:
   ```sql
   create table siwar_data (
     key text primary key,
     value jsonb
   );
   alter table siwar_data enable row level security;
   create policy "public access" on siwar_data for all using (true) with check (true);
   ```
3. من **Project Settings → API** انسخي `Project URL` و `anon public key` وحطيهم في `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. (اختياري لرفع الصور) اعملي حساب مجاني على [api.imgbb.com](https://api.imgbb.com/) واخدي API key، وحطيه في:
   ```
   NEXT_PUBLIC_IMGBB_KEY=...
   ```
5. غيّري رقم الواتساب والرقم السري لو حبيتي:
   ```
   NEXT_PUBLIC_WHATSAPP_NUMBER=201041921899
   NEXT_PUBLIC_ADMIN_PIN=1234
   ```

بعد أي تعديل في `.env.local` لازم توقفي السيرفر (`Ctrl+C`) وتشغليه تاني (`npm run dev`).

## الدخول للوحة التحكم

- روحي على `/admin` مباشرة في المتصفح (الرابط ده متعمّدين إننا مش حاطينه في أي زرار أو مكان ظاهر للزوار)
- ادخلي الرقم السري اللي حطيتيه في `NEXT_PUBLIC_ADMIN_PIN` (أو غيريه بعدين من تبويب "الإعدادات" جوه اللوحة)

## النشر (مجانًا)

الطريقة الأسهل لمشروع Next.js هي **Vercel** (من نفس الشركة صاحبة Next.js، ومجانية بالكامل):

1. ارفعي المشروع على GitHub (repo جديد)
2. روحي على [vercel.com](https://vercel.com) وسجلي بحساب GitHub
3. دوسي **"Add New Project"** واختاري الريبو
4. في خطوة الإعداد، ضيفي نفس متغيرات `.env.local` (Environment Variables)
5. دوسي **Deploy** — هتاخدي رابط مجاني زي `siwar.vercel.app` خلال دقيقة، وتقدري بعدين تربطي دومين خاص لو حبيتي

## هيكل المشروع

```
app/            صفحات Next.js (App Router)
  page.js       واجهة المتجر
  layout.js     الـ Layout الرئيسي والـ Providers
  admin/
    page.js     صفحة لوحة التحكم (/admin)
components/     كل مكونات الواجهة (متجر + لوحة تحكم في components/admin)
lib/            الاتصال بـ Supabase، الترجمة، الحالة العامة، رفع الصور
styles/         globals.css
public/         ملفات ثابتة (robots.txt)
```

## ملاحظات مهمة

- حماية `/admin` هنا برقم سري بسيط، مش نظام تسجيل دخول احترافي (زي Auth كامل). كافي جدًا لبراند صغير أو متوسط، بس لو المشروع كبر واحتجتي حماية أقوى ممكن نضيف Supabase Auth بعدين.
- محتوى المنتجات (الاسم والوصف) بتكتبيه انتِ باللغة اللي تحبيها ومش بيتترجم أوتوماتيك؛ اللي بيتبدّل مع تبديل اللغة هو نصوص الواجهة نفسها (الأزرار، العناوين، الفورمات).
