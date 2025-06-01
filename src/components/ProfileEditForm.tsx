
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, X } from "lucide-react";

interface ProfileEditFormProps {
  userData: {
    name: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
  };
  onSave: (updatedData: any) => void;
  onCancel: () => void;
}

const ProfileEditForm = ({ userData, onSave, onCancel }: ProfileEditFormProps) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    bio: userData.bio,
    location: userData.location,
    avatar: userData.avatar
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('ProfileEditForm rendered');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    onSave(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    console.log('Save button clicked - calling onSave directly');
    onSave(formData);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData(prev => ({ ...prev, avatar: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-wandora-charcoal">Edit Profile</h2>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={formData.avatar} alt={formData.name} />
            <AvatarFallback className="text-lg">
              {formData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" type="button" onClick={handlePhotoClick}>
            <Camera className="w-4 h-4 mr-2" />
            Change Photo
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Enter your location"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>
        </div>

        {/* Action Buttons - This should be visible */}
        <div className="flex gap-3 pt-6 border-t">
          <Button 
            type="button"
            onClick={handleSaveClick}
            className="flex-1 bg-wandora-terracotta hover:bg-wandora-terracotta/90 text-white"
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
