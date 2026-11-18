import { Container, Heading, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const Papers = () => (
  <Layout title="Papers">
    <Container>
      <Heading as="h3" variant="section-title">Papers</Heading>
      <Section delay={0.1}>
        <Text>Research papers will be listed here as they become available.</Text>
      </Section>
    </Container>
  </Layout>
)

export default Papers
export { getServerSideProps } from '../components/chakra'
