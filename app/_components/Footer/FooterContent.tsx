import Image from "next/image";
import React from "react";
import cls from "classnames";

function FooterContent() {
  const imageClasses = "aspect-square w-[90px] xl:w-[100px] rounded-md";
  return (
    <div className="my-6 grid grid-cols-[1fr_208px] justify-between gap-8 xl:grid-cols-[1fr_238px] xl:gap-24">
      <div>
        <h6 className="mb-2 text-xs text-white">درباره نماوا</h6>
        <p className="text-justify text-xs leading-6 text-gray-500">
          سرزمین شاتل در سایت نماوا امکان پخش آنلاین فیلم‌ها و سریال‌های
          محبوبتان را در اختیار شما کاربران گرامی قرار می‌دهد. مشاهده پیش‌نمایش
          فیلم و سریال‌ها، جستجوی سریع مجموعه انتخابی، دانلود درون‌برنامه‌ای،
          حساب چند کاربره، تنظیمات کودک، پخش زنده رویدادهای ورزشی و فرهنگی و
          آرشیوی کامل از پرطرفدارترین فیلم‌ها و سریال‌ها از جمله قابلیت‌های
          نماوا، به‌روزترین سایت تماشای فیلم و سریال است. نماوا این امکان را
          برای کاربران خود فراهم کرده است تا در سریع‌ترین زمان ممکن و تنها با
          چند کلیک، سریال‌ها و فیلم‌های مورد علاقه خود را به صورت آنلاین و
          آفلاین مشاهده کنند.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Image
          src="/enamad-logo.png"
          alt="enamad"
          width={90}
          height={90}
          className={cls(imageClasses, "bg-white")}
        />
        <Image
          src="/samandehi-logo.jpg"
          alt="samandehi"
          width={90}
          height={90}
          className={cls(imageClasses)}
        />
      </div>
    </div>
  );
}

export default FooterContent;
