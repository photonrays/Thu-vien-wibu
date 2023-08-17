import { getPopularNewTitle } from '@/api/manga'
import {useEffect} from 'react'

export default function TestApi() {

    useEffect(() => {
      getPopularNewTitle().then(data => console.log(data)).catch(err => console.log(err))
    }, [])

  return (
    <div>TestApi</div>
  )
}
