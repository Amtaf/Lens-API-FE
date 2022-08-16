import { isTypeSystemDefinitionNode } from 'graphql'
import {useState,useEffect} from 'react'
import {client, recommendProfiles} from '../api'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [profiles,setProfiles] = useState([])
  useEffect(()=>{
    fetchProfiles()
  },[])

  async function fetchProfiles(){
    try{
      const response = await client.query(recommendProfiles).toPromise()
      console.log({response});
      setProfiles(response.data.recommendedProfiles)
    }catch(err){
      console.log({err})

    }

  }
  return(
    <div>
      {profiles.map((profile,index)=>(
        <Link href={`/profile/${profile.id}`}>
          <a>
            <div>
              <h2>{profile.handle}</h2>
              {
                profile.coverPicture ? (
                   <Image src={profile.coverPicture.original.url} width="300" height="300" alt="pic"/>
                ) :
                (
                  <div style={{
                    width: "300",
                    height: "300",
                    background: "purple"
                  }}
                  
                  />
                )
              }
              <h3>{profile.name}</h3>
              <p>{profile.bio}</p>

            </div>
          </a>
        </Link>
      ))}
  
      
    </div>
  )
}
