"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { NATIONALITIES } from "./constant";
import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import { FileText, Activity, Apple, Clock } from "lucide-react";

import SearchIcon from "@/app/images/search_icon.svg";
import BMIAnalysis from "@/app/images/bmi_analysis.svg";
import Health from "@/app/images/health.svg";
import RightArrow from "@/app/images/right_arrow.svg";
import Breakfast from "@/app/images/tea.svg";
import Lunch from "@/app/images/lunch.svg";
import Dinner from "@/app/images/dinner.svg";
import Time from "@/app/images/time.svg";
import Calories from "@/app/images/calories.svg";
import MealDesc from "@/app/images/tbsp.svg";
import Target from "@/app/images/target.svg";
import MacronutrientDistribution from "@/app/images/macronutrient_distribution.svg";
import Carbohydrates from "@/app/images/carbohydrates.svg";
import Fat from "@/app/images/fat.svg";
import Protein from "@/app/images/protein.svg";
import NutritionGuidelines from "@/app/images/nutrition_guidelines.svg";
import Check from "@/app/images/check.svg";
import Water from "@/app/images/water.svg";
import Focus from "@/app/images/focus.svg";
import Calcium from "@/app/images/calcium.svg";
import Iron from "@/app/images/iron.svg";
import VitaminD from "@/app/images/vitamin_d.svg";

