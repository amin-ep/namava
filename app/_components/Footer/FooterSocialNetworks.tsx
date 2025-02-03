import Link from "next/link";
import { FaTelegramPlane, FaInstagram, FaTwitter } from "react-icons/fa";

const socialNetworkItems: { icon: React.ReactNode; href: string }[] = [
  { icon: <FaTwitter size={26} />, href: "https://twitter.com/Namava_ir" },
  { icon: <FaInstagram size={26} />, href: "https://instagram.com/namava_ir" },
  {
    href: "https://telegram.me/namava_ir",
    icon: <FaTelegramPlane size={26} />,
  },
];
function FooterSocialNetworks() {
  return (
    <div className="flex items-start justify-between border-t border-gray-600 pt-5">
      <p className="text-[10px] text-stone-400">
        خدمات ارائه شده در نماوا، دارای مجوزهای لازم از مراجع مربوطه است و هر
        گونه بهره‌برداری و سوءاستفاده از محتوای نماوا، پیگرد قانونی دارد.
      </p>
      <div className="flex items-center justify-end gap-8">
        {socialNetworkItems.map((item) => (
          <Link
            className="text-stone-200 hover:text-primary"
            key={item.href}
            href={item.href}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterSocialNetworks;
