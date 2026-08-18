import type { ComponentType, ReactNode, SVGProps } from "react";
import ArrowRightIcon from "lucide-react/dist/esm/icons/arrow-right.mjs";
import BookOpenIcon from "lucide-react/dist/esm/icons/book-open.mjs";
import Building2Icon from "lucide-react/dist/esm/icons/building-2.mjs";
import CalendarIcon from "lucide-react/dist/esm/icons/calendar.mjs";
import CheckCircle2Icon from "lucide-react/dist/esm/icons/check-circle-2.mjs";
import ChevronDownIcon from "lucide-react/dist/esm/icons/chevron-down.mjs";
import ClockIcon from "lucide-react/dist/esm/icons/clock.mjs";
import CircleMinusIcon from "lucide-react/dist/esm/icons/circle-minus.mjs";
import DumbbellIcon from "lucide-react/dist/esm/icons/dumbbell.mjs";
import EyeIcon from "lucide-react/dist/esm/icons/eye.mjs";
import FlaskConicalIcon from "lucide-react/dist/esm/icons/flask-conical.mjs";
import HandHeartIcon from "lucide-react/dist/esm/icons/hand-heart.mjs";
import HeartIcon from "lucide-react/dist/esm/icons/heart.mjs";
import Globe2Icon from "lucide-react/dist/esm/icons/globe-2.mjs";
import HospitalIcon from "lucide-react/dist/esm/icons/hospital.mjs";
import LaptopIcon from "lucide-react/dist/esm/icons/laptop.mjs";
import LandmarkIcon from "lucide-react/dist/esm/icons/landmark.mjs";
import MailIcon from "lucide-react/dist/esm/icons/mail.mjs";
import MapPinIcon from "lucide-react/dist/esm/icons/map-pin.mjs";
import MenuIcon from "lucide-react/dist/esm/icons/menu.mjs";
import MessageCircleReplyIcon from "lucide-react/dist/esm/icons/message-circle-reply.mjs";
import TargetIcon from "lucide-react/dist/esm/icons/target.mjs";
import TrophyIcon from "lucide-react/dist/esm/icons/trophy.mjs";
import UserIcon from "lucide-react/dist/esm/icons/user.mjs";
import UsersIcon from "lucide-react/dist/esm/icons/users.mjs";
import XIcon from "lucide-react/dist/esm/icons/x.mjs";
import ZapIcon from "lucide-react/dist/esm/icons/zap.mjs";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  absoluteStrokeWidth?: boolean;
};

type IconComponent = ComponentType<IconProps>;

const wrap = (icon: IconComponent) => icon;

function FallbackIconBase({
  size = 24,
  strokeWidth = 1.75,
  className = "",
  children,
  viewBox = "0 0 24 24",
  ...rest
}: IconProps & {
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = wrap(ArrowRightIcon);
export const BookOpen = wrap(BookOpenIcon);
export const Building2 = wrap(Building2Icon);
export const Calendar = wrap(CalendarIcon);
export const CheckCircle2 = wrap(CheckCircle2Icon);
export const ChevronDown = wrap(ChevronDownIcon);
export const Clock = wrap(ClockIcon);
export const Dumbbell = wrap(DumbbellIcon);
export const Eye = wrap(EyeIcon);
export const FlaskConical = wrap(FlaskConicalIcon);
export const HandHeart = wrap(HandHeartIcon);
export const Heart = wrap(HeartIcon);
export const Globe2 = wrap(Globe2Icon);
export const Laptop = wrap(LaptopIcon);
export const Landmark = wrap(LandmarkIcon);
export const Hospital = wrap(HospitalIcon);
export const Mail = wrap(MailIcon);
export const MapPin = wrap(MapPinIcon);
export const Menu = wrap(MenuIcon);
export const MessageCircle = wrap(MessageCircleReplyIcon);
export const Minus = wrap(CircleMinusIcon);
export const RotateCcw = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 7" />
    <path d="M21 3v4h-4" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 17" />
    <path d="M3 21v-4h4" />
  </FallbackIconBase>
);
export const Scale = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M12 4v16" />
    <path d="M6 8h12" />
    <path d="M8 8 5 13" />
    <path d="M16 8 19 13" />
    <path d="M4.5 13h5" />
    <path d="M14.5 13h5" />
    <path d="M7 13c0 1.7-1.3 3-3 3s-3-1.3-3-3" />
    <path d="M20 13c0 1.7-1.3 3-3 3s-3-1.3-3-3" />
  </FallbackIconBase>
);
export const Target = wrap(TargetIcon);
export const Trophy = wrap(TrophyIcon);
export const User = wrap(UserIcon);
export const Users = wrap(UsersIcon);
export const X = wrap(XIcon);
export const Zap = wrap(ZapIcon);

