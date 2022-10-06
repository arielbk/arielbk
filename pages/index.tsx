import { Box, chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { SiJquery } from 'react-icons/si';
import Grid from '../components/Grid';

const Home: NextPage = () => {
  return (
    <>
      {typeof window !== 'undefined' ? <Grid /> : null}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        zIndex={10}
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
        <Box
          as={motion.div}
          display="flex"
          flexDir="column"
          alignItems="center"
          gap={32}
          borderColor="gray"
          borderStyle={'solid'}
          borderWidth={4}
          borderRadius={42}
          padding={32}
          bgColor="#252525"
          whileTap={{ scale: 0.9 }}
        >
          <chakra.h1
            fontWeight={200}
            fontSize="5rem"
            paddingBottom={'3rem'}
            color="silver"
          >
            arielbk
          </chakra.h1>
          <Box fontSize={64} display="flex" gap={64}>
            <a href="https://linkedin.com/in/arielbk">
              <Box>
                <BsLinkedin />
              </Box>
            </a>
            <a href="https://dev.to/arielbk">
              <SiJquery />
            </a>
            <a href="https://github.com/arielbk">
              <BsGithub />
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
