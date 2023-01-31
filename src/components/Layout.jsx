import {
  Container,
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Text,
} from '@chakra-ui/react';

import { Link, useLocation, useParams } from 'react-router-dom';

// helpers
import months from '../helpers/months';
import { formatString, formatPrice } from '../helpers/format';
import { getData } from '../helpers/crud';
import { getMonth } from '../helpers/date';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { VITE_APP_NAME } = import.meta.env;
  const { name } = useParams();

  const location = useLocation();
  const [inflow, setInflow] = useState(0);

  const resultMonth = months.map((month) => {
    return {
      name: formatString(month),
      path: `/month/${month}`,
      active: name == month ? 'facebook' : 'gray',
    };
  });

  const links = [
    {
      name: 'Dashboard',
      path: '/',
      active: location.pathname == '/' ? 'facebook' : 'gray',
    },
    ...resultMonth,
  ];

  // outflow
  let outflow = 0;
  const dataOutflow = getData(getMonth());

  if (dataOutflow) {
    dataOutflow.forEach((obj) => {
      outflow += obj.price;
    });
  }

  // inflow
  const dataInflow = getData('dashboard');
  useEffect(() => {
    setInflow(dataInflow.inflow);
  }, [dataInflow]);

  return (
    <Container maxW="container.xl">
      <Flex minWidth="max-content" alignItems="center" mt="20px">
        <Box p="2">
          <Heading size="md">
            <Link to="/">{VITE_APP_NAME}</Link>
          </Heading>
        </Box>
        <Spacer />
        <Flex alignItems="center">
          <Flex alignItems="center" textAlign="center">
            <Box mx="2">
              <Box bgColor="lightgray" px="6px" borderRadius="4px">
                <Text fontSize="small" fontWeight="bold">
                  Inflow ({formatString(getMonth())})
                </Text>
              </Box>
              <Text fontSize="small">Rp{formatPrice(inflow)}</Text>
            </Box>
            <Box>
              <Box bgColor="lightgray" px="6px" borderRadius="4px">
                <Text fontSize="small" fontWeight="bold">
                  Outflow ({formatString(getMonth())})
                </Text>
              </Box>
              <Text fontSize="small">Rp{formatPrice(outflow)}</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex mt="20px" flexDirection="column">
        <Box w="100%" bg="lightgray" py="25px" borderRadius="8px">
          <Container
            overflowY="scroll"
            maxW="container.xl"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Flex justifyContent="space-between">
              {links.map(({ path, active, name }, index) => {
                return (
                  <Link to={path} key={index} style={{ margin: '0 10px' }}>
                    <Button colorScheme={active} size="sm" w="100%">
                      {name}
                    </Button>
                  </Link>
                );
              })}
            </Flex>
          </Container>
        </Box>
        <Box w="100%" bg="lightgray" borderRadius="10px" p="30px" mt="5px">
          {children}
        </Box>
      </Flex>
    </Container>
  );
}
