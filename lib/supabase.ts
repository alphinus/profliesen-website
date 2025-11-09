import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface ContactSubmission {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  images?: string[];
  status?: 'new' | 'in_progress' | 'completed';
}

// Upload image to Supabase Storage
export async function uploadImage(file: File, folder: string = 'contact-images'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Upload exception:', error);
    return null;
  }
}

// Submit contact form
export async function submitContactForm(data: ContactSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        images: data.images || [],
        status: 'new',
      }]);

    if (error) {
      console.error('Submission error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Submission exception:', error);
    return { success: false, error: 'Ein Fehler ist aufgetreten' };
  }
}
