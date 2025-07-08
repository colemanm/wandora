'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Gemstone } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MapPin, Star, Eye, Bookmark } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function BrowseGemstones() {
  const [gemstones, setGemstones] = useState<Gemstone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    fetchGemstones()
  }, [user]) // Re-fetch when user changes to update liked/saved states

  const fetchGemstones = async () => {
    try {
      const { data, error } = await supabase
        .from('gemstones')
        .select(`
          *,
          author:users(id, name, avatar_url),
          images:gemstone_images(image_url, display_order)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Process gemstones to add computed fields
      const processedGemstones = await Promise.all(
        data.map(async (gemstone: any) => {
          // Get average rating
          const { data: ratings } = await supabase
            .from('gemstone_ratings')
            .select('rating')
            .eq('gemstone_id', gemstone.id)

          const averageRating = ratings && ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : null

          // Check if current user has liked/saved this gemstone
          let isLiked = false
          let isSaved = false
          let currentUserRating = null

          if (user) {
            const [likeResult, saveResult, ratingResult] = await Promise.all([
              supabase.from('gemstone_likes').select('id').eq('gemstone_id', gemstone.id).eq('user_id', user.id).single(),
              supabase.from('saved_gemstones').select('id').eq('gemstone_id', gemstone.id).eq('user_id', user.id).single(),
              supabase.from('gemstone_ratings').select('rating').eq('gemstone_id', gemstone.id).eq('user_id', user.id).single()
            ])

            isLiked = !likeResult.error
            isSaved = !saveResult.error
            currentUserRating = ratingResult.data?.rating || null
          }

          return {
            ...gemstone,
            average_rating: averageRating,
            current_user_rating: currentUserRating,
            is_liked: isLiked,
            is_saved: isSaved,
            images: gemstone.images.sort((a: any, b: any) => a.display_order - b.display_order)
          }
        })
      )

      setGemstones(processedGemstones)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (gemstoneId: string) => {
    if (!user) return

    const gemstone = gemstones.find(g => g.id === gemstoneId)
    if (!gemstone) return

    try {
      if (gemstone.is_liked) {
        // Unlike
        await supabase
          .from('gemstone_likes')
          .delete()
          .eq('gemstone_id', gemstoneId)
          .eq('user_id', user.id)
      } else {
        // Like
        await supabase
          .from('gemstone_likes')
          .insert({ gemstone_id: gemstoneId, user_id: user.id })
      }

      // Update local state
      setGemstones(prev => prev.map(g => 
        g.id === gemstoneId 
          ? { 
              ...g, 
              is_liked: !g.is_liked,
              like_count: g.is_liked ? g.like_count - 1 : g.like_count + 1
            }
          : g
      ))
    } catch (err: any) {
      console.error('Error toggling like:', err)
    }
  }

  const handleSave = async (gemstoneId: string) => {
    if (!user) return

    const gemstone = gemstones.find(g => g.id === gemstoneId)
    if (!gemstone) return

    try {
      if (gemstone.is_saved) {
        // Unsave
        await supabase
          .from('saved_gemstones')
          .delete()
          .eq('gemstone_id', gemstoneId)
          .eq('user_id', user.id)
      } else {
        // Save
        await supabase
          .from('saved_gemstones')
          .insert({ gemstone_id: gemstoneId, user_id: user.id })
      }

      // Update local state
      setGemstones(prev => prev.map(g => 
        g.id === gemstoneId 
          ? { ...g, is_saved: !g.is_saved }
          : g
      ))
    } catch (err: any) {
      console.error('Error toggling save:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wandora-primary mx-auto"></div>
          <p className="mt-4 text-wandora-dark">Loading gemstones...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchGemstones} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wandora-dark mb-2">
            Discover Travel Gemstones
          </h1>
          <p className="text-wandora-dark/70">
            Explore authentic travel experiences shared by fellow wanderers
          </p>
        </div>

        {gemstones.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold text-wandora-dark mb-2">
                No gemstones yet
              </h3>
              <p className="text-wandora-dark/70 mb-4">
                Be the first to share your travel experience!
              </p>
              <Link href="/create">
                <Button>Create First Gemstone</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {gemstones.map((gemstone) => (
              <Card key={gemstone.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={gemstone.author?.avatar_url} />
                        <AvatarFallback>
                          {gemstone.author?.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{gemstone.author?.name}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {gemstone.location_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {gemstone.average_rating && (
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{gemstone.average_rating.toFixed(1)}</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{gemstone.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{gemstone.description}</p>
                  </div>

                  {gemstone.images && gemstone.images.length > 0 && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={gemstone.images[0].image_url}
                        alt={gemstone.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {gemstone.view_count}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {gemstone.like_count}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {user && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(gemstone.id)}
                            className={gemstone.is_liked ? 'text-red-500' : ''}
                          >
                            <Heart className={`w-4 h-4 ${gemstone.is_liked ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSave(gemstone.id)}
                            className={gemstone.is_saved ? 'text-blue-500' : ''}
                          >
                            <Bookmark className={`w-4 h-4 ${gemstone.is_saved ? 'fill-current' : ''}`} />
                          </Button>
                        </>
                      )}
                      <Link href={`/gemstone/${gemstone.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}