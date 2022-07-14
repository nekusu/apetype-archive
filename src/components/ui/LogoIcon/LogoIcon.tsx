import { useEffect } from 'react';
import { m, useAnimation } from 'framer-motion';
import { useTheme } from 'styled-components';
import { useThrottledCallback } from 'use-debounce';
import { useAppSelector } from '../../../app/hooks';

function LogoIcon() {
  const { isReady, isTyping } = useAppSelector(({ typingTest }) => typingTest);
  const theme = useTheme();
  const rectControls = useAnimation();
  const animateRect = useThrottledCallback(() => {
    rectControls.start({
      opacity: 1,
      pathOffset: [0, 1, 2],
      transition: { duration: 1 },
    });
  }, 1000, { trailing: false });
  const variants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { delay: 0.1, duration: 1 },
    },
  };
  const props = {
    variants,
    initial: 'hidden',
    animate: 'visible',
  };

  useEffect(() => {
    if (!isReady) {
      animateRect();
    }
  }, [isReady, animateRect]);

  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      height="25"
      width="35"
      viewBox="0 0 251 175"
      fill="none"
      strokeWidth="18"
      strokeLinecap="round"
      animate={{ stroke: isTyping ? theme.sub : theme.main }}
    >
      <m.path d="M123.961 49.6772H126.685" {...props} />
      <m.path d="M162.102 49.6772L202.968 49.6772" {...props} />
      <m.path d="M47.6772 125.961H50.4017" {...props} />
      <m.path d="M200.925 125.961H202.287" {...props} />
      <m.path d="M57.2126 78.2835H79.0079" {...props} />
      <m.path d="M85.8188 125.961H126.685" {...props} />
      <m.path d="M163.465 96.6732L163.465 125.961" {...props} />
      <m.path d="M125.323 87.8189L201.606 87.8189" {...props} />
      <m.path d="M49.0393 88.5V67.3858C49.0393 61.2559 49.5842 48.315 68.1102
        48.315C86.6362 48.315 87.181 59.8937 87.181 67.3858V88.5" {...props} />
      <m.rect
        x="10.2166"
        y="10.8543"
        width="230.213"
        height="153.929"
        rx="34.7362"
        initial={{ opacity: 0, pathLength: 1 }}
        animate={rectControls}
      />
    </m.svg>
  );
}

export default LogoIcon;
