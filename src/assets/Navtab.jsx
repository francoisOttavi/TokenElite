import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel,Heading,

  SimpleGrid,
  
} from '@chakra-ui/react'
import Myteam from './tab/Myteam';
import Withdraw from './button/Withdraw';
import Elite from './tab/Elite/Elite';

const Navtab = () => {
    return (
      <Tabs variant='unstyled' >


     
      <TabList   variant='soft-rounded' position='relative' backgroundColor='white' shadow='md'paddingTop='15px'>
                  <Heading paddingLeft='10px' paddingRight='20px' paddingTop='10px' color='dark' fontSize='3xl'>  EliteToken </Heading>
                  <Tab _hover={{color:'#000000'}}  _selected={{ color: 'black' }} fontSize='2xl' color='gray.500'> Project</Tab>
                  <Tab _hover={{color:'#000000'}}  _selected={{ color: 'black' }} fontSize='2xl' color='gray.500'> My Team</Tab>
                  <Withdraw/>  

      </TabList>


        <TabPanels>
          <TabPanel>
            <SimpleGrid>   
              <Elite/>
            </SimpleGrid>
           </TabPanel>

          <TabPanel>
            <SimpleGrid>
            
                <Myteam/>
             

            </SimpleGrid>
                    
          
          </TabPanel>

        </TabPanels>
      </Tabs>
    );
};

export default Navtab;