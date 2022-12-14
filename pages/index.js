import { isTypeSystemDefinitionNode } from 'graphql'
import {useState,useEffect} from 'react'
import {client, recommendProfiles,profileSearch} from '../api'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [profiles,setProfiles] = useState([])
  const [search,setSearch] = useState('')
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
  async function searchProfile(){
    try{
      const response = await client.query(profileSearch,{query: search, type: 'PROFILE'}).toPromise()
      const profileData = await Promise.all(response.data.search.items.map(async profile=>{
        profile.id = profile.profileId
        return profile
      }))
      setProfiles(profileData)

    }catch(err){
      console.log(err, "Profile not found")
    }
    console.log({profiles})
  }
  return(
    
    
    <div>
      <h2>Pri<span style={{color:"#ABFE2C"}}>mero3</span> 🌿</h2>
      <div style={{display: "flex", alignItems:"left"}}>
      <input type="text" placeholder="Search Profile" onChange={e=>setSearch(e.target.value)} value={search} />
      <button onClick={searchProfile} style={{backgroundColor: "#00501E", color:"#ABFE2C", padding: "10px" , fontSize: "16px", borderRadius: "4px", width:"150px"}}>Search Profile</button>
      </div>
      {profiles.map((profile,index)=>(
        <Link href={`/profile/${profile.id}`}>
          <a>
            <div style={{padding: '20px', borderTop: '1px solid pink'}}>
              <h2>{profile.handle}</h2>
              {
                profile.picture && profile.picture.original ? ( 
                   <Image src={profile.picture.original.url} width="300" height="300" alt="pic"/>
                ) :
                (
                  <div style={{width: "300",height: "300",background: "pink"
                  }}/>
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

