import { Box, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';

interface SocialLinkProps {
  children: ReactElement;
  link: string;
  name: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ children, link, name }) => {
  return (
    <Tooltip
      hasArrow
      label={name}
      aria-label={name}
      placement="top"
      marginBottom={12}
      fontSize="1rem"
      bg="#111"
      px="1rem"
      py="0.5rem"
      borderRadius={8}
    >
      <Box
        as={motion.a}
        href={link}
        style={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
      >
        {children}
      </Box>
    </Tooltip>
  );
};

export default SocialLink;
