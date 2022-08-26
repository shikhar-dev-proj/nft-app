import {
  Alert,
  AlertIcon,
  Box, ChakraProvider, Flex, Grid,
  Spacer,
  Spinner,
  Text,
  useClipboard
} from "@chakra-ui/react"
import axios from "axios";
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { FaClipboardCheck, FaRegCopy } from "react-icons/fa";
import { wearables } from "./app.const";
import { NavBar } from "./components/NavBar";
import { Wearables } from "./components/NFT";
import { theme } from "./theme";
import { formatAddress } from "./utils";

export const App = () => {

  const [address, setAddress] = useState('');
  const [trimmedAddress, setTrimmedAddress] = useState('');
  const { hasCopied, onCopy } = useClipboard(address);

  const [personalisedWearables, ] = useState([...wearables])
  const [snackbar, setSnackbar] = useState<{ message: string, type: string}>({ message: '', type: ''})

  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log(provider)
      let accounts = await provider.send("eth_requestAccounts", [])
      let account = accounts[0]
      setAddress(account)
      setTrimmedAddress(formatAddress(account))
    }
  }

  async function getProfileAttributes(address: string) {
    const res: any = await axios.get(`http://idu-onboarding-qa.zeotap.net/get/${address}`)

    if (res?.data) {
      
      if (res.data.nfts?.length) {
        if (res.data.nfts.find((n: any) => n.category === 'parcel')) {
          setSnackbar({ type: 'opportunity', 'message': 'Monetize your Decentraland estate.' })
        }
      } else if (+res.data?.earned > 0) {
        setSnackbar({type: 'success', message: 'Congratulations!' })
      }
    }
  }

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    if (address) {
      getProfileAttributes('0x022e3ce4eda264b3e3fef62036c8182ceb88e6ce' || address)
    }
  }, [address])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="1rem">
        { snackbar.type ?
            <Alert cursor='pointer' status={snackbar.type === 'opportunity' ? 'warning' : 'success'} variant='solid' onClick={() => {window.open('https://adshares.net/')}}>
              <AlertIcon /> 
              {snackbar.message}
            </Alert>
            : null
        }
        <Grid height="100vh" overflow='hidden' background='#0B0E11' templateColumns='1fr 8fr'>
          <NavBar />
          <Grid p={3} templateRows='3rem 1fr'>
            <Grid templateColumns='1fr 9rem'>
              <Spacer />
              {
                address ?
                  <Flex alignItems='center' padding='0.5rem' borderRadius='4px' bg='#FCD535'>
                    <Text fontSize='1rem' fontWeight={600} mr='1rem' color='black'>{trimmedAddress}</Text>
                    {hasCopied ? <FaClipboardCheck color="green" fontSize='0.8rem' /> : <FaRegCopy cursor='pointer' color="black" fontSize='0.8rem' onClick={onCopy} />}
                  </Flex>
                  : <Spinner color="#FCD535" />
              }
            </Grid>
            <Flex flexWrap='wrap' gap='4rem' m='2rem' p='2rem' maxHeight='50rem' overflow='auto'>
              {personalisedWearables.map((p, i) => 
                <Box w='calc((100% - 10rem)/3)' >
                  <Wearables key={i} wearable={p}/>
                </Box>
              )}
            </Flex>
          </Grid>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
