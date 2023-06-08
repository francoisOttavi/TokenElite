import React from 'react';
import {useState,useEffect} from 'react'
import {ethers} from 'ethers'
import Crowdfunding from '../../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json'
import { NftProvider, useNft } from "use-nft"
import { getDefaultProvider, Contract } from "ethers"
import { Button,Card, CardHeader, Container, Heading, Image, Input, SimpleGrid } from '@chakra-ui/react';

const CFadresse = '0xD7e159904B92651f48C5A3C35134CE016047a555'
// const CFadresse = process.env.CONTRACT_ADRESSE
const ethersConfig = {
    ethers: { Contract },
    provider: getDefaultProvider("homestead")
  }


const Myteam = () => {
  const [error, setError] = useState('')
  const [data, setData] = useState({})

  const [nftId, setNftId] = useState('');
  const [email, setEmail] = useState('');


  const [selectNft,setSelectNft] = useState('2')
  const handleNftIdChange = (e) => {
    setNftId(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNFTSelection = (e) => {
    setSelectNft(e.target.value)
  }


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

  
  

 
    async function handleClaimReward () {
        if (typeof window.ethereum !== 'undefined'){
          let accounts = await window.ethereum.request({method:'eth_requestAccounts'});
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer =  provider.getSigner();
          const contract = new ethers.Contract(CFadresse,Crowdfunding.abi,signer);
          const balance = await provider.getBalance(CFadresse)
          console.log(balance)
  
          try{
           
            const transaction = await contract.claimReward(email,nftId);
            await transaction.wait();
            console.log("recompense réclamé")
  
  
          }
          catch(err){
            setError(err.message);
          }
        }
  
      }


  
    return (
        
            <NftProvider fetcher={["ethereum",ethersConfig]}>
              <SimpleGrid columns={3} spacing={10} paddingTop={5}>
                <Card borderRadius={10} centerContent > 
                <CardHeader>
                    <Heading> <Nft id = "1"/> </Heading>
                </CardHeader>
                <Input
                    type="number"
                    id="nftId"
                    value={nftId}
                    onChange={handleNftIdChange}
                    color='gray.300'
                    placeholder='NFT id'
                />
                <br />
                <Input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='e-mail'
                    color='gray.300'
                />
                   
    
                <br />
                <Button onClick={handleClaimReward}> Réclamer une récompense</Button>
            
        </Card>

        </SimpleGrid>
        </NftProvider>
  
                
        
    );

    
    function Nft({id}) {
        const { loading, error, nft } = useNft(
          CFadresse,
          id
        )
  
        // nft.loading is true during load.
        if (loading) return <>Loading…</>
  
        // nft.error is an Error instance in case of error.
        if (error || !nft) return <>Error.</>
  
        // You can now display the NFT metadata.
        return (   
          <Container centerContent>
            <Heading fontSize='2xl'> {nft.name} </Heading> 
            <Image src={nft.image} />
            
          </Container>  
            
        )}
};

export default Myteam;