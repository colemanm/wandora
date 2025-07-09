'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Gemstone } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Star, Eye, Heart, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Create a single instance outside the component
const supabase = createClient()

export default function Browse() {
  const [gemstones, setGemstones] = useState<Gemstone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [dataFetched, setDataFetched] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!dataFetched) {
      fetchGemstones()
    }
  }, [dataFetched])

  const fetchGemstones = async () => {
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
        .order('created_at', { ascending: false })

      if (error) throw error

      const processedGemstones = data?.map((gemstone: any) => ({
        ...gemstone,
        images: gemstone.images?.sort((a: any, b: any) => a.display_order - b.display_order) || []
      })) || []

      setGemstones(processedGemstones)
      setDataFetched(true)
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredGemstones = gemstones.filter(gemstone =>
    gemstone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gemstone.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gemstone.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <CardTitle>Error Loading Gemstones</CardTitle>
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
    <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white">
      {/* Header */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Travel Gems
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore authentic travel experiences shared by fellow wanderers
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search destinations, experiences, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
          
          <div className="text-center text-gray-600">
            {filteredGemstones.length} travel gem{filteredGemstones.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* Gemstones Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredGemstones.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No gemstones match your search.' : 'No gemstones found.'}
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGemstones.map((gemstone) => (
                <Card key={gemstone.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={gemstone.author?.avatar_url} />
                          <AvatarFallback>
                            {gemstone.author?.name?.slice(0, 2).toUpperCase() || 'W'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{gemstone.author?.name || 'Anonymous'}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {gemstone.location_name}
                          </p>
                        </div>
                      </div>
                      {gemstone.user_rating && (
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{gemstone.user_rating}</span>
                        </Badge>
                      )}
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
                          {gemstone.view_count || 0}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {gemstone.like_count || 0}
                        </span>
                      </div>

                      <Link href={`/gemstone/${gemstone.id}`}>
                        <Button size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}