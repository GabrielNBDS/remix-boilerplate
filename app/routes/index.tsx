import { Box, Container, Group, Text, Title } from '@mantine/core'
import ToggleThemeButton from '~/components/toggleThemeButton'

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='6 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235c5f66' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\");",
      }}
    >
      <Container
        sx={{
          paddingTop: 48,
          paddingBottom: 48,
          maxWidth: 800,
        }}
      >
        <Group direction="column" position="center">
          <Group spacing={1} direction="column" position="center">
            <Title
              sx={{
                fontSize: 48,
                '@media (max-width: 992px)': {
                  fontSize: 36,
                },
              }}
              align="center"
            >
              Remix Boilerplate
            </Title>
          </Group>

          <Text sx={{ textAlign: 'center' }}>
            A boilerplate with Remix, Mantine, ESLint, Prettier, Husky, Axios
            and React Icons.
          </Text>
          <ToggleThemeButton />
        </Group>
      </Container>
    </Box>
  )
}
