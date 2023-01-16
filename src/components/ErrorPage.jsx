import { Box, Text, Image } from '@chakra-ui/react';

export default function ErrorPage() {
  return (
    <Box height="100vh">
      <Box
        top="50%"
        left="50%"
        position="absolute"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <Image
          src="/wlee.gif"
          height="250px"
          width="250px"
          borderRadius="10px"
        />
        <Text>Ups..</Text>
        <Text>Nothing to see here.</Text>
      </Box>
    </Box>
  );
}
