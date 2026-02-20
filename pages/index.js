import React, { useState } from 'react';
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
  chakra,
  Collapse,
} from '@chakra-ui/react'
import { ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
// import { GridItem } from '../components/grid-item'
import { IoLogoGithub, IoMailUnread, IoDocumentAttach, IoSchool } from 'react-icons/io5'
import Image from 'next/image'
// import Script from 'next/script'
import LogoBanner from '../components/logobanner'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => {
  const [showOldNews, setShowOldNews] = useState(false);
  const [showMap, setShowMap] = useState(false);
  return (
  <Layout>
    <Container>

      <Box display={{ lg: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            DongJun Park
          </Heading>
          <p><b> MS/Ph.D. Student</b> <br/>Seoul National University</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="150px"
            h="150px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/dj_park.jpeg"
              alt="Profile image"
              borderRadius="full"
              width="150"
              height="150"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          About me
        </Heading>
        <Paragraph>
          I&apos;m a MS/PhD student in the Interdisciplinary Program in Bio Engineering at Seoul National Universitys, advised by Prof.{' '}
          <Link as={NextLink} href="https://medi.snu.ac.kr" passHref scroll={false}>
            Joo Li Han
          </Link>
          .
        </Paragraph>
        <Box height="0.3em"></Box>
        <Paragraph>
          My research focuses on developing intelligent medical robotic systems 
          capable of interpreting real-time physiological vital signs and autonomously 
          delivering therapeutic interventions.

          Ultimately, I aim to bridge the gap between robust sensing and precise actuation 
          in healthcare applications. My current interests include implantable medical devices 
          and targeted drug delivery systems, where intelligent perception and automated 
          treatment can significantly improve patient outcomes.
        </Paragraph>
        <Box height="0.3em"></Box>
        <Paragraph>
          I am always open to new opportunities and collaborations! Please feel free to contact me if you are interested in my research.
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/publications"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            Publications
          </Button>
        </Box>
      </Section>


      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          News
        </Heading>
        <BioSection>
          <BioYear>2025.08</BioYear>
          2025 BMES (poster).
        </BioSection>        
        <BioSection>
          <BioYear>2025.08</BioYear>
          Achieved 3rd place at{' '}
          <Link
            href="https://datathon.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Korea Clinical Datathon
          </Link>.
        </BioSection>
      </Section>
      <Section delay={0.3}>
        <Heading
          as="h3"
          variant="section-subtitle"
          cursor="pointer"
          onClick={() => setShowOldNews(!showOldNews)}
          display="flex"
        >
          Old News
          {showOldNews ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Heading>
        <Collapse in={showOldNews} animateOpacity>
          <BioSection>
            <BioYear>2026.03</BioYear>
            Began the Integrated M.S.–Ph.D. program (1st semester).
          </BioSection>
        </Collapse>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Info
        </Heading>
        <List>
          <ListItem>
            <Link href="mailto: ppp6131@snu.ac.kr" target="_blank">
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
            <Link href="https://scholar.google.com/*" target="_blank">
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
          <BioYear>Starting Mar 2026</BioYear>
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
