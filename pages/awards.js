import { Box, Container, Heading, Link, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const Awards = () => (
  <Layout title="Awards">
    <Container>
      <Heading as="h3" variant="section-title">Awards</Heading>
      <Section delay={0.1}>
        <Box mb={5}>
          <Text fontWeight="bold">Best Student Poster Presentation Award</Text>
          <Text fontSize="sm" mt={1}>APBEC 2026 · Dong Jun Park</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">3rd Place (우수상), Korea Clinical Datathon</Text>
          <Text fontSize="sm" mt={1}>
            <Link href="https://datathon.kr/" target="_blank" rel="noopener noreferrer">Korea Clinical Datathon 2025</Link> · Dong Jun Park
          </Text>
        </Box>
      </Section>
    </Container>
  </Layout>
)

export default Awards
export { getServerSideProps } from '../components/chakra'
