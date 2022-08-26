import { Grid, Heading, HStack, Spacer, VStack } from "@chakra-ui/react";
import { FaEthereum } from 'react-icons/fa';
import { GiCastle, GiSpikedDragonHead } from 'react-icons/gi';
import { RiShirtFill } from 'react-icons/ri';

export const NavBar = () => {
  return (
    <Grid borderRight='1px solid #212121' templateRows='1fr 4fr 5fr 4fr'>
      <HStack p='2rem'>
        <GiSpikedDragonHead color="#FCD535" fontWeight={900} fontSize='2rem'/>
        <Heading fontSize='2rem' fontWeight={900} color='#FCD535'>DecentraX</Heading>
      </HStack>
      <VStack>
        <HStack cursor='pointer' width='100%' p='1rem' pl='2rem' justifyContent='flex-start' gap={1} >
          <GiCastle color="white" fontSize='1rem'/>
          <Heading fontSize='1rem' color='white'>Estates</Heading>
        </HStack>
        <HStack cursor='pointer' width='100%' p='1rem' pl='2rem' justifyContent='flex-start' gap={1} bg='#FCD535'>
          <RiShirtFill color="black" fontSize='1rem'/>
          <Heading fontSize='1rem' color='black'>Wearables</Heading>
        </HStack>
        <HStack cursor='pointer' width='100%' p='1rem' pl='2rem' justifyContent='flex-start' gap={1} >
          <FaEthereum color="white" fontSize='1rem'/>
          <Heading fontSize='1rem' color='white'>ENS</Heading>
        </HStack>
      </VStack>
      <Spacer/>
      <VStack></VStack>
    </Grid>
  )
}