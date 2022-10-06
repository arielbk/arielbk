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
      gap={32}
      borderColor="gray"
      borderStyle={'solid'}
      borderWidth={4}
      borderRadius={42}
      padding={32}
      bgColor="#252525"
      whileTap={{ scale: 0.95 }}
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
