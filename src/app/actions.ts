
"use server";

import { firestore } from "@/lib/firebase";
import { firebaseConfigValues, coupleIdentifier as currentCoupleIdentifier } from "@/config/appConfig";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, Timestamp, limit, startAfter, DocumentData, QueryDocumentSnapshot, QueryConstraint } from "firebase/firestore";
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

// Use the imported coupleIdentifier
// const coupleIdentifier = process.env.NEXT_PUBLIC_COUPLE_IDENTIFIER || "nico-trio";

// Update firebaseConfigForLogging to use the imported config
const firebaseConfigForLogging = {
  apiKey: firebaseConfigValues.apiKey ? firebaseConfigValues.apiKey.substring(0,4) + "..." : "NOT SET",
  authDomain: firebaseConfigValues.authDomain || "NOT SET",
  projectId: firebaseConfigValues.projectId || "NOT SET",
  storageBucket: firebaseConfigValues.storageBucket || "NOT SET",
  messagingSenderId: firebaseConfigValues.messagingSenderId || "NOT SET",
  appId: firebaseConfigValues.appId || "NOT SET",
  measurementId: firebaseConfigValues.measurementId || "NOT SET"
};

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

  if (!firestore) {
    console.error("Firestore is not initialized. Check Firebase configuration in actions.ts (handleRsvpSubmit).");
    const errorMessage = `Server configuration error: Firestore not available. Ensure Firebase project '${firebaseConfigForLogging.projectId}' is correctly set up (API Key, Project ID, Auth Domain in .env.local) and Firestore is enabled.`;
    return {
      success: false,
      message: errorMessage,
      errors: { _form: ["Server configuration error."] },
    };
  }

  try {
    console.log(`Submitting RSVP for couple: ${currentCoupleIdentifier}`);
    const rsvpCollectionRef = collection(firestore, "global", "reservation", currentCoupleIdentifier);

    await addDoc(rsvpCollectionRef, {
      ...validatedFields.data,
      submittedAt: serverTimestamp(),
    });
    return { success: true, message: "Thank you for your RSVP!" };
  } catch (error: any) {
    console.error(`Error saving RSVP to Firestore for ${currentCoupleIdentifier}:`, error);
    let specificMessage = "An error occurred while submitting your RSVP. Please try again.";
    if (error.code) {
      console.error("Firestore Error Code:", error.code);
      specificMessage += ` (Code: ${error.code})`;
    }
    if (error.message) {
      console.error("Firestore Error Message (full):", error.message);
    }
    specificMessage += ` Ensure Firebase project '${firebaseConfigForLogging.projectId}' is set up, Firestore is enabled, and security rules allow writing to 'global/reservation/${currentCoupleIdentifier}'. Verify your Firebase config values. Current couple identifier being used: ${currentCoupleIdentifier}.`;

    return {
      success: false,
      message: specificMessage,
      errors: { _form: ["Server error. Please try again later."] },
    };
  }
}

export interface FormattedSubmittedRsvpData {
  id: string;
  fullName: string;
  attending: "yes" | "no";
  message?: string;
  submittedAtFormatted: string;
}

// Interface for the serializable timestamp components
export interface SerializableTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface FetchRsvpsResult {
  success: boolean;
  rsvps?: FormattedSubmittedRsvpData[];
  error?: string;
  lastDocTimestampForPagination?: SerializableTimestamp | null;
  hasMore: boolean;
}

const RSVP_PAGE_SIZE = 5;

