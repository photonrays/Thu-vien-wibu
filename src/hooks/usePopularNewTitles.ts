import { getPopularNewTitle } from "@/api/manga"
import useSWR from 'swr'


export default function usePopularNewTitles() {
    const {data, isLoading, error} = useSWR('popularNewTitle', () => getPopularNewTitle()) 

    return {populars: data, popularLoading: isLoading, error}
}
