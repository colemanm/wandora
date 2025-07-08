"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import GemstoneForm from "@/components/GemstoneForm";
import ShareGemstoneHeader from "@/components/ShareGemstoneHeader";
import ShareGemstoneGuide from "@/components/ShareGemstoneGuide";
import ShareGemstonePromo from "@/components/ShareGemstonePromo";

export default function ShareGemstone() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    author: "",
    email: "",
    story: "",
    tips: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Image file:', imageFile);
    toast({
      title: "Thank you for creating!",
      description: "Your travel gemstone has been created and will be reviewed by our team.",
    });
    setFormData({
      title: "",
      location: "",
      author: "",
      email: "",
      story: "",
      tips: "",
    });
    setImageFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  return (
    <div className="min-h-screen bg-wandora-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShareGemstoneHeader />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GemstoneForm
              formData={formData}
              imageFile={imageFile}
              onSubmit={handleSubmit}
              onChange={handleChange}
              onImageChange={handleImageChange}
            />
          </div>

          <div className="space-y-6">
            <ShareGemstoneGuide />
            <ShareGemstonePromo />
          </div>
        </div>
      </div>
    </div>
  );
}