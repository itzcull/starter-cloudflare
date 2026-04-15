import { createFileRoute } from '@tanstack/react-router'
import { Box, Container } from '@chakra-ui/react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Container centerContent>
      <Box bg="bg.subtle" maxW="256px" w="100%" p="4">
        <h1>Hello, World!</h1>
      </Box>
    </Container>
  )
}
