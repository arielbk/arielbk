import { Box } from '@chakra-ui/react';
import {
  animate,
  AnimationOptions,
  motion,
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
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
          <Box as={motion.div} ref={ref}>
            <MainBox />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
