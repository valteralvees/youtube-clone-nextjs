import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Layout from 'src/components/Layout';
import VideoCard from 'src/components/VideoCard';
import {getVideos} from 'src/database/getVideos';

function Home({data}) {
  return (
    <Layout title="YouTube" >
     <Box p={2}>
       <Grid container spacing={4}>
         {data.map((item)=>(
           <Grid 
            key={item.id}
            item xl={3} lg={3} md={4} sm={6} xs={12}
            
           >
             <VideoCard item={item} />
           </Grid>

         ))}

       </Grid>
     </Box>
    </Layout>
  );
}

export async function getStaticProps(){
  // const data = [
  //   {
  //     id: 1,
  //     title: 'NEXT.JS: O FRAMEWORK QUE VOCÊ DEVERIA CONHECER[PARTE 1]',
  //     authorId: 1,
  //     authorName: 'Lucas Nhimi',
  //     authorAvatar: 'avatarUrl',
  //     views: 10,
  //     thumb: '/thumb/next01.jpg',
  //     videoUrl: 'url',
  //     updatedAt: new Date(),
  //   },
  //   {
  //     id: 2,
  //     title: 'NEXT.JS: MEU QUERIDO IRMÃO NEXTJS[PARTE 2]',
  //     authorId: 1,
  //     authorName: 'Lucas Nhimi',
  //     authorAvatar: 'avatarUrl',
  //     views: 10,
  //     thumb: '/thumb/next02.jpg',
  //     videoUrl: 'url',
  //     updatedAt: new Date(),
  //   },
  //   {
  //     id: 3,
  //     title: 'NEXT.JS: ROTAS ESTATICAS E DINÂMICAS[PARTE 3]',
  //     authorId: 1,
  //     authorName: 'Lucas Nhimi',
  //     authorAvatar: 'avatarUrl',
  //     views: 10,
  //     thumb: '/thumb/next03.jpg',
  //     videoUrl: 'url',
  //     updatedAt: new Date(),
  //   },
  // ];

  const data = await getVideos();

  return {
    props:{
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 15,
  };
}

export default Home;
