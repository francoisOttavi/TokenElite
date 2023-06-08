import React from 'react';
import {useState,useEffect} from 'react';
import Crowdfunding from '../../../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json'
import {ethers, getDefaultProvider, Contract} from 'ethers';
import { Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Button,
    Stack,
    Image,
    Heading,
    Text,
    Divider,
    Flex,
    Spacer,
    Container,
    HStack,
    Progress,
    Center
    
 } from '@chakra-ui/react'

import image1 from '../../image/1.png'


const CFadresse = '0x0a4977A0b2c779Dff75ff9A3c29eEcD06fd16Ea0'
const ethersConfig = {
    ethers: { Contract },
    provider: getDefaultProvider("homestead")
  }

const Buy = () => {

  const [error, setError] = useState('')
  const [data, setData] = useState({})

  useEffect(()=> {
    fetchData();

    }, [])
  
    async function fetchData (){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CFadresse, Crowdfunding.abi, provider);

      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost":String(cost),"totalSupply":String(totalSupply)};
        setData(object);
  
      }
      catch (err){
        setError(err.message)
      }

    }
  }
  



  async function mint () {
    if (typeof window.ethereum !== 'undefined'){
      let accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer =  provider.getSigner();
      const contract = new ethers.Contract(CFadresse,Crowdfunding.abi,signer);

      try{
        let overrides = {
          from: accounts[0],
          value: data.cost
        }
        const transaction = await contract.mint(1,overrides);
        await transaction.wait();
        
        


      }
      catch(err){
        setError(err.message);
      }
    }

  }


    return (
        <Card borderRadius='20'>
        <CardHeader>
            <Heading paddingBottom={5} align= 'center' size='md'> Objectif : </Heading>
            <Center paddingBottom={5}> {data.totalSupply*0.05} / {5*0.05} Eth</Center>
            <Progress value={data.totalSupply/5*100} rounded={10}/>

        </CardHeader>
        <CardBody>

          <Stack paddingTop={5} spacing='3'>
            <Container align="center">
                <Image
                src = {image1}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                maxW="300px"
                />
            </Container>
            
            <Text fontWeight='bold' > Reward : </Text>
            <Text> - NFT d’une action du joueur </Text>
            <Text> - Maillot signé </Text>
            <Text> -10 % de rééduction sur la billetterie des matches à domicile</Text>
          </Stack>
        </CardBody>
        <Divider color='blue.300'/>
        <CardFooter>
               
                <Button marginLeft='40%' variant='solid' colorScheme='blue' onClick={mint}>
                Contribuer
                </Button>   

          
               

        </CardFooter>
      </Card>
    );
};

export default Buy;