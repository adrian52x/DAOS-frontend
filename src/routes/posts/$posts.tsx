import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import PostDetails from '../../components/PostDetails' // Adjust path as needed based on your project structure

export const Route = createFileRoute('/posts/$posts')({
  component: PostDetailsRoute,
})

function PostDetailsRoute() {
  const { postId } = Route.useParams()
  const [postData, setPostData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true)
        setError(null) // Reset error before fetching

        const response = await fetch(
          `http://localhost:3000/api/posts/${postId}`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch post data')
        }
        const data = await response.json()

        // Add missing fields to the response
        const enrichedData = {
          ...data,
          createdAt: '13. august 2020', // Hardcoded example
          organization: {
            name: 'Musician Network', // Hardcoded example
            location: 'Copenhagen', // Hardcoded example
            size: '10 - 20 musicians', // Hardcoded example
          },
          minimumLevel: {
            level: 3, // Hardcoded example
            description:
              'Suitable for someone with 2-4 years of experience and basic sight-reading skills.', // Hardcoded example
          },
        }

        setPostData(enrichedData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchPostData()
  }, [postId])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!postData) {
    return <p>No data available</p>
  }

  return <PostDetails postData={postData} />
}

export default PostDetailsRoute
