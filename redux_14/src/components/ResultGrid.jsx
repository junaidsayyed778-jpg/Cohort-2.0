import React, { useEffect } from 'react'
import { fetchPhotos, fetchVideos, fetchGIF } from '../api/mediaApi'
import { setLoading, setError, setResults } from '../features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'


const ResultGrid = () => {


  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector((store) => store.search)

  useEffect(() => {
      if (!query) {
        dispatch(setLoading(false))
        dispatch(setResults([]))
        return
      } 
   const tab = activeTab.toLowerCase()


    const getData = async () => {
      try {
        dispatch(setLoading(true))
      

        let data = []

        if (tab === "photos") {
          let response = await fetchPhotos(query)
          data = response.map((item) => ({
            id: item.id,
            title: item.alt_description,
            thumbnail: item.urls.small,
            src: item.urls.full
          }))
        } else if (tab === "videos") {
          let response = await fetchVideos(query)
          data = response.map((item) => ({
            id: item.id,
            type: 'video',
            title: item.user?.name || 'video',
            thumbnail: item.image,
            src: item.video_files[0].link
          }))
        } else if (tab === "gifs") {
          const response = await fetchGIF(query)
          data = response.map(item => ({
            id: item.id,
            title: item.title,
            thumbnail: item.images.fixed_width_small.url,
            src: item.images.original.url,
          }))
        }
        dispatch(setResults(data))
        console.log(data)

      } catch (err) {
        dispatch(setError("failed to fetch data"))
      } finally {
        dispatch(setLoading(false))
      }
    }

    getData()
  }, [query, activeTab, dispatch])
  if(error) return <h1>Error</h1>
  if(loading) return <h1>Loading...</h1>
  return (
    <div className="p-6">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {results.map((item) => (
      <ResultCard key={item.id} item={item} />
    ))}
  </div>
</div>


  )
}

export default ResultGrid