import freeForever from "@/app/images/freeForever.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import dietRecommendation from "@/app/images/dietRecommendation.svg";
import personalizedRecommendation from "@/app/images/personalized_recommendation.svg";
import nutrientTracking from "@/app/images/nutrient_tracking.svg";
import customizablePortions from "@/app/images/customizable_portions.svg";
import tools from "@/app/images/tools.svg";
import "./diet.css";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const ChevronDown = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const DietRecommendationForm = ({ setApiResponse }) => {
  // Form state
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    nationality: "Afghan",
    gender: "male",
    activityLevel: "sedentary",
    goal: "weight_loss",
    dietry_preference: "vegetarian",
    meals_per_day: 3,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(3);
  const min = 0;
  const max = 5;

  const percentage = ((sliderValue - min) / (max - min)) * 100;

  // Validate form data
  useEffect(() => {
    const validateForm = () => {
      const { age, weight, height } = formData;

      // Check if all required fields are filled and positive
      const isValid =
        age !== "" &&
        parseInt(age) > 0 &&
        weight !== "" &&
        parseInt(weight) > 0 &&
        height !== "" &&
        parseInt(height) > 0;

      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    // Convert form data to API payload format
    const payload = {
      age: parseInt(formData.age),
      weight: parseInt(formData.weight),
      height: parseInt(formData.height),
      nationality: formData.nationality,
      gender: formData.gender,
      goal: formData.goal.replace("-", "_"),
      dietry_preference: formData.dietry_preference,
      meals_per_day: parseInt(sliderValue),
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        `${NEXT_PUBLIC_BE_URL}/diet_recommendation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error generating diet plan:", error);
      alert(
        "An error occurred while generating the diet plan. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto mt-2 p-6 border border-[#E4E4E4] rounded-3xl font-Urbanist">
        <form className="space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-3">
            <span className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <span className="text-xl font-semibold">Basic Info</span>
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-[16px] mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="Enter Age"
                />
              </div>
              <div>
                <label className="block text-[16px] mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="Enter Weight"
                />
              </div>
              <div>
                <label className="block text-[16px] mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="Enter Height"
                />
              </div>
              <div>
                <label className="block text-[16px] mb-2">Nationality</label>
                <div className="relative w-full">
                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full h-[56px] px-4 py-2 bg-white border rounded-full text-[16px] appearance-none pr-10"
                  >
                    {NATIONALITIES.map((nationality, index) => (
                      <option key={index} value={nationality.toLowerCase()}>
                        {nationality}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-[16px] mt-5 mb-3">Gender</span>
              <span className="flex gap-6">
                {["Male", "Female", "Other"].map((gender) => (
                  <span key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender.toLowerCase()}
                      checked={formData.gender === gender.toLowerCase()}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <label className="ml-2">{gender}</label>
                  </span>
                ))}
              </span>
            </div>
          </div>

          <hr className="mt-4 border-[#E4E4E4]" />

          {/* Activity & Goals Section */}
          <div className="space-y-3">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <span className="text-xl font-semibold">Activity & Goals</span>
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[16px] mb-2 mt-2">
                  Activity Level
                </label>
                <div className="relative w-full">
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className="w-full h-[56px] px-4 py-2 bg-white border rounded-full text-[16px] appearance-none pr-10"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light Active</option>
                    <option value="moderate">Moderate Active</option>
                    <option value="very">Very Active</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[16px] mb-2">Goal</label>
                <div className="relative w-full">
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full h-[56px] px-4 py-2 bg-white border rounded-full text-[16px] appearance-none pr-10"
                  >
                    <option value="weight-loss">Weight Loss</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="weight-gain">Weight Gain</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-4 border-[#E4E4E4]" />

          {/* Diet Preferences */}
          <div className="space-y-6">
            <span className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              <span className="text-xl font-semibold">Diet Preferences</span>
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[16px] mb-2 -mt-2">Category</label>
                <div className="relative w-full">
                  <select
                    name="dietry_preference"
                    value={formData.dietry_preference}
                    onChange={handleInputChange}
                    className="w-full h-[56px] px-4 py-2 bg-white border rounded-full text-[16px] appearance-none pr-10"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="non-vegetarian">Non-vegetarian</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-4 border-[#E4E4E4]" />

          {/* Meals Per Day */}
          <div className="space-y-6">
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-xl font-semibold">Meals Per Day</span>
            </span>

            <div className="relative w-[100%] md:w-[48%] h-12 pt-6">
              <input
                type="range"
                min={min}
                max={max}
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value, 10))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, 
                  #DCD536 0%, 
                  #56D5FF ${percentage / 2}%, 
                  #FF8585 ${percentage}%, 
                  #E4E4E4 ${percentage}%, 
                  #E4E4E4 100%)`,
                }}
              />
              {/* Tooltip */}
              <div
                className="absolute -top-4 flex items-center justify-center px-3 h-8 bg-white border rounded-xl"
                style={{
                  left: `${percentage}%`,
                  transform:
                    percentage < 10
                      ? "translateX(0)"
                      : percentage > 90
                      ? "translateX(-100%)"
                      : "translateX(-50%)",
                  borderColor: "#FF8585",
                  whiteSpace: "nowrap",
                }}
              >
                <span className="text-[14px] font-medium text-[#212121] w-auto">
                  {sliderValue} meals per day
                </span>
                <div
                  className="absolute bottom-[-6.5px] w-3 h-3 bg-white"
                  style={{
                    left:
                      percentage < 10 ? "11%" : percentage > 90 ? "89%" : "50%",
                    transform:
                      percentage < 10
                        ? "translateX(-20%) rotate(-45deg)"
                        : percentage > 90
                        ? "translateX(-80%) rotate(-45deg)"
                        : "translateX(-50%) rotate(-45deg)",
                    borderLeft: "1px solid #FF8585",
                    borderBottom: "1px solid #FF8585",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full mt-6 flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`w-full md:w-[22%] h-auto p-2 text-white text-base md:text-xl font-bold rounded-full ${
            isFormValid
              ? "bg-black hover:bg-gray-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Loading..." : "Generate My Diet Plan"}
        </button>
      </div>
    </>
  );
};

const DietRecommendationDisplay = ({ apiResponse }) => {
  const [activeSet, setActiveSet] = useState("meals");

  if (!apiResponse) return null;

  const { response } = apiResponse;
  const { bmi_calculation, diet_plan, nutrition_plan } = response;

  return (
    <div className="w-full mx-auto mt-12 p-6 border border-[#E4E4E4] rounded-3xl font-Urbanist">
      <div className="flex items-center gap-2">
        <Image src={SearchIcon} alt="Search Icon" className="w-6 h-6" />
        <span className="text-xl font-semibold text-[#212121]">
          BMI Analysis
        </span>
      </div>

      {/* BMI Score Display */}
      <div className="flex flex-row h-[68px] items-center mt-6 gap-4">
        <div className="w-[48%] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-base">Your BMI Score</div>
            <Image
              src={BMIAnalysis}
              alt="BMIAnalysis Icon"
              className="w-6 h-6 text-gray-600"
            />
          </div>
          <div className="text-2xl font-medium">{bmi_calculation.bmi}</div>
        </div>
        <div className="h-full mx-4 w-[1px] bg-[#E4E4E4]"></div>
        <div className="w-[48%] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-base">Health Category</div>
            <Image
              src={Health}
              alt="Health Icon"
              className="w-6 h-6 text-gray-600"
            />
          </div>

          <div className="text-xl">{bmi_calculation.bmi_category}</div>
        </div>
      </div>
      <hr className="mt-4 border-[#E4E4E4]" />
      <div className="flex items-start gap-4 mt-4">
        <Image
          src={RightArrow}
          alt="RightArrow Icon"
          className="w-6 h-6 text-gray-600"
        />
        <span className="text-base">{bmi_calculation.interpretation}</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex mt-4">
        {/* Meals Button */}
        <div className="relative">
          <button
            className={`px-4 py-2 text-xl ${
              activeSet === "meals" ? "font-semibold" : ""
            } focus:outline-none`}
            onClick={() => setActiveSet("meals")}
          >
            Meals
          </button>
          {activeSet === "meals" && (
            <span
              className="absolute inset-x-0 bottom-0 h-1"
              style={{
                background:
                  "linear-gradient(264.59deg, #FF8585 23.05%, #56D5FF 33.66%, #56D5FF 38.7%, #56D5FF 41.22%, #DCD536 56.86%)",
              }}
            ></span>
          )}
        </div>

        {/* Overview Button */}
        <div className="relative">
          <button
            className={`px-4 py-2 text-xl ${
              activeSet === "overview" ? "font-semibold" : ""
            } focus:outline-none`}
            onClick={() => setActiveSet("overview")}
          >
            Overview
          </button>
          {activeSet === "overview" && (
            <span
              className="absolute inset-x-0 bottom-0 h-1"
              style={{
                background:
                  "linear-gradient(264.59deg, #FF8585 23.05%, #56D5FF 33.66%, #56D5FF 38.7%, #56D5FF 41.22%, #DCD536 56.86%)",
              }}
            ></span>
          )}
        </div>

        {/* Nutrition Button */}
        <div className="relative">
          <button
            className={`px-4 py-2 text-xl ${
              activeSet === "nutrition" ? "font-semibold" : ""
            } focus:outline-none`}
            onClick={() => setActiveSet("nutrition")}
          >
            Nutrition
          </button>
          {activeSet === "nutrition" && (
            <span
              className="absolute inset-x-0 bottom-0 h-1"
              style={{
                background:
                  "linear-gradient(264.59deg, #FF8585 23.05%, #56D5FF 33.66%, #56D5FF 38.7%, #56D5FF 41.22%, #DCD536 56.86%)",
              }}
            ></span>
          )}
        </div>
      </div>

      {/* Meals */}
      {activeSet === "meals" && (
        <div className="mt-6">
          {diet_plan.meals.map((meal, index) => (
            <div key={index} className="space-y-2 mt-4 h-auto">
              <div className="flex items-center gap-2 text-xl text-[#1D4ED8]">
                <Image
                  src={
                    meal.name === "Breakfast"
                      ? Breakfast
                      : meal.name === "Dinner"
                      ? Dinner
                      : Lunch
                  }
                  alt={`${meal.name} Icon`}
                  className="w-6 h-6"
                />
                <span>{meal.name}</span>
                <span className="mx-3 text-3xl font-extrabold">•</span>
                <Image src={Time} alt="Time Icon" className="w-6 h-6" />
                <span>{meal.time}</span>
                <span className="mx-3 text-3xl font-extrabold">•</span>
                <Image src={Calories} alt="Calories Icon" className="w-6 h-6" />
                <span>{meal.calories} calories</span>
              </div>
              <div className="space-y-2">
                {meal.items.map((item, i) => (
                  <div key={i} className="text-base flex items-center gap-3">
                    <Image
                      src={MealDesc}
                      alt="Description Icon"
                      className="w-5 h-5"
                    />
                    <span>{item}</span>
                  </div>
                ))}
                {index !== diet_plan.meals.length - 1 && (
                  <div>
                    <hr className="mt-6 border-[#E4E4E4]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overview */}
      {activeSet === "overview" && (
        <div className="mt-7">
          <div className="flex items-center gap-3 text-xl text-[#1D4ED8]">
            <Image src={Target} alt="Target Icon" className="w-6 h-6" />
            <span>Daily Target</span>
          </div>
          <div
            className="border rounded-2xl mt-4"
            style={{
              background:
                "linear-gradient(45deg, #DCD536 10%, #56D5FF 50%, #FF8585 80%)",
              padding: "1px",
              paddingBottom: "4px",
            }}
          >
            <div className="bg-white border-white rounded-2xl px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold">
                    {diet_plan.overview.daily_calorie_goal}
                  </span>{" "}
                  <span className="text-base">Calories per day</span>
                </div>
                <div className="text-lg ">
                  {`${diet_plan.meals.length} meals`}
                </div>
              </div>
              <hr className="mt-4 mb-3 border-[#E4E4E4]" />
              <div className="flex items-center justify-between text-xl -mb-1">
                <div className="flex items-center text-base">
                  Recommended Distribution
                </div>
                <div className="text-lg ">
                  {`${(
                    diet_plan.overview.daily_calorie_goal /
                    diet_plan.meals.length
                  ).toFixed(2)} cal/meal`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8 mb-4 text-xl text-[#1D4ED8]">
            <Image
              src={MacronutrientDistribution}
              alt="MacronutrientDistribution Icon"
              className="w-6 h-6"
            />
            <span>Macronutrient Distribution</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              {
                name: "Carbohydrates",
                value: diet_plan.overview.macronutrient_ratio.carbohydrates,
                icon: Carbohydrates,
              },
              {
                name: "Fat",
                value: diet_plan.overview.macronutrient_ratio.fats,
                icon: Fat,
              },
              {
                name: "Protein",
                value: diet_plan.overview.macronutrient_ratio.protein,
                icon: Protein,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-[32.25%] border rounded-2xl"
                style={{
                  background:
                    "linear-gradient(45deg, #DCD536 10%, #56D5FF 50%, #FF8585 80%)",
                  padding: "1px",
                  paddingBottom: "4px",
                }}
              >
                <div className="bg-white border-white rounded-2xl px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.name}</span>
                    </div>
                    <Image
                      src={item.icon}
                      alt={`${item.name} Icon`}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="mt-4 text-2xl font-semibold">
                    {item.value}
                  </div>
                  <div className="mt-4 w-full h-2 rounded-lg cursor-pointer slider relative">
                    <div
                      className="h-2 rounded-lg"
                      style={{
                        background: `linear-gradient(to right, 
                        #DCD536 0%, 
                        #56D5FF ${parseInt(item.value, 10) / 2}%, 
                        #FF8585 ${parseInt(item.value, 10)}%, 
                        #E4E4E4 ${parseInt(item.value, 10)}%, 
                        #E4E4E4 100%)`,
                      }}
                    ></div>
                    <div
                      className="absolute top-0 w-4 h-4 bg-[#FF8585] rounded-full"
                      style={{
                        left: `${Number(item.value.slice(0, -1)) - 1}%`, // Remove the last character and convert the rest to a number
                        transform: "translateY(-30%)", // Adjust vertical positioning
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-8 text-xl text-[#1D4ED8]">
            <Image
              src={NutritionGuidelines}
              alt="Nutrition Guidelines Icon"
              className="w-6 h-6"
            />
            <span>Nutrition Guidelines</span>
          </div>
          <div className="text-[19px]">
            {diet_plan.overview.important_notes.map((note, i) => (
              <div key={i} className="text-base flex items-center gap-4 mt-2.5">
                <Image src={Check} alt="Check Icon" className="w-5 h-5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition */}
      {activeSet === "nutrition" && (
        <div className="mt-7">
          <div className="flex items-center gap-3 mt-8 text-xl text-[#1D4ED8]">
            <Image
              src={NutritionGuidelines}
              alt="Nutrition Guidelines Icon"
              className="w-6 h-6"
            />
            <span>Nutrition Guidelines</span>
          </div>
          <div className="bg-[#FFFEEE] p-6 rounded-3xl text-base mt-4">
            <div className="flex gap-3 items-center">
              <Image src={Water} alt="Water Icon" className="w-6 h-6" />
              <span>{nutrition_plan.hydration_goal}</span>
            </div>
            <div className="mt-3">{nutrition_plan.additional_notes}</div>
          </div>
          <div className="flex items-center gap-3 mt-6 text-xl text-[#1D4ED8]">
            <Image src={Focus} alt="Focus Icon" className="w-6 h-6" />
            <span>Essential Nutrients Focus</span>
          </div>
          <div className="flex items-center gap-3 mt-6 text-base">
            <Image src={Calcium} alt="Calcium Icon" className="w-10 h-10" />
            <span>Calcium</span>
          </div>
          <div className="mt-2">
            {nutrition_plan.vitamin_and_mineral_focus.calcium}
          </div>
          <div className="flex items-center gap-3 mt-6 text-base">
            <Image src={Iron} alt="Iron Icon" className="w-10 h-10" />
            <span>Iron</span>
          </div>
          <div className="mt-2">
            {nutrition_plan.vitamin_and_mineral_focus.iron}
          </div>
          <div className="flex items-center gap-3 mt-6 text-base">
            <Image src={VitaminD} alt="VitaminD Icon" className="w-10 h-10" />
            <span>VitaminD</span>
          </div>
          <div className="mt-2">
            {nutrition_plan.vitamin_and_mineral_focus.vitamin_d}
          </div>
        </div>
      )}
    </div>
  );
};

const DietRecommendation = ({ allDietRecommendation = [] }) => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const features = [
    {
      icon: personalizedRecommendation,
      title: "Personalized Recommendation",
      description:
        "Get diet plans tailored to your specific goals, lifestyle, and food preferences.",
    },
    {
      icon: nutrientTracking,
      title: "Nutrient Tracking",
      description:
        "Track essential nutrients in your meals to ensure a balanced and healthy diet.",
    },
    {
      icon: customizablePortions,
      title: "Customizable Portions",
      description:
        "Adjust portion sizes according to your individual needs, ensuring you stay on track with your goals.",
    },
  ];

  const faqItems = [
    {
      question: "How do I get started with the Diet Recommendation Tool?",
      answer:
        "Simply enter your dietary preferences, health goals, and activity level. Our AI will create a personalized meal plan for you.",
    },
    {
      question: "Can I customize the meal plans?",
      answer:
        "Yes! You can adjust portions, swap meals, and tailor the plan to your specific needs.",
    },
    {
      question:
        "Is the diet tool suitable for specific diets (e.g., keto, vegan)?",
      answer:
        "Absolutely! The tool offers a variety of options, including keto, vegetarian, vegan, gluten-free, and more.",
    },
    {
      question: "Is there any cost involved?",
      answer:
        "No, our Diet Recommendation Tool is completely free to use. No hidden charges or sign-ups required.",
    },
    {
      question: "How often should I update my diet plan?",
      answer:
        "We recommend reviewing and updating your plan every few weeks based on your progress and changing goals. You can adjust your plan as needed.",
    },
    {
      question: "Can I track my nutrient intake with this tool?",
      answer:
        "Yes! The tool helps you track essential nutrients, ensuring your diet is balanced and aligned with your health goals.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  return (
    <main className="mt-12 md:mt-32">
      <div className="container mx-auto max-w-[100%] md:max-w-[80%] bg-transparent mb-32">
        <Image
          className="mx-auto w-auto h-auto"
          src={freeForever}
          alt="free-forever"
          width={300}
          height={100}
        />
        {/* Title Section */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-[54px] font-urbanist font-bold leading-[1.2] mb-4 mt-6 md:mt-12">
          <span className="inline-block md:mb-6">
            Unlock your healthiest self with
          </span>{" "}
          <span className="inline-block md:mb-1">
            <span className="inline-block md:mb-6">our</span>{" "}
            <span className="relative inline-block mb-2 md:mb-6">
              Diet Recommendations Tool.
              <div className="absolute left-0 banner-underline md:!mt-2 !w-[300px] md:!w-[780px] !max-w-none"></div>{" "}
            </span>{" "}
          </span>
        </h1>
        {/* Subtitle */}
        <p className="relative text-center text-[#212121] font-urbanist font-medium text-sm sm:text-base md:text-[24px] px-4">
          Nourish your body with a diet plan made for you.
        </p>
        {/* Tools List */}
        <div className="flex flex-wrap gap-4 mt-[30px] md:mt-[56px] md:ml-12 px-4 md:px-0">
          <div className="flex items-center justify-center flex-wrap gap-2 md:-ml-8">
            <NavigationButton
              width={"w-auto"}
              img={textToVoice}
              href={"/tools/text-to-voice/"}
              name={"AI Text to Voice"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton
              width={"w-auto"}
              img={voiceToText}
              href={"/tools/voice-to-text/"}
              name={"AI Voice to Text"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton
              width={"w-auto"}
              img={imgGenerator}
              href={"/tools/image-generator/"}
              name={"AI Image Generator"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton
              width={"w-auto"}
              img={dietRecommendation}
              name={"Diet recommendation tool"}
              bgColor={"#FFFEEE"}
            />
            <NavigationButton
              width={"w-auto"}
              img={tools}
              href={"/tools/"}
              name={"Other AI Tools"}
              bgColor={"#FFFFFF"}
            />
          </div>
        </div>

        <DietRecommendationForm setApiResponse={setApiResponse} />
        {apiResponse && <DietRecommendationDisplay apiResponse={apiResponse} />}

        {/* Content Section */}
        <DetailSection
          title="Smart Diet Plans for Your Health Goals"
          description="Stay on track with your health goals using our AI-powered Diet Recommendation Tool. Whether you're aiming to lose weight, build muscle, or simply adopt a healthier lifestyle, our tool offers personalized suggestions based on your dietary preferences, goals, and activity levels."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does It Work?"
          explanation={[
            "Our Diet Recommendation Tool uses advanced AI algorithms to analyze your inputs and generate a custom meal plan. Simply enter your health goals, dietary preferences, and activity levels, and the tool will create a diet that fits your needs. You can adjust portions, swap meals, and track your progress over time. It's a quick and easy way to stay motivated and meet your health targets.",
          ]}
        />
        <FAQSection
          faqItems={faqItems}
          activeFAQ={activeFAQ}
          toggleFAQ={toggleFAQ}
        />
      </div>
    </main>
  );
};

export default DietRecommendation;
