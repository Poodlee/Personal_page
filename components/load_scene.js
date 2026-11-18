import { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

export const SceneSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

export const SceneContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    className="workspace-diorama"
    m="auto"
    mt={2}
    mb={0}
    w="100%"
    maxW="700px"
    h={[300, 380, 460]}
    position="relative"
  >
    {children}
  </Box>
))

const Loader = () => {
  return (
    <SceneContainer>
      <SceneSpinner />
    </SceneContainer>
  )
}

export default Loader
