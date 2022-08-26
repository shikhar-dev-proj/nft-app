import { Badge, Box, Container, IconButton, Image, Tag, VStack } from "@chakra-ui/react"
import { GiPointyHat, GiPirateHat, GiSleevelessJacket, GiLabCoat, GiCrenelCrown, GiSkiBoot } from "react-icons/gi"

export type WearableProps = {
  key: number
  wearable: {
    name: string
    address: string
    description: string
    collection: string
  }
}

export const NFTImage = ({name}: { name: string}) => {
  switch (name) {
    case 'Ethereal Dreamer Boots':
      return <GiSkiBoot fontSize='10rem' color="orange" />
    case 'Lion Dance Coat':
      return <GiLabCoat fontSize='10rem' color="pink"/>
    case 'Lucid Visionary Crown':
      return <GiCrenelCrown fontSize='10rem' color="white"/>
    case 'Dream Oracle Jacket':
      return <GiSleevelessJacket fontSize='10rem' color="grey"/>
    case 'Lion Dance Hat': 
      return <GiPirateHat fontSize='10rem' color="brown"/>
    default:
      return null

  }
}

export const Wearables = ({wearable, key}: WearableProps) => {


  return (
    <Box key={key} h='23.75rem' bg='black' border='1px solid #d5bc54' borderRadius='1rem' p={3}>
      <VStack mt={3}>
        <Badge marginTop='1rem' fontSize='0.8em' color='black' background='#d5bc54'>
          {wearable.name}
        </Badge>
        <IconButton
          mt='2rem'
          variant='outline'
          colorScheme='pink'
          color='#d5bc54'
          aria-label='Send email'
          h='8rem'
          w='8rem'
          borderRadius='1rem'
          icon={<NFTImage name={wearable.name}/>}
        />
        <Image src='divider.svg' mt={2} mb={2}/>
          <Tag mt='1rem !important' size='lg' fontSize='0.8rem' variant='outline'>
            {wearable.collection}
          </Tag>
        <Container borderRadius='1rem' marginTop='2rem !important' maxW='2xl' bg='black' centerContent>
          <Box fontSize='0.75rem' padding='4' bg='black' color='#d5bc54' maxW='md'>
            {wearable.description}
          </Box>
        </Container>
      </VStack>
    </Box>
  )
}