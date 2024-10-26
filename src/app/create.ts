"use server";

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function handleCreateTask(formData:FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore);
  try {

    const title = formData.get('title');
    const description = formData.get('description');
    const status = formData.get('status');
    const due = formData.get('due');

    const today = new Date().toISOString().split('T')[0];
    
    // Validate date
    if (due && due < today) {
      console.error('Due date cannot be in the past')
    }
    
    const { data, error } = await supabase.from('todos').insert({title, description, status, due}).select()
    if(!error) {
      console.log(data)
      revalidatePath('/','layout')
    }
  } catch (error) {
    console.error("Failed to parse body:", error);
  }
}
