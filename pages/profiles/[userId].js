import Layout from '../../components/layout'
import { getAllProfileIds, getProfileData } from '../../lib/profile'


export const config = { amp: true }

export default function Profile({ profileData }) {
  return (
    <Layout>
      {profileData.fullname}
      <br />
      {profileData.description}
      <br />
      {profileData.date}
    </Layout>
  )
}

export async function getServerSideProps({}){
    const profileData = {
        fullname: 'Vaibhav Saharan',
        description: 'Just a teacher',
        data: '25-September-2020'
    }
    return {
        props:{
            profileData
        }
    }
}