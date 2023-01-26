import { Box, Text, Image } from '@chakra-ui/react';

export default function ErrorPage() {
  document.title = 'Error Page';

  return (
    <Box height="100vh">
      <Box
        top="50%"
        left="50%"
        position="absolute"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <Image src="/wlee.gif" height="100%" width="100%" borderRadius="10px" />
        <Text>Ups..</Text>
        <Text>Nothing to see here.</Text>
      </Box>
    </Box>
  );
}
