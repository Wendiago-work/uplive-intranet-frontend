import { type ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import {AnimatedLinkText} from "./ui/animated-link"
import Logo from "@/assets/logo.png";

const CornerClip = ({ corner }: { corner: "topRight" | "bottomLeft" }) => (
  <span
    className={`absolute text-background block w-[clamp(140px,18vw,100px)] h-[clamp(50px,7vw,90px)] pointer-events-none ${corner === "topRight"
      ? "top-[-20px] right-0 rotate-180"
      : "-bottom-px left-0"
      }`}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 160 60"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full fill-current"
    >
      <path d="M147.269 54.72L117.876 25.28C114.502 21.9015 109.919 20 105.145 20H0V60H160C155.226 60 150.642 58.0985 147.269 54.72Z" />
      <path d="M0 0V20H20C8.95435 20 0 11.0457 0 0Z" />
    </svg>
  </span>
);

type FooterLinkProps = ComponentPropsWithoutRef<"a"> & {
  children: string;
};

const FooterLink = ({ className, children, ...props }: FooterLinkProps) => (
  <a {...props} className={cn("transition-colors text-lg font-medium text-white", className)}>
    <AnimatedLinkText className="text-white">{children}</AnimatedLinkText>
  </a>
);

type InternalFooterLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children: string;
};

const InternalFooterLink = ({ className, children, ...props }: InternalFooterLinkProps) => (
  <Link {...props} className={cn("transition-colors text-lg font-medium text-white", className)}>
    <AnimatedLinkText className="text-white">{children}</AnimatedLinkText>
  </Link>
);

export const Footer = () => {
  return (
    <footer
      className="relative bg-footer bg-cover bg-center bg-no-repeat overflow-hidden mt-20 rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px]"
      style={{ backgroundImage: "url('https://demo2.wpopal.com/hitboox/wp-content/uploads/2024/12/footer-bg.png')" }}
    >
      <CornerClip corner="topRight" />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Left Logo & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <Link to="/" className="block">
              <img
                src={Logo}
                alt="Uplive"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white/50 tracking-widest uppercase">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/upliveme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61584121413178"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>

              </div>

              <FooterLink href="mailto:mep.talents@mepplatform.com">mep.talents@mepplatform.com</FooterLink>
              <FooterLink href="tel:+84966511516">0372952324</FooterLink>


            </div>
          </div>

          {/* Right Columns Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6">
              <div>
                <h4 className="text-xs font-bold mb-8 text-white/50 tracking-widest uppercase">
                  Our Company
                </h4>
                <ul className="space-y-4">
                  <li>
                    <InternalFooterLink to="/company">Company</InternalFooterLink>
                  </li>
                  <li>
                    <InternalFooterLink to="/products">Products</InternalFooterLink>
                  </li>
                  <li>
                    <InternalFooterLink to="/careers">Careers</InternalFooterLink>
                  </li>
                  <li>
                    <InternalFooterLink to="/news">News</InternalFooterLink>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold mb-8 text-white/50 tracking-widest uppercase">
                  Get In Touch
                </h4>
                <ul className="space-y-4">
                  <li>
                    <p className="text-white font-medium">
                      <span className="font-bold text-accent">Head office:</span> <br /> 5-7 floor, 161 Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, TP.HCM, Việt Nam
                    </p>
                  </li>
                  <li>
                    <p className="text-white font-medium">
                      <span className="font-bold text-accent">Singapore Office:</span> <br /> Capital Tower, 168 Robinson Road, #20-01, Singapore 068912.
                    </p>
                  </li>
                  <li>
                    <p className="text-white font-medium">
                      <span className="font-bold text-accent">Hong Kong Office:</span> <br /> WEST WING 2/F 822 LAI CHI KOK ROAD CHEUNG SHA WAN HK
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
            <p>
              © 2025 <a href="/">Uplive</a>. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <FooterLink href="#cookies" className="text-sm font-normal">Cookies</FooterLink>
              <FooterLink href="#privacy" className="text-sm font-normal">Privacy</FooterLink>
              <FooterLink href="#terms" className="text-sm font-normal">Terms</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
