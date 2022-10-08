import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    Spinner,
} from '@chakra-ui/react';

import Logo from './Logo';

export default function Login() {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [input, setInput] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Login - Personal Money Management';
    }, []);

    const handleClick = () => setShow(!show);

    function handleKeyUp(e) {
        if (e.target.value != '') {
            setError(null);
        }

        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    function doLogin() {
        if (input.email == '' && input.password == '') {
            setError({
                message: 'email dan password tidak boleh kosong',
                type: 'all',
            });
            return;
        }

        if (input.email == '') {
            setError({
                message: 'email tidak boleh kosong',
                type: 'email',
            });
            return;
        }

        if (input.password == '') {
            setError({
                message: 'password tidak boleh kosong',
                type: 'password',
            });
            return;
        }

        console.log('lolos!');
    }

    return (
        <Container
            maxW="lg"
            py={{ base: '12', md: '24' }}
            px={{ base: '0', sm: '8' }}
            fontFamily="poppins"
        >
            <Stack spacing="8">
                <Stack spacing="6">
                    <Logo />
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={'lg'}>
                            Log in to manage your money
                        </Heading>
                        <HStack spacing="1" justify="center">
                            <Text color="muted">Don't have an account?</Text>
                            <Button variant="link" colorScheme="blue">
                                <Link to="/auth/register">Register</Link>
                            </Button>
                        </HStack>
                    </Stack>
                </Stack>

                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({
                        base: 'transparent',
                        sm: 'bg-surface',
                    })}
                    boxShadow={{
                        base: 'none',
                        sm: useColorModeValue('md', 'md-dark'),
                    }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <InputGroup>
                                    <Input
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                        onKeyUp={handleKeyUp}
                                        isInvalid={
                                            error
                                                ? error.type == 'email'
                                                    ? true
                                                    : false
                                                : null
                                        }
                                    />
                                </InputGroup>
                                {error ? (
                                    error.type == 'email' ? (
                                        <Text color="red">{error.message}</Text>
                                    ) : error.type == 'all' ? (
                                        <Text color="red">{error.message}</Text>
                                    ) : null
                                ) : null}
                            </FormControl>
                        </Stack>
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        pr="4.5rem"
                                        name="password"
                                        type={show ? 'text' : 'password'}
                                        onKeyUp={handleKeyUp}
                                        isInvalid={
                                            error
                                                ? error.type == 'password'
                                                    ? true
                                                    : false
                                                : null
                                        }
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleClick}
                                        >
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {error ? (
                                    error.type == 'password' ? (
                                        <Text color="red">{error.message}</Text>
                                    ) : error.type == 'all' ? (
                                        <Text color="red">{error.message}</Text>
                                    ) : null
                                ) : null}
                            </FormControl>
                        </Stack>
                        <Stack spacing="6">
                            <Button
                                colorScheme="teal"
                                onClick={doLogin}
                                disabled={error ? true : false}
                            >
                                {loading ? <Spinner /> : 'Login'}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}
