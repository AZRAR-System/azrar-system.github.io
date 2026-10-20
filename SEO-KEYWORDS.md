# خريطة الكلمات المفتاحية العقارية / Real-Estate Keyword Map

تاريخ / Date: 2026-10-20 · النطاق / Scope: `azrar-systems.com` (AR + EN)

> **حدود هذا العمل / Limits.** لا توجد لديّ بيانات حجم بحث (Search Console بعد خط الأساس، أو Google Keyword Planner، أو أدوات مدفوعة). ما يلي مبني على فحص نتائج البحث العربية والإنجليزية الفعلية، وعلى محتوى الموقع نفسه. أولويات الكلمات **تقديرية** حتى تُقاس في Search Console.
> No search-volume data was available (no Keyword Planner / paid tool; the Perplexity MCP key was invalid, so web search was used). Priorities are **estimates** until measured in Search Console.

## 1. ما وجدناه في نتائج البحث / SERP findings

| الاستعلام / Query | ما يظهر / What ranks |
|---|---|
| برنامج إدارة العقارات والإيجارات للمكاتب العقارية | منصات العمل الحر (خمسات، مستقل)، مدونات عامة، تطبيق «المكتب لإدارة العقارات»، قوالب إكسل — **لا منتج تجاري واضح مسيطر** |
| برنامج ادارة املاك وتحصيل ايجارات | مشاريع مستقل/خمسات، مقالة قيود (محاسبة شركات الأملاك) — **منافسة ضعيفة، نية شراء واضحة** |
| نظام إدارة عقارات الأردن برنامج مكتب عقاري | تطبيقات سعودية، شركة خدمات إدارة أملاك في عمّان — **لا برنامج أردني ظاهر** |
| property management software Arabic Jordan Saudi | Capterra (Ajarat، **AZRAR**، AmlaKey)، مقالات سوق السعودية |

**الاستنتاج / Takeaway:** الفرصة قوية: الاستعلامات العربية ذات النية التجارية يغلبها محتوى مستقلين وقوالب إكسل لا منتجات. منافسون فعليون: Ajarat، AmlaKey، «بسيط العقاري»، Qoyod وDaftra (محاسبة عامة). AZRAR موجود أصلاً على Capterra.
Arabic commercial-intent queries are dominated by freelance listings and Excel templates, not products — a real opening. Actual competitors: Ajarat, AmlaKey, Bassit, plus general accounting tools (Qoyod, Daftra). AZRAR already has a Capterra listing.

## 2. عناقيد الكلمات والصفحات المستهدفة / Clusters → target pages

| العنقود / Cluster | كلمات عربية / Arabic terms | English terms | الصفحة / Page |
|---|---|---|---|
| **أساسي / Core** | برنامج إدارة العقارات، نظام إدارة العقارات، برنامج إدارة الأملاك، برنامج مكتب عقاري، برنامج إدارة الإيجارات | real estate management software, property management software Arabic, rental management software | `index.html` |
| **العقود والتحصيل / Leases & collection** | برنامج عقود إيجار، برنامج تحصيل الإيجارات، تذكير إيجار واتساب، غرامة تأخير الإيجار | rent collection software, lease management software, late rent fees | `article-rental-management`, `article-rent-collection`, `article-late-fees` |
| **المحاسبة / Accounting** | برنامج محاسبة عقارية، كشف حساب المالك العقاري | property owner statement, real estate accounting | `article-owner-statement` |
| **الوساطة / Brokerage** | حساب عمولة السمسار العقاري، عمولات الوسطاء | real estate broker commission | `article-commissions` |
| **الصيانة / Maintenance** | إدارة صيانة العقارات | property maintenance management | `article-maintenance` |
| **اختيار البرنامج / Buying intent** | كيف تختار برنامج إدارة العقارات، أزرار مقابل FalconPro | how to choose real estate software, AZRAR vs FalconPro | `article-choosing-software`, `compare-falconpro` |
| **التمايز / Differentiators** | بدون إنترنت، لويندوز، بيانات محلية، تجربة 30 يوماً | works offline, Windows, 30-day free trial | الرئيسية، الأسئلة الشائعة |
| **جغرافي / Geo** | … الأردن · السعودية · الإمارات · الكويت · قطر · مصر | Jordan · Saudi · UAE · Kuwait · Qatar · Egypt | الرئيسية (keywords + `countriesSupported`) |

