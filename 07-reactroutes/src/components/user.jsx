import { useParams } from 'react-router-dom'

export default function User() {
  const { id } = useParams()

  if (!id) {
    return <h1>All Users Page</h1>   // when URL is just /user
  }

  return <h1>User Profile: {id}</h1>  // when URL is /user/:id
}
