import { createFileRoute } from '@tanstack/react-router'
import { Container, View } from 'reshaped'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Container align="center" justify="center">
      <View backgroundColor="neutral-faded" maxWidth={256} width="100%" padding={4}>
        <h1>Hello, World!</h1>
      </View>
      <View />
    </Container>
  )
}
