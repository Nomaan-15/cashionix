"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { LogOut, User, CheckCircle2, X } from "lucide-react";

// Model data structure (same as before)
const deviceModels = {
  phone: {
    apple: [
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15 Plus",
      "iPhone 15",
      "iPhone 14 Pro Max",
      "iPhone 14 Pro",
      "iPhone 14 Plus",
      "iPhone 14",
      "iPhone 13 Pro Max",
      "iPhone 13 Pro",
      "iPhone 13",
      "iPhone 13 Mini",
      "iPhone 12 Pro Max",
      "iPhone 12 Pro",
      "iPhone 12",
      "iPhone 12 Mini",
      "iPhone 11 Pro Max",
      "iPhone 11 Pro",
      "iPhone 11",
      "iPhone SE (2022)",
      "iPhone SE (2020)",
    ],
    samsung: [
      "Galaxy S24 Ultra",
      "Galaxy S24+",
      "Galaxy S24",
      "Galaxy S23 Ultra",
      "Galaxy S23+",
      "Galaxy S23",
      "Galaxy S22 Ultra",
      "Galaxy S22+",
      "Galaxy S22",
      "Galaxy S21 Ultra",
      "Galaxy S21+",
      "Galaxy S21",
      "Galaxy Z Fold 5",
      "Galaxy Z Fold 4",
      "Galaxy Z Flip 5",
      "Galaxy Z Flip 4",
      "Galaxy A54",
      "Galaxy A34",
      "Galaxy A14",
    ],
    oneplus: [
      "OnePlus 12",
      "OnePlus 11",
      "OnePlus 10 Pro",
      "OnePlus 10T",
      "OnePlus 9 Pro",
      "OnePlus 9",
      "OnePlus 8T",
      "OnePlus 8 Pro",
      "OnePlus Nord 3",
      "OnePlus Nord 2T",
      "OnePlus Nord CE 3",
    ],
    google: [
      "Pixel 8 Pro",
      "Pixel 8",
      "Pixel 7 Pro",
      "Pixel 7",
      "Pixel 6 Pro",
      "Pixel 6",
      "Pixel 6a",
    ],
    xiaomi: [
      "Xiaomi 13 Pro",
      "Xiaomi 13",
      "Xiaomi 12 Pro",
      "Xiaomi 12",
      "Redmi Note 13 Pro",
      "Redmi Note 12 Pro",
      "Redmi Note 11 Pro",
    ],
    oppo: [
      "Reno 11 Pro",
      "Reno 10 Pro",
      "Find X6 Pro",
      "Find X5 Pro",
      "F23",
      "F21 Pro",
      "A78",
    ],
    vivo: ["V29 Pro", "V27 Pro", "X90 Pro", "X80 Pro", "T2 Pro", "Y100", "Y56"],
    realme: [
      "GT 3",
      "GT 2 Pro",
      "11 Pro+",
      "10 Pro+",
      "Narzo 60 Pro",
      "Narzo 50 Pro",
    ],
  },
  laptop: {
    apple: [
      "MacBook Air M3 (2024)",
      "MacBook Air M2 (2023)",
      "MacBook Air M1 (2020)",
      "MacBook Pro 16-inch M3 Max",
      "MacBook Pro 16-inch M2 Pro",
      "MacBook Pro 16-inch M1 Pro",
      "MacBook Pro 14-inch M3 Pro",
      "MacBook Pro 14-inch M2 Pro",
      "MacBook Pro 14-inch M1 Pro",
      "MacBook Pro 13-inch M2",
      "MacBook Pro 13-inch M1",
    ],
    dell: [
      "XPS 15 (2024)",
      "XPS 13 (2024)",
      "XPS 17 (2023)",
      "Inspiron 15 5000",
      "Inspiron 14 5000",
      "Inspiron 16 Plus",
      "Latitude 5530",
      "Latitude 7430",
      "Vostro 15 3000",
    ],
    hp: [
      "Spectre x360 16",
      "Spectre x360 14",
      "Envy 15",
      "Envy 13",
      "Pavilion 15",
      "Pavilion 14",
      "Pavilion Gaming 15",
      "EliteBook 840 G9",
      "ProBook 450 G9",
    ],
    lenovo: [
      "ThinkPad X1 Carbon Gen 11",
      "ThinkPad X1 Yoga Gen 8",
      "ThinkPad T14 Gen 4",
      "IdeaPad Slim 5",
      "IdeaPad Gaming 3",
      "IdeaPad Flex 5",
      "Legion 5 Pro",
      "Legion 7i",
      "Yoga 9i",
    ],
    asus: [
      "ZenBook 14 OLED",
      "ZenBook Pro 15",
      "VivoBook 15",
      "ROG Zephyrus G14",
      "ROG Strix G15",
      "TUF Gaming A15",
    ],
    acer: [
      "Swift 3",
      "Swift 5",
      "Aspire 5",
      "Aspire 7",
      "Predator Helios 300",
      "Nitro 5",
      "Chromebook Spin 713",
    ],
    msi: [
      "GE78 Raider",
      "GS66 Stealth",
      "Katana 15",
      "Modern 14",
      "Prestige 14",
      "Creator Z16",
    ],
  },
};

