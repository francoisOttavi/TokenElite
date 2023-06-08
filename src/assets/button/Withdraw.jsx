import React from 'react';
import { Button,Container } from '@chakra-ui/react';
import {useState,useEffect} from 'react';
import Crowdfunding from '../../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json'
import {ethers, getDefaultProvider, Contract} from 'ethers';



const CFadresse = '0x0a4977A0b2c779Dff75ff9A3c29eEcD06fd16Ea0'
const ethersConfig = {
        ethers: { Contract },
        provider: getDefaultProvider("homestead")
    }


const Withdraw = () => {

    
    const [error, setError] = useState('');
    const [data, setData] = useState({});
    const [account, setAccount] = useState([]);

  


    useEffect(()=> {
        fetchData();
        getAccounts();
    
        }, [])

    async function getAccounts() {
      if(typeof window.ethereum != 'undefined'){
        let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        setAccount(accounts);
        console.log(accounts[0])
      }
      
    }
      
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

    async function withdraw () {
        if (typeof window.ethereum !== 'undefined'){
          let accounts = await window.ethereum.request({method:'eth_requestAccounts'});
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer =  provider.getSigner();
          const contract = new ethers.Contract(CFadresse,Crowdfunding.abi,signer);
    
          try{
           
            const transaction = await contract.withdraw();
            await transaction.wait();
            fetchData();
    
    
          }
          catch(err){
            setError(err.message);
          }
        }
    
      }

    return (
      <Container>
         {account[0] === '0xb75453260e2cce9869b81becaed8d50f6d83f545' && <Button backgroundColor='blue.500'  marginTop='2px' rounded='xl' colorScheme='blue' onClick={
          withdraw}> Withdraw </Button>}
      </Container>
       
        
    );
};

export default Withdraw;