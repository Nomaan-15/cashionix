"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface DeviceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeviceDetailPage({ params }: DeviceDetailPageProps) {
  const { id } = await params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock device data - in real app, this would be fetched based on id
  const device = {
    id: parseInt(id),
    name: "iPhone 14 Pro",
    brand: "Apple",
    price: 75000,
    originalPrice: 129900,
    condition: "Excellent",
    storage: "128GB",
    color: "Deep Purple",
    rating: 4.8,
    reviewCount: 156,
    availability: "In Stock",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aae609ea-12f1-4ba1-9ee0-3762088b33ab.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65951021-ce38-4784-aa33-1c6b71db3cfd.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b6696856-0663-4342-8edd-1d6d9e3ce553.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1f4643cd-2bda-4ab1-bfde-ab96d017ea3f.png"
    ],
    features: ["Face ID", "Triple Camera System", "A16 Bionic Chip", "5G Ready", "MagSafe Compatible"],
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A16 Bionic chip",
      "Storage": "128GB",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      "Battery": "Up to 23 hours video playback",
      "Operating System": "iOS 16",
      "Connectivity": "5G, Wi-Fi 6, Bluetooth 5.3",
      "Water Resistance": "IP68"
    },
    conditionReport: {
      screen: "Excellent - No scratches or cracks",
      body: "Excellent - Minor signs of use",
      battery: "95% battery health",
      functionality: "All features working perfectly"
    },
    warranty: "6 months InstaCash warranty",
    seller: {
      name: "InstaCash Verified",
      rating: 4.9,
      location: "Mumbai, Maharashtra"
    }
  };

  const discountPercentage = Math.round(((device.originalPrice - device.price) / device.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={device.images[selectedImage]}
                alt={device.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {device.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${device.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Device Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800">{device.condition}</Badge>
                <Badge variant="outline">{device.availability}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{device.name}</h1>
              <p className="text-lg text-gray-600">{device.storage} • {device.color}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {"★".repeat(Math.floor(device.rating))}
                {"☆".repeat(5 - Math.floor(device.rating))}
              </div>
              <span className="text-sm text-gray-600">
                {device.rating} ({device.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{device.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{device.originalPrice.toLocaleString()}
                </span>
                <Badge className="bg-red-100 text-red-800 text-lg px-3 py-1">
                  {discountPercentage}% OFF
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                You save ₹{(device.originalPrice - device.price).toLocaleString()}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {device.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-lg py-3">
                  Buy Now
                </Button>
                <Button variant="outline" className="flex-1 text-lg py-3">
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="py-3">
                  ♡
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{device.seller.name}</h4>
                    <p className="text-sm text-gray-600">{device.seller.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400">
                      ★ {device.seller.rating}
                    </div>
                    <p className="text-sm text-gray-600">Verified Seller</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="condition">Condition Report</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                  <CardDescription>Detailed technical information about this device</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(device.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="condition" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Condition Report</CardTitle>
                  <CardDescription>Detailed condition assessment by our experts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(device.conditionReport).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="font-semibold text-gray-900 capitalize mb-1">{key}</h4>
                        <p className="text-gray-700">{value}</p>
                        <Separator className="mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="warranty" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Warranty Information</CardTitle>
                  <CardDescription>Coverage and protection details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">InstaCash Warranty</h4>
                      <p className="text-green-700">{device.warranty}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">What's Covered:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Hardware defects and malfunctions</li>
                        <li>Battery performance issues</li>
                        <li>Display and touch functionality</li>
                        <li>Camera and audio components</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">What's Not Covered:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Physical damage from drops or water</li>
                        <li>Software issues or user modifications</li>
                        <li>Normal wear and tear</li>
                        <li>Accessories and third-party components</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>What customers say about this device</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Review Summary */}
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl font-bold text-gray-900">{device.rating}</div>
                      <div>
                        <div className="flex text-yellow-400 text-lg">
                          {"★".repeat(Math.floor(device.rating))}
                          {"☆".repeat(5 - Math.floor(device.rating))}
                        </div>
                        <p className="text-gray-600">{device.reviewCount} reviews</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Sample Reviews */}
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">Rahul S.</span>
                            <div className="flex text-yellow-400 text-sm">★★★★★</div>
                          </div>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-700">
                          Excellent condition as described. The device works perfectly and looks almost new. 
                          Fast delivery and great customer service from InstaCash.
                        </p>
                      </div>

                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">Priya M.</span>
                            <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                          </div>
                          <span className="text-sm text-gray-500">1 week ago</span>
                        </div>
                        <p className="text-gray-700">
                          Good value for money. The phone is in great condition with minor signs of use. 
                          Battery life is excellent and all features work as expected.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}