export const Phone = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.7-3.1 19.5 19.5 0 0 1-6-6 20 20 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.7-1.7a2 2 0 0 1 2.1-.5c.8.3 1.5.5 2.3.6A2 2 0 0 1 22 16.9Z" />
  </FallbackIconBase>
);

export const ShieldCheck = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M12 3l7 3v5c0 4.9-3.1 8.8-7 10-3.9-1.2-7-5.1-7-10V6l7-3z" />
    <path d="m9.5 12 1.9 1.9 3.6-3.8" />
  </FallbackIconBase>
);

export const School2 = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M3 10.5 12 5l9 5.5-9 5.5-9-5.5Z" />
    <path d="M6 12v4.5c0 1.7 2.7 3 6 3s6-1.3 6-3V12" />
    <path d="M12 16V9" />
  </FallbackIconBase>
);

export const Send = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </FallbackIconBase>
);

export const Music = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M12 4v11" />
    <path d="M12 5 19 3v11" />
    <path d="M12 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path d="M19 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </FallbackIconBase>
);

export const Microscope = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M9 3h4" />
    <path d="M11 3v6" />
    <path d="M14 9a4 4 0 0 0-6.5 3.2V14h7V12.2A4 4 0 0 0 14 9Z" />
    <path d="M8.5 14 6 19h12" />
    <path d="M9 19h-2" />
    <path d="M15 15h3" />
    <path d="M17 8h3" />
    <path d="M18.5 8V5.5" />
  </FallbackIconBase>
);

export const Newspaper = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 4v16" />
    <path d="M12 8h4" />
    <path d="M12 12h4" />
    <path d="M12 16h4" />
  </FallbackIconBase>
);

export const Facebook = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M14 7h3V3h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1Z" />
  </FallbackIconBase>
);

export const Twitter = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M19 7.5c.7 5-2.6 10.8-10.3 10.8-2 0-3.8-.6-5.3-1.6 1.9.2 3.7-.3 5.1-1.4-1.5 0-2.8-1.1-3.2-2.5.5.1 1 .1 1.5 0-1.8-.4-3-2.1-3-3.9.5.3 1.2.5 1.8.6-1.7-1.2-2.2-3.5-1.1-5.2 2 2.5 5 4.1 8.2 4.2-.6-2.7 1.4-5.2 4.2-5.2 1.2 0 2.3.5 3.1 1.3.9-.1 1.8-.4 2.6-.8-.3.9-.9 1.6-1.8 2.1.8-.1 1.5-.3 2.2-.6-.5.8-1.1 1.5-1.8 2.1Z" />
  </FallbackIconBase>
);

export const Instagram = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <rect x="5" y="5" width="14" height="14" rx="4" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </FallbackIconBase>
);

export const Linkedin = (props: IconProps) => (
  <FallbackIconBase {...props}>
    <path d="M6 9v10" />
    <circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none" />
    <path d="M10 19v-6a3 3 0 0 1 6 0v6" />
    <path d="M16 13.5V19" />
  </FallbackIconBase>
);