// Questionnaire structure (same as before)
const questionnaireData = {
  phone: [
    {
      id: "warranty",
      question: "OEM / Brand warranty Utilized",
      options: [
        { value: "0-3months", label: "0 to 3 months", info: null },
        { value: "3-10months", label: "3 to 10 months", info: null },
        {
          value: "notavailable",
          label: "Not available",
          info: "Original valid bill is not available Warranty void as device undergone repair Device was purchased more than a year ago",
        },
        { value: "10+months", label: "More than 10 Months", info: null },
      ],
    },
    {
      id: "switch",
      question: "Does your device switch On?",
      options: [
        { value: "on", label: "ON", info: null },
        { value: "off", label: "OFF", info: null },
      ],
    },
    {
      id: "screen",
      question: "Has the screen of your device ever been replaced?",
      options: [
        {
          value: "original",
          label: "Screen is original and has never been replaced.",
          info: null,
        },
        {
          value: "replaced-original",
          label:
            "Screen has been replaced with an original screen (proof of replacement available).",
          info: null,
        },
        {
          value: "replaced-aftermarket",
          label:
            "Screen has been replaced with an aftermarket or duplicate screen",
          info: null,
        },
      ],
    },
    {
      id: "display",
      question: "Is the display of your device working properly?",
      options: [
        { value: "flawless", label: "Flawless - No issues", info: null },
        {
          value: "minor",
          label:
            "Minor - Display has minor issues (light bleeding, slight discoloration)",
          info: null,
        },
        {
          value: "major",
          label:
            "Major - Display has major issues (dead pixels, lines, flickering)",
          info: null,
        },
      ],
    },
    {
      id: "touch",
      question: "Is the touch working properly on your device?",
      options: [
        {
          value: "working",
          label: "Yes - Touch is fully functional",
          info: null,
        },
        {
          value: "partial",
          label: "Partial - Touch works in some areas",
          info: null,
        },
        { value: "notworking", label: "No - Touch is not working", info: null },
      ],
    },
    {
      id: "body",
      question: "What is the body condition of your device?",
      options: [
        {
          value: "flawless",
          label: "Flawless - No scratches or dents",
          info: null,
        },
        {
          value: "good",
          label: "Good - Minor scratches but no dents",
          info: null,
        },
        {
          value: "average",
          label: "Average - Noticeable scratches and minor dents",
          info: null,
        },
        {
          value: "poor",
          label: "Poor - Heavy scratches and dents",
          info: null,
        },
      ],
    },
    {
      id: "back",
      question: "What is the condition of the back panel?",
      options: [
        {
          value: "flawless",
          label: "Flawless - No scratches or cracks",
          info: null,
        },
        { value: "minor", label: "Minor - Light scratches", info: null },
        {
          value: "cracked",
          label: "Cracked - Back glass is cracked",
          info: null,
        },
      ],
    },
    {
      id: "camera",
      question: "Are all cameras working properly?",
      options: [
        {
          value: "all-working",
          label: "Yes - All cameras work perfectly",
          info: null,
        },
        {
          value: "some-issues",
          label: "Some issues - One or more cameras have issues",
          info: null,
        },
        {
          value: "not-working",
          label: "Not working - Cameras don't work",
          info: null,
        },
      ],
    },
    {
      id: "battery",
      question: "What is the battery health status?",
      options: [
        {
          value: "85-100",
          label: "85-100% - Excellent battery health",
          info: null,
        },
        { value: "70-84", label: "70-84% - Good battery health", info: null },
        {
          value: "below-70",
          label: "Below 70% - Poor battery health",
          info: null,
        },
      ],
    },
    {
      id: "faceid",
      question: "Is Face ID/Biometric working? (if applicable)",
      options: [
        { value: "working", label: "Yes - Working perfectly", info: null },
        { value: "not-working", label: "No - Not working", info: null },
        {
          value: "not-applicable",
          label: "Not applicable for this model",
          info: null,
        },
      ],
    },
    {
      id: "accessories",
      question: "Do you have the original box and accessories?",
      options: [
        {
          value: "all",
          label: "Yes - Box, charger, and all accessories",
          info: null,
        },
        {
          value: "partial",
          label: "Partial - Some accessories available",
          info: null,
        },
        { value: "none", label: "No - No box or accessories", info: null },
      ],
    },
  ],
  laptop: [
    {
      id: "warranty",
      question: "OEM / Brand warranty Utilized",
      options: [
        { value: "0-3months", label: "0 to 3 months", info: null },
        { value: "3-10months", label: "3 to 10 months", info: null },
        {
          value: "notavailable",
          label: "Not available",
          info: "Original valid bill is not available Warranty void as device undergone repair Device was purchased more than a year ago",
        },
        { value: "10+months", label: "More than 10 Months", info: null },
      ],
    },
    {
      id: "switch",
      question: "Does your laptop switch On?",
      options: [
        { value: "on", label: "ON", info: null },
        { value: "off", label: "OFF", info: null },
      ],
    },
    {
      id: "screen",
      question: "What is the screen condition?",
      options: [
        {
          value: "flawless",
          label: "Flawless - No scratches or damage",
          info: null,
        },
        { value: "minor", label: "Minor - Light scratches", info: null },
        { value: "cracked", label: "Cracked or broken screen", info: null },
      ],
    },
    {
      id: "keyboard",
      question: "Is the keyboard working properly?",
      options: [
        { value: "perfect", label: "Perfect - All keys working", info: null },
        { value: "some-issues", label: "Some keys not working", info: null },
        { value: "major-issues", label: "Major keyboard issues", info: null },
      ],
    },
    {
      id: "trackpad",
      question: "Is the trackpad working properly?",
      options: [
        { value: "working", label: "Yes - Working perfectly", info: null },
        { value: "issues", label: "Has issues", info: null },
        { value: "not-working", label: "Not working", info: null },
      ],
    },
    {
      id: "body",
      question: "What is the body condition?",
      options: [
        {
          value: "flawless",
          label: "Flawless - No dents or scratches",
          info: null,
        },
        { value: "good", label: "Good - Minor scratches", info: null },
        {
          value: "average",
          label: "Average - Visible wear and tear",
          info: null,
        },
        { value: "poor", label: "Poor - Major dents or damage", info: null },
      ],
    },
    {
      id: "battery",
      question: "What is the battery backup?",
      options: [
        { value: "4+hours", label: "4+ hours - Excellent", info: null },
        { value: "2-4hours", label: "2-4 hours - Good", info: null },
        { value: "1-2hours", label: "1-2 hours - Average", info: null },
        { value: "below-1hour", label: "Below 1 hour - Poor", info: null },
      ],
    },
    {
      id: "ports",
      question: "Are all ports working properly?",
      options: [
        { value: "all-working", label: "Yes - All ports working", info: null },
        { value: "some-issues", label: "Some ports have issues", info: null },
        {
          value: "not-working",
          label: "Multiple ports not working",
          info: null,
        },
      ],
    },
    {
      id: "hinges",
      question: "What is the condition of hinges?",
      options: [
        { value: "perfect", label: "Perfect - No issues", info: null },
        { value: "loose", label: "Loose hinges", info: null },
        { value: "broken", label: "Broken or damaged hinges", info: null },
      ],
    },
    {
      id: "accessories",
      question: "Do you have the original charger and box?",
      options: [
        { value: "all", label: "Yes - Charger and box available", info: null },
        { value: "charger-only", label: "Charger only", info: null },
        { value: "none", label: "No accessories", info: null },
      ],
    },
  ],
};

