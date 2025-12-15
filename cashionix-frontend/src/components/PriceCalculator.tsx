"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface PriceCalculatorProps {
  onQuoteGenerated?: (quote: number, deviceDetails: any) => void;
}

export default function PriceCalculator({ onQuoteGenerated }: PriceCalculatorProps) {
  const [deviceType, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const devicePrices = {
    phone: {
      apple: { base: 50000, models: { "iPhone 14 Pro": 1.2, "iPhone 13": 0.9, "iPhone 12": 0.7 } },
      samsung: { base: 35000, models: { "Galaxy S23": 1.1, "Galaxy S22": 0.8, "Galaxy A54": 0.6 } },
      oneplus: { base: 30000, models: { "OnePlus 11": 1.0, "OnePlus 10T": 0.8, "OnePlus Nord": 0.5 } },
      google: { base: 32000, models: { "Pixel 7": 1.0, "Pixel 6a": 0.7, "Pixel 5": 0.5 } },
      xiaomi: { base: 25000, models: { "13 Pro": 1.1, "12 Pro": 0.8, "11T": 0.6 } }
    },
    laptop: {
      apple: { base: 80000, models: { "MacBook Air M2": 1.2, "MacBook Pro 14": 1.8, "MacBook Air M1": 0.9 } },
      dell: { base: 45000, models: { "XPS 13": 1.1, "Inspiron 15": 0.7, "Latitude 7420": 0.9 } },
      hp: { base: 40000, models: { "Pavilion 15": 0.8, "Envy 13": 1.0, "EliteBook": 1.1 } },
      lenovo: { base: 42000, models: { "ThinkPad X1": 1.3, "IdeaPad 5": 0.7, "Legion 5": 1.0 } },
      asus: { base: 38000, models: { "ROG Strix": 1.2, "VivoBook": 0.6, "ZenBook": 1.0 } }
    }
  };

  const conditionMultipliers = {
    excellent: 0.8,
    verygood: 0.65,
    good: 0.5,
    fair: 0.35
  };

  const calculatePrice = async () => {
    if (!deviceType || !brand || !model || !condition) return;

    setIsCalculating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const deviceData = devicePrices[deviceType as keyof typeof devicePrices];
    const brandData = deviceData?.[brand as keyof typeof deviceData];
    
    if (brandData && typeof brandData === 'object' && 'base' in brandData) {
      const basePrice = brandData.base;
      const modelMultiplier = brandData.models[model as keyof typeof brandData.models] || 1;
      const conditionMultiplier = conditionMultipliers[condition as keyof typeof conditionMultipliers];
      
      const finalPrice = Math.round(basePrice * modelMultiplier * conditionMultiplier);
      setEstimatedPrice(finalPrice);
      
      const deviceDetails = { deviceType, brand, model, condition };
      onQuoteGenerated?.(finalPrice, deviceDetails);
    }
    
    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setDeviceType("");
    setBrand("");
    setModel("");
    setCondition("");
    setEstimatedPrice(null);
  };

  const getModelOptions = () => {
    if (!deviceType || !brand) return [];
    
    const deviceData = devicePrices[deviceType as keyof typeof devicePrices];
    const brandData = deviceData?.[brand as keyof typeof deviceData];
    
    if (brandData && typeof brandData === 'object' && 'models' in brandData) {
      return Object.keys(brandData.models);
    }
    
    return [];
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-gray-900">
          Quick Price Calculator
        </CardTitle>
        <CardDescription>
          Get instant quote for your device
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!estimatedPrice ? (
          <>
            {/* Device Type */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Device Type</label>
              <Select value={deviceType} onValueChange={setDeviceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            {deviceType && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Brand</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceType === 'phone' ? (
                      <>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="samsung">Samsung</SelectItem>
                        <SelectItem value="oneplus">OnePlus</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="xiaomi">Xiaomi</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="dell">Dell</SelectItem>
                        <SelectItem value="hp">HP</SelectItem>
                        <SelectItem value="lenovo">Lenovo</SelectItem>
                        <SelectItem value="asus">ASUS</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Model */}
            {brand && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {getModelOptions().map((modelOption) => (
                      <SelectItem key={modelOption} value={modelOption}>
                        {modelOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Condition */}
            {model && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Condition</label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="verygood">Very Good</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={calculatePrice}
              disabled={!deviceType || !brand || !model || !condition || isCalculating}
            >
              {isCalculating ? "Calculating..." : "Get Instant Quote"}
            </Button>
          </>
        ) : (
          <>
            {/* Quote Result */}
            <div className="text-center space-y-4">
              <div className="bg-green-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  ₹{estimatedPrice.toLocaleString()}
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Instant Quote
                </Badge>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div><span className="font-medium">Device:</span> {deviceType} - {brand} {model}</div>
                <div><span className="font-medium">Condition:</span> {condition}</div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Sell This Device
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={resetCalculator}
                >
                  Calculate Another Device
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}