export async function fetchRsvps(
  lastKnownDocTimestampForPaginationInput: SerializableTimestamp | null = null,
  limitNum: number = RSVP_PAGE_SIZE
): Promise<FetchRsvpsResult> {
  console.log(`--- fetchRsvps called for couple: ${currentCoupleIdentifier} ---`);
  console.log("Input cursor (from client):", lastKnownDocTimestampForPaginationInput);
  console.log("Limit number:", limitNum);

  if (!firestore) {
    console.error("Firestore is not initialized. Check Firebase configuration in actions.ts (fetchRsvps).");
    const errorMessage = `Server configuration error: Firestore not available. Ensure Firebase project '${firebaseConfigForLogging.projectId}' is correctly set up (API Key, Project ID, Auth Domain in .env.local) and Firestore is enabled.`;
    return { success: false, error: errorMessage, hasMore: false };
  }

  try {
    const rsvpCollectionRef = collection(firestore, "global", "reservation", currentCoupleIdentifier);

    const queryConstraints: QueryConstraint[] = [
        orderBy("submittedAt", "desc"),
        limit(limitNum + 1) // Fetch one extra to check if there's more
    ];

    let q;
    // Reconstruct Timestamp on the server side if input is provided
    const lastKnownDocTimestamp = lastKnownDocTimestampForPaginationInput
        ? new Timestamp(lastKnownDocTimestampForPaginationInput.seconds, lastKnownDocTimestampForPaginationInput.nanoseconds)
        : null;

    if (lastKnownDocTimestamp) {
      console.log("Querying with startAfter, reconstructed timestamp:", lastKnownDocTimestamp.toDate());
      q = query(rsvpCollectionRef, ...queryConstraints, startAfter(lastKnownDocTimestamp));
    } else {
      console.log("Querying initial set (no startAfter cursor)");
      q = query(rsvpCollectionRef, ...queryConstraints);
    }

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    console.log(`Fetched ${docs.length} documents from Firestore for ${currentCoupleIdentifier}.`);

    const hasMore = docs.length > limitNum;
    const rsvpsToReturnDocs = docs.slice(0, limitNum);
    console.log(`Returning ${rsvpsToReturnDocs.length} documents to client. Has more: ${hasMore}`);


    const rsvps: FormattedSubmittedRsvpData[] = rsvpsToReturnDocs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      const submittedAtTimestamp = data.submittedAt as Timestamp | null;
      return {
        id: doc.id,
        fullName: data.fullName,
        attending: data.attending,
        message: data.message || "",
        submittedAtFormatted: submittedAtTimestamp ? format(submittedAtTimestamp.toDate(), "MMMM d, yyyy 'at' h:mm a") : "Date not available",
      };
    });

    const lastReturnedDocData = rsvpsToReturnDocs.length > 0 ? rsvpsToReturnDocs[rsvpsToReturnDocs.length - 1].data() : null;
    const lastReturnedDocFirestoreTimestamp = lastReturnedDocData ? lastReturnedDocData.submittedAt as Timestamp : null;

    if (rsvpsToReturnDocs.length > 0 && lastReturnedDocFirestoreTimestamp) {
        console.log("Timestamp of the last document in the returned batch for next cursor:", lastReturnedDocFirestoreTimestamp.toDate());
    } else if (rsvpsToReturnDocs.length > 0) {
        console.log("Last document in returned batch exists, but its submittedAt is null/missing. This could break pagination.");
    } else {
        console.log("No documents in rsvpsToReturnDocs, so no cursor for next page.");
    }
    
    const serializableTimestampForPagination = lastReturnedDocFirestoreTimestamp
      ? { seconds: lastReturnedDocFirestoreTimestamp.seconds, nanoseconds: lastReturnedDocFirestoreTimestamp.nanoseconds }
      : null;

    return {
      success: true,
      rsvps,
      lastDocTimestampForPagination: serializableTimestampForPagination,
      hasMore
    };
  } catch (error: any) {
    console.error(`Error fetching RSVPs from Firestore for ${currentCoupleIdentifier}:`, error);
    let specificMessage = "Could not fetch submitted RSVPs.";
     if (error.code) {
      console.error("Firestore Error Code:", error.code);
      specificMessage += ` (Code: ${error.code})`;
    }
    if (error.message) {
      console.error("Firestore Error Message (full):", error.message);
    }
    specificMessage += ` Ensure security rules allow reading from 'global/reservation/${currentCoupleIdentifier}'. Current couple identifier: ${currentCoupleIdentifier}.`;
    return { success: false, error: specificMessage, hasMore: false };
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
    { id: "1", name: "Elegant Floral Midi Dress", description: "A beautiful floral midi dress perfect for a spring/summer wedding. Light and airy.", imageUrl: "https://placehold.co/300x400.png", storeUrl: "#" , dataAiHint: "floral dress"},
    { id: "2", name: "Classic Navy Suit", description: "A timeless navy suit, well-tailored, paired with a crisp white shirt and a patterned tie.", imageUrl: "https://placehold.co/300x400.png", storeUrl: "#", dataAiHint: "navy suit" },
    { id: "3", name: "Pastel Cocktail Dress", description: "A chic cocktail dress in a soft pastel shade, knee-length or midi.", imageUrl: "https://placehold.co/300x400.png", storeUrl: "#", dataAiHint: "pastel dress"},
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