export default function SellDevicePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [deviceType, setDeviceType] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  // ⭐ NEW: Store device info when user needs to login
  const [pendingDeviceInfo, setPendingDeviceInfo] = useState(null);

  // Contact form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ⭐ NEW: Effect to handle authentication success
  useEffect(() => {
    // When user logs in and we have pending device info, restore it and start questionnaire
    if (user && pendingDeviceInfo && !showQuestionnaire) {
      console.log("Restoring device info after login:", pendingDeviceInfo);
      setDeviceType(pendingDeviceInfo.deviceType);
      setDeviceBrand(pendingDeviceInfo.deviceBrand);
      setDeviceModel(pendingDeviceInfo.deviceModel);

      // Start questionnaire after a brief delay to ensure state is set
      setTimeout(() => {
        setShowQuestionnaire(true);
        setCurrentQuestionIndex(0);
        setQuestionnaireAnswers({});
        setPendingDeviceInfo(null); // Clear pending info
      }, 100);
    }
  }, [user, pendingDeviceInfo, showQuestionnaire]);

  // Get available models based on selected device type and brand
  const getAvailableModels = () => {
    if (!deviceType || !deviceBrand) return [];
    return deviceModels[deviceType]?.[deviceBrand] || [];
  };

  // Get questionnaire for current device type
  const getCurrentQuestionnaire = () => {
    return questionnaireData[deviceType] || [];
  };

  const startQuestionnaire = () => {
    // Check authentication before starting questionnaire
    if (!user) {
      // ⭐ UPDATED: Save device info before showing login modal
      console.log("User not logged in, saving device info:", {
        deviceType,
        deviceBrand,
        deviceModel,
      });
      setPendingDeviceInfo({
        deviceType,
        deviceBrand,
        deviceModel,
      });
      setShowAuthModal(true);
      return;
    }

    if (!deviceType || !deviceBrand || !deviceModel) return;
    setShowQuestionnaire(true);
    setCurrentQuestionIndex(0);
    setQuestionnaireAnswers({});
  };

  const handleQuestionnaireAnswer = (questionId, value) => {
    setQuestionnaireAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const goToNextQuestion = () => {
    const questionnaire = getCurrentQuestionnaire();
    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate final price based on answers
      calculateFinalPrice();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateFinalPrice = () => {
    // Enhanced price calculation logic based on questionnaire answers
    let basePrice = 0;
    if (deviceType === "phone") {
      if (deviceBrand === "apple") basePrice = 50000;
      else if (deviceBrand === "samsung") basePrice = 35000;
      else basePrice = 25000;
    } else if (deviceType === "laptop") {
      if (deviceBrand === "apple") basePrice = 80000;
      else if (deviceBrand === "dell") basePrice = 45000;
      else basePrice = 35000;
    }

    // Apply deductions based on questionnaire answers
    let multiplier = 1.0;

    // Warranty impact
    if (questionnaireAnswers.warranty === "0-3months") multiplier -= 0.05;
    else if (questionnaireAnswers.warranty === "3-10months") multiplier -= 0.1;
    else if (questionnaireAnswers.warranty === "notavailable")
      multiplier -= 0.15;

    // Switch on/off
    if (questionnaireAnswers.switch === "off") multiplier -= 0.3;

    // Screen condition
    if (questionnaireAnswers.screen === "replaced-original") multiplier -= 0.1;
    else if (questionnaireAnswers.screen === "replaced-aftermarket")
      multiplier -= 0.2;
    else if (questionnaireAnswers.screen === "cracked") multiplier -= 0.25;

    // Display issues
    if (questionnaireAnswers.display === "minor") multiplier -= 0.05;
    else if (questionnaireAnswers.display === "major") multiplier -= 0.15;

    // Body condition
    if (questionnaireAnswers.body === "good") multiplier -= 0.05;
    else if (questionnaireAnswers.body === "average") multiplier -= 0.1;
    else if (questionnaireAnswers.body === "poor") multiplier -= 0.2;

    // Battery health
    if (
      questionnaireAnswers.battery === "70-84" ||
      questionnaireAnswers.battery === "2-4hours"
    )
      multiplier -= 0.05;
    else if (
      questionnaireAnswers.battery === "below-70" ||
      questionnaireAnswers.battery === "1-2hours"
    )
      multiplier -= 0.1;
    else if (questionnaireAnswers.battery === "below-1hour") multiplier -= 0.15;

    // Accessories
    if (
      questionnaireAnswers.accessories === "partial" ||
      questionnaireAnswers.accessories === "charger-only"
    )
      multiplier -= 0.03;
    else if (questionnaireAnswers.accessories === "none") multiplier -= 0.05;

    const finalPrice = Math.round(basePrice * multiplier);
    setEstimatedPrice(finalPrice);
    setShowQuestionnaire(false);
    setCurrentStep(2);
  };

  const resetForm = () => {
    setDeviceType("");
    setDeviceBrand("");
    setDeviceModel("");
    setEstimatedPrice(0);
    setCurrentStep(1);
    setShowQuestionnaire(false);
    setCurrentQuestionIndex(0);
    setQuestionnaireAnswers({});
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setPendingDeviceInfo(null); // ⭐ NEW: Clear pending info
  };

  // Backend submission function
  const submitSellOrder = async () => {
    setIsSubmitting(true);

    const payload = {
      device_type: deviceType,
      brand: deviceBrand,
      model: deviceModel,
      final_price: estimatedPrice,
      answers: questionnaireAnswers,
      name,
      phone,
      email,
      address,
      user_id: user?.id,
    };

    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    const apiUrl = `${apiBaseUrl}/api/orders/sell/`;

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Received non-JSON response:", text);
        throw new Error(
          `Server returned ${res.status}: Expected JSON but received ${contentType}`
        );
      }

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data.message || data.error || `Server error: ${res.status}`;
        throw new Error(errorMessage);
      }

      setShowSuccessModal(true);
      console.log("Order saved:", data);

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error("Order submission error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const questionnaire = getCurrentQuestionnaire();
  const currentQuestion = questionnaire[currentQuestionIndex];
  const progress =
    questionnaire.length > 0
      ? ((currentQuestionIndex + 1) / questionnaire.length) * 100
      : 0;

  return (
    <>
      {/* Add Navbar at the top */}
      <Navbar />
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowSuccessModal(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon with Animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping" />
                <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full p-4">
                  <CheckCircle2 className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-slate-100">
                Order Placed Successfully! 🎉
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Thank you for choosing us! Our team will contact you within{" "}
                <span className="font-semibold text-cyan-400">2 hours</span> to
                confirm your pickup details.
              </p>

              {/* Order Summary Card */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-lg p-4 mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Device:</span>
                  <span className="text-slate-200 font-medium">
                    {deviceBrand.charAt(0).toUpperCase() + deviceBrand.slice(1)}{" "}
                    {deviceModel}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Estimated Value:</span>
                  <span className="text-cyan-400 font-bold text-lg">
                    ₹{estimatedPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="text-center">
                  <div className="text-2xl mb-1">🚚</div>
                  <div className="text-xs text-slate-400">Free Pickup</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs text-slate-400">Quick Process</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">💰</div>
                  <div className="text-xs text-slate-400">Best Price</div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  resetForm();
                }}
                className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                Sell Another Device
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-slate-900">
        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false);
            // ⭐ UPDATED: Don't clear pending device info when closing modal
          }}
          onSuccess={() => {
            setShowAuthModal(false);
            // ⭐ UPDATED: The useEffect will handle starting the questionnaire
          }}
        />

        {/* Hero Section with User Info */}
        {/* Hero Section */}
        <div className="bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center"></div>

            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
                Sell Your Device & Get Instant Cash
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
                Get the best price for your phone or laptop with our instant
                quote system. Free pickup, secure payment, and hassle-free
                process.
              </p>
              <div className="flex justify-center space-x-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">100's</div>
                  <div className="text-slate-500">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">24hrs</div>
                  <div className="text-slate-500">Quick Payment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              <div
                className={`flex items-center ${
                  currentStep >= 1 ? "text-blue-400" : "text-slate-600"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 1
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-500"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 font-medium">Device Details</span>
              </div>
              <div
                className={`w-16 h-1 ${
                  currentStep >= 2 ? "bg-blue-600" : "bg-slate-800"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 2 ? "text-blue-400" : "text-slate-600"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 2
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-500"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 font-medium">Get Quote</span>
              </div>
              <div
                className={`w-16 h-1 ${
                  currentStep >= 3 ? "bg-blue-600" : "bg-slate-800"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 3 ? "text-blue-400" : "text-slate-600"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 3
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-500"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 font-medium">Schedule Pickup</span>
              </div>
            </div>
          </div>

          {/* Device Selection Form - Only show when NOT in questionnaire */}
          {currentStep === 1 && !showQuestionnaire && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-100">
                  Tell Us About Your Device
                </CardTitle>
                <CardDescription className="text-lg text-slate-400">
                  Provide device details to get an accurate instant quote
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Device Type */}
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    What are you selling? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Card
                      className={`cursor-pointer transition-all border ${
                        deviceType === "phone"
                          ? "ring-2 ring-blue-500 border-blue-500 bg-slate-700"
                          : "border-slate-700 bg-slate-800 hover:border-slate-600"
                      }`}
                      onClick={() => {
                        setDeviceType("phone");
                        setDeviceBrand("");
                        setDeviceModel("");
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        <img
                          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1613d744-b768-4ca3-9e8e-ddd0180fdab9.png"
                          alt="Smartphone icon mobile phone device selection"
                          className="w-16 h-16 mx-auto mb-3"
                        />
                        <h3 className="font-semibold text-slate-100">Phone</h3>
                        <p className="text-sm text-slate-400">
                          Smartphones & Feature Phones
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer transition-all border ${
                        deviceType === "laptop"
                          ? "ring-2 ring-blue-500 border-blue-500 bg-slate-700"
                          : "border-slate-700 bg-slate-800 hover:border-slate-600"
                      }`}
                      onClick={() => {
                        setDeviceType("laptop");
                        setDeviceBrand("");
                        setDeviceModel("");
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        <img
                          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f2eab162-dd87-42d6-b1c2-3f825d76680a.png"
                          alt="Laptop icon computer notebook device selection"
                          className="w-16 h-16 mx-auto mb-3"
                        />
                        <h3 className="font-semibold text-slate-100">Laptop</h3>
                        <p className="text-sm text-slate-400">
                          Notebooks & Gaming Laptops
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {deviceType && (
                  <>
                    {/* Brand Selection */}
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Brand *
                      </label>
                      <Select
                        value={deviceBrand}
                        onValueChange={(value) => {
                          setDeviceBrand(value);
                          setDeviceModel("");
                        }}
                      >
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-300">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700">
                          {deviceType === "phone" ? (
                            <>
                              <SelectItem
                                value="apple"
                                className="text-slate-300"
                              >
                                Apple
                              </SelectItem>
                              <SelectItem
                                value="samsung"
                                className="text-slate-300"
                              >
                                Samsung
                              </SelectItem>
                              <SelectItem
                                value="oneplus"
                                className="text-slate-300"
                              >
                                OnePlus
                              </SelectItem>
                              <SelectItem
                                value="google"
                                className="text-slate-300"
                              >
                                Google
                              </SelectItem>
                              <SelectItem
                                value="xiaomi"
                                className="text-slate-300"
                              >
                                Xiaomi
                              </SelectItem>
                              <SelectItem
                                value="oppo"
                                className="text-slate-300"
                              >
                                Oppo
                              </SelectItem>
                              <SelectItem
                                value="vivo"
                                className="text-slate-300"
                              >
                                Vivo
                              </SelectItem>
                              <SelectItem
                                value="realme"
                                className="text-slate-300"
                              >
                                Realme
                              </SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem
                                value="apple"
                                className="text-slate-300"
                              >
                                Apple
                              </SelectItem>
                              <SelectItem
                                value="dell"
                                className="text-slate-300"
                              >
                                Dell
                              </SelectItem>
                              <SelectItem value="hp" className="text-slate-300">
                                HP
                              </SelectItem>
                              <SelectItem
                                value="lenovo"
                                className="text-slate-300"
                              >
                                Lenovo
                              </SelectItem>
                              <SelectItem
                                value="asus"
                                className="text-slate-300"
                              >
                                ASUS
                              </SelectItem>
                              <SelectItem
                                value="acer"
                                className="text-slate-300"
                              >
                                Acer
                              </SelectItem>
                              <SelectItem
                                value="msi"
                                className="text-slate-300"
                              >
                                MSI
                              </SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Model Selection */}
                    {deviceBrand && (
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                          Model *
                        </label>
                        <Select
                          value={deviceModel}
                          onValueChange={setDeviceModel}
                        >
                          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-300">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700">
                            {getAvailableModels().map((model) => (
                              <SelectItem
                                key={model}
                                value={model}
                                className="text-slate-300"
                              >
                                {model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Additional Details */}
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Additional Details (Optional)
                      </label>
                      <Textarea
                        placeholder="Any additional information about your device (accessories, issues, etc.)"
                        rows={3}
                        className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500"
                      />
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                      onClick={startQuestionnaire}
                      disabled={!deviceType || !deviceBrand || !deviceModel}
                    >
                      {user
                        ? "Continue to Device Evaluation"
                        : "Login to Get Quote"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Questionnaire Section */}
          {showQuestionnaire && currentQuestion && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-lg font-semibold text-slate-100">
                      Answer few questions about your device condition
                    </CardTitle>
                    <span className="text-sm font-medium text-cyan-400">
                      {currentQuestionIndex + 1}/{questionnaire.length}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2 bg-slate-700" />
                </div>

                {/* Device Info */}
                <div className="flex items-center space-x-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-100">
                      {deviceBrand.charAt(0).toUpperCase() +
                        deviceBrand.slice(1)}{" "}
                      {deviceModel}
                    </h3>
                    <div className="flex space-x-4 text-sm text-slate-400 mt-1">
                      <div>Instacash Get Upto</div>
                      <div className="font-semibold text-cyan-400">
                        ₹ 23,850
                      </div>
                    </div>
                    <div className="flex space-x-4 text-sm text-slate-400">
                      <div>Instacash Prime Get Upto</div>
                      <div className="font-semibold text-cyan-400">
                        ₹ 30,635
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                    >
                      Select prime after price quote
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Question */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">
                    {currentQuestion.question}
                  </h3>

                  <RadioGroup
                    value={questionnaireAnswers[currentQuestion.id] || ""}
                    onValueChange={(value) =>
                      handleQuestionnaireAnswer(currentQuestion.id, value)
                    }
                  >
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-start space-x-3"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="mt-1 border-slate-600 text-blue-500"
                          />
                          <Label
                            htmlFor={option.value}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-start justify-between p-4 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">
                              <div className="flex-1">
                                <div className="font-medium text-slate-100">
                                  {option.label}
                                </div>
                                {option.info && (
                                  <div className="text-sm text-slate-400 mt-1 italic">
                                    {option.info}
                                  </div>
                                )}
                              </div>
                              {option.info && (
                                <div className="ml-2 w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-400">
                                  i
                                </div>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  {currentQuestionIndex > 0 && (
                    <Button
                      variant="outline"
                      onClick={goToPreviousQuestion}
                      className="flex-1 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={goToNextQuestion}
                    disabled={!questionnaireAnswers[currentQuestion.id]}
                  >
                    {currentQuestionIndex === questionnaire.length - 1
                      ? "Get Final Quote"
                      : "Next"}
                  </Button>
                </div>

                {/* Bottom Info */}
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-400 text-center">
                    The price stated above depends on the condition of the
                    device. A final price offer will be quoted after you run the
                    device diagnosis.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-slate-300">
                      <svg
                        className="w-4 h-4 text-cyan-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      No bargaining. No headaches!
                    </div>
                    <div className="flex items-center text-sm text-slate-300">
                      <svg
                        className="w-4 h-4 text-cyan-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Takes 5 mins. Save time.
                    </div>
                    <div className="flex items-center text-sm text-slate-300">
                      <svg
                        className="w-4 h-4 text-cyan-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Get a quote from anywhere. Convenient and casual.
                    </div>
                    <div className="flex items-center text-sm text-slate-300">
                      <svg
                        className="w-4 h-4 text-cyan-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Accurate and market-leading prices.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Quote Display */}
          {currentStep === 2 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-100">
                  Your Instant Quote
                </CardTitle>
                <CardDescription className="text-lg text-slate-400">
                  Based on your device details and condition assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quote Display */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    ₹{estimatedPrice.toLocaleString()}
                  </div>
                  <p className="text-slate-300 font-medium">
                    Estimated Quote for Your Device
                  </p>
                  <Badge className="mt-2 bg-slate-800 text-cyan-400 border-cyan-500">
                    Best Price Guaranteed
                  </Badge>
                </div>

                {/* Device Summary */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-100 mb-4">
                    Device Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Type:</span>
                      <span className="ml-2 font-medium text-slate-300 capitalize">
                        {deviceType}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Brand:</span>
                      <span className="ml-2 font-medium text-slate-300 capitalize">
                        {deviceBrand}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">Model:</span>
                      <span className="ml-2 font-medium text-slate-300">
                        {deviceModel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-900 border border-slate-700 rounded-lg">
                    <div className="text-blue-400 font-semibold">
                      Free Pickup
                    </div>
                    <div className="text-sm text-slate-400">
                      At your doorstep
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-900 border border-slate-700 rounded-lg">
                    <div className="text-cyan-400 font-semibold">
                      Instant Payment
                    </div>
                    <div className="text-sm text-slate-400">
                      Within 24 hours
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-900 border border-slate-700 rounded-lg">
                    <div className="text-blue-400 font-semibold">
                      Best Price
                    </div>
                    <div className="text-sm text-slate-400">Guaranteed</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-700"
                    onClick={resetForm}
                  >
                    Check Another Device
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setCurrentStep(3)}
                  >
                    Schedule Pickup
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Schedule Pickup */}
          {currentStep === 3 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-100">
                  Schedule Free Pickup
                </CardTitle>
                <CardDescription className="text-lg text-slate-400">
                  Enter your details to confirm pickup
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Full Name *</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Phone *</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Email *</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label className="text-slate-300">Pickup Address *</Label>
                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete pickup address with landmark"
                    rows={3}
                    className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500"
                  />
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  onClick={submitSellOrder}
                  disabled={
                    !name || !phone || !email || !address || isSubmitting
                  }
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Confirm Pickup & Sell Device"}
                </Button>

                <div className="text-center text-sm text-slate-400">
                  Our executive will contact you within 2 hours to confirm the
                  pickup
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
