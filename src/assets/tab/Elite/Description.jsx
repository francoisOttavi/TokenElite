import React from 'react';
import { Card,
    CardBody,
    CardHeader,
    Text,
    Image,
    Container,
    Flex,
    Highlight,
} from '@chakra-ui/react';

const presentation = 
    <p>
    Bonjour à tous ! Mon nom est Wiliams, et je suis un étudiant-athlète en basket-ball à l'université [Nom de l'université] aux États-Unis. Je suis actuellement en train de chercher des moyens de financer mon logement pour la prochaine saison universitaire.

    J'ai commencé à jouer au basket-ball à un très jeune âge et je suis tombé amoureux du sport. C'est une passion que j'ai cultivée au fil des années en m'entraînant dur et en travaillant sur mes compétences. Grâce à mon acharnement et à ma persévérance, j'ai finalement été recruté par l'université [Nom de l'université] pour jouer au basket-ball universitaire. C'est une expérience incroyable, mais cela peut parfois être très coûteux.

    Être un étudiant-athlète universitaire aux États-Unis, c'est un véritable défi. En effet, les joueurs doivent souvent faire face à des dépenses importantes, notamment pour leur logement, leur nourriture, et les frais liés à leur sport. Bien que j'adore jouer au basket-ball et travailler dur pour atteindre mes objectifs, je sais que ces dépenses peuvent rapidement devenir un fardeau.

    Je suis très reconnaissant pour toute aide que vous pourriez apporter. Votre soutien me permettra de continuer à poursuivre ma passion pour le basket-ball et de réussir mes études universitaires sans avoir à me soucier de mes finances. Je suis conscient que chaque contribution, même la plus petite, est importante et je vous en serai extrêmement reconnaissant.

    Si vous décidez de faire un don, je tiens à vous remercier du fond du cœur. Grâce à votre soutien, je suis convaincu que je peux atteindre mon objectif et continuer à jouer au basket-ball universitaire tout en réussissant mes études. Encore une fois, merci beaucoup pour votre soutien et votre générosité !
    </p>

const Description = () => {
    return (
        <Card align='center' height='full' borderRadius='20'>
            <CardHeader>
                
            </CardHeader>
            <CardBody>
                <Flex marginBottom='40px'>
                <Image
                    boxSize='250px'
                    objectFit='cover'
                    src='https://bartonbulldogs.com/images/2022/10/14/MBBIsaiahWillianms.png?width=300'
                    alt='Dan Abramov'
                    borderRadius='10px'
                />


                
                <Container marginTop='20px'>
                <Text fontWeight='bold'>
                <Highlight query='Isaiah' styles={{ py: '1', fontWeight: 'normal' }}>
                    Prénom : Isaiah
                </Highlight>
                </Text>

                <Text fontWeight='bold'>
                <Highlight query='Williams' styles={{ py: '1', fontWeight: 'normal' }}>
                    Nom : Williams
                </Highlight>
                </Text>

                <Text fontWeight='bold'>
                <Highlight query='19' styles={{ py: '1', fontWeight: 'normal' }}>
                    Age : 19
                </Highlight>
                </Text>

                <Text fontWeight='bold'>
                <Highlight query='Basket-Ball' styles={{ py: '1', fontWeight: 'normal' }}>
                    Sport : Basket-Ball
                </Highlight>
                </Text>

                <Text fontWeight='bold'>
                <Highlight query='Ailier' styles={{ py: '1', fontWeight: 'normal' }}>
                    Poste : Ailier
                </Highlight>
                </Text>
                </Container>
                
                </Flex>
                <Text>{presentation}</Text>  



            </CardBody>

        </Card>
     
    );
};

export default Description;