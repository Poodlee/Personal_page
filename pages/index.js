import React from 'react'
import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  // SimpleGrid,
  Button,
  List,
  ListItem,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
// import { GridItem } from '../components/grid-item'
import { IoLogoGithub, IoMailUnread, IoDocumentAttach, IoSchool } from 'react-icons/io5'
import Image from 'next/image'
// import Script from 'next/script'

const Home = () => {
  return (
  <Layout>
    <Container>

      <Box display="flex" alignItems="flex-start" gap={{ base: 4, md: 6 }}>
        <Box flex="1" minW={0}>
          <Heading as="h2" variant="page-title">
            DongJun Park
          </Heading>
          <p><b> MS/Ph.D. Student</b> <br/>Seoul National University</p>
        </Box>
        <Box
          flexShrink={0}
          w={{ base: '125px', md: '190px' }}
          borderColor="whiteAlpha.800"
          borderWidth={2}
          borderStyle="solid"
          overflow="hidden"
        >
          <Image
            src="/images/dj_park.jpg"
            alt="Portrait of DongJun Park"
            width={900}
            height={1200}
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          About me
        </Heading>
        <Paragraph>
          I&apos;m a MS/PhD student in the Interdisciplinary Program in Bioengineering at Seoul National University, advised by Prof.{' '}
          <Link as={NextLink} href="https://medi.snu.ac.kr" passHref scroll={false}>
            Joo Li Han
          </Link>
          .
        </Paragraph>
        <Box height="0.3em"></Box>
        <Paragraph>
          I develop software that interprets biosignals to understand changes
          in a person&apos;s health and physiological state. By turning complex
          biological data into meaningful information, I hope to make healthcare
          more attentive and responsive to individual needs. In the long term,
          I aim to design and build micro- and nanoscale hardware that connects
          this understanding to the physical world. Ultimately, my work is driven
          by a personal hope: to help fill the space left by the absence of those
          we cherish.
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/presentations"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            Presentations
          </Button>
        </Box>
      </Section>


      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">News</Heading>
        <BioSection>
          <BioYear>2026</BioYear>
          Received the Best Student Poster Presentation Award at APBEC 2026.
        </BioSection>
        <BioSection>
          <BioYear>2026</BioYear>
          Oral presentation on interpretable ECG foundation models for early diagnosis of fatal arrhythmias at BMES 2026.
        </BioSection>
        <BioSection>
          <BioYear>2026</BioYear>
          Presented research on explainable ventricular fibrillation prediction and contributed to a drug delivery poster at the 18th SNU Bioengineering Symposium.
        </BioSection>
        <BioSection>
          <BioYear>2026.03</BioYear>
          Began the integrated M.S./Ph.D. program at Seoul National University.
        </BioSection>
        <BioSection>
          <BioYear>2025</BioYear>
          Presented a poster on AI-assisted soft robotic cardiac assistance at BMES 2025.
        </BioSection>
        <BioSection>
          <BioYear>2025</BioYear>
          Received 3rd place (우수상) at the{' '}
          <Link href="https://datathon.kr/" target="_blank" rel="noopener noreferrer">Korea Clinical Datathon</Link>.
        </BioSection>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Info
        </Heading>
        <List>
          <ListItem>
            <Link href="mailto:ppp6131@snu.ac.kr">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoMailUnread/>}
              >
                e-mail
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="CV_dj_park.pdf" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoDocumentAttach/>}
              >
                Curriculum Vitae
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.com/Poodlee" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                GitHub
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://scholar.google.com/scholar?q=Dongjun+Park+Seoul+National+University" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoSchool />}
              >
                Google Scholar
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Education
        </Heading>
        <BioSection>
          <BioYear>2026 – present</BioYear>
          M.S./Ph.D., Interdisciplinary Program in Bioengineering
        </BioSection>

        <BioSection>
          <BioYear>2024.02</BioYear>
          B.S., Yonsei University
        </BioSection>

        <BioSection>
          <BioYear>2016.02</BioYear>
          Daegu High School
        </BioSection>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Experience
        </Heading>
        <BioSection>
          <BioYear>2018.04 - 2019.12</BioYear>
          Republic of Korea Army, 20th Infantry Division (Mandatory Military Service)
        </BioSection>
      </Section>
      {/* <LogoBanner /> */}

      <Box align="center" h="2em">
      </Box>



    </Container>
  </Layout>
  );
};

export default Home
export { getServerSideProps } from '../components/chakra'