## 3. ما نُفّذ في هذا الفرع / Done in this branch

- **عناوين ووصف 31 صفحة** أُعيدت صياغتها: الكلمة الأساسية في أول العنوان، الطول 46–66 حرفاً للعنوان و120–165 للوصف، وصف فريد لكل صفحة. أُصلح خطأ عربي في وصف مقال الصيانة («يودّي»).
  Titles/descriptions rewritten for 31 pages, keyword first, unique, sized for SERPs. A broken Arabic phrase in the maintenance article was fixed.
- **H1** لصفحات الأسئلة الشائعة وحالات الاستخدام والفيديو والدليل صارت تحمل عبارة «برنامج إدارة العقارات» (AR) و«Real Estate Software» (EN).
- **الرئيسية:** عنوان + وصف + `og:title` + مفاتيح موسّعة (مرادفات + 6 دول + عبارات إنجليزية)، وعنوان/وصف إنجليزي ديناميكي عند تبديل اللغة. `SoftwareApplication` في JSON-LD: `description`, `inLanguage`, `countriesSupported`, `featureList`, `keywords`.
- **BlogPosting JSON-LD** لثمانية مقالات كانت بلا مخطط مقال (التواريخ من أول commit لكل ملف، لا مُختلقة).
- **`sitemap.xml`:** `lastmod` للصفحات المعدّلة.
- لم يُلمس: صفحات قانونية، 404، توقيع البريد (ليست أهدافاً للبحث).

**ملاحظة صدق / Honesty note:** وسم `meta keywords` تتجاهله Google؛ أُبقي موسّعاً لأن Bing وبعض المحركات الأخرى قد تقرؤه، **وليس** هو الرافعة الأساسية. الرافعة هي العنوان والوصف والمحتوى والروابط الخارجية.
Google ignores `meta keywords`; it is kept for Bing/others only. The real levers are titles, descriptions, content and backlinks.

## 4. المرحلة التالية (تحتاج موافقتك) / Next phase (needs your approval)

محتوى جديد أعلى أثراً من أي وسم — كل صفحة نص أصلي مفيد، **لا** صفحات مدن/دول مكرّرة:

1. **«بديل إكسل لإدارة العقارات والإيجارات»** — يلتقط من يبحث عن «ملف إكسل إدارة العقارات والإيجارات» (ظهر في النتائج) ويقارن عملياً مع البرنامج.
2. **«محاسبة أملاك الغير: أمانات الملاك وعمولة الإدارة»** — فصل أموال الملاك عن إيراد المكتب (موضوع ظهر عند Qoyod؛ نغطيه من زاوية كشف حساب المالك الموجود في أزرار).
3. **«برنامج إدارة العقارات في الأردن»** و**«…في السعودية والخليج»** — صفحتان فقط، بمحتوى حقيقي (العملات، الأقساط، واتساب، لغة الواجهة) **دون ادعاء تكاملات غير موجودة** (مثل «إيجار» أو الفوترة الإلكترونية) إلا إن كانت موجودة فعلاً — أحتاج منك تأكيد الميزات.
4. **«كشف حساب المستأجر» و«سندات القبض والصرف العقارية»** — إن كانت الميزتان موجودتان في النظام.

**خارج الموقع / Off-site (أنت تنفّذها):** 1) Google Search Console: أرسل `sitemap.xml` وراقب الاستعلامات بعد أسبوعين وقارنها بخط الأساس (24 نقرة / 1.46K ظهور). 2) Bing Webmaster Tools. 3) اطلب مراجعات على Capterra (صفحة AZRAR موجودة). 4) ملف نشاط تجاري على Google (عمّان). 5) أدلّة برمجيات عربية وروابط من مواقع مكاتب عقارية شريكة.
**Off-site (yours):** Search Console sitemap + 2-week review vs baseline; Bing Webmaster; Capterra reviews; Google Business profile; Arabic software directories and partner backlinks.
