import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import {
  Box,
  HStack,
  Link,
  Button,
  CloseButton,
  IconButton,
  chakra,
  useDisclosure,
  useColorModeValue,
  Text,
  Image,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'

import LoginModal from './login-modal'

export default function NavbarAuth({ isMobileView }) {
  const [session, loading] = useSession()

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box display={{ base: 'none', md: 'flex' }}>
      {!session ? (
        <Button colorScheme="blue" onClick={onOpen} isLoading={loading}>
          Login
        </Button>
      ) : (
        <HStack align="center" spacing="8">
          <Box color="blue.400" fontWeight="500" _hover={{ color: 'blue.300' }}>
            <NextLink href="/saved">Saved tweets</NextLink>
          </Box>
          <Popover>
            <PopoverTrigger>
              <Box as="button" boxSize="10" _hover={{ opacity: '80%' }}>
                <Image
                  borderRadius="full"
                  src={session.user.image}
                  alt="Profile Picture"
                />
              </Box>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Text>Signed in as {session.user.name}</Text>
              </PopoverHeader>
              <PopoverBody>
                {' '}
                <Button colorScheme="red" onClick={() => signOut()}>
                  Logout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* <Text>Hey {session.user.name.split(' ').slice(0, -1).join(' ')}</Text> */}
        </HStack>
      )}

      {isOpen && !session ? (
        <LoginModal isOpen={isOpen} onClose={onClose} />
      ) : null}
    </Box>
  )
}
