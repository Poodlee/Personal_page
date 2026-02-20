import { Container, Heading, Text, Box } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const Publications = () => (
  <Layout title="Publications">
    <Container>

      <Heading as="h3" fontSize={20} mb={6}>
        Publications
      </Heading>

      <Section delay={0.1}>
        <Text>
          I am currently in the early stage of my M.S./Ph.D. program.
          My publications will be updated here as my research progresses.
        </Text>
      </Section>

      <Box align="center" h="5em" />

    </Container>
  </Layout>
)

export default Publications
export { getServerSideProps } from '../components/chakra'
