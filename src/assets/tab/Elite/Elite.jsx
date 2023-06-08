import React from 'react';
import { Grid,GridItem } from '@chakra-ui/react';
import Buy from './Buy';
import Description from './Description';

const Elite = () => {
    return (
        <Grid
        h='800px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        paddingTop={10}
        >
        <GridItem rowSpan={2} colSpan={3}> 
            <Description/>
        </GridItem>

        <GridItem colSpan={2} >
            <Buy/>
        </GridItem>
        
        </Grid>
        
    );
};

export default Elite;