import { cn } from "@/lib/utils";
type RollingLabelProps = {
  text: string;
  className?: string;
};

type AnimatedLinkTextProps = {
  className?: string;
  children: string;
};

const rollingWrapperClasses =
  "relative inline-flex flex-col overflow-hidden leading-tight min-h-[1em]";
const rollingTextTop =
  "block translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:-translate-y-full";
const rollingTextBottom =
  "block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:translate-y-0";

export const AnimatedLinkText = ({
  className,
  children,
}: AnimatedLinkTextProps) => (
  <AnimatedLinkLabel text={children} className={className} />
);

const RollingLabel = ({ text, className }: RollingLabelProps) => (
  <span className={cn(rollingWrapperClasses, className)}>
    <span className={rollingTextTop}>{text}</span>
    <span className={cn("absolute inset-0", rollingTextBottom)} aria-hidden>
      {text}
    </span>
  </span>
);

const AnimatedLinkLabel = ({
  text,
  className,
  selfHover = true,
}: RollingLabelProps & { selfHover?: boolean }) => (
  <span className={cn("inline-flex", selfHover && "group/roll")}>
    <RollingLabel text={text} className={className} />
  </span>
);
