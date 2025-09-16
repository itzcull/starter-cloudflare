import { Container, View } from 'reshaped'

export default function home() {
	return (
		<Container
			align="center"
			justify="center"
		>
			<View
				backgroundColor="neutral-faded"
				maxWidth={256}
				width="100%"
				padding={4}
			>
				Hello World!
			</View>
			<View />
		</Container>
	)
}
