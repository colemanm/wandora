'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Gemstone } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Eye, Heart, BookmarkIcon, Calendar, ArrowLeft, Share2, Edit2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import StaticMap from '@/components/StaticMap'

const supabase = createClient()

export default function GemstoneDetail() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [gemstone, setGemstone] = useState<Gemstone | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (id) {
      fetchGemstone()
      if (user) {
        checkUserInteractions()
      }
    }
  }, [id, user])

  const fetchGemstone = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('gemstones')
        .select(`
          *,
          author:users(id, name, avatar_url),
          images:gemstone_images(image_url, display_order)
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      const processedGemstone = {
        ...data,
        images: data.images?.sort((a: any, b: any) => a.display_order - b.display_order) || []
      }

      setGemstone(processedGemstone)
      
      // Track view
      if (user) {
        await trackView()
      }
    } catch (err: any) {
      console.error('Error fetching gemstone:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const checkUserInteractions = async () => {
    if (!user || !id) return

    try {
      // Check if user has liked this gemstone
      const { data: likeData } = await supabase
        .from('gemstone_likes')
        .select('id')
        .eq('gemstone_id', id)
        .eq('user_id', user.id)
        .single()

      setIsLiked(!!likeData)

      // Check if user has saved this gemstone
      const { data: saveData } = await supabase
        .from('saved_gemstones')
        .select('id')
        .eq('gemstone_id', id)
        .eq('user_id', user.id)
        .single()

      setIsSaved(!!saveData)
    } catch (error) {
      // Errors are expected when no records exist
    }
  }

  const trackView = async () => {
    if (!user || !id) return

    try {
      await supabase
        .from('gemstone_views')
        .insert({
          gemstone_id: id,
          user_id: user.id
        })
    } catch (error) {
      // Ignore errors for view tracking
    }
  }

  const handleLike = async () => {
    if (!user || !id) return

    try {
      if (isLiked) {
        await supabase
          .from('gemstone_likes')
          .delete()
          .eq('gemstone_id', id)
          .eq('user_id', user.id)
        setIsLiked(false)
      } else {
        await supabase
          .from('gemstone_likes')
          .insert({
            gemstone_id: id,
            user_id: user.id
          })
        setIsLiked(true)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const handleSave = async () => {
    if (!user || !id) return

    try {
      if (isSaved) {
        await supabase
          .from('saved_gemstones')
          .delete()
          .eq('gemstone_id', id)
          .eq('user_id', user.id)
        setIsSaved(false)
      } else {
        await supabase
          .from('saved_gemstones')
          .insert({
            gemstone_id: id,
            user_id: user.id
          })
        setIsSaved(true)
      }
    } catch (error) {
      console.error('Error toggling save:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wandora-primary mx-auto"></div>
          <p className="mt-4 text-wandora-dark">Loading gemstone...</p>
        </div>
      </div>
    )
  }

  if (error || !gemstone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error || 'Gemstone not found'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/browse')} className="w-full">
              Browse Gemstones
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              {user && gemstone && user.id === gemstone.user_id && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/gemstone/${id}/edit`)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            {gemstone.images && gemstone.images.length > 0 && (
              <div className="space-y-4">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <Image
                    src={gemstone.images[0].image_url}
                    alt={gemstone.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {gemstone.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {gemstone.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="relative h-20 rounded overflow-hidden">
                        <Image
                          src={image.image_url}
                          alt={`${gemstone.title} ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={gemstone.author?.avatar_url} />
                      <AvatarFallback>
                        {gemstone.author?.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href={`/profile/${gemstone.author?.id}`}>
                        <p className="font-medium hover:text-wandora-600">{gemstone.author?.name}</p>
                      </Link>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {gemstone.created_at ? new Date(gemstone.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {gemstone.user_rating && (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        <span>{gemstone.user_rating}</span>
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{gemstone.title}</h1>
                  <p className="text-gray-600 flex items-center mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {gemstone.location_name}
                  </p>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {gemstone.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {gemstone.view_count || 0}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {gemstone.like_count || 0}
                    </span>
                  </div>

                  {user && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={isLiked ? "default" : "outline"}
                        size="sm"
                        onClick={handleLike}
                        className="flex items-center gap-2"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        {isLiked ? 'Liked' : 'Like'}
                      </Button>
                      <Button
                        variant={isSaved ? "default" : "outline"}
                        size="sm"
                        onClick={handleSave}
                        className="flex items-center gap-2"
                      >
                        <BookmarkIcon className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <StaticMap
                  latitude={gemstone.latitude}
                  longitude={gemstone.longitude}
                  width={320}
                  height={192}
                  zoom={13}
                  className="w-full"
                  alt={`Map of ${gemstone.location_name}`}
                />
                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-medium">{gemstone.location_name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {gemstone.latitude.toFixed(4)}, {gemstone.longitude.toFixed(4)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={gemstone.author?.avatar_url} />
                    <AvatarFallback>
                      {gemstone.author?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link href={`/profile/${gemstone.author?.id}`}>
                      <p className="font-medium hover:text-wandora-600">{gemstone.author?.name}</p>
                    </Link>
                    <p className="text-sm text-gray-500">Travel storyteller</p>
                  </div>
                </div>
                <Link href={`/profile/${gemstone.author?.id}`}>
                  <Button variant="outline" className="w-full mt-4">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}