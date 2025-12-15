"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DeviceCardProps {
  device: {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    condition: string;
    rating: number;
    image: string;
    features: string[];
    storage?: string;
    color?: string;
    processor?: string;
    ram?: string;
    category?: string;
  };
  onBuyNow?: (deviceId: number) => void;
  onAddToWishlist?: (deviceId: number) => void;
}

export default function DeviceCard({ device, onBuyNow, onAddToWishlist }: DeviceCardProps) {
  const discountPercentage = Math.round(((device.originalPrice - device.price) / device.originalPrice) * 100);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardHeader className="p-4">
        <div className="relative">
          <img
            src={device.image}
            alt={device.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
            {device.condition}
          </Badge>
          {device.category && (
            <Badge className="absolute top-2 left-2 bg-blue-100 text-blue-800">
              {device.category}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
          {device.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {device.storage && device.color && `${device.storage} • ${device.color}`}
          {device.processor && device.ram && `${device.processor} • ${device.ram}`}
          {device.storage && device.processor && ` • ${device.storage}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ₹{device.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{device.originalPrice.toLocaleString()}
              </span>
            </div>
            <Badge variant="outline" className="text-green-600">
              {discountPercentage}% OFF
            </Badge>
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <div className="flex text-yellow-400 text-sm">
              {"★".repeat(Math.floor(device.rating))}
              {"☆".repeat(5 - Math.floor(device.rating))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({device.rating})</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {device.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {device.features.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{device.features.length - 2} more
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => onBuyNow?.(device.id)}
            >
              Buy Now
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onAddToWishlist?.(device.id)}
            >
              ♡
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}