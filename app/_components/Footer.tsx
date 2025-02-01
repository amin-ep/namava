import FooterApplications from "./FooterApplications";
import FooterContent from "./FooterContent";
import FooterSocialNetworks from "./FooterSocialNetworks";

function Footer() {
  return (
    <footer className="hidden w-full bg-[#1A1A1A] px-5 pb-8 pt-6 md:block xl:pb-6 xl:pt-5">
      <div className="mx-auto max-w-[1145px]">
        <FooterApplications />
        <FooterContent />
        <FooterSocialNetworks />
      </div>
    </footer>
  );
}

export default Footer;
