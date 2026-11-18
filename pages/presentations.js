import { Container, Heading, Text, Box, Badge } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

// Presentations are listed separately from journal publications.
const presentations = [
  { year: '2026', title: 'Iontophoretic multi component drug delivery system for early-stage pressure ulcer treatment', authors: 'Sung Wook Kim, Dong Jun Park, Eunseo Jang, Yerin Lee, Jooli Han*', venue: 'The 18th Seoul National University Bioengineering Symposium', format: 'Poster presentation' },
  { year: '2026', title: 'Explainable Prediction of Ventricular Fibrillation Onset Using Foundation Model–Derived ECG Concepts', authors: 'Dong Jun Park, Minsun Kim, Jooli Han*', venue: 'The 18th Seoul National University Bioengineering Symposium', format: 'Poster presentation' },
  { year: '2026', title: 'Short-horizon ECG Waveform Characterization prior to Acute Cardiac Events', authors: 'Dong Jun Park, Minsun Kim, Jooli Han*', venue: 'APCMBE 2026' },
  { year: '2026', title: 'A Concept-Guided Interpretable Architecture for the Early Diagnosis of Fatal Arrhythmias Using ECG Foundation Models', authors: 'Dong Jun Park, Jooli Han*', venue: 'BMES 2026', format: 'Oral presentation' },
  { year: '2026', title: 'Iontophoretic drug delivery microneedles system for early-stage pressure ulcer treatment', authors: 'Sung Wook Kim, Dong Jun Park, Eunseo Jang, Yerin Lee, Jooli Han*', venue: 'BMES 2026', format: 'Poster presentation' },
  { year: '2026', title: 'On-demand drug delivery Microneedle system for early-stage pressure ulcer treatment', authors: 'Sung Wook Kim, Dong Jun Park, Eunseo Jang, Jaeyeon Koo, Yerin Lee, Sohee Kim, Jooli Han*', venue: 'APBEC 2026' },
  { year: '2026', title: 'Explainable Proactive VF/VT Early Warning with an ECG Foundation Model and CBM', authors: 'Dong Jun Park, Minsun Kim, Jooli Han*', venue: 'APBEC 2026' },
  { year: '2026', title: 'On-demand drug delivery Microneedle system for early-stage pressure ulcer treatment', authors: 'Sung Wook Kim, Dong Jun Park, Eunseo Jang, Jooli Han*', venue: 'KOSOMBE 2026' },
  { year: '2026', title: 'Explainable Proactive VF/VT Early Warning with an ECG Foundation Model and CBM', authors: 'Dong Jun Park, Jiheon Lee, Hongki Kang, Jooli Han*', venue: 'KOSOMBE 2026' },
  { year: '2025', title: 'On-demand drug delivery via iontophoretic hydrogel microneedle patch for early-stage bed ulcer treatment', authors: 'Sung Wook Kim, Dong Jun Park, Eunseo Jang, Jooli Han*', venue: 'The 17th Seoul National University Bioengineering Symposium', format: 'Oral presentation' },
  { year: '2025', title: 'AI-assisted Soft Robotic Cardiac Assist Device for the Prevention of Cardiac Failure Episodes', authors: 'Dong Jun Park, Younseo Lee, Jooli Han*', venue: 'BMES 2025', format: 'Poster presentation' }
]

const Publications = () => (
  <Layout title="Presentations">
    <Container>
      <Heading as="h3" variant="section-title">Conference Presentations</Heading>
      <Text fontSize="sm" mb={4} opacity={0.8}>* Corresponding author</Text>
      {['2026', '2025'].map(year => (
        <Section key={year} delay={0.1}>
          <Heading as="h4" size="sm" mb={4}>{year}</Heading>
          {presentations.filter(item => item.year === year).map(item => (
            <Box key={`${item.venue}-${item.title}`} mb={5}>
              <Text fontWeight="bold">{item.title}</Text>
              <Text fontSize="sm" mt={1}>{item.authors.split('Dong Jun Park').map((part, index, parts) => (
                <span key={index}>{part}{index < parts.length - 1 && <strong>Dong Jun Park</strong>}</span>
              ))}</Text>
              <Text fontSize="sm" mt={1}>{item.venue}{item.format && <> · <Badge colorScheme="teal">{item.format}</Badge></>}</Text>
            </Box>
          ))}
        </Section>
      ))}
    </Container>
  </Layout>
)

export default Publications
export { getServerSideProps } from '../components/chakra'
