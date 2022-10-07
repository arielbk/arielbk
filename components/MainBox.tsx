import { Box, chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiJquery } from 'react-icons/si';
import SocialLink from './SocialLink';

const MainBox: React.FC = () => {
  return (
    <Box
      as={motion.div}
      display="flex"
      flexDir="column"
      alignItems="center"
      borderColor="gray"
      borderStyle={'solid'}
      borderWidth={4}
      borderRadius={42}
      bgColor="#252525"
      whileHover={{ borderColor: '#c0c0c0' }}
      whileTap={{ scale: 0.95 }}
      style={{ transform: 'translateZ(100px)' }}
    >
      <chakra.h1
        fontWeight={200}
        fontSize="5rem"
        paddingBottom={'3rem'}
        color="silver"
        padding={32}
      >
        arielbk
      </chakra.h1>
      <Box
        fontSize={64}
        display="flex"
        gap={48}
        background="#151515"
        padding={32}
        borderRadius="0 0 42px 42px"
      >
        <SocialLink link="https://github.com/arielbk" name="GitHub">
          <BsGithub />
        </SocialLink>
        <SocialLink link="https://dev.to/arielbk" name="Dev.to">
          <SiJquery />
        </SocialLink>
        <SocialLink link="https://linkedin.com/in/arielbk" name="LinkedIn">
          <FaLinkedinIn />
        </SocialLink>
      </Box>
    </Box>
  );
};

export default MainBox;
