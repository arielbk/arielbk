import { Box, useMediaQuery } from '@chakra-ui/react';
import {
  animate,
  AnimationOptions,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import Grid from '../components/Grid';
import MainBox from '../components/MainBox';

const Home: NextPage = () => {
  // mouse position
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  );
  // eased mouse position
  const mouseXEased = useMotionValue(0);
  const mouseYEased = useMotionValue(0);

  // handle mouse move on document
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // animate mouse x and y
      animate(mouseX, e.clientX);
      animate(mouseY, e.clientY);
      // animate eased mouse x and y
      const transition: AnimationOptions<number> = {
        ease: 'easeOut',
        duration: 1,
      };
      animate(mouseXEased, e.clientX, transition);
      animate(mouseYEased, e.clientY, transition);
    };
    if (typeof window === 'undefined') return;
    // recalculate grid on resize
    window.addEventListener('mousemove', handleMouseMove);
    // cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  const dampen = 40;
  const rotateX = useTransform<number, number>(mouseY, (newMouseY) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const newRotateX = newMouseY - rect.top - rect.height / 2;
    return -newRotateX / dampen;
  });
  const rotateY = useTransform(mouseX, (newMouseX) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const newRotateY = newMouseX - rect.left - rect.width / 2;
    return newRotateY / dampen;
  });

  const [isSmallScreen] = useMediaQuery(['(max-width: 650px)']);

  const handleDrag = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    animate(mouseX, info.point.x);
    animate(mouseY, info.point.y);
  };

  return (
    <Box as={motion.div} overflow="hidden" style={{ perspective: 1000 }}>
      <Box
        as={motion.div}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {typeof window !== 'undefined' ? (
          <Grid
            mouseX={mouseX}
            mouseY={mouseY}
            mouseXEased={mouseXEased}
            mouseYEased={mouseYEased}
          />
        ) : null}
        <Box
          as={motion.div}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="100vh"
          position="relative"
        >
          <Head>
            <title>arielbk</title>
            <meta
              name="description"
              content="Personal website for arielbk - frontend developer"
            />
            {/* <link rel="icon" href="/favicon.ico" /> */}
          </Head>
          <motion.div
            ref={ref}
            drag
            dragConstraints={ref}
            onDrag={handleDrag}
            style={{ scale: isSmallScreen ? 0.6 : 1, translateZ: 300 }}
          >
            <MainBox />
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
