
"use server";

import { firestore } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { z } from "zod";
import { format } from 'date-fns';

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

const coupleIdentifier = "nico-trio"; // This should match the subcollection name for the couple

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
    const rsvpCollectionRef = collection(firestore, "global", "reservation", coupleIdentifier);
    
    await addDoc(rsvpCollectionRef, {
      ...validatedFields.data,
      submittedAt: serverTimestamp(),
    });
    return { success: true, message: "Thank you for your RSVP!" };
  } catch (error: any) {
    console.error("Error saving RSVP to Firestore:", error);
    let specificMessage = "An error occurred while submitting your RSVP. Please try again.";
    if (error.code) {
      console.error("Firestore Error Code:", error.code);
      specificMessage += ` (Code: ${error.code})`;
    }
    if (error.message) {
      console.error("Firestore Error Message (full):", error.message);
    }
    specificMessage += ` Ensure Firebase project '${firebaseConfig.projectId}' is set up, Firestore is enabled, and security rules allow writing to 'global/reservation/${coupleIdentifier}'. Verify your API key and other Firebase config values.`;
    
    return {
      success: false,
      message: specificMessage,
      errors: { _form: ["Server error. Please try again later."] },
    };
  }
}

export interface SubmittedRsvpData {
  id: string;
  fullName: string;
  attending: "yes" | "no";
  message?: string;
  submittedAt: string; // Store as string after formatting
}

export interface FetchRsvpsState {
  success: boolean;
  rsvps?: SubmittedRsvpData[];
  error?: string;
}

export async function fetchRsvps(): Promise<FetchRsvpsState> {
  try {
    const rsvpCollectionRef = collection(firestore, "global", "reservation", coupleIdentifier);
    const q = query(rsvpCollectionRef, orderBy("submittedAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const rsvps = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const submittedAtTimestamp = data.submittedAt as Timestamp | null;
      return {
        id: doc.id,
        fullName: data.fullName,
        attending: data.attending,
        message: data.message || "",
        submittedAt: submittedAtTimestamp ? format(submittedAtTimestamp.toDate(), "MMMM d, yyyy 'at' h:mm a") : "Date not available",
      } as SubmittedRsvpData;
    });
    
    return { success: true, rsvps };
  } catch (error: any) {
    console.error("Error fetching RSVPs from Firestore:", error);
    let specificMessage = "Could not fetch submitted RSVPs.";
     if (error.code) {
      console.error("Firestore Error Code:", error.code);
      specificMessage += ` (Code: ${error.code})`;
    }
    specificMessage += ` Ensure security rules allow reading from 'global/reservation/${coupleIdentifier}'.`;
    return { success: false, error: specificMessage };
  }
}


export interface AttireSuggestion {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; 
  storeUrl?: string; 
  dataAiHint?: string; 
}

async function generateAttireIdeasFromAI(query: string): Promise<AttireSuggestion[]> {
  console.log(`AI Attire Query (mock): ${query}`);
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
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

// Firebase config for logging purposes, ensure this is the correct one for your project
const firebaseConfig = {
  apiKey: "AIzaSyBChVpmxy_g1JfuZrd3NgwJmcieizdiUuM",
  authDomain: "nico-trio.firebaseapp.com",
  projectId: "nico-trio",
  storageBucket: "nico-trio.appspot.com",
  messagingSenderId: "142120789424",
  appId: "1:142120789424:web:df492227d377923f122275",
  measurementId: "G-JBZ5XYC2T7"
};
