"use client";

import { useState, ChangeEvent } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 1000000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 1609344,
  },
  weight: {
    "Grams (g)": 1,
    "Kilograms (kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },
  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Fluid Ounces (fl oz)": 29.5735,
    "Cups (cup)": 240,
    "Pints (pt)": 473.176,
    "Quarts (qt)": 946.353,
    "Gallons (gal)": 3785.41,
  },
};

const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
  ],
};

const MainPage = () => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
  };

  const handleUnitChange = (value: string) => {
    setInputUnit(value);
  };

  const handleOutputUnitChange = (value: string) => {
    setOutputUnit(value);
  };

  const convertValue = (): void => {
    if (inputUnit && outputUnit && inputValue !== null) {
      let unitCategory: string | null = null;
      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }

      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        alert("Invalid units selected");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Unit Converter</h1>
            <p className="text-center text-gray-600 mb-6">
              Easily convert between different units of measurement.
            </p>
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Unit */}
              <div>
                <Label htmlFor="input-unit" className="text-gray-700 font-medium">
                  From:
                </Label>
                <Select onValueChange={handleUnitChange}>
                  <SelectTrigger className="w-full border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitTypes).map(([category, unit]) => (
                      <SelectGroup key={category}>
                        <SelectLabel className="font-semibold text-gray-500">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectLabel>
                        {unit.map((unit) => (
                          <SelectItem
                            key={unit}
                            value={unit}
                            className="hover:bg-blue-100 focus:bg-blue-200"
                          >
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
      
              {/* To Unit */}
              <div>
                <Label htmlFor="output-unit" className="text-gray-700 font-medium">
                  To:
                </Label>
                <Select onValueChange={handleOutputUnitChange}>
                  <SelectTrigger className="w-full border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitTypes).map(([category, unit]) => (
                      <SelectGroup key={category}>
                        <SelectLabel className="font-semibold text-gray-500">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectLabel>
                        {unit.map((unit) => (
                          <SelectItem
                            key={unit}
                            value={unit}
                            className="hover:bg-blue-100 focus:bg-blue-200"
                          >
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
      
            {/* Value Input */}
            <div className="mt-4">
              <Label htmlFor="input-value" className="text-gray-700 font-medium">
                Value:
              </Label>
              <Input
                type="number"
                id="input-value"
                placeholder="Enter value"
                value={inputValue || ""}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Convert Button */}
            <div className="mt-6">
              <Button
                type="button"
                onClick={convertValue}
                className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Convert
              </Button>
            </div>
      
            {/* Result */}
            <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Converted Value:</h2>
              <p className="text-2xl font-bold text-blue-500 mt-2">
                {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
              </p>
              <p className="text-gray-600">{outputUnit || "Unit"}</p>
            </div>
          </div>
        </div>
      
      
  );
};

export default MainPage;
