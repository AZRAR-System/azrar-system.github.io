# مسودة حملة Google Search — AZRAR (لم تُشغَّل) | Google Search campaign draft (NOT launched)

> **الحالة | Status:** مسودة فقط. لا حملة، لا وسيلة دفع، لا إنفاق قبل موافقتك على الميزانية والاستهداف.
> Draft only. No campaign, no payment method, no spend before you approve budget and targeting.

## 1. الإعداد | Setup
| البند | القيمة المقترحة (قابلة للتغيير) |
|---|---|
| النوع | Search فقط (بدون Display وبدون Search Partners في البداية). **لا App campaigns**: التطبيق Windows. |
| السوق الافتراضي | الأردن (لا توجد بيانات Search Console متاحة لتغييره). Default: Jordan, changeable. |
| اللغة | العربية أولاً، الإنجليزية مجموعة إعلانية منفصلة. |
| الميزانية | **بانتظار قرارك.** لا رقم مقترح. / Awaiting your decision. |
| التحويل الرئيسي | `store_click` (نقرة، وليست تثبيتاً). الثانوي: `trial_lead`, `whatsapp_click`. |
| استهداف | الموقع الفعلي أو المهتمون بالموقع (Presence)؛ جدول: أيام العمل. |

## 2. الكلمات | Keywords (مطابقة عبارة/تامة، لا واسعة)
**عربي:** `"برنامج إدارة عقارات"`, `"برنامج إدارة الإيجارات"`, `"برنامج تحصيل الأقساط"`, `"برنامج عقود إيجار"`, `"كشف حساب المالك برنامج"`, `[برنامج مكتب عقاري]`, `"برنامج عمولات الوسطاء العقاريين"`, `"بديل اكسل لإدارة العقارات"`.
**English:** `"property management software jordan"`, `"real estate management software arabic"`, `"rental management software windows"`, `"rent collection software"`.

**استبعادات | Negatives:** مجاني، تحميل مجاناً، كراك، crack، free download، مفتاح، pdf، pptx، وظائف، وظيفة، دورة، شرح، مجانا، android، اندرويد، iphone، web/سحابي (إن لم يُرد)، "للبيع" (عقار)، شقق، أراضي، ايجار شقة، "مكتب للايجار".

## 3. نصوص الإعلانات العربية | Arabic RSA assets
العناوين (≤30 حرفاً): `برنامج إدارة العقارات` · `إدارة الإيجارات والأقساط` · `كشف حساب المالك بنقرة` · `عقود وتحصيل وعمولات` · `جرّب 30 يوماً دون بطاقة` · `واجهة عربية وإنجليزية` · `حمّل من Microsoft Store` · `لمكاتب الأردن والخليج`
الأوصاف (≤90 حرفاً): 
- `إدارة العقود والأقساط والعمولات وحسابات الملاك في تطبيق Windows واحد.` 
- `تجربة مجانية 30 يوماً دون بطاقة. الاستمرار بعد التجربة يتطلب ترخيصاً.`
- `التفعيل يحتاج إنترنت، والبيانات محلية على جهازك.`

ممنوع: «يعمل بدون إنترنت»، «الأول/الأفضل»، أسعار غير مطابقة للموقع، أي تقييمات. / Forbidden: offline claims, superlatives, unverified prices or ratings.

## 4. صفحات الهبوط | Landing pages
| المجموعة | الصفحة |
|---|---|
| برنامج إدارة عقارات (الأردن) | `https://azrar-systems.com/real-estate-software-jordan.html` |
| الخليج | `https://azrar-systems.com/real-estate-software-gulf.html` |
| بديل إكسل | `https://azrar-systems.com/alternative-excel.html` |
| كشف حساب | `https://azrar-systems.com/tenant-statement.html` |
| عام | `https://azrar-systems.com/` |
(نسخ `-en.html` للمجموعة الإنجليزية.) كل صفحة فيها زر Microsoft Store كزر أساسي.

## 5. أهلية Merchant Center ومراجعات Google | Eligibility check
- **Merchant Center / Shopping:** مخصص لمنتجات مادية قابلة للشراء من الموقع؛ ترخيص برنامج يُطلب عبر واتساب، فالأهلية **غير مرجحة**. لا يُستخدم.
- **Google Customer Reviews:** يحتاج مسار إتمام طلب حقيقياً (رقم طلب وبريد العميل)؛ لا يوجد حالياً. مؤجل (انظر work-state `google-customer-reviews-integration`).
- Neither is a prerequisite for search optimisation.

## 6. قياس الحدود | Measurement limits
نقرة المتجر ≠ تثبيت؛ التثبيت الفعلي يظهر في Partner Center فقط. نقرة واتساب ≠ بيع. استيراد التحويلات إلى Google Ads يتطلب ربط GA4 وتفعيل `store_click` كحدث رئيسي (Key event) بعد موافقتك.
