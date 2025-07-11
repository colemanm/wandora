'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, MapPin, Star, Upload } from 'lucide-react'
import { AuthModal } from '@/components/auth/AuthModal'
import LocationPicker from '@/components/LocationPicker'

export default function CreateGemstone() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(!user)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location_name: '',
    latitude: 0,
    longitude: 0,
    user_rating: 5,
  })
  const [images, setImages] = useState<File[]>([])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in required</CardTitle>
            <CardDescription>
              You need to be signed in to create a gemstone
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const uploadImages = async (gemstoneId: string) => {
    const supabase = createClient()
    const uploadedImages = []
    
    for (let i = 0; i < images.length; i++) {
      const file = images[i]
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
          display_order: i,
        })

      if (insertError) throw insertError
      uploadedImages.push(publicUrl)
    }
    
    return uploadedImages
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      console.log('Creating gemstone with user_id:', user.id)
      console.log('Form data:', formData)
      
      // Create gemstone
      const { data: gemstone, error: gemstoneError } = await supabase
        .from('gemstones')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          location_name: formData.location_name,
          latitude: formData.latitude,
          longitude: formData.longitude,
          user_rating: formData.user_rating,
        })
        .select()
        .single()

      console.log('Gemstone creation result:', { gemstone, gemstoneError })

      if (gemstoneError) throw gemstoneError

      // Upload images if any
      if (images.length > 0) {
        console.log('Uploading images...')
        await uploadImages(gemstone.id)
      }

      console.log('Redirecting to gemstone:', gemstone.id)
      router.push(`/gemstone/${gemstone.id}`)
    } catch (err: any) {
      console.error('Error creating gemstone:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create a New Gemstone</CardTitle>
            <CardDescription>
              Share your travel experience with the world
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
                  disabled={loading}
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
                  disabled={loading}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <LocationPicker
                  initialLatitude={formData.latitude || undefined}
                  initialLongitude={formData.longitude || undefined}
                  onLocationChange={(lat, lng, address) => {
                    setFormData(prev => ({
                      ...prev,
                      latitude: lat,
                      longitude: lng,
                      location_name: address || prev.location_name,
                    }))
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Your Rating</Label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, user_rating: rating }))}
                      disabled={loading}
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

              <div className="space-y-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                {images.length > 0 && (
                  <p className="text-sm text-gray-600">
                    {images.length} image(s) selected
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Gemstone
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}