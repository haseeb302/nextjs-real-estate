import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

const Banner = ({purpose, ImageUrl, mainTitle, secondaryTitle, descriptionOne, descriptionTwo, linkName, buttonText}) => {
 return ( <Flex flexWrap="flex" justifyContent="center" alignItems="center" m="10">
    <Image src={ImageUrl} width={500} height={300} alt="banner"/>
    <Box>
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="xl" fontWeight="bold">{mainTitle} <br />  {secondaryTitle}</Text>
      <Text color="gray.700" fontSize="lg" paddingTop="3" paddingBottom="3">{descriptionOne} <br /> {descriptionTwo} </Text>
      <Button fontSize="xl">
      <Link href={linkName}>{buttonText}</Link>
      </Button>  
    </Box>
  </Flex>
 )
}

export default function Home({propertiesForSale, propertiesForRent}) {  
  return (
    <Box>
      <Banner 
        purpose="For Rent" 
        mainTitle="Rental Homes For"
        secondaryTitle="Everyone"
        descriptionOne="Explore Apartments, Villas, Homes"
        descriptionTwo="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        ImageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner 
        purpose="BUY a Home" 
        mainTitle="Find, Buy & Own Your"
        secondaryTitle="Dream Home"
        descriptionOne="Explore Apartments, Villas, Homes"
        descriptionTwo="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        ImageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
    </Box>    
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props : {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}