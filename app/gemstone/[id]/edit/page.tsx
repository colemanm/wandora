'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Gemstone } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, MapPin, Star, Upload, ArrowLeft, Trash2 } from 'lucide-react'
import { AuthModal } from '@/components/auth/AuthModal'
import Image from 'next/image'

const supabase = createClient()

export default function EditGemstone() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(!user)
  const [gemstone, setGemstone] = useState<Gemstone | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location_name: '',
    latitude: 0,
    longitude: 0,
    user_rating: 5,
  })
  const [newImages, setNewImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<any[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

  useEffect(() => {
    if (id && user) {
      fetchGemstone()
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
          images:gemstone_images(id, image_url, display_order)
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      // Check if user owns this gemstone
      if (data.user_id !== user?.id) {
        setError('You do not have permission to edit this gemstone')
        return
      }

      setGemstone(data)
      setFormData({
        title: data.title,
        description: data.description,
        location_name: data.location_name,
        latitude: data.latitude,
        longitude: data.longitude,
        user_rating: data.user_rating,
      })
      setExistingImages(data.images?.sort((a: any, b: any) => a.display_order - b.display_order) || [])
    } catch (err: any) {
      console.error('Error fetching gemstone:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files))
    }
  }

  const handleDeleteExistingImage = (imageId: string) => {
    setImagesToDelete(prev => [...prev, imageId])
    setExistingImages(prev => prev.filter(img => img.id !== imageId))
  }

  const uploadNewImages = async (gemstoneId: string) => {
    const uploadedImages = []
    
    for (let i = 0; i < newImages.length; i++) {
      const file = newImages[i]
      const fileExt = file.name.split('.').pop()
      const fileName = `${gemstoneId}/${Date.now()}-${i}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('gemstone-images')
        .upload(fileName, file)

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gemstone-images')
        .getPublicUrl(fileName)

      // Insert image record
      const { error: insertError } = await supabase
        .from('gemstone_images')
        .insert({
          gemstone_id: gemstoneId,
          image_url: publicUrl,
          display_order: existingImages.length + i,
        })

      if (insertError) throw insertError
      uploadedImages.push(publicUrl)
    }
    
    return uploadedImages
  }

  const deleteImages = async () => {
    for (const imageId of imagesToDelete) {
      // Delete from database
      const { error } = await supabase
        .from('gemstone_images')
        .delete()
        .eq('id', imageId)

      if (error) throw error

      // Note: We're not deleting from storage here for simplicity
      // In production, you'd want to delete the actual files too
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      // Update gemstone
      const { error: updateError } = await supabase
        .from('gemstones')
        .update({
          title: formData.title,
          description: formData.description,
          location_name: formData.location_name,
          latitude: formData.latitude,
          longitude: formData.longitude,
          user_rating: formData.user_rating,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (updateError) throw updateError

      // Delete removed images
      if (imagesToDelete.length > 0) {
        await deleteImages()
      }

      // Upload new images
      if (newImages.length > 0) {
        await uploadNewImages(id as string)
      }

      router.push(`/gemstone/${id}`)
    } catch (err: any) {
      console.error('Error updating gemstone:', err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }))
        },
        (error) => {
          setError('Could not get your location. Please enter coordinates manually.')
        }
      )
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in required</CardTitle>
            <CardDescription>
              You need to be signed in to edit a gemstone
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
          onClose={() => {
            setShowAuthModal(false)
            router.push('/')
          }} 
        />
      </div>
    )
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/profile')} className="w-full">
              Go to Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white py-12 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push(`/gemstone/${id}`)}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gemstone
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Gemstone</CardTitle>
            <CardDescription>
              Update your travel experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your experience a catchy title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your experience..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  disabled={saving}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Where did this happen?"
                  value={formData.location_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
                  required
                  disabled={saving}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    placeholder="0.000000"
                    value={formData.latitude || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                    required
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    placeholder="0.000000"
                    value={formData.longitude || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                    required
                    disabled={saving}
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={setCurrentLocation}
                className="w-full"
                disabled={saving}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Use Current Location
              </Button>

              <div className="space-y-2">
                <Label htmlFor="rating">Your Rating</Label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, user_rating: rating }))}
                      disabled={saving}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= formData.user_rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="space-y-2">
                  <Label>Current Images</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {existingImages.map((image) => (
                      <div key={image.id} className="relative">
                        <div className="relative w-full h-24 rounded-lg overflow-hidden">
                          <Image
                            src={image.image_url}
                            alt="Gemstone image"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteExistingImage(image.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 p-0"
                          disabled={saving}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              <div className="space-y-2">
                <Label htmlFor="images">Add New Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={saving}
                />
                {newImages.length > 0 && (
                  <p className="text-sm text-gray-600">
                    {newImages.length} new image(s) selected
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/gemstone/${id}`)}
                  disabled={saving}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="flex-1">
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}