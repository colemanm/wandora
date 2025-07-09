'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Gemstone } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Heart, 
  BookmarkIcon, 
  PenTool, 
  MapPin, 
  Calendar, 
  Users, 
  Edit2, 
  Star,
  Eye,
  Loader2,
  Save,
  Upload,
  Camera
} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AuthModal } from '@/components/auth/AuthModal'
import Link from 'next/link'
import Image from 'next/image'

export default function Profile() {
  const { user, profile, updateProfile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(!user)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  
  const [publishedGemstones, setPublishedGemstones] = useState<Gemstone[]>([])
  const [likedGemstones, setLikedGemstones] = useState<Gemstone[]>([])
  const [savedGemstones, setSavedGemstones] = useState<Gemstone[]>([])
  
  const [stats, setStats] = useState({
    published: 0,
    liked: 0,
    saved: 0,
    followers: 0,
    following: 0
  })

  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    location: ''
  })
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarUploading, setAvatarUploading] = useState(false)

  const supabase = createClient()

  const fetchUserData = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // Fetch user's published gemstones
      const { data: published } = await supabase
        .from('gemstones')
        .select(`
          *,
          author:users(id, name, avatar_url),
          images:gemstone_images(image_url, display_order)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // Fetch user's liked gemstones
      const { data: liked } = await supabase
        .from('gemstone_likes')
        .select(`
          gemstone:gemstones(
            *,
            author:users(id, name, avatar_url),
            images:gemstone_images(image_url, display_order)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // Fetch user's saved gemstones
      const { data: saved } = await supabase
        .from('saved_gemstones')
        .select(`
          gemstone:gemstones(
            *,
            author:users(id, name, avatar_url),
            images:gemstone_images(image_url, display_order)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // Fetch follower counts
      const [followersResult, followingResult] = await Promise.all([
        supabase.from('follows').select('id').eq('following_id', user.id),
        supabase.from('follows').select('id').eq('follower_id', user.id)
      ])

      // Process data
      const processedPublished = published?.map(g => ({
        ...g,
        images: g.images?.sort((a: any, b: any) => a.display_order - b.display_order) || []
      })) || []

      const processedLiked = liked?.map((l: any) => ({
        ...l.gemstone,
        images: l.gemstone?.images?.sort((a: any, b: any) => a.display_order - b.display_order) || []
      })) || []

      const processedSaved = saved?.map((s: any) => ({
        ...s.gemstone,
        images: s.gemstone?.images?.sort((a: any, b: any) => a.display_order - b.display_order) || []
      })) || []

      setPublishedGemstones(processedPublished)
      setLikedGemstones(processedLiked)
      setSavedGemstones(processedSaved)
      setStats({
        published: processedPublished.length,
        liked: processedLiked.length,
        saved: processedSaved.length,
        followers: followersResult.data?.length || 0,
        following: followingResult.data?.length || 0
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user && profile) {
      setEditForm({
        name: profile.name || '',
        bio: profile.bio || '',
        location: profile.location || ''
      })
      // Only fetch if we don't have data yet
      if (publishedGemstones.length === 0 && likedGemstones.length === 0 && savedGemstones.length === 0) {
        fetchUserData()
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [user, profile])

  // Close modal when user is authenticated
  useEffect(() => {
    if (user) {
      setShowAuthModal(false)
    }
  }, [user])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return null

    const supabase = createClient()
    setAvatarUploading(true)
    try {
      const fileExt = avatarFile.name.split('.').pop()
      const fileName = `${user.id}/avatar.${fileExt}`
      
      // Delete old avatar if exists
      await supabase.storage
        .from('user-avatars')
        .remove([`${user.id}/avatar.jpg`, `${user.id}/avatar.png`, `${user.id}/avatar.jpeg`])

      // Upload new avatar
      const { data, error } = await supabase.storage
        .from('user-avatars')
        .upload(fileName, avatarFile, { upsert: true })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-avatars')
        .getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error('Error uploading avatar:', error)
      throw error
    } finally {
      setAvatarUploading(false)
    }
  }

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditLoading(true)
    setEditError(null)

    try {
      let updateData: any = { ...editForm }

      // Upload avatar if file selected
      if (avatarFile) {
        const avatarUrl = await uploadAvatar()
        if (avatarUrl) {
          updateData = { ...updateData, avatar_url: avatarUrl }
        }
      }

      const { error } = await updateProfile(updateData)

      if (error) {
        setEditError(error.message)
      } else {
        setIsEditProfileOpen(false)
        setAvatarFile(null)
        setAvatarPreview(null)
      }
    } catch (err: any) {
      setEditError(err.message)
    } finally {
      setEditLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in required</CardTitle>
            <CardDescription>
              You need to be signed in to view your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowAuthModal(true)} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wandora-primary mx-auto"></div>
          <p className="mt-4 text-wandora-dark">Loading your profile...</p>
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
            <Button onClick={fetchUserData} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const GemstoneCard = ({ gemstone }: { gemstone: Gemstone }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
          {gemstone.average_rating && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current" />
              <span>{gemstone.average_rating.toFixed(1)}</span>
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
              {gemstone.view_count}
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {gemstone.like_count}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/gemstone/${gemstone.id}/edit`}>
              <Button size="sm" variant="outline">
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </Link>
            <Link href={`/gemstone/${gemstone.id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white">
      {/* Hero Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative group">
                  <Avatar className="w-32 h-32 shadow-lg">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-wandora-primary to-wandora-600 text-white">
                      {profile?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                       onClick={() => setIsEditProfileOpen(true)}>
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">{profile?.name}</h1>
                    <Dialog 
                      open={isEditProfileOpen} 
                      onOpenChange={(open) => {
                        setIsEditProfileOpen(open)
                        if (!open) {
                          // Clear avatar preview when dialog closes
                          setAvatarFile(null)
                          setAvatarPreview(null)
                          setEditError(null)
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Update your profile information
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditProfile} className="space-y-4">
                          {editError && (
                            <Alert variant="destructive">
                              <AlertDescription>{editError}</AlertDescription>
                            </Alert>
                          )}
                          
                          {/* Avatar Upload Section */}
                          <div className="space-y-4">
                            <Label>Profile Picture</Label>
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-20 h-20">
                                <AvatarImage src={avatarPreview || profile?.avatar_url} />
                                <AvatarFallback className="bg-gradient-to-br from-wandora-primary to-wandora-600 text-white">
                                  {profile?.name?.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleAvatarChange}
                                  className="hidden"
                                  id="avatar-upload"
                                />
                                <Label htmlFor="avatar-upload" className="cursor-pointer">
                                  <Button type="button" variant="outline" className="w-full" asChild>
                                    <span>
                                      <Camera className="w-4 h-4 mr-2" />
                                      {avatarFile ? 'Change Photo' : 'Upload Photo'}
                                    </span>
                                  </Button>
                                </Label>
                                {avatarFile && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Selected: {avatarFile.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={editForm.name}
                              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={editForm.bio}
                              onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={editForm.location}
                              onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={editLoading || avatarUploading}>
                              {(editLoading || avatarUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              {avatarUploading ? 'Uploading...' : editLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {profile?.bio && (
                    <p className="text-gray-600 mb-6 max-w-2xl text-lg leading-relaxed">{profile.bio}</p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                    {profile?.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">{profile.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">
                        {(() => {
                          if (!profile?.created_at) return 'Joined Recently'
                          
                          const date = new Date(profile.created_at)
                          if (isNaN(date.getTime())) return 'Joined Recently'
                          
                          return `Joined ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                        })()}
                      </span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{stats.published}</div>
                      <div className="text-sm text-gray-600 font-medium">Published</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{stats.liked}</div>
                      <div className="text-sm text-gray-600 font-medium">Liked</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{stats.saved}</div>
                      <div className="text-sm text-gray-600 font-medium">Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{stats.followers}</div>
                      <div className="text-sm text-gray-600 font-medium">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{stats.following}</div>
                      <div className="text-sm text-gray-600 font-medium">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="published" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="published" className="flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                Published ({stats.published})
              </TabsTrigger>
              <TabsTrigger value="liked" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Liked ({stats.liked})
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <BookmarkIcon className="w-4 h-4" />
                Saved ({stats.saved})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="published" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Published Gemstones
                </h2>
                <p className="text-gray-600">
                  Stories you've shared with the Wandora community
                </p>
              </div>
              
              {publishedGemstones.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publishedGemstones.map((gemstone) => (
                    <GemstoneCard key={gemstone.id} gemstone={gemstone} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <PenTool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No published gemstones yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Share your first travel story with the community
                    </p>
                    <Link href="/create">
                      <Button>Create Your First Gemstone</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="liked" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Liked Gemstones
                </h2>
                <p className="text-gray-600">
                  Stories that inspired and moved you
                </p>
              </div>
              
              {likedGemstones.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {likedGemstones.map((gemstone) => (
                    <GemstoneCard key={gemstone.id} gemstone={gemstone} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No liked gemstones yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start exploring and like stories that resonate with you
                    </p>
                    <Link href="/browse">
                      <Button>Explore Gemstones</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Saved Gemstones
                </h2>
                <p className="text-gray-600">
                  Stories you want to revisit and remember
                </p>
              </div>
              
              {savedGemstones.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedGemstones.map((gemstone) => (
                    <GemstoneCard key={gemstone.id} gemstone={gemstone} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <BookmarkIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No saved gemstones yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Save stories you want to read again or use for inspiration
                    </p>
                    <Link href="/browse">
                      <Button>Explore Gemstones</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}