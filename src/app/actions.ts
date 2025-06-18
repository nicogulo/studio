
"use server";

import { firestore } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { z } from "zod";

// Define a schema for RSVP data
const RsvpSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  attending: z.enum(["yes", "no"], { required_error: "Please select an option" }),
  message: z.string().optional(),
});

export interface RsvpFormState {
  success: boolean;
  message: string;
  errors?: {
    fullName?: string[];
    attending?: string[];
    message?: string[];
    _form?: string[];
  };
}

export async function handleRsvpSubmit(
  prevState: RsvpFormState,
  formData: FormData
): Promise<RsvpFormState> {
  const rawData = {
    fullName: formData.get("fullName"),
    attending: formData.get("attending"),
    message: formData.get("message"),
  };

  const validatedFields = RsvpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addDoc(collection(firestore, "rsvps"), {
      ...validatedFields.data,
      submittedAt: serverTimestamp(),
    });
    return { success: true, message: "Thank you for your RSVP!" };
  } catch (error) {
    console.error("Error saving RSVP to Firestore:", error);
    return {
      success: false,
      message: "An error occurred while submitting your RSVP. Please try again.",
      errors: { _form: ["Server error. Please try again later."] },
    };
  }
}


export interface AttireSuggestion {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Optional image URL
  storeUrl?: string; // Optional link to an online store
  dataAiHint?: string; // Added to match mock data and frontend usage
}

// Placeholder for the AI flow function.
// This would typically be imported from '@/ai/flows/someFlowFile'
async function generateAttireIdeasFromAI(query: string): Promise<AttireSuggestion[]> {
  // In a real scenario, this function would call the Genkit flow.
  // Example: const flowResult = await run("attireSuggestionFlow", { query });
  // For now, returning mock data.
  console.log(`AI Attire Query (mock): ${query}`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
  
  if (query.toLowerCase().includes("error")) {
    throw new Error("Simulated AI error for attire suggestions.");
  }

  if (query.toLowerCase().includes("empty")) {
    return [];
  }

  return [
    { id: "1", name: "Elegant Floral Midi Dress", description: "A beautiful floral midi dress perfect for a spring/summer wedding. Light and airy.", imageUrl: "https://placehold.co/300x400.png?text=Floral+Dress", storeUrl: "#" , dataAiHint: "floral dress"},
    { id: "2", name: "Classic Navy Suit", description: "A timeless navy suit, well-tailored, paired with a crisp white shirt and a patterned tie.", imageUrl: "https://placehold.co/300x400.png?text=Navy+Suit", storeUrl: "#", dataAiHint: "navy suit" },
    { id: "3", name: "Pastel Cocktail Dress", description: "A chic cocktail dress in a soft pastel shade, knee-length or midi.", imageUrl: "https://placehold.co/300x400.png?text=Pastel+Dress", storeUrl: "#", dataAiHint: "pastel dress"},
  ];
}


export interface AttireSuggestionsState {
  success: boolean;
  message?: string;
  suggestions?: AttireSuggestion[];
  query?: string;
}

export async function fetchAttireSuggestions(
  prevState: AttireSuggestionsState,
  formData: FormData
): Promise<AttireSuggestionsState> {
  const query = formData.get("query") as string;

  if (!query || query.trim() === "") {
    return { success: false, message: "Please enter a style or keyword." };
  }

  try {
    // This is where you would call your actual Genkit AI flow
    // For example: import { run } from '@genkit-ai/flow';
    // const results = await run(attireFlow, query);
    // For now, using the mock function:
    const suggestions = await generateAttireIdeasFromAI(query);
    
    if (suggestions.length === 0) {
      return { success: true, query, message: "No specific suggestions found for your query, but think elegant and celebratory!" };
    }
    return { success: true, query, suggestions };
  } catch (error) {
    console.error("Error fetching attire suggestions:", error);
    return { success: false, query, message: "Sorry, we couldn't fetch suggestions at this time. Please try again." };
  }